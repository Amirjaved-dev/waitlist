'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Brain, 
  Users, 
  TrendingUp, 
  Activity, 
  Database, 
  Download, 
  RefreshCw, 
  LogOut,
  Mail,
  Calendar,
  Clock,
  Globe,
  Zap,
  Shield,
  Settings,
  Eye,
  Trash2,
  Edit,
  Filter,
  Search,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  Wifi,
  AlertCircle,
  CheckCircle,
  XCircle,
  MapPin,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import { format } from 'date-fns';

interface DashboardStats {
  total: number;
  today: number;
  thisWeek: number;
  growthRate: number;
  conversionRate: number;
  avgDaily: number;
}

interface WaitlistEntry {
  id: string;
  name?: string;
  email: string;
  created_at: string;
  status: string;
  source?: string;
  ip_address?: string;
  user_agent?: string;
}

interface ChartData {
  daily: Array<{ date: string; signups: number }>;
  hourly: Array<{ hour: number; signups: number }>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [allEntries, setAllEntries] = useState<WaitlistEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<WaitlistEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState<WaitlistEntry | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      console.log('Fetching admin stats...');
      const [statsResponse, entriesResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/waitlist')
      ]);
      
      if (!statsResponse.ok || !entriesResponse.ok) {
        if (statsResponse.status === 401 || entriesResponse.status === 401) {
          router.push('/admin');
          return;
        }
      }
      
      const statsResult = await statsResponse.json();
      const entriesResult = await entriesResponse.json();
      
      console.log('Stats result:', statsResult);
      console.log('Entries result:', entriesResult);
      
      setStats(statsResult.data);
      setAllEntries(entriesResult.data || []);
      setFilteredEntries(entriesResult.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  // Filter entries based on search and status
  useEffect(() => {
    let filtered = allEntries;
    
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (entry.name && entry.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(entry => entry.status === statusFilter);
    }
    
    setFilteredEntries(filtered);
  }, [allEntries, searchTerm, statusFilter]);

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/admin');
  };

  const exportData = async () => {
    try {
      const csvContent = [
        ['Name', 'Email', 'Signup Date', 'Status', 'Source', 'IP Address'],
        ...allEntries.map((entry: WaitlistEntry) => [
          entry.name || 'Anonymous',
          entry.email,
          format(new Date(entry.created_at), 'yyyy-MM-dd HH:mm:ss'),
          entry.status,
          entry.source || 'unknown',
          entry.ip_address || 'unknown'
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sellmymind-waitlist-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  const getDeviceIcon = (userAgent: string) => {
    if (!userAgent) return <Monitor className="w-4 h-4" />;
    if (userAgent.includes('Mobile')) return <Smartphone className="w-4 h-4" />;
    if (userAgent.includes('Tablet')) return <Tablet className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'contacted': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'converted': return <Target className="w-4 h-4 text-blue-400" />;
      default: return <XCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="w-12 h-12 neon-cyan" />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="matrix-rain" />
        <div className="scanline" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-neon-purple/10 rounded-full blur-3xl pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl pulse-slow"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-neon-purple/30 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Brain className="w-8 h-8 neon-pink" />
              </motion.div>
              <div>
                <h1 className="text-xl font-black neon-text neon-cyan">
                  NEURAL COMMAND CENTER
                </h1>
                <p className="text-xs text-gray-500 font-mono">
                  SellMyMind Administrative Interface v2.0
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Wifi className="w-4 h-4 neon-green" />
                <span>ONLINE</span>
              </div>
              <button
                onClick={fetchData}
                className="p-2 hover:bg-neon-purple/20 rounded-lg transition-colors"
                title="Refresh Data"
              >
                <RefreshCw className="w-5 h-5 neon-cyan" />
              </button>
              <button
                onClick={exportData}
                className="p-2 hover:bg-neon-purple/20 rounded-lg transition-colors"
                title="Export Data"
              >
                <Download className="w-5 h-5 neon-green" />
              </button>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="relative z-10 border-b border-neon-purple/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
              { id: 'analytics', label: 'Analytics', icon: <LineChart className="w-4 h-4" /> },
              { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-neon-cyan text-neon-cyan'
                    : 'border-transparent text-gray-400 hover:text-neon-purple'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: 'TOTAL CONSCIOUSNESS',
                    value: stats?.stats?.total || 0,
                    icon: <Users className="w-6 h-6" />,
                    color: 'neon-cyan',
                    change: `+${stats?.stats?.thisWeek || 0} this week`,
                    trend: '+12%'
                  },
                  {
                    title: 'TODAY\'S UPLOADS',
                    value: stats?.stats?.today || 0,
                    icon: <Activity className="w-6 h-6" />,
                    color: 'neon-pink',
                    change: `${stats?.stats?.avgDaily || 0} avg daily`,
                    trend: '+8%'
                  },
                  {
                    title: 'GROWTH RATE',
                    value: `${stats?.stats?.growthRate || 0}%`,
                    icon: <TrendingUp className="w-6 h-6" />,
                    color: 'neon-green',
                    change: 'vs last period',
                    trend: '+25%'
                  },
                  {
                    title: 'NEURAL EFFICIENCY',
                    value: `${stats?.stats?.conversionRate || 0}%`,
                    icon: <Zap className="w-6 h-6" />,
                    color: 'neon-purple',
                    change: 'conversion rate',
                    trend: '+5%'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hologram p-6 rounded-2xl neural-pulse relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-${stat.color}/20 border border-${stat.color}/30`}>
                        <div className={stat.color}>{stat.icon}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${stat.color} neon-text`}>
                          {stat.value}
                        </div>
                        <div className="text-xs text-green-400 font-mono">
                          {stat.trend}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm font-mono text-gray-400 mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                    <div className="data-bar mt-3" />
                  </motion.div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Daily Signups Chart */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="hologram p-6 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black neon-text neon-cyan">
                      NEURAL ACQUISITION PATTERN
                    </h3>
                    <PieChart className="w-5 h-5 neon-cyan" />
                  </div>
                  <div className="space-y-3">
                    {stats?.chartData?.daily?.map((day: any, index: number) => (
                      <div key={day.date} className="flex items-center gap-4">
                        <div className="text-xs font-mono text-gray-400 w-20">
                          {format(new Date(day.date), 'MMM dd')}
                        </div>
                        <div className="flex-1 bg-black/50 rounded-full h-3 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-neon-pink to-neon-cyan"
                            initial={{ width: 0 }}
                            animate={{ width: `${(day.signups / 25) * 100}%` }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                          />
                        </div>
                        <div className="text-xs font-mono neon-cyan w-8">
                          {day.signups}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* System Status */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="hologram p-6 rounded-2xl"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black neon-text neon-green">
                      SYSTEM STATUS
                    </h3>
                    <Shield className="w-5 h-5 neon-green pulse-slow" />
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Database Connection', status: 'OPTIMAL', color: 'neon-green' },
                      { name: 'API Response Time', status: '< 100ms', color: 'neon-cyan' },
                      { name: 'Neural Network', status: 'ACTIVE', color: 'neon-pink' },
                      { name: 'Data Integrity', status: '100%', color: 'neon-purple' },
                      { name: 'Security Level', status: 'MAXIMUM', color: 'neon-green' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-black/30 rounded-lg"
                      >
                        <span className="text-sm font-mono text-gray-300">{item.name}</span>
                        <span className={`text-sm font-bold ${item.color}`}>{item.status}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Search and Filter Bar */}
              <div className="hologram p-6 rounded-2xl">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search neural entities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-black/70 border border-neon-purple/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan font-mono"
                    />
                  </div>
                  <div className="flex gap-4">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-3 bg-black/70 border border-neon-purple/30 rounded-xl text-white focus:outline-none focus:border-neon-cyan font-mono"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="contacted">Contacted</option>
                      <option value="converted">Converted</option>
                    </select>
                    <button className="px-4 py-3 cyber-button rounded-xl flex items-center gap-2">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-400 font-mono">
                  Showing {filteredEntries.length} of {allEntries.length} neural entities
                </div>
              </div>

              {/* Users Table */}
              <div className="hologram rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-black/50 border-b border-neon-purple/30">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-mono text-gray-400 uppercase tracking-wider">
                          Neural Entity
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-mono text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-mono text-gray-400 uppercase tracking-wider">
                          Upload Time
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-mono text-gray-400 uppercase tracking-wider">
                          Source
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-mono text-gray-400 uppercase tracking-wider">
                          Device
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-mono text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neon-purple/20">
                      {filteredEntries.map((entry, index) => (
                        <motion.tr
                          key={entry.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-black/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-neon-green rounded-full pulse-slow" />
                              <div>
                                <div className="font-mono text-sm neon-cyan">
                                  {entry.name || 'Anonymous Entity'}
                                </div>
                                <div className="text-xs text-gray-400 font-mono">
                                  {entry.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(entry.status)}
                              <span className="text-sm font-mono capitalize">
                                {entry.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-gray-300">
                            {format(new Date(entry.created_at), 'MMM dd, HH:mm')}
                          </td>
                          <td className="px-6 py-4 text-sm font-mono text-gray-300">
                            {entry.source || 'website'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-400">
                              {getDeviceIcon(entry.user_agent || '')}
                              <span className="text-xs">
                                {entry.user_agent?.includes('Mobile') ? 'Mobile' : 'Desktop'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setSelectedEntry(entry);
                                  setShowModal(true);
                                }}
                                className="p-2 hover:bg-neon-cyan/20 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4 neon-cyan" />
                              </button>
                              <button
                                className="p-2 hover:bg-neon-green/20 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4 neon-green" />
                              </button>
                              <button
                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4 text-red-400" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="hologram p-8 rounded-2xl text-center">
                <BarChart3 className="w-16 h-16 neon-purple mx-auto mb-4" />
                <h2 className="text-2xl font-black neon-text neon-purple mb-2">
                  ADVANCED ANALYTICS
                </h2>
                <p className="text-gray-400 font-mono">
                  Deep neural insights coming soon...
                </p>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="hologram p-8 rounded-2xl text-center">
                <Settings className="w-16 h-16 neon-green mx-auto mb-4" />
                <h2 className="text-2xl font-black neon-text neon-green mb-2">
                  NEURAL CONFIGURATION
                </h2>
                <p className="text-gray-400 font-mono">
                  System settings panel coming soon...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* User Details Modal */}
      <AnimatePresence>
        {showModal && selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="hologram p-8 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black neon-text neon-cyan">
                  NEURAL ENTITY DETAILS
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6 text-red-400" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block">
                      ENTITY NAME
                    </label>
                    <div className="p-3 bg-black/30 rounded-lg font-mono neon-cyan">
                      {selectedEntry.name || 'Anonymous Entity'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block">
                      NEURAL ADDRESS
                    </label>
                    <div className="p-3 bg-black/30 rounded-lg font-mono text-gray-300">
                      {selectedEntry.email}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block">
                      UPLOAD TIMESTAMP
                    </label>
                    <div className="p-3 bg-black/30 rounded-lg font-mono text-gray-300">
                      {format(new Date(selectedEntry.created_at), 'PPpp')}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block">
                      ENTITY STATUS
                    </label>
                    <div className="p-3 bg-black/30 rounded-lg flex items-center gap-2">
                      {getStatusIcon(selectedEntry.status)}
                      <span className="font-mono capitalize">{selectedEntry.status}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block">
                      SOURCE PORTAL
                    </label>
                    <div className="p-3 bg-black/30 rounded-lg font-mono text-gray-300">
                      {selectedEntry.source || 'website'}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block">
                      IP LOCATION
                    </label>
                    <div className="p-3 bg-black/30 rounded-lg font-mono text-gray-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {selectedEntry.ip_address || 'Unknown'}
                    </div>
                  </div>
                </div>

                {selectedEntry.user_agent && (
                  <div>
                    <label className="text-sm font-mono text-gray-400 mb-2 block">
                      DEVICE SIGNATURE
                    </label>
                    <div className="p-3 bg-black/30 rounded-lg font-mono text-xs text-gray-400">
                      {selectedEntry.user_agent}
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button className="flex-1 cyber-button py-3 rounded-xl font-bold">
                    UPDATE STATUS
                  </button>
                  <button className="flex-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 py-3 rounded-xl font-bold text-red-400 transition-colors">
                    DELETE ENTITY
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 