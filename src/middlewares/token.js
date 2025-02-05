import jwt from 'jsonwebtoken';

// Define the secret key
const SECRET_KEY = 'secretkey';

const adminTokenData = {
  admin: true,
  role_id: 1 
};


const token = jwt.sign(adminTokenData, SECRET_KEY, { expiresIn: '1h' });

console.log('Generated Admin Token:', token);