-- Add sample data to all tables

-- Sample clients data
INSERT INTO public.clients (name, industry, revenue, employees, profitability, risk_score, status, contract_end) VALUES
('TechCorp Solutions', 'Technology', '$2.5M', 150, 'High', 2, 'Active', '2024-12-31'),
('Global Manufacturing', 'Manufacturing', '$8.2M', 450, 'Medium', 4, 'Active', '2024-06-30'),
('HealthCare Plus', 'Healthcare', '$1.8M', 120, 'High', 1, 'Active', '2024-09-15'),
('Retail Dynamics', 'Retail', '$3.1M', 200, 'Medium', 3, 'Active', '2024-08-20'),
('Finance First', 'Financial Services', '$5.5M', 300, 'High', 2, 'Active', '2024-11-30');

-- Sample employees data
INSERT INTO public.employees (name, position, department, join_date, salary, performance, skills, status) VALUES
('John Smith', 'Senior Developer', 'Engineering', '2023-01-15', '$85,000', 95, ARRAY['React', 'TypeScript', 'Node.js'], 'Active'),
('Sarah Johnson', 'Product Manager', 'Product', '2023-03-20', '$90,000', 88, ARRAY['Agile', 'Scrum', 'Product Strategy'], 'Active'),
('Mike Chen', 'Data Analyst', 'Analytics', '2023-06-10', '$70,000', 92, ARRAY['SQL', 'Python', 'Tableau'], 'Active'),
('Emily Davis', 'UX Designer', 'Design', '2023-02-28', '$75,000', 87, ARRAY['Figma', 'Adobe XD', 'User Research'], 'Active'),
('David Wilson', 'Sales Manager', 'Sales', '2023-04-12', '$80,000', 94, ARRAY['CRM', 'Sales Strategy', 'Negotiation'], 'Active');

-- Sample finance data
INSERT INTO public.finance (month, revenue, expenses, profit, salaries, overhead) VALUES
('January 2024', '$450,000', '$280,000', '$170,000', '$120,000', '$45,000'),
('February 2024', '$520,000', '$310,000', '$210,000', '$125,000', '$48,000'),
('March 2024', '$480,000', '$295,000', '$185,000', '$122,000', '$46,000'),
('April 2024', '$550,000', '$320,000', '$230,000', '$128,000', '$50,000'),
('May 2024', '$510,000', '$305,000', '$205,000', '$124,000', '$47,000');

-- Sample compliance data
INSERT INTO public.compliance (title, description, category, type, priority, status, due_date) VALUES
('GDPR Compliance Review', 'Annual GDPR compliance audit and documentation update', 'Data Protection', 'Audit', 'High', 'Pending', '2024-03-15'),
('ISO 27001 Certification', 'Information security management system certification', 'Security', 'Certification', 'High', 'In Progress', '2024-06-30'),
('Financial Reporting Standards', 'Update financial reporting procedures to meet new standards', 'Financial', 'Policy Update', 'Medium', 'Pending', '2024-04-20'),
('Employee Safety Training', 'Annual workplace safety training and certification', 'Safety', 'Training', 'Medium', 'Completed', '2024-02-28'),
('Environmental Compliance', 'Environmental impact assessment and compliance report', 'Environmental', 'Assessment', 'Low', 'Pending', '2024-05-15');

-- Sample tasks data
INSERT INTO public.tasks (title, description, assignee, project, priority, status, due_date) VALUES
('Implement New Dashboard', 'Create comprehensive analytics dashboard with real-time data', 'John Smith', 'Analytics Platform', 'High', 'In Progress', '2024-03-25'),
('Client Onboarding Process', 'Streamline client onboarding workflow and documentation', 'Sarah Johnson', 'Process Improvement', 'Medium', 'To Do', '2024-04-10'),
('Database Optimization', 'Optimize database queries and improve performance', 'Mike Chen', 'System Maintenance', 'High', 'In Progress', '2024-03-20'),
('UI/UX Redesign', 'Redesign user interface for better user experience', 'Emily Davis', 'Website Redesign', 'Medium', 'To Do', '2024-04-15'),
('Sales Strategy Review', 'Review and update sales strategy for Q2', 'David Wilson', 'Sales Planning', 'Medium', 'To Do', '2024-03-30'); 