import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Unified Contact Integration Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Seamlessly connect HubSpot, Stripe, and Google Sheets to create a unified view of your contacts and revenue data.
          </p>
          <div className="space-x-4">
            <Link href="/signup" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Get Started
            </Link>
            <Link href="/login" className="bg-gray-100 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Integrations</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">HubSpot Sync</h3>
            <p className="text-gray-600">Import contacts and organize emails automatically with smart categorization.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Stripe Integration</h3>
            <p className="text-gray-600">Track customer revenue and payment history in real-time.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Google Sheets</h3>
            <p className="text-gray-600">Bi-directional sync with your existing spreadsheet workflows.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
        </div>
        <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Professional</h3>
            <div className="text-4xl font-bold mb-4">$49<span className="text-lg text-gray-600">/month</span></div>
            <p className="text-gray-600 mb-6">Everything you need to unify your contact data</p>
            <Link href="/signup" className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 block text-center">
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}