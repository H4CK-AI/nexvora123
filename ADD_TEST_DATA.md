# Add Test Data to Supabase

## Problem
Database tables are empty, so dashboard shows 0 values.

## Solution: Add Test Data

### Step 1: Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Table Editor**

### Step 2: Add Test Data

#### Clients Table
```sql
INSERT INTO clients (name, industry, revenue, status) VALUES
('TechCorp', 'Technology', '₹500000', 'Active'),
('FinancePro', 'Finance', '₹750000', 'Active'),
('HealthCare Inc', 'Healthcare', '₹300000', 'Inactive');
```

#### Employees Table
```sql
INSERT INTO employees (name, position, department, status) VALUES
('John Doe', 'Manager', 'Sales', 'Active'),
('Jane Smith', 'Developer', 'Engineering', 'Active'),
('Mike Johnson', 'Analyst', 'Finance', 'Active');
```

#### Finance Table
```sql
INSERT INTO finance (month, revenue, expenses, profit) VALUES
('January 2024', '₹1000000', '₹600000', '₹400000'),
('February 2024', '₹1200000', '₹700000', '₹500000'),
('March 2024', '₹1100000', '₹650000', '₹450000');
```

#### Tasks Table
```sql
INSERT INTO tasks (title, assignee, status, priority, due_date) VALUES
('Website Redesign', 'John Doe', 'In Progress', 'High', '2024-02-15'),
('Database Migration', 'Jane Smith', 'Completed', 'Medium', '2024-02-10'),
('Client Meeting', 'Mike Johnson', 'Pending', 'Low', '2024-02-20');
```

### Step 3: Verify Data
1. Go back to your dashboard
2. Click **Refresh Data** button
3. Check if values are now showing

## Alternative: Use Supabase Dashboard
1. Go to **Table Editor**
2. Select each table
3. Click **Insert** button
4. Add data manually through the interface 