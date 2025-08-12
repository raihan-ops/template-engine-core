export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Animation */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
        <div className="container mx-auto px-4 py-32 relative">
          <div className="text-center max-w-5xl mx-auto animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-8">
              <span className="gradient-text">SITENAME_TOKEN</span>
            </h1>
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
              Template 3 Design - Creative and modern homepage with animations, glass effects, and vibrant gradients.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
              <button className="bg-gradient-to-r from-primary to-secondary text-white px-10 py-4 rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-medium">
                Explore Now
              </button>
              <button className="glass-effect text-gray-700 px-10 py-4 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium">
                Watch Video
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold gradient-text mb-6">Amazing Features</h2>
            <p className="text-xl text-gray-600">Experience the future today</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AI-Powered", desc: "Advanced artificial intelligence integration", gradient: "from-blue-400 to-purple-500" },
              { title: "Cloud Native", desc: "Built for the modern cloud infrastructure", gradient: "from-green-400 to-blue-500" },
              { title: "Real-time Sync", desc: "Instant synchronization across all devices", gradient: "from-pink-400 to-red-500" },
              { title: "Advanced Analytics", desc: "Deep insights into your data patterns", gradient: "from-yellow-400 to-orange-500" },
              { title: "Security First", desc: "Enterprise-grade security and encryption", gradient: "from-indigo-400 to-purple-500" },
              { title: "Global Scale", desc: "Worldwide infrastructure and support", gradient: "from-teal-400 to-green-500" }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="glass-effect p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:rotate-1">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-8 h-8 bg-white rounded-lg"></div>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-bold gradient-text mb-8">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their workflow with our platform.
          </p>
          <button className="bg-gradient-to-r from-primary to-secondary text-white px-12 py-6 rounded-full text-lg font-medium hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </div>
  )
}
