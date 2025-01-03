import { pool } from '../connection.js'; 

// Function to view all roles in the database
export const viewAllRoles = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                role.id, 
                role.title, 
                role.salary, 
                departments.name AS department  -- Select department name instead of ID
            FROM 
                role 
            JOIN 
                departments ON role.department_id = departments.id;  -- Join with the departments table
            `);
        return result.rows; // Returns the list of roles with department names
    }
    catch (error) {
        console.error('View Error -', error); 
        throw error; 
    }
};

// Function to add a new role to the database
export const addRole = async(title: string, salary: number, departmentId: number) => {
    try {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
        console.log('Role added'); 
    }
    catch (error) {
        console.error('Add Error -', error); 
        throw error; 
    }
};

// Function to delete a role from the database based on the role ID
export const deleteRole = async (roleId: number) => {
    try {
        await pool.query('DELETE FROM role WHERE id = $1', [roleId]);
        console.log('Role deleted'); 
    }
    catch (error) {
        console.error('Delete Error -', error); 
        throw error; 
    }
};
