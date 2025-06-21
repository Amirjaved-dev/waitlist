'use client';

import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// Icon Components

const BrainIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const CpuChipIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
  </svg>
);

const CurrencyDollarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const AcademicCapIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const GamepadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M16 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const RocketIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

// Animated Background
const AnimatedBackground = () => {
  const [bubbles, setBubbles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    const newBubbles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      delay: Math.random() * 5
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map(bubble => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: bubble.size,
            height: bubble.size,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6 + bubble.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Waitlist Form
const WaitlistForm = ({ size = 'default' }: { size?: 'default' | 'large' }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to join waitlist');
      }

      console.log('Waitlist signup successful:', result);
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
      setName('');
      setTimeout(() => setIsSubmitted(false), 4000);

    } catch (error: unknown) {
      console.error('Waitlist signup error:', error);
      setIsLoading(false);
      alert(error instanceof Error ? error.message : 'Failed to join waitlist. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`text-center p-8 glass rounded-2xl ${size === 'large' ? 'max-w-lg' : 'max-w-md'} mx-auto`}
      >
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Welcome to the Revolution! 🚀</h3>
        <p className="text-gray-300 mb-4">
          You&apos;re now on the waitlist! We&apos;ll notify you as soon as SellMyMind launches.
        </p>
        <p className="text-sm text-gray-400">
          Get ready to turn your mind into money.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${size === 'large' ? 'max-w-lg' : 'max-w-md'} mx-auto`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1 px-4 py-4 rounded-xl border border-gray-600 bg-gray-800/80 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-4 rounded-xl border border-gray-600 bg-gray-800/80 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
          />
        </div>
        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
              Joining the Revolution...
            </div>
          ) : (
            <span className="text-lg">Join the Waitlist 🚀</span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

// Animated Section
const AnimatedSection = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const howItWorksSteps = [
    {
      step: "01",
      title: "Fill a Simple Form",
      description: "Tell us about your expertise and upload your knowledge in minutes.",
      icon: <UserIcon className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "02", 
      title: "Instantly Create Your AI",
      description: "Our AI engine transforms your knowledge into a smart agent automatically.",
      icon: <CpuChipIcon className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "03",
      title: "Share, Sell & Earn",
      description: "Launch your AI agent and start earning from every conversation.",
      icon: <CurrencyDollarIcon className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const targetAudience = [
    {
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: "Teachers",
      description: "Share educational expertise with students worldwide",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <CpuChipIcon className="h-8 w-8" />,
      title: "AI Creators",
      description: "Build and monetize your AI knowledge instantly",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <BrainIcon className="h-8 w-8" />,
      title: "Experts",
      description: "Turn your professional expertise into passive income",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <UserIcon className="h-8 w-8" />,
      title: "Freelancers",
      description: "Scale your consulting with AI-powered assistance",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <GamepadIcon className="h-8 w-8" />,
      title: "Gamers",
      description: "Share gaming strategies and tips with fellow players",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image src="/favicon.svg" alt="SellMyMind Logo" width={32} height={32} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">SellMyMind</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-300 hover:text-purple-400 transition-colors">How It Works</a>
              <a href="#who-its-for" className="text-gray-300 hover:text-purple-400 transition-colors">Who It&apos;s For</a>
              <a href="#earn" className="text-gray-300 hover:text-purple-400 transition-colors">Earn Money</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waitlist
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <AnimatedBackground />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium backdrop-blur-sm"
              >
                <Image src="/favicon.svg" alt="SellMyMind" width={16} height={16} className="mr-2" />
                Turn Your Mind Into Money
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Turn Your Mind
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Into Money
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              >
                Create and sell AI agents trained on your knowledge. 
                <span className="text-purple-400 font-semibold"> No coding needed.</span>
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <WaitlistForm size="large" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/50 to-black">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Three simple steps to transform your expertise into a profitable AI business
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.2}>
                <motion.div
                  className="relative p-8 glass rounded-3xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -10 }}
                >
                  <div className="text-center">
                    <div className={`w-20 h-20 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg`}>
                      {step.icon}
                    </div>
                    <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Who It's For Section */}
      <section id="who-its-for" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Who It&apos;s For
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Perfect for anyone with knowledge to share and monetize
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {targetAudience.map((audience, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className="text-center p-6 glass rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${audience.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-white`}>
                    {audience.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {audience.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {audience.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured AI Agent Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/20 to-black">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Featured AI Agent
              </span>
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <motion.div
              className="glass rounded-3xl border border-cyan-500/30 p-8 text-center"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <RocketIcon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">CryptoAirdropPro</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                &ldquo;An expert AI that tells you how to hunt the best crypto airdrops and maximize your earnings in the DeFi space.&rdquo;
              </p>
              <div className="flex items-center justify-center space-x-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-400">$2,500</div>
                  <div className="text-sm text-gray-400">Monthly Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">1,200+</div>
                  <div className="text-sm text-gray-400">Conversations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">4.9/5</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>
              <motion.button
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See More Agents (Coming Soon)
              </motion.button>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* Earn From Your AI Section */}
      <section id="earn" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Earn From Your AI
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                You earn every time someone chats with your AI. It&apos;s that simple.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg text-gray-300">No app to build</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg text-gray-300">No content to edit</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg text-gray-300">No coding required</span>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="glass rounded-3xl p-8 border border-green-500/20">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Earnings Dashboard</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-500/10 rounded-xl">
                    <span className="text-gray-300">Today</span>
                    <span className="text-2xl font-bold text-green-400">$127</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-blue-500/10 rounded-xl">
                    <span className="text-gray-300">This Week</span>
                    <span className="text-2xl font-bold text-blue-400">$890</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-purple-500/10 rounded-xl">
                    <span className="text-gray-300">This Month</span>
                    <span className="text-2xl font-bold text-purple-400">$3,420</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                    <span className="text-gray-300 font-medium">Total Earned</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">$12,750</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Join The Revolution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-purple-900/30 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Join The Revolution
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              Limited early access • Become a founding creator
            </p>
            <p className="text-lg text-gray-400 mb-12">
              Be among the first to turn your expertise into a profitable AI business
            </p>
            <div className="max-w-2xl mx-auto">
              <WaitlistForm size="large" />
            </div>
            <p className="text-sm text-gray-500 mt-6">
              🔥 Only 1,000 founding creator spots available
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image src="/favicon.svg" alt="SellMyMind Logo" width={32} height={32} />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">SellMyMind</span>
            </div>
            
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">About</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Terms</a>
            </div>
            
            <div className="text-gray-500 text-sm text-center md:text-right">
              Built in Pakistan 🇵🇰<br />
              SellMyMind © 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}