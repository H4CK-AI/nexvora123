-- Completely disable RLS for all tables to fix access issues

-- Disable RLS for all tables
ALTER TABLE public.clients DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to clean up
DROP POLICY IF EXISTS "Enable all access for clients" ON public.clients;
DROP POLICY IF EXISTS "Enable all access for employees" ON public.employees;
DROP POLICY IF EXISTS "Enable all access for finance" ON public.finance;
DROP POLICY IF EXISTS "Enable all access for compliance" ON public.compliance;
DROP POLICY IF EXISTS "Enable all access for tasks" ON public.tasks;
DROP POLICY IF EXISTS "Enable all access for transactions" ON public.transactions;
DROP POLICY IF EXISTS "Enable all operations for clients" ON public.clients;
DROP POLICY IF EXISTS "Enable all operations for employees" ON public.employees;
DROP POLICY IF EXISTS "Enable all operations for finance" ON public.finance;
DROP POLICY IF EXISTS "Enable all operations for compliance" ON public.compliance;
DROP POLICY IF EXISTS "Enable all operations for tasks" ON public.tasks;
DROP POLICY IF EXISTS "Enable all operations for transactions" ON public.transactions; 