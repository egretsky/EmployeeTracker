INSERT INTO departments (name)
VALUES  ('Management'),
        ('Marketing'),
        ('Accounting'),
        ('Human Resources'),
        ('Supply Chain'),
        ('Food Service');

INSERT INTO role (title, salary, department_id)
VALUES  ('Regional Manager', 100000, 1),
        ('Social Media Marketer', 70000, 2),
        ('Food Disctribution', 80000, 5),
        ('Cashier', 50000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Ronald', 'McDonald', 1, NULL),
        ('Wendy', 'King', 2, 1),
        ('Jack', 'Box', 3, 1),
        ('Colonel', 'Sanders', 2, 2),
        ('Papa', 'John', 4, 1),
        ('Sonic', 'Dash', 3, 1);