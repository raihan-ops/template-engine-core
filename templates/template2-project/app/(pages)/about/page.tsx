export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-primary">SITENAME_TOKEN</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Template 2 About Page - Professional company story with clean design and engaging content.
          </p>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Founded in 2020, we've grown from a small startup to a leading provider of innovative solutions. 
              Our commitment to excellence and customer satisfaction drives everything we do.
            </p>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Today, we serve over 10,000 customers worldwide, helping them achieve their goals with our 
              cutting-edge technology and unparalleled support.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-secondary mb-2">5★</div>
                <div className="text-gray-600">Rating</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Our Values</h3>
            <div className="space-y-6">
              {[
                { title: "Innovation", desc: "Constantly pushing boundaries and exploring new possibilities" },
                { title: "Quality", desc: "Delivering excellence in every product and service we provide" },
                { title: "Integrity", desc: "Building trust through transparency and honest communication" },
                { title: "Customer Focus", desc: "Putting our customers' success at the center of everything" }
              ].map((value, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{value.title}</h4>
                    <p className="text-gray-600">{value.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
          <p className="text-xl text-gray-600 mb-12">
            The talented people behind our success
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder", bg: "from-primary to-primary/70" },
              { name: "Mike Chen", role: "CTO", bg: "from-secondary to-secondary/70" },
              { name: "Emily Davis", role: "Head of Design", bg: "from-primary to-secondary" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className={`w-32 h-32 bg-gradient-to-br ${member.bg} rounded-full mx-auto mb-4`}></div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
