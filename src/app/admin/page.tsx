'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Cpu, Shield, Binary } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if already authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          router.push('/admin/dashboard');
        }
      } catch (error) {
        // Not authenticated, stay on login page
      }
    };
    checkAuth();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Authentication failed');
      }

      // Redirect to dashboard
      router.push('/admin/dashboard');

    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-pink/20 rounded-full blur-3xl pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-purple/20 rounded-full blur-3xl pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Scanline Effect */}
      <div className="scanline" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="mb-6"
            >
              <Shield className="w-16 h-16 mx-auto neon-cyan" />
            </motion.div>
            <h1 className="text-4xl font-black mb-2">
              <span className="neon-text neon-cyan">NEURAL</span>
              <br />
              <span className="neon-text neon-pink">ACCESS</span>
            </h1>
            <p className="text-gray-400 font-mono">
              Administrative consciousness required
            </p>
          </div>

          {/* Login Form */}
          <motion.div
            className="hologram p-8 rounded-2xl neural-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 text-red-300 font-mono text-sm"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mono neon-purple mb-2">
                    NEURAL ID
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-black/70 border-2 border-neon-purple/30 rounded-xl text-neon-cyan placeholder-neon-purple/60 focus:outline-none focus:border-neon-cyan focus:shadow-lg focus:shadow-neon-cyan/20 transition-all duration-300 font-mono"
                    placeholder="Enter admin username"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-mono neon-purple mb-2">
                    ACCESS CODE
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 bg-black/70 border-2 border-neon-purple/30 rounded-xl text-neon-cyan placeholder-neon-purple/60 focus:outline-none focus:border-neon-cyan focus:shadow-lg focus:shadow-neon-cyan/20 transition-all duration-300 font-mono"
                      placeholder="Enter admin password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neon-purple hover:text-neon-cyan transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 cyber-button rounded-xl font-bold text-lg neural-pulse disabled:opacity-50"
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Cpu className="w-5 h-5" />
                    </motion.div>
                    <span>AUTHENTICATING...</span>
                  </div>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Binary className="w-5 h-5" />
                    INITIATE ACCESS
                    <Binary className="w-5 h-5" />
                  </span>
                )}
              </motion.button>
            </form>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 font-mono">
                Default credentials: admin / neural_admin_2025
              </p>
              <p className="text-xs text-gray-600 font-mono mt-1">
                Change in production environment
              </p>
            </div>
          </motion.div>

          {/* Back Link */}
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="/"
              className="text-neon-purple hover:text-neon-cyan transition-colors font-mono text-sm"
            >
              ← Return to neural network
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 