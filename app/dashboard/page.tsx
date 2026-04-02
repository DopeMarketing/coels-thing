import { createServerComponentClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = createServerComponentClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-600">Welcome back, {user.email}</div>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Total Contacts</h3>
          <div className="text-2xl font-bold text-gray-900 mt-2">1,247</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Revenue This Month</h3>
          <div className="text-2xl font-bold text-gray-900 mt-2">$24,580</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Active Syncs</h3>
          <div className="text-2xl font-bold text-gray-900 mt-2">3</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-500">Last Sync</h3>
          <div className="text-2xl font-bold text-gray-900 mt-2">2m ago</div>
        </div>
      </div>
      
      {/* Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">HubSpot sync completed</span>
              <span className="text-xs text-gray-400">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">New Stripe customer added</span>
              <span className="text-xs text-gray-400">15 minutes ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Google Sheets updated</span>
              <span className="text-xs text-gray-400">1 hour ago</span>
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              Sync HubSpot Contacts
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              Import Stripe Customers
            </button>
            <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
              Update Google Sheets
            </button>
          </div>
        </div>
      </div>
      
      {/* TODO: Fetch real metrics data from contacts, revenue_data tables */}
      {/* TODO: Load recent activity from sync_logs and contact_activities */}
    </div>
  )
}