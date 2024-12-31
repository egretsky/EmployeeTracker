import { pool } from '../connection.js';

// Function to view all employees grouped by their manager
export const viewEmployeesByManager = async () => {
    try {
        const result = await pool.query('SELECT * FROM employee'); // Retrieve all employees
        const allEmployees = result.rows as {
            id: number;
            first_name: string;
            last_name: string;
            manager_id: number | null;
        }[]; // Ensure allEmployees matches the expected structure

        // Group employees by manager
        const employeesByManager: { [key: number]: { managerName: string; employees: { id: number; name: string }[] } } = {}; // Define the type for employeesByManager
        
        allEmployees.forEach(employee => {
            const managerId = employee.manager_id || 0; // Assign a default value if manager_id is null

            // Initialize the manager's entry if it doesn't exist
            if (!employeesByManager[managerId]) {
                employeesByManager[managerId] = {
                    managerName: managerId ? `${employee.first_name} ${employee.last_name}` : 'No Manager', // Get manager's full name or 'No Manager'
                    employees: [] // Initialize employees array
                };
            }

            // Add employee to their manager's list
            employeesByManager[managerId].employees.push({
                id: employee.id,
                name: `${employee.first_name} ${employee.last_name}`
            });
        });

        return employeesByManager; // Return the grouped data
    }
    catch (error) {
        console.error('Error fetching employees by manager:', error); // Log the error
        throw error; // Rethrow the error for handling
    }
};
