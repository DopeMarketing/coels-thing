import { createServerComponentClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function ContactsPage() {
  const supabase = createServerComponentClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Add Contact
        </button>
      </div>
      
      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex space-x-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Sources</option>
            <option>HubSpot</option>
            <option>Stripe</option>
            <option>Google Sheets</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>All Tags</option>
            <option>Customer</option>
            <option>Lead</option>
            <option>Partner</option>
          </select>
          <input
            type="text"
            placeholder="Search contacts..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
      
      {/* Contact Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Activity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">John Smith</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">john@example.com</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">HubSpot</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$2,400</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 hours ago</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Link href="/contacts/1" className="text-blue-600 hover:text-blue-700">View</Link>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sarah Johnson</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">sarah@example.com</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Stripe</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1,200</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 day ago</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <Link href="/contacts/2" className="text-blue-600 hover:text-blue-700">View</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* TODO: Fetch contacts data with revenue and activity information */}
      {/* TODO: Implement filtering by tags and source */}
      {/* TODO: Add contact creation functionality */}
    </div>
  )
}