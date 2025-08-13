import { getT } from '../../../i18n/server';

export default async function ProductPage() {
  const t = await getT();

  const products = [
    {
      id: 1,
      name: "Premium Solution",
      description: "Our flagship product with advanced features",
      price: "$99/month",
      features: ["Advanced Analytics", "24/7 Support", "Custom Integration", "Priority Updates"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Professional Plan",
      description: "Perfect for growing businesses",
      price: "$49/month",
      features: ["Core Analytics", "Email Support", "Standard Integration", "Regular Updates"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      name: "Starter Package",
      description: "Great for getting started",
      price: "$19/month",
      features: ["Basic Analytics", "Community Support", "Easy Setup", "Monthly Updates"],
      gradient: "from-green-500 to-teal-500"
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">
            Our Products - {{SITENAME}}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our range of solutions designed to help your business thrive in the digital age.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700">
              <div className={`h-32 bg-gradient-to-r ${product.gradient}`}></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">{product.price}</div>
                
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  Choose Plan
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Contact us to discuss your specific requirements and get a tailored solution.
          </p>
          <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300">
            Contact Sales
          </button>
        </div>
      </div>
    </main>
  );
}
