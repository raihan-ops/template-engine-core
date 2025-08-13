import CompoundCard from '../../../components/ui/Card';
import { getT } from '../../../i18n/server';

export default async function HomePage() {
  const t = await getT();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Corporate Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold mb-6 text-blue-900 dark:text-blue-100">
            {{SITENAME}}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Professional solutions delivered with excellence. We provide enterprise-grade 
            services that help businesses achieve their strategic objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transition-colors">
              Get Started
            </button>
            <button className="border-2 border-blue-900 text-blue-900 dark:text-blue-100 dark:border-blue-100 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Corporate Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-900 dark:text-blue-100 text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Business Analytics</h3>
            <p className="text-gray-600 dark:text-gray-300">Comprehensive data analysis and business intelligence solutions for informed decision making.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-700 dark:text-green-100 text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Process Optimization</h3>
            <p className="text-gray-600 dark:text-gray-300">Streamline operations and improve efficiency with our proven methodologies.</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <span className="text-gray-700 dark:text-gray-100 text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">Enterprise Security</h3>
            <p className="text-gray-600 dark:text-gray-300">Robust security solutions to protect your business assets and customer data.</p>
          </div>
        </div>

        {/* Corporate Stats */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Trusted by Industry Leaders</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-blue-900 dark:text-blue-100">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Enterprise Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 dark:text-blue-100">99.9%</div>
              <div className="text-gray-600 dark:text-gray-300">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 dark:text-blue-100">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Premium Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-900 dark:text-blue-100">15+</div>
              <div className="text-gray-600 dark:text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
