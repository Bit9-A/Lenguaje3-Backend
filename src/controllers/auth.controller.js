import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import { UserModel } from '../models/users.model.js';
import { EmployeeModel } from '../models/employee.model.js';

const register = async (req, res) => {
  try {
    const { email, password, phone, preferences, username, role_id, status, employee_id } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ ok: false, message: "Please fill in all required fields." });
    }

    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser) return res.status(400).json({ ok: false, message: "Email already exists" });

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await UserModel.createUser({
      email,
      password: hashedPassword,
      phone,
      preferences,
      username,
      role_id,
      status,
      employee_id
    });

    const token = jwt.sign(
      { email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    const { password: _, ...userWithoutPassword } = newUser;
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000
    });

    return res.status(201).json({
      ok: true,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: "Email and password are required" });
    }

    const user = await UserModel.findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ ok: false, message: "Email or password is invalid" });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ ok: false, message: "Email or password is invalid" });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    const expiration = new Date(Date.now() + 3600000); // 1 hour from now
    await UserModel.saveLoginToken(user.id, token, expiration);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000
    });

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const profile = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await UserModel.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    let employee = null;
    if (user.employee_id) {
      employee = await EmployeeModel.findEmployeeById(user.employee_id);
      const activeProjects = await EmployeeModel.countActiveProjectsByEmployeeId(user.employee_id);
      const completedProjects = await EmployeeModel.countCompletedProjectsByEmployeeId(user.employee_id);
      employee.activeProjects = activeProjects;
      employee.completedProjects = completedProjects;
    }

    const { password: _, ...userWithoutPassword } = user;
    return res.json({
      ok: true,
      user: userWithoutPassword,
      employee
    });
  } catch (error) {
    console.error("Profile error:", error);
    return res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const user = await UserModel.findUserByLoginToken(token);
    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }

    await UserModel.clearLoginToken(user.id);

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    });

    res.json({ ok: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );

    const expiration = new Date(Date.now() + 3600000); // 1 hour from now
    await UserModel.savePasswordResetToken(user.id, token, expiration);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE, 
      auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_SECRET_KEY
      }
    });

    const mailOptions = {
      from: 'darkness24zk@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      text: `You requested a password reset. Click the link to reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${token}`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent', token });
  } catch (error) {
    console.error("Password reset request error:", error);
    res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;

    const user = await UserModel.findUserByResetToken(token);

    if (!user) {
      return res.status(400).json({ ok: false, message: "Invalid or expired token" });
    }

    if (user.reset_token_expiration < Date.now()) {
      return res.status(400).json({ ok: false, message: "Token has expired" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);

    await UserModel.updateUserPassword(user.id, hashedPassword);
    await UserModel.clearPasswordResetToken(user.id);

    res.status(200).json({ ok: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

export const AuthController = {
  register,
  login,
  profile,
  logout,
  requestPasswordReset,
  resetPassword
};