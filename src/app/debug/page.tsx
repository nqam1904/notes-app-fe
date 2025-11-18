'use client';

import Link from 'next/link';

export default function DebugPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Debug Tools</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SplashScreen */}
          <Link 
            href="/debug/splash"
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Splash Screen</h2>
                <p className="text-gray-600 text-sm">
                  View the loading splash screen with animations
                </p>
              </div>
            </div>
          </Link>

          {/* Clear LocalStorage */}
          <button
            onClick={() => {
              if (confirm('Clear all localStorage data?')) {
                localStorage.clear();
                alert('LocalStorage cleared!');
                window.location.reload();
              }
            }}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left"
          >
            <div className="flex items-start gap-4">
              <div className="bg-red-100 text-red-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Clear LocalStorage</h2>
                <p className="text-gray-600 text-sm">
                  Clear all localStorage data and reload
                </p>
              </div>
            </div>
          </button>

          {/* View LocalStorage */}
          <button
            onClick={() => {
              const data = {
                notes: localStorage.getItem('anonymous_notes'),
                userId: localStorage.getItem('anonymous_user_id'),
                folders: localStorage.getItem('anonymous_folders'),
                debugDelay: localStorage.getItem('DEBUG_SPLASH_DELAY'),
              };
              console.log('LocalStorage Data:', data);
              alert('Check console for localStorage data');
            }}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left"
          >
            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">View LocalStorage</h2>
                <p className="text-gray-600 text-sm">
                  Log localStorage data to console
                </p>
              </div>
            </div>
          </button>

          {/* Enable Splash Delay */}
          <button
            onClick={() => {
              const delay = prompt('Enter splash screen delay (ms):', '3000');
              if (delay) {
                localStorage.setItem('DEBUG_SPLASH_DELAY', delay);
                alert(`Splash delay set to ${delay}ms. Reload to see effect.`);
              }
            }}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left"
          >
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Enable Splash Delay</h2>
                <p className="text-gray-600 text-sm">
                  Add delay to see splash screen on load
                </p>
              </div>
            </div>
          </button>

          {/* Disable Splash Delay */}
          <button
            onClick={() => {
              localStorage.removeItem('DEBUG_SPLASH_DELAY');
              alert('Splash delay removed. Reload to see effect.');
            }}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-left"
          >
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 text-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Disable Splash Delay</h2>
                <p className="text-gray-600 text-sm">
                  Remove splash screen delay
                </p>
              </div>
            </div>
          </button>

          {/* Back to App */}
          <Link 
            href="/"
            className="block p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="bg-white/20 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Back to App</h2>
                <p className="text-white/90 text-sm">
                  Return to the main application
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Debug Information</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li>• Access this page at <code className="bg-blue-100 px-2 py-0.5 rounded">/debug</code></li>
            <li>• View splash screen at <code className="bg-blue-100 px-2 py-0.5 rounded">/debug/splash</code></li>
            <li>• Check browser console for detailed logs</li>
            <li>• Use Redux DevTools for state inspection</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

