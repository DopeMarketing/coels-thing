import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h1>
        
        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
        
        {/* Additional Links */}
        <div className="mt-6 text-center space-y-2">
          <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
            Forgot your password?
          </Link>
          <div className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      
      {/* TODO: Implement auth session creation with Supabase */}
      {/* TODO: Add form validation and error handling */}
    </div>
  )
}