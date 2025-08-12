export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Our <span className="text-primary">Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Template 1 Product Page - Discover our amazing products designed for your success.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary to-secondary"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Product {item}</h3>
                <p className="text-gray-600 mb-4">
                  Amazing product description that highlights the key features and benefits.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">$99</span>
                  <button className="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary/90 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
