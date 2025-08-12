export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-primary">SITENAME_TOKEN</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Template 1 Design - Modern and clean homepage layout with beautiful gradients and typography.
          </p>
          <div className="space-x-4">
            <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Get Started
            </button>
            <button className="bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary/90 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">Feature 1</h3>
            <p className="text-gray-600">Amazing feature that will change your workflow completely.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">Feature 2</h3>
            <p className="text-gray-600">Another incredible feature that enhances productivity.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-primary mb-4">Feature 3</h3>
            <p className="text-gray-600">The final feature that completes the perfect solution.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
