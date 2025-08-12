export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              About <span className="text-primary">SITENAME_TOKEN</span>
            </h1>
            <p className="text-xl text-gray-600">
              Template 1 About Page - Learn more about our story and mission.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-6">
                We started with a simple idea: to create amazing products that make people's lives better. 
                Our journey began in a small garage, and today we're proud to serve thousands of customers worldwide.
              </p>
              <p className="text-gray-600 mb-6">
                Every product we create is designed with care, attention to detail, and a focus on user experience. 
                We believe in the power of technology to transform lives and businesses.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  <span className="text-gray-700">Innovation at our core</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-secondary rounded-full"></div>
                  <span className="text-gray-700">Customer-focused approach</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                  <span className="text-gray-700">Sustainable practices</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To empower individuals and businesses with innovative solutions that drive success and growth.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">10k+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">50+</div>
                  <div className="text-gray-600">Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
