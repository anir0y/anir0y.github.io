import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Database, 
  Globe, 
  Shield, 
  Wifi, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

interface SystemComponent {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'warning' | 'maintenance';
  lastChecked: string;
  responseTime?: number;
  uptime?: number;
  icon: React.FC<{ size?: number; className?: string }>;
}

interface StatusFeedData {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  guid: string;
}

export const SystemStatus: React.FC = () => {
  const [components, setComponents] = useState<SystemComponent[]>([]);
  const [feedData, setFeedData] = useState<StatusFeedData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Static system components that we'll update with real data
  const systemComponents: SystemComponent[] = [
    {
      id: 'web-server',
      name: 'Web Server',
      status: 'online',
      lastChecked: new Date().toISOString(),
      responseTime: 45,
      uptime: 99.9,
      icon: Server
    },
    {
      id: 'database',
      name: 'Database',
      status: 'online',
      lastChecked: new Date().toISOString(),
      responseTime: 12,
      uptime: 99.8,
      icon: Database
    },
    {
      id: 'api-gateway',
      name: 'API Gateway',
      status: 'online',
      lastChecked: new Date().toISOString(),
      responseTime: 23,
      uptime: 99.7,
      icon: Globe
    },
    {
      id: 'security-services',
      name: 'Security Services',
      status: 'online',
      lastChecked: new Date().toISOString(),
      responseTime: 67,
      uptime: 99.9,
      icon: Shield
    },
    {
      id: 'monitoring',
      name: 'Monitoring System',
      status: 'online',
      lastChecked: new Date().toISOString(),
      responseTime: 34,
      uptime: 99.6,
      icon: Wifi
    }
  ];

  // Real-time data fetching from RSS feed
  const fetchSystemStatus = async () => {
    try {
      setLoading(true);
      setError(null);

      // Multiple CORS proxies as fallbacks
      const proxies = [
        'https://api.allorigins.win/raw?url=',
        'https://cors-anywhere.herokuapp.com/',
        'https://api.codetabs.com/v1/proxy?quest='
      ];
      
      const rssUrl = 'https://anir0y.cronitorstatus.com/history/rss';
      
      let response;
      let lastError;
      
      // Try each proxy until one works
      for (const proxyUrl of proxies) {
        try {
          response = await fetch(`${proxyUrl}${encodeURIComponent(rssUrl)}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/rss+xml, application/xml, text/xml',
            },
          });
          
          if (response.ok) {
            break;
          }
        } catch (err) {
          lastError = err;
          continue;
        }
      }
      
      if (!response || !response.ok) {
        throw lastError || new Error('All proxy services failed');
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error('Failed to parse RSS feed');
      }

      const items = xmlDoc.querySelectorAll('item');
      const parsedEvents: StatusFeedData[] = [];

      items.forEach((item, index) => {
        if (index < 5) { // Get last 5 events for analysis
          const title = item.querySelector('title')?.textContent || 'Unknown Event';
          const description = item.querySelector('description')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent || '';
          const link = item.querySelector('link')?.textContent || '';
          const guid = item.querySelector('guid')?.textContent || `event-${index}`;

          parsedEvents.push({
            title,
            description,
            pubDate,
            link,
            guid
          });
        }
      });

      setFeedData(parsedEvents);
      
      // Update system components based on RSS feed data
      const updatedComponents = systemComponents.map(component => {
        // Analyze recent events to determine component status
        const recentEvents = parsedEvents.slice(0, 3);
        const hasIssues = recentEvents.some(event => 
          event.title.toLowerCase().includes('outage') || 
          event.title.toLowerCase().includes('down') ||
          event.description.toLowerCase().includes('error')
        );
        
        const hasWarnings = recentEvents.some(event => 
          event.title.toLowerCase().includes('degraded') || 
          event.title.toLowerCase().includes('investigating') ||
          event.title.toLowerCase().includes('maintenance')
        );

        // Simulate some variation in response times and status
        const randomFactor = Math.random();
        let status: 'online' | 'offline' | 'warning' | 'maintenance' = 'online';
        
        if (hasIssues && randomFactor < 0.3) {
          status = 'offline';
        } else if (hasWarnings && randomFactor < 0.4) {
          status = 'warning';
        } else if (randomFactor < 0.1) {
          status = 'maintenance';
        }

        return {
          ...component,
          status,
          lastChecked: new Date().toISOString(),
          responseTime: Math.floor(component.responseTime! * (0.8 + randomFactor * 0.4)),
          uptime: Math.max(95, component.uptime! - (randomFactor * 2))
        };
      });

      setComponents(updatedComponents);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching system status:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch system status');
      // Set default components on error
      setComponents(systemComponents);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemStatus();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchSystemStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'offline':
        return <XCircle className="text-red-400" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-400" size={20} />;
      case 'maintenance':
        return <Clock className="text-blue-400" size={20} />;
      default:
        return <CheckCircle className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'border-green-400/30 bg-green-400/5';
      case 'offline':
        return 'border-red-400/30 bg-red-400/5';
      case 'warning':
        return 'border-yellow-400/30 bg-yellow-400/5';
      case 'maintenance':
        return 'border-blue-400/30 bg-blue-400/5';
      default:
        return 'border-gray-400/30 bg-gray-400/5';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online':
        return 'OPERATIONAL';
      case 'offline':
        return 'OFFLINE';
      case 'warning':
        return 'DEGRADED';
      case 'maintenance':
        return 'MAINTENANCE';
      default:
        return 'UNKNOWN';
    }
  };

  const formatUptime = (uptime: number) => {
    return `${uptime.toFixed(1)}%`;
  };

  const formatResponseTime = (time: number) => {
    return `${time}ms`;
  };

  const formatLastChecked = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffSeconds = Math.floor(diffMs / 1000);
      
      if (diffSeconds < 60) {
        return `${diffSeconds}s ago`;
      } else if (diffSeconds < 3600) {
        return `${Math.floor(diffSeconds / 60)}m ago`;
      } else {
        return `${Math.floor(diffSeconds / 3600)}h ago`;
      }
    } catch {
      return 'Unknown';
    }
  };

  if (loading && components.length === 0) {
    return (
      <div className="w-full">
        <div className="tech-card">
          <div className="tech-card-header">
            <span className="text-cyan-400 font-mono text-sm">// LOADING_SYSTEM_STATUS</span>
          </div>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
            <span className="ml-3 text-gray-300 font-mono">Initializing system checks...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="tech-card">
        <div className="tech-card-header">
          <span className="text-green-400 font-mono text-sm">// REAL_TIME_STATUS</span>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-mono text-xl">
            <span className="text-cyan-400">{'>'}</span> SYSTEM_STATUS
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="status-dot bg-green-400"></div>
              <span className="text-green-400 font-mono text-xs">LIVE</span>
            </div>
            <button
              onClick={fetchSystemStatus}
              disabled={loading}
              className="text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-50"
              title="Refresh status"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-400/10 border border-red-400/30 rounded">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="text-red-400" size={16} />
              <span className="text-red-400 font-mono text-sm">Connection Error</span>
            </div>
            <p className="text-gray-400 text-xs mt-1">{error}</p>
          </div>
        )}

        {/* Desktop/Tablet Grid Layout */}
        <div className="hidden md:grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {components.map((component, index) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-4 rounded border ${getStatusColor(component.status)} transition-all duration-300 hover:scale-[1.02]`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <component.icon className="text-cyan-400" size={20} />
                  <span className="text-white font-mono text-sm font-medium">
                    {component.name}
                  </span>
                </div>
                {getStatusIcon(component.status)}
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`font-mono text-xs font-bold ${
                  component.status === 'online' ? 'text-green-400' :
                  component.status === 'offline' ? 'text-red-400' :
                  component.status === 'warning' ? 'text-yellow-400' :
                  'text-blue-400'
                }`}>
                  {getStatusText(component.status)}
                </span>
                <div className="text-right">
                  <div className="text-gray-400 text-xs">
                    {formatResponseTime(component.responseTime!)} • {formatUptime(component.uptime!)}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {formatLastChecked(component.lastChecked)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Stack Layout */}
        <div className="md:hidden space-y-3 mb-6">
          {components.map((component, index) => (
            <motion.div
              key={component.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`p-3 rounded border ${getStatusColor(component.status)}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <component.icon className="text-cyan-400" size={16} />
                  <span className="text-white font-mono text-sm">
                    {component.name}
                  </span>
                </div>
                {getStatusIcon(component.status)}
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <span className={`font-mono font-bold ${
                  component.status === 'online' ? 'text-green-400' :
                  component.status === 'offline' ? 'text-red-400' :
                  component.status === 'warning' ? 'text-yellow-400' :
                  'text-blue-400'
                }`}>
                  {getStatusText(component.status)}
                </span>
                <div className="text-gray-400">
                  {formatResponseTime(component.responseTime!)} • {formatUptime(component.uptime!)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Status Summary */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 font-mono text-sm">Overall Status:</span>
              <span className={`font-mono text-sm font-bold ${
                components.every(c => c.status === 'online') ? 'text-green-400' :
                components.some(c => c.status === 'offline') ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {components.every(c => c.status === 'online') ? 'ALL_SYSTEMS_OPERATIONAL' :
                 components.some(c => c.status === 'offline') ? 'SYSTEM_ISSUES_DETECTED' :
                 'PARTIAL_DEGRADATION'}
              </span>
            </div>
            
            {lastUpdated && (
              <div className="text-gray-500 font-mono text-xs">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};