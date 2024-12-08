import { data } from "../data/data.js";

const getAllEmployees = async (req, res) => {
    try {
        let employees = data.employees;
        const { search } = req.query;

        if (search) {
            employees = employees.filter(employee => 
                employee.firstname.toLowerCase().includes(search.toLowerCase()) ||
                employee.lastname.toLowerCase().includes(search.toLowerCase()) ||
                employee.email.toLowerCase().includes(search.toLowerCase())
            );
        }

        res.status(200).json({
            ok: true,
            employees
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = data.employees.find(employee => employee.id == id);

        if (!employee) {
            return res.status(404).json({
                ok: false,
                msg: 'Employee not found'
            });
        }

        res.status(200).json({
            ok: true,
            employee
        });
    } catch (error) {
        console.error("Error fetching employee:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const getEmployeeByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const employee = data.employees.find(employee => employee.email.toLowerCase() === email.toLowerCase());

        if (!employee) {
            return res.status(404).json({
                ok: false,
                msg: 'Employee not found'
            });
        }

        res.status(200).json({
            ok: true,
            employee
        });
    } catch (error) {
        console.error("Error fetching employee by email:", error);
        res.status(500).json({
            ok: false,
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
                ok: false,
                msg: 'First name, last name, email, position, and employee type are required'
            });
        }

        const newEmployee = {
            id: (data.employees.length + 1).toString(),
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
        };

        data.employees.push(newEmployee);

        res.status(201).json({
            ok: true,
            msg: 'Employee created successfully',
            employee: newEmployee
        });
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status } = req.body;

        const employeeIndex = data.employees.findIndex(employee => employee.id == id);

        if (employeeIndex === -1) {
            return res.status(404).json({
                ok: false,
                msg: 'Employee not found'
            });
        }

        const updatedEmployee = {
            ...data.employees[employeeIndex],
            firstname: firstname || data.employees[employeeIndex].firstname,
            lastname: lastname || data.employees[employeeIndex].lastname,
            email: email || data.employees[employeeIndex].email,
            phone: phone || data.employees[employeeIndex].phone,
            position: position || data.employees[employeeIndex].position,
            schedule: schedule || data.employees[employeeIndex].schedule,
            employee_type_id: employee_type_id || data.employees[employeeIndex].employee_type_id,
            birthdate: birthdate || data.employees[employeeIndex].birthdate,
            gender: gender || data.employees[employeeIndex].gender,
            national_id: national_id || data.employees[employeeIndex].national_id,
            hire_date: hire_date || data.employees[employeeIndex].hire_date,
            status: status || data.employees[employeeIndex].status
        };

        data.employees[employeeIndex] = updatedEmployee;

        res.status(200).json({
            ok: true,
            msg: 'Employee updated successfully',
            employee: updatedEmployee
        });
    } catch (error) {
        console.error("Error updating employee:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employeeIndex = data.employees.findIndex(employee => employee.id == id);

        if (employeeIndex === -1) {
            return res.status(404).json({
                ok: false,
                msg: 'Employee not found'
            });
        }

        data.employees.splice(employeeIndex, 1);

        res.status(200).json({
            ok: true,
            msg: 'Employee deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting employee:", error);
        res.status(500).json({
            ok: false,
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