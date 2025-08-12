export default function ProductPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-6xl font-bold gradient-text mb-8 animate-fade-in">
            Our Products
          </h1>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto animate-slide-up">
            Template 3 Product Page - Innovative product showcase with dynamic animations and modern design.
          </p>
        </div>
      </div>
      
      {/* Product Showcase */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group relative">
                <div className="glass-effect rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-rotate-1">
                  {/* Product Image Area */}
                  <div className="h-80 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      item % 3 === 0 ? 'from-primary to-secondary' :
                      item % 2 === 0 ? 'from-secondary to-primary' :
                      'from-primary/70 to-secondary/70'
                    } opacity-80`}></div>
                    <div className="absolute top-6 right-6">
                      <span className="bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                        Premium
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                        <div className="w-10 h-10 bg-white rounded-xl"></div>
                      </div>
                    </div>
                    {/* Floating Elements */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <div className="w-16 h-16 bg-white/20 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      Innovation Pro {item}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      Next-generation solution with cutting-edge technology and unparalleled performance capabilities.
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {[
                        'AI-Powered Analytics',
                        'Real-time Processing',
                        '24/7 Support'
                      ].map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Pricing */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-3xl font-bold gradient-text">$299</span>
                        <span className="text-gray-500 ml-2">/month</span>
                      </div>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div key={star} className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                    
                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Comparison Section */}
      <div className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold gradient-text mb-6">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">Find the perfect solution for your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { name: 'Starter', price: '$99', popular: false },
              { name: 'Professional', price: '$299', popular: true },
              { name: 'Enterprise', price: '$599', popular: false }
            ].map((plan, index) => (
              <div key={index} className={`glass-effect rounded-3xl p-8 relative ${plan.popular ? 'scale-105 ring-2 ring-primary/50' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{plan.name}</h3>
                  <div className="mb-8">
                    <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <button className={`w-full py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg' 
                      : 'glass-effect text-gray-700 hover:shadow-md'
                  }`}>
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
