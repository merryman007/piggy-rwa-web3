import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Save in <span className="text-indigo-600 animate-float">Stablecoins</span>.
            <br />
            Own <span className="text-purple-600 animate-float delay-200">Real Assets</span>.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-300">
            Join the future of real estate investment with blockchain-backed savings goals 
            and fractional property ownership in emerging markets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
            <Link 
              href="/dashboard"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover-glow animate-pulse-glow"
            >
              Start Saving
            </Link>
            <Link 
              href="/properties"
              className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition-all duration-300 hover-lift"
            >
              View Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-count-up delay-100">
              <div className="text-4xl font-bold text-indigo-600 mb-2 animate-float">$2.5M+</div>
              <div className="text-gray-600">Total Value Locked</div>
            </div>
            <div className="animate-count-up delay-200">
              <div className="text-4xl font-bold text-purple-600 mb-2 animate-float delay-100">450+</div>
              <div className="text-gray-600">Active Savers</div>
            </div>
            <div className="animate-count-up delay-300">
              <div className="text-4xl font-bold text-green-600 mb-2 animate-float delay-200">25</div>
              <div className="text-gray-600">Properties Available</div>
            </div>
            <div className="animate-count-up delay-400">
              <div className="text-4xl font-bold text-orange-600 mb-2 animate-float delay-300">18%</div>
              <div className="text-gray-600">Average Growth Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose PiggyRWA?
            </h2>
            <p className="text-xl text-gray-600">
              The smart way to save and invest in real estate
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-slide-in-left delay-200 hover-lift">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure Stablecoin Savings</h3>
              <p className="text-gray-600">
                Save in USDC, USDT, and DAI with blockchain security and transparency.
              </p>
            </div>
            
            <div className="text-center animate-fade-in-scale delay-400 hover-lift">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow delay-200">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Real Estate Access</h3>
              <p className="text-gray-600">
                Invest in verified properties across Africa's growing markets.
              </p>
            </div>
            
            <div className="text-center animate-slide-in-right delay-600 hover-lift">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow delay-400">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Pools</h3>
              <p className="text-gray-600">
                Join forces with other investors to purchase high-value properties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Real Estate Journey?
          </h2>
          <p className="text-xl text-indigo-200 mb-8">
            Create your first savings goal today and take the first step toward property ownership.
          </p>
          <Link 
            href="/dashboard"
            className="bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
