-- Fix RLS policies for all tables to allow proper access

-- Drop existing policies
DROP POLICY IF EXISTS "Enable all access for clients" ON public.clients;
DROP POLICY IF EXISTS "Enable all access for employees" ON public.employees;
DROP POLICY IF EXISTS "Enable all access for finance" ON public.finance;
DROP POLICY IF EXISTS "Enable all access for compliance" ON public.compliance;
DROP POLICY IF EXISTS "Enable all access for tasks" ON public.tasks;
DROP POLICY IF EXISTS "Enable all access for transactions" ON public.transactions;

-- Create new policies that allow all operations
CREATE POLICY "Enable all operations for clients" ON public.clients
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for employees" ON public.employees
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for finance" ON public.finance
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for compliance" ON public.compliance
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for tasks" ON public.tasks
FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Enable all operations for transactions" ON public.transactions
FOR ALL USING (true) WITH CHECK (true);

-- Alternative: If you want to disable RLS completely for development
-- ALTER TABLE public.clients DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.employees DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.finance DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.compliance DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.tasks DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY; 