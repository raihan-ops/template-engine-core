import { getT } from '../../../i18n/server';

export default async function AboutPage() {
  const t = await getT();

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      bio: "Visionary leader with 15+ years in tech",
      avatar: "👨‍💼"
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      bio: "Full-stack architect and innovation driver",
      avatar: "👩‍💻"
    },
    {
      name: "Michael Rodriguez",
      role: "Lead Designer",
      bio: "Creative mind behind our beautiful interfaces",
      avatar: "👨‍🎨"
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible",
      icon: "🚀"
    },
    {
      title: "Quality",
      description: "Excellence in every line of code and pixel",
      icon: "⭐"
    },
    {
      title: "Collaboration",
      description: "Working together to achieve extraordinary results",
      icon: "🤝"
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">
            About {{SITENAME}}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We are a passionate team of developers, designers, and innovators committed to 
            creating exceptional digital experiences that drive business growth.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
              <p>
                Founded in 2020, {{SITENAME}} began as a vision to bridge the gap between 
                cutting-edge technology and practical business solutions. We recognized that 
                many companies struggled to keep up with the rapidly evolving digital landscape.
              </p>
              <p>
                Today, we specialize in Next.js applications, modern web development, and 
                creating scalable solutions that grow with your business. Our expertise spans 
                from simple websites to complex enterprise applications.
              </p>
              <p>
                With a focus on performance, user experience, and maintainable code, we've 
                helped dozens of companies transform their digital presence and achieve 
                their business goals.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold mb-2">Innovation First</h3>
              <p className="text-blue-100">Building the future, one project at a time</p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's discuss how we can help transform your digital presence.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Get in Touch
          </button>
        </div>
      </div>
    </main>
  );
}
