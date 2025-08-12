export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-6xl font-bold gradient-text mb-8 animate-fade-in">
            About SITENAME_TOKEN
          </h1>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto animate-slide-up">
            Template 3 About Page - Immersive storytelling with beautiful animations and creative layouts.
          </p>
        </div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-xl"></div>
      </div>
      
      {/* Story Section */}
      <div className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-up">
              <h2 className="text-5xl font-bold gradient-text mb-8">Our Journey</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Born from a vision to revolutionize the digital landscape, we've grown from a small team 
                of dreamers to a global force of innovation. Our story is one of passion, perseverance, 
                and the relentless pursuit of excellence.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Every line of code we write, every design we craft, and every solution we build is 
                infused with our commitment to creating extraordinary experiences that empower our users 
                to achieve the impossible.
              </p>
              
              {/* Milestones */}
              <div className="space-y-6">
                {[
                  { year: '2020', title: 'Founded', desc: 'Started with a big dream' },
                  { year: '2021', title: 'First Product', desc: 'Launched our MVP' },
                  { year: '2022', title: 'Growth', desc: 'Reached 1M users' },
                  { year: '2023', title: 'Innovation', desc: 'AI-powered features' },
                  { year: '2024', title: 'Global', desc: 'Worldwide expansion' }
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                      {milestone.year.slice(-2)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-effect rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-2xl"></div>
                <div className="relative">
                  <h3 className="text-3xl font-bold gradient-text mb-6">Our Impact</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { value: '50M+', label: 'Users Worldwide' },
                      { value: '99.9%', label: 'Uptime' },
                      { value: '200+', label: 'Team Members' },
                      { value: '50+', label: 'Countries' }
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                        <div className="text-gray-600 text-sm">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold gradient-text mb-6">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Innovation', 
                desc: 'Pushing boundaries and exploring new frontiers', 
                gradient: 'from-blue-400 to-purple-500',
                icon: '🚀'
              },
              { 
                title: 'Excellence', 
                desc: 'Delivering quality in everything we create', 
                gradient: 'from-green-400 to-blue-500',
                icon: '⭐'
              },
              { 
                title: 'Integrity', 
                desc: 'Building trust through transparency', 
                gradient: 'from-purple-400 to-pink-500',
                icon: '🤝'
              },
              { 
                title: 'Impact', 
                desc: 'Creating meaningful change in the world', 
                gradient: 'from-orange-400 to-red-500',
                icon: '🌍'
              }
            ].map((value, index) => (
              <div key={index} className="group">
                <div className="glass-effect rounded-3xl p-8 text-center hover:shadow-2xl transition-all duration-500 transform group-hover:scale-105 group-hover:-rotate-2">
                  <div className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-primary/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold gradient-text mb-6">Meet Our Visionaries</h2>
            <p className="text-xl text-gray-600">The brilliant minds shaping the future</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                name: 'Alex Rivera', 
                role: 'CEO & Founder', 
                gradient: 'from-primary to-secondary',
                desc: 'Visionary leader with 15+ years in tech innovation'
              },
              { 
                name: 'Sam Chen', 
                role: 'CTO', 
                gradient: 'from-secondary to-primary',
                desc: 'Technical genius architecting our future'
              },
              { 
                name: 'Jordan Taylor', 
                role: 'Head of Design', 
                gradient: 'from-purple-400 to-pink-500',
                desc: 'Creative mastermind crafting beautiful experiences'
              }
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div className={`w-48 h-48 bg-gradient-to-br ${member.gradient} rounded-3xl mx-auto mb-4 group-hover:scale-105 transition-transform duration-500 relative overflow-hidden`}>
                    <div className="absolute inset-4 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/30 rounded-xl"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-5xl font-bold gradient-text mb-8">Join Our Journey</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Be part of something extraordinary. Together, we're building the future of digital innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-primary to-secondary text-white px-12 py-6 rounded-full text-lg font-medium hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Join Our Team
            </button>
            <button className="glass-effect text-gray-700 px-12 py-6 rounded-full text-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
