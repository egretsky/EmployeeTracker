import { pool } from '../connection.js';

// Function to get all departments with their ID and name
export const getDepartments = async () => {
    try {
        const result = await pool.query('SELECT id, name FROM departments');
        return result.rows; // Return the array of department objects
    }
    catch (error) {
        console.error('Error -', error); 
        throw error; 
    }
};

// Function to view all departments with their details
export const viewAllDepartments = async () => {
    try {
        const result = await pool.query('SELECT * FROM departments');
        return result.rows; // Return the array of all department records
    }
    catch (error) {
        console.error('Error -', error); 
        throw error;
    }
};

// Function to add a new department
export const addDepartment = async (name: string) => {
    try {
        const existingDepartment = await pool.query('SELECT * FROM departments WHERE name = $1', [name]);
        if (existingDepartment.rows.length > 0) {
            console.log('Department already exists, use a different name.');
            return;
        }
        // Insert the new department if it doesn't exist
        await pool.query('INSERT INTO departments (name) VALUES ($1)', [name]);
        console.log('Department added');
    }
    catch (error) {
        console.error('Error -', error); 
        throw error;
    }
};

// Function to delete a department by name
export const deleteDepartment = async (name: string) => {
    try {
        await pool.query('DELETE FROM departments WHERE name = $1', [name]);
        console.log('Department deleted'); 
    }
    catch (error) {
        console.error('Error -', error); 
        throw error;
    }
};

// Function to view the total budget for a specific department
export const viewDepartmentBudget = async (departmentId: number) => {
    try {
        const result = await pool.query(`
            SELECT SUM(role.salary) AS total_budget 
            FROM employee 
            JOIN role ON employee.role_id = role.id
            WHERE role.department_id = $1
            `, [departmentId]);
        const totalBudget = result.rows[0]?.total_budget || 0; // Default to 0 if no employees found
        console.log(`Total budget for department ID ${departmentId}: $${totalBudget}`); // Log the total budget
        return totalBudget; // Return the total budget
    }
    catch (error) {
        console.error('Error - ', error); 
        throw error;
    }
};
