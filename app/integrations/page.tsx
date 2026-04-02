import { createServerComponentClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function IntegrationsPage() {
  const supabase = createServerComponentClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
        <div className="text-sm text-gray-600">Manage your connected services</div>
      </div>
      
      {/* Integration Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* HubSpot Integration */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-semibold">H</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">HubSpot</h3>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Sync contacts and organize emails with smart categorization.
          </p>
          <div className="space-y-2 text-sm text-gray-500 mb-4">
            <div>• 1,247 contacts synced</div>
            <div>• Last sync: 2 minutes ago</div>
            <div>• Email categorization active</div>
          </div>
          <Link 
            href="/integrations/hubspot"
            className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            Configure
          </Link>
        </div>
        
        {/* Stripe Integration */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-semibold">S</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Stripe</h3>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Track customer revenue and payment history in real-time.
          </p>
          <div className="space-y-2 text-sm text-gray-500 mb-4">
            <div>• 892 customers imported</div>
            <div>• Webhooks active</div>
            <div>• Revenue tracking enabled</div>
          </div>
          <Link 
            href="/integrations/stripe"
            className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            Configure
          </Link>
        </div>
        
        {/* Google Sheets Integration */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-semibold">G</span>
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900">Google Sheets</h3>
            </div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Bi-directional sync with your existing spreadsheet workflows.
          </p>
          <div className="space-y-2 text-sm text-gray-500 mb-4">
            <div>• 3 sheets connected</div>
            <div>• Sync pending</div>
            <div>• Field mapping configured</div>
          </div>
          <Link 
            href="/integrations/google-sheets"
            className="block w-full text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
          >
            Configure
          </Link>
        </div>
      </div>
      
      {/* Integration Status Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Integration Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total Active Integrations</span>
            <span className="text-sm text-gray-900">3 of 3</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Data Synced Today</span>
            <span className="text-sm text-gray-900">2,139 records</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Next Scheduled Sync</span>
            <span className="text-sm text-gray-900">In 15 minutes</span>
          </div>
        </div>
      </div>
      
      {/* TODO: Fetch real integration status from integrations table */}
      {/* TODO: Load sync statistics and connection health */}
    </div>
  )
}