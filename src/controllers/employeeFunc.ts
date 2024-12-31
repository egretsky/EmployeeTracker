import { pool } from '../connection.js';

//Function to view all employees in the db
export const viewAllEmployees = async () => {
    try {
        const result = await pool.query('SELECT * FROM employee');
        return result.rows;
    }
    catch (error) {
        console.error('Error -', error);
        throw error;
    }
};

// Function to add a new employee to the database
export const addEmployee = async(first_name: string, last_name: string, roleId: number, managerId: number) => {
    try {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, roleId, managerId]);
        console.log('Employee added successfully');
    }
    catch (error) {
        console.error('Error -', error);
        throw error;
    }
};

// Function to delete an employee from the database based on first and last name
export const deleteEmployee = async (first_name: string, last_name: string) => {
    try {
        await pool.query('DELETE FROM employee WHERE first_name = $1 AND last_name = $2', [first_name, last_name]);
        console.log('Employee deleted');
    }
    catch (error) {
        console.error('Error -', error);
        throw error;
    }
};

// Function to update the role of an employee based on their ID
export const updateEmployeeRole = async (employeeId: number, newRoleId: number) => {
    try {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [newRoleId, employeeId]);
        console.log('Employee role updated');
    }
    catch (error) {
        console.error('Error -', error);
        throw error; // Rethrow the error for handling
    }
};

// Function to update the manager of an employee based on their ID
export const updateEmployeeManager = async (employeeId: number, newManagerId: number) => {
    try {
        await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [newManagerId, employeeId]);
        console.log('Employee manager updated');
    }
    catch (error) {
        console.error('Error -', error);
        throw error;
    }
};

// Function to list employees with detailed information including their role, department, salary, and manager
export const listEmployeesWithDetails = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                employee.id, 
                employee.first_name, 
                employee.last_name, 
                role.title, 
                departments.name AS department,  -- Select department name
                role.salary, 
                (SELECT CONCAT(m.first_name, ' ', m.last_name) 
                 FROM employee m 
                 WHERE m.id = employee.manager_id) AS manager
            FROM 
                employee 
            JOIN 
                role ON employee.role_id = role.id
            JOIN 
                departments ON role.department_id = departments.id;  -- Join with the departments table
            `);
        return result.rows; // Returns the list of employees with detailed information
    }
    catch (error) {
        console.error('Error -', error);
        throw error; // Rethrow the error for further handling if needed
    }
};