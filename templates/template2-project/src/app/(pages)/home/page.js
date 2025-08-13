import { getT } from '../../../i18n/server';

export default async function HomePage() {
  const t = await getT();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-red-50 dark:from-purple-900 dark:via-orange-900 dark:to-red-900">
      <div className="container mx-auto px-4 py-16">
        {/* Creative Hero Section */}
        <div className="text-center mb-24 relative overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
              {{SITENAME}}
            </h1>
            <p className="text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-12 font-light leading-relaxed">
              Where creativity meets innovation. We craft extraordinary digital experiences 
              that captivate, inspire, and transform your vision into reality.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-6 rounded-full font-bold text-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110">
                ✨ Start Creating
              </button>
              <button className="bg-white/90 backdrop-blur-sm border-2 border-purple-300 text-purple-600 px-12 py-6 rounded-full font-bold text-xl hover:bg-purple-50 transition-all duration-300">
                🎨 View Portfolio
              </button>
            </div>
          </div>
        </div>
        
        {/* Creative Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-purple-200 dark:border-purple-700">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-white text-3xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-200">Brand Identity</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">Unforgettable brand experiences that tell your unique story and connect with your audience.</p>
          </div>
          
          <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-orange-200 dark:border-orange-700">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-white text-3xl">🚀</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-orange-800 dark:text-orange-200">Digital Campaigns</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">Viral campaigns that break through the noise and create lasting impact.</p>
          </div>
          
          <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-red-200 dark:border-red-700">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-white text-3xl">🎨</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-red-800 dark:text-red-200">Creative Direction</h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">Visionary creative strategies that push boundaries and set new standards.</p>
          </div>
        </div>

        {/* Creative CTA */}
        <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-16 border border-purple-200 dark:border-purple-700">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Ready to Create Magic?
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let's collaborate and bring your creative dreams to life. 
            Together, we'll create something extraordinary.
          </p>
          <button className="bg-gradient-to-r from-purple-600 via-orange-500 to-red-500 text-white px-12 py-6 rounded-full font-bold text-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-110">
            🎨 Let's Create Together
          </button>
        </div>
      </div>
    </main>
  );
}