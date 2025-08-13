import CompoundCard from '../components/ui/Card';
import { getT } from '../i18n/server';

export default async function HomePage() {
  const t = await getT();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 text-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Tech Startup Hero Section */}
        <div className="text-center mb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10 rounded-3xl"></div>
          <div className="relative z-10 py-16">
            <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              {{SITENAME}}
            </h1>
            <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Revolutionizing the future with cutting-edge technology. 
              We build scalable solutions that transform industries and empower innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                <span>🚀</span> Get Started Free
              </button>
              <button className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-10 py-5 rounded-xl font-semibold text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 flex items-center justify-center gap-2">
                <span>📊</span> View Demo
              </button>
            </div>
          </div>
        </div>
        
        {/* Tech Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">Lightning Scale</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Built to handle millions of users with enterprise-grade infrastructure and real-time performance monitoring.</p>
            <div className="mt-4 text-blue-600 dark:text-blue-400 font-semibold">99.99% Uptime →</div>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-2xl">🤖</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">AI-Powered</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Machine learning algorithms that adapt and improve your experience with intelligent automation and insights.</p>
            <div className="mt-4 text-purple-600 dark:text-purple-400 font-semibold">Smart Analytics →</div>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
            <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center mb-6">
              <span className="text-white text-2xl">🔐</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-200">Security First</h3>
            <p className="text-slate-600 dark:text-slate-400 text-lg">Enterprise-grade security with end-to-end encryption, SOC2 compliance, and zero-trust architecture.</p>
            <div className="mt-4 text-teal-600 dark:text-teal-400 font-semibold">Learn More →</div>
          </div>
        </div>

        {/* Tech Metrics */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-12 text-white mb-24">
          <h2 className="text-4xl font-bold mb-12 text-center">Trusted by Innovators Worldwide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">1M+</div>
              <div className="text-slate-300 text-lg">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">50B+</div>
              <div className="text-slate-300 text-lg">API Requests</div>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">10ms</div>
              <div className="text-slate-300 text-lg">Avg Response</div>
            </div>
            <div>
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">180+</div>
              <div className="text-slate-300 text-lg">Countries</div>
            </div>
          </div>
        </div>

        {/* Tech CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Scale Your Vision?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto">
            Join thousands of innovators who are building the future with our platform. 
            Start your free trial today and experience the power of next-generation technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-xl font-bold text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Start Free Trial
            </button>
            <button className="text-slate-600 dark:text-slate-300 px-12 py-6 rounded-xl font-semibold text-xl hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}