import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Secure <span className="text-blue-600 animate-float">DeFi Vaults</span>.
            <br />
            Access <span className="text-slate-600 animate-float delay-200">Real Assets</span>.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in-up delay-300">
            Professional-grade DeFi platform providing verified access to tokenized real estate opportunities. Hold HAVEN tokens for exclusive vault features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
            <Link 
              href="/dashboard"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Open Vault
            </Link>
            <Link 
              href="/properties"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-200"
            >
              Explore Opportunities
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="animate-count-up delay-100">
              <div className="text-4xl font-bold text-blue-600 mb-2 animate-float">$2.5M+</div>
              <div className="text-gray-600">Total Value Locked</div>
            </div>
            <div className="animate-count-up delay-200">
              <div className="text-4xl font-bold text-slate-600 mb-2 animate-float delay-100">450+</div>
              <div className="text-gray-600">HAVEN Holders</div>
            </div>
            <div className="animate-count-up delay-300">
              <div className="text-4xl font-bold text-green-600 mb-2 animate-float delay-200">25</div>
              <div className="text-gray-600">Verified Opportunities</div>
            </div>
            <div className="animate-count-up delay-400">
              <div className="text-4xl font-bold text-emerald-600 mb-2 animate-float delay-300">100%</div>
              <div className="text-gray-600">Asset Transparency</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose HavenFi?
            </h2>
            <p className="text-xl text-gray-600">
              Professional DeFi infrastructure for real asset access
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center animate-slide-in-left delay-200 hover-lift">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Secure DeFi Vaults</h3>
              <p className="text-gray-600">
                Hold stablecoins in smart contract vaults with complete transparency and security.
              </p>
            </div>
            
            <div className="text-center animate-fade-in-scale delay-400 hover-lift">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Tokenized Real Assets</h3>
              <p className="text-gray-600">
                Access verified, tokenized real estate opportunities with full legal documentation.
              </p>
            </div>
            
            <div className="text-center animate-slide-in-right delay-600 hover-lift">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow delay-400">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Liquidity Pools</h3>
              <p className="text-gray-600">
                Participate in shared liquidity for fractional asset opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Access Professional DeFi?
          </h2>
          <p className="text-xl text-blue-200 mb-8">
            Hold HAVEN tokens to unlock exclusive vault features and verified asset opportunities.
          </p>
          <Link 
            href="/dashboard"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Open Vault
          </Link>
        </div>
      </section>
    </div>
  );
}
