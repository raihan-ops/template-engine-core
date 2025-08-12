export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-primary">SITENAME_TOKEN</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Template 2 Design - Bold and professional homepage with clean lines and modern typography.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary text-white px-8 py-4 rounded-md hover:bg-primary/90 transition-colors font-medium">
                Start Your Journey
              </button>
              <button className="border-2 border-secondary text-secondary px-8 py-4 rounded-md hover:bg-secondary hover:text-white transition-colors font-medium">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600">Everything you need to succeed</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Lightning Fast", desc: "Optimized for speed and performance" },
              { title: "Secure by Design", desc: "Built with security as a priority" },
              { title: "Scalable Solution", desc: "Grows with your business needs" },
              { title: "24/7 Support", desc: "Always here when you need us" },
              { title: "Easy Integration", desc: "Simple setup and configuration" },
              { title: "Analytics Ready", desc: "Built-in tracking and insights" }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-md card-hover">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 bg-primary rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
