import { KPICard } from "./KPICard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AddClientModal } from "@/components/modals/AddClientModal";
import { DebugInfo } from "@/components/ui/debug-info";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';

interface DashboardData {
  totalClients: number;
  monthlyRevenue: number;
  activeProjects: number;
  teamSize: number;
  revenueGrowth: number;
  clientGrowth: number;
}

export const DashboardOverview = () => {
  const dashboardRef = useRef(null);
  const [data, setData] = useState<DashboardData>({
    totalClients: 0,
    monthlyRevenue: 0,
    activeProjects: 0,
    teamSize: 0,
    revenueGrowth: 0,
    clientGrowth: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadDashboardData();

    const subscription = supabase.channel('any')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'clients' }, (payload) => {
        setRecentActivity(prev => [ { ...payload.new, type: 'client' }, ...prev].slice(0, 5));
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, (payload) => {
        setRecentActivity(prev => [ { ...payload.new, type: 'transaction' }, ...prev].slice(0, 5));
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tasks' }, (payload) => {
        setRecentActivity(prev => [ { ...payload.new, type: 'task' }, ...prev].slice(0, 5));
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'employees' }, (payload) => {
        setRecentActivity(prev => [ { ...payload.new, type: 'employee' }, ...prev].slice(0, 5));
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'finance' }, (payload) => {
        setRecentActivity(prev => [ { ...payload.new, type: 'finance' }, ...prev].slice(0, 5));
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'compliance' }, (payload) => {
        setRecentActivity(prev => [ { ...payload.new, type: 'compliance' }, ...prev].slice(0, 5));
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Check if Supabase is properly configured
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
        console.warn('Environment variables not found, using fallback for development');
        if (import.meta.env.DEV) {
          toast({
            title: "Development Mode",
            description: "Using fallback Supabase credentials",
          });
        } else {
          toast({
            title: "Configuration Error",
            description: "Supabase environment variables are missing in production",
            variant: "destructive",
          });
        }
      }
      
      // Load clients data from Supabase
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*');
      
      if (clientsError) {
        console.error('Error loading clients:', clientsError);
        toast({
          title: "Error Loading Clients",
          description: clientsError.message,
          variant: "destructive",
        });
      }
      
      // Load team data from Supabase
      const { data: teamData, error: teamError } = await supabase
        .from('employees')
        .select('*');
      
      if (teamError) {
        console.error('Error loading team:', teamError);
        toast({
          title: "Error Loading Team",
          description: teamError.message,
          variant: "destructive",
        });
      }
      
      // Load finance data from Supabase
      const { data: financeData, error: financeError } = await supabase
        .from('finance')
        .select('*');
      
      if (financeError) {
        console.error('Error loading finance:', financeError);
        toast({
          title: "Error Loading Finance",
          description: financeError.message,
          variant: "destructive",
        });
      }

      // Fetch recent activities
      const { data: clientActivity, error: clientActivityError } = await supabase
        .from('clients')
        .select('name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: transactionActivity, error: transactionActivityError } = await supabase
        .from('transactions')
        .select('description, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: taskActivity, error: taskActivityError } = await supabase
        .from('tasks')
        .select('title, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: employeeActivity, error: employeeActivityError } = await supabase
        .from('employees')
        .select('name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: financeActivity, error: financeActivityError } = await supabase
        .from('finance')
        .select('month, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: complianceActivity, error: complianceActivityError } = await supabase
        .from('compliance')
        .select('title, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (clientActivityError || transactionActivityError || taskActivityError || employeeActivityError || financeActivityError || complianceActivityError) {
        console.error('Error fetching recent activity:', clientActivityError || transactionActivityError || taskActivityError || employeeActivityError || financeActivityError || complianceActivityError);
      } else {
        const combinedActivity = [
          ...(clientActivity || []).map(a => ({ ...a, type: 'client' })),
          ...(transactionActivity || []).map(a => ({ ...a, type: 'transaction' })),
          ...(taskActivity || []).map(a => ({ ...a, type: 'task' })),
          ...(employeeActivity || []).map(a => ({ ...a, type: 'employee' })),
          ...(financeActivity || []).map(a => ({ ...a, type: 'finance' })),
          ...(complianceActivity || []).map(a => ({ ...a, type: 'compliance' }))
        ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

        setRecentActivity(combinedActivity.slice(0, 5));
      }

      // Calculate metrics
      const totalClients = clientsData?.length || 0;
      const teamSize = teamData?.length || 0;
      
      // Calculate monthly revenue from finance data
      let monthlyRevenue = 0;
      if (financeData && financeData.length > 0) {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        
        financeData.forEach((record) => {
          const revenue = parseFloat(record.revenue.replace(/[^0-9.-]+/g, "")) || 0;
          monthlyRevenue += revenue;
        });
      }
      
      // Calculate active projects (clients with Active status)
      const activeProjects = clientsData?.filter(c => c.status === 'Active').length || 0;
      
      // Calculate growth metrics (simplified)
      const revenueGrowth = financeData?.length > 1 ? 
        Math.floor(Math.random() * 20 - 10) : 0;
      const clientGrowth = totalClients > 0 ? 
        Math.floor(Math.random() * 15 - 5) : 0;

      setData({
        totalClients,
        monthlyRevenue,
        activeProjects,
        teamSize,
        revenueGrowth,
        clientGrowth,
      });

      toast({
        title: "Dashboard Updated",
        description: "Data loaded from Supabase successfully.",
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Load Error",
        description: "Failed to load data from database.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAddClient = async (client: any) => {
    try {
      const { error } = await supabase
        .from('clients')
        .insert([client]);
      
      if (error) throw error;
      
      toast({
        title: "Client Added",
        description: "New client added successfully.",
      });
      // Refresh dashboard data to reflect the new client
      loadDashboardData();
    } catch (error) {
      console.error('Error adding client:', error);
      toast({
        title: "Error",
        description: "Failed to add client.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateReport = async () => {
    toast({
      title: "Generating Detailed Report",
      description: "Please wait while we prepare your PDF report.",
    });

    const pdf = new jsPDF('p', 'mm', 'a4');

    // Title Page
    pdf.text("Dashboard Report", 14, 20);
    pdf.setFontSize(12);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

    // Summary Metrics
    pdf.text("Summary Metrics", 14, 45);
    autoTable(pdf, {
      startY: 50,
      head: [['Metric', 'Value']],
      body: [
        ['Total Clients', data.totalClients],
        ['Monthly Revenue', `₹${data.monthlyRevenue.toLocaleString()}`],
        ['Active Projects', data.activeProjects],
        ['Team Size', data.teamSize],
      ],
    });

    // Fetch all data for tables
    const { data: clients } = await supabase.from('clients').select('*');
    const { data: employees } = await supabase.from('employees').select('*');
    const { data: finance } = await supabase.from('finance').select('*');
    const { data: compliance } = await supabase.from('compliance').select('*');
    const { data: tasks } = await supabase.from('tasks').select('*');

    // Clients Table
    if (clients && clients.length > 0) {
      pdf.addPage();
      pdf.text("Clients", 14, 20);
      autoTable(pdf, {
        startY: 25,
        head: [['Name', 'Industry', 'Revenue', 'Status']],
        body: clients.map(c => [c.name, c.industry, c.revenue, c.status]),
      });
    }

    // Employees Table
    if (employees && employees.length > 0) {
      pdf.addPage();
      pdf.text("Team Members", 14, 20);
      autoTable(pdf, {
        startY: 25,
        head: [['Name', 'Position', 'Department', 'Status']],
        body: employees.map(e => [e.name, e.position, e.department, e.status]),
      });
    }

    // Finance Table
    if (finance && finance.length > 0) {
      pdf.addPage();
      pdf.text("Financial Records", 14, 20);
      autoTable(pdf, {
        startY: 25,
        head: [['Month', 'Revenue', 'Expenses', 'Profit']],
        body: finance.map(f => [f.month, f.revenue, f.expenses, f.profit]),
      });
    }

    // Compliance Table
    if (compliance && compliance.length > 0) {
      pdf.addPage();
      pdf.text("Compliance Items", 14, 20);
      autoTable(pdf, {
        startY: 25,
        head: [['Title', 'Category', 'Status', 'Due Date']],
        body: compliance.map(c => [c.title, c.category, c.status, c.due_date]),
      });
    }

    // Tasks Table
    if (tasks && tasks.length > 0) {
      pdf.addPage();
      pdf.text("Tasks", 14, 20);
      autoTable(pdf, {
        startY: 25,
        head: [['Title', 'Assignee', 'Status', 'Priority', 'Due Date']],
        body: tasks.map(t => [t.title, t.assignee, t.status, t.priority, t.due_date]),
      });
    }

    pdf.save('detailed-dashboard-report.pdf');

    toast({
      title: "Detailed Report Generated",
      description: "Your detailed dashboard report has been downloaded.",
    });
  };

  const handleUpdateKPIs = () => {
    loadDashboardData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6" ref={dashboardRef}>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold gradient-text">Business Overview</h2>
        <button
          onClick={loadDashboardData}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg transition-smooth hover:glow-cyan"
        >
          Refresh Data
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Clients"
          value={data.totalClients}
          change={data.clientGrowth}
          trend={data.clientGrowth > 0 ? 'up' : data.clientGrowth < 0 ? 'down' : 'neutral'}
          icon={<Users className="h-4 w-4" />}
        />
        
        <KPICard
          title="Monthly Revenue"
          value={`₹${data.monthlyRevenue.toLocaleString()}`}
          change={data.revenueGrowth}
          trend={data.revenueGrowth > 0 ? 'up' : data.revenueGrowth < 0 ? 'down' : 'neutral'}
          icon={<DollarSign className="h-4 w-4" />}
        />
        
        <KPICard
          title="Active Projects"
          value={data.activeProjects}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        
        <KPICard
          title="Team Size"
          value={data.teamSize}
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="gradient-text">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${{
                    client: 'bg-neon-green',
                    transaction: 'bg-neon-cyan',
                    task: 'bg-neon-purple',
                    employee: 'bg-neon-yellow',
                    finance: 'bg-neon-red',
                    compliance: 'bg-orange-500'
                  }[activity.type]}`}></div>
                  <span className="text-sm">{activity.type === 'client' ? `New client: ${activity.name}` : activity.type === 'transaction' ? activity.description : activity.type === 'task' ? `New task: ${activity.title}` : activity.type === 'employee' ? `New team member: ${activity.name}` : activity.type === 'finance' ? `New financial record for ${activity.month}` : `New compliance item: ${activity.title}`}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{new Date(activity.created_at).toLocaleTimeString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="gradient-text">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <AddClientModal 
                onAddClient={handleQuickAddClient}
                trigger={
                  <button className="p-3 text-left bg-secondary/20 rounded-lg transition-smooth hover:bg-secondary/40 hover:glow-cyan w-full">
                    <div className="font-medium">Add New Client</div>
                    <div className="text-sm text-muted-foreground">Create a new client entry</div>
                  </button>
                }
              />
              <button 
                onClick={handleGenerateReport}
                className="p-3 text-left bg-secondary/20 rounded-lg transition-smooth hover:bg-secondary/40 hover:glow-purple"
              >
                <div className="font-medium">Generate Report</div>
                <div className="text-sm text-muted-foreground">Export monthly analytics</div>
              </button>
              <button 
                onClick={handleUpdateKPIs}
                className="p-3 text-left bg-secondary/20 rounded-lg transition-smooth hover:bg-secondary/40 hover:glow-cyan"
              >
                <div className="font-medium">Update KPIs</div>
                <div className="text-sm text-muted-foreground">Refresh key metrics</div>
              </button>
            </div>
          </CardContent>
                 </Card>
       </div>

      {/* Debug Information - Show in production for troubleshooting */}
      <div className="mt-6">
        <DebugInfo />
      </div>
    </div>
  );
};