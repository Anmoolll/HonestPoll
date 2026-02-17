import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import { 
  FaPoll, 
  FaVoteYea, 
  FaBookmark, 
  FaChartBar, 
  FaShareAlt, 
  FaShieldAlt,
  FaUsers,
  FaRocket,
  FaArrowRight,
  FaCheckCircle
} from 'react-icons/fa';

function Home() {
  const navigator = useNavigate();
  const { user } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <FaPoll className="text-4xl" />,
      title: "Create Polls Instantly",
      description: "Create custom polls on any topic with unlimited options. Share them instantly with a single click.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaVoteYea className="text-4xl" />,
      title: "Vote Anonymously",
      description: "Anyone with the link can vote - no login required! Fair voting with built-in anti-abuse protection.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <FaChartBar className="text-4xl" />,
      title: "Real-Time Results",
      description: "Watch results update live as votes come in. Beautiful charts and visualizations show instant feedback.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <FaShareAlt className="text-4xl" />,
      title: "Shareable Links",
      description: "Get a shareable link instantly after creating your poll. Share via email, social media, or messaging.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <FaShieldAlt className="text-4xl" />,
      title: "Fair & Secure",
      description: "Advanced anti-abuse mechanisms ensure one vote per person. IP-based protection prevents manipulation.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: <FaBookmark className="text-4xl" />,
      title: "Bookmark & Track",
      description: "Save your favorite polls for later. Track your participation history and stay updated.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const benefits = [
    "No login required to vote",
    "Real-time live updates",
    "Unlimited poll options",
    "Shareable links",
    "Anti-abuse protection",
    "Beautiful visualizations"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-4 md:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 animate-pulse"></div>
        <div className={`max-w-6xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-6">
            <span className="badge badge-primary badge-lg px-4 py-2 text-sm font-semibold">
              <FaRocket className="mr-2" /> Trusted Polling Platform
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-gradient">
            Welcome to <span className="text-white">HonestPoll</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Create, share, and participate in polls with <span className="font-semibold text-primary">real-time results</span>
          </p>
          
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            The most honest and fair way to gather opinions. No sign-up required to vote. 
            Shareable links. Live updates. Beautiful charts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            {user.username ? (
              <>
                <button
                  className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => navigator("/create")}
                >
                  Create a Poll <FaArrowRight className="ml-2" />
                </button>
                <button
                  className="btn btn-outline btn-lg px-8 py-4 text-lg font-semibold border-2 hover:bg-base-100 transform hover:scale-105 transition-all duration-300"
                  onClick={() => navigator("/poll")}
                >
                  Browse Polls
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-primary btn-lg px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => navigator("/register")}
                >
                  Get Started Free <FaArrowRight className="ml-2" />
                </button>
                <button
                  className="btn btn-outline btn-lg px-8 py-4 text-lg font-semibold border-2 hover:bg-base-100 transform hover:scale-105 transition-all duration-300"
                  onClick={() => navigator("/poll")}
                >
                  Browse Polls
                </button>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-base-100/50 backdrop-blur-sm p-6 rounded-xl border border-base-300 hover:border-primary transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-gray-400 mt-1">Free to Use</div>
            </div>
            <div className="bg-base-100/50 backdrop-blur-sm p-6 rounded-xl border border-base-300 hover:border-secondary transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-secondary">0</div>
              <div className="text-sm text-gray-400 mt-1">Login Required</div>
            </div>
            <div className="bg-base-100/50 backdrop-blur-sm p-6 rounded-xl border border-base-300 hover:border-accent transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-accent">∞</div>
              <div className="text-sm text-gray-400 mt-1">Poll Options</div>
            </div>
            <div className="bg-base-100/50 backdrop-blur-sm p-6 rounded-xl border border-base-300 hover:border-primary transition-all duration-300 hover:scale-105">
              <div className="text-3xl font-bold text-primary">
                <FaUsers />
              </div>
              <div className="text-sm text-gray-400 mt-1">Real-Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features for <span className="text-primary">Honest Polling</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to create, share, and analyze polls effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-base-300 hover:border-primary/50 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose <span className="text-primary">HonestPoll</span>?
              </h2>
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                We've built the most user-friendly and fair polling platform with features that matter.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <FaCheckCircle className="text-2xl text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-lg text-gray-300 group-hover:text-white transition-colors duration-300">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-base-100 p-8 rounded-2xl shadow-xl border border-base-300">
              <div className="text-center">
                <div className="inline-block p-6 bg-gradient-to-br from-primary to-secondary rounded-full mb-6">
                  <FaChartBar className="text-6xl text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Live Results</h3>
                <p className="text-gray-400 mb-6">
                  Watch your poll results update in real-time as votes come in. Beautiful charts and visualizations make data easy to understand.
                </p>
                <div className="flex justify-center gap-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">100%</div>
                    <div className="text-sm text-gray-400">Accurate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-secondary">0ms</div>
                    <div className="text-sm text-gray-400">Delay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary via-secondary to-accent p-12 rounded-3xl shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Create Your First Poll?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users creating honest, fair polls every day
          </p>
          {user.username ? (
            <button
              className="btn btn-lg bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
              onClick={() => navigator("/create")}
            >
              Create Poll Now <FaArrowRight className="ml-2" />
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="btn btn-lg bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                onClick={() => navigator("/register")}
              >
                Sign Up Free <FaArrowRight className="ml-2" />
              </button>
              <button
                className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-300"
                onClick={() => navigator("/login")}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
