import { EmployeeModel } from '../models/employee.model.js';

// Controladores para employees
const getAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.findAllEmployees();
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
    const employee = await EmployeeModel.findEmployeeById(id);

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

const createEmployee = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date } = req.body;

    if (!firstname || !lastname || !email || !position || !employee_type_id) {
      return res.status(400).json({
        msg: 'First name, last name, email, position, and employee type are required'
      });
    }

    const newEmployee = await EmployeeModel.createEmployee({
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
      hire_date
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
    const { firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date } = req.body;

    const updatedEmployee = await EmployeeModel.updateEmployee(id, {
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
      hire_date
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

    const employee = await EmployeeModel.findEmployeeById(id);
    if (!employee) {
      return res.status(404).json({
        msg: 'Employee not found'
      });
    }

    await EmployeeModel.removeEmployee(id);

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

// Controladores para employee_types
const getAllEmployeeTypes = async (req, res) => {
  try {
    const employeeTypes = await EmployeeModel.findAllEmployeeTypes();
    res.status(200).json(employeeTypes);
  } catch (error) {
    console.error("Error fetching employee types:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getEmployeeTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeType = await EmployeeModel.findEmployeeTypeById(id);

    if (!employeeType) {
      return res.status(404).json({
        msg: 'Employee type not found'
      });
    }

    res.status(200).json(employeeType);
  } catch (error) {
    console.error("Error fetching employee type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const createEmployeeType = async (req, res) => {
  try {
    const { type_name } = req.body;

    if (!type_name) {
      return res.status(400).json({
        msg: 'Type name is required'
      });
    }

    const newEmployeeType = await EmployeeModel.createEmployeeType({ type_name });

    res.status(201).json({
      msg: 'Employee type created successfully',
      employeeType: newEmployeeType
    });
  } catch (error) {
    console.error("Error creating employee type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateEmployeeType = async (req, res) => {
  try {
    const { id } = req.params;
    const { type_name } = req.body;

    const updatedEmployeeType = await EmployeeModel.updateEmployeeType(id, { type_name });

    if (!updatedEmployeeType) {
      return res.status(404).json({
        msg: 'Employee type not found'
      });
    }

    res.status(200).json({
      msg: 'Employee type updated successfully',
      employeeType: updatedEmployeeType
    });
  } catch (error) {
    console.error("Error updating employee type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deleteEmployeeType = async (req, res) => {
  try {
    const { id } = req.params;

    const employeeType = await EmployeeModel.findEmployeeTypeById(id);
    if (!employeeType) {
      return res.status(404).json({
        msg: 'Employee type not found'
      });
    }

    await EmployeeModel.removeEmployeeType(id);

    res.status(200).json({
      msg: 'Employee type deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting employee type:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

export const EmployeeController = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployeeTypes,
  getEmployeeTypeById,
  createEmployeeType,
  updateEmployeeType,
  deleteEmployeeType
};