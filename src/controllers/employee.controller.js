import { EmployeeModel } from '../models/employee.model.js';

const getAllEmployees = async (req, res) => {
    try {
        const { search } = req.query;
        let employees;

        if (search) {
            employees = await EmployeeModel.search(search);
        } else {
            employees = await EmployeeModel.findAll();
        }

        res.status(200).json(employees);
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({
            msg: 'Server Error',
            error: error.message
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await EmployeeModel.findById(id);

        if (!employee) {
            return res.status(404).json({
                msg: 'Employee not found'
            });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({
            msg: 'Server Error',
            error: error.message
        });
    }
};

const getEmployeeByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const employee = await EmployeeModel.findByEmail(email);

        if (!employee) {
            return res.status(404).json({
                msg: 'Employee not found'
            });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error("Error fetching employee by email:", error);
        res.status(500).json({
            msg: 'Server Error',
            error: error.message
        });
    }
};

const createEmployee = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date } = req.body;

        if (!firstname || !lastname || !email || !position || !employee_type_id) {
            return res.status(400).json({
                msg: 'First name, last name, email, position, and employee type are required'
            });
        }

        const newEmployee = await EmployeeModel.create({
            firstname,
            lastname,
            email,
            phone,
            position,
            schedule,
            employee_type_id,
            birthdate,
            gender,
            national_id,
            hire_date,
            status: "Active"
        });

        res.status(201).json({
            msg: 'Employee created successfully',
            employee: newEmployee
        });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({
            msg: 'Server Error',
            error: error.message
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status } = req.body;

        const updatedEmployee = await EmployeeModel.update(id, {
            firstname,
            lastname,
            email,
            phone,
            position,
            schedule,
            employee_type_id,
            birthdate,
            gender,
            national_id,
            hire_date,
            status
        });

        if (!updatedEmployee) {
            return res.status(404).json({
                msg: 'Employee not found'
            });
        }

        res.status(200).json({
            msg: 'Employee updated successfully',
            employee: updatedEmployee
        });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({
            msg: 'Server Error',
            error: error.message
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            return res.status(404).json({
                msg: 'Employee not found'
            });
        }

        await EmployeeModel.remove(id);

        res.status(200).json({
            msg: 'Employee deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({
            msg: 'Server Error',
            error: error.message
        });
    }
};

export const EmployeeController = {
    getAllEmployees,
    getEmployeeById,
    getEmployeeByEmail,
    createEmployee,
    updateEmployee,
    deleteEmployee
};