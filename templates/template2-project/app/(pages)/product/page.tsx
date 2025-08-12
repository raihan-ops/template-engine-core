export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-primary">Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Template 2 Product Page - Professional product showcase with elegant design and clear pricing.
          </p>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
              <div className="h-64 bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    New
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-8 h-8 bg-primary rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Product {item}</h3>
                <p className="text-gray-600 mb-4">
                  Professional solution designed for enterprise-level needs with advanced features.
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-primary">$199</span>
                    <span className="text-gray-500 ml-2">/month</span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div key={star} className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                    ))}
                  </div>
                </div>
                <button className="w-full bg-secondary text-white py-3 rounded-md hover:bg-secondary/90 transition-colors font-medium">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-600 mb-8">
            Contact our team to discuss your specific requirements
          </p>
          <button className="bg-primary text-white px-8 py-4 rounded-md hover:bg-primary/90 transition-colors font-medium">
            Get Custom Quote
          </button>
        </div>
      </div>
    </div>
  )
}
