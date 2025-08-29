import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Clock, Wifi, WifiOff } from 'lucide-react';

interface StatusEvent {
  title: string;
  description: string;
  pubDate: string;
  link: string;
  guid: string;
}

interface StatusFeedProps {
  maxEvents?: number;
}

export const StatusFeed: React.FC<StatusFeedProps> = ({ maxEvents = 5 }) => {
  const [events, setEvents] = useState<StatusEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const parseRSSFeed = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try multiple CORS proxies as fallbacks
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
            timeout: 10000 // 10 second timeout
          });
          
          if (response.ok) {
            break; // Success, exit the loop
          }
        } catch (err) {
          lastError = err;
          console.warn(`Proxy ${proxyUrl} failed:`, err);
          continue; // Try next proxy
        }
      }
      
      if (!response || !response.ok) {
        throw lastError || new Error(`All proxy services failed. Status: ${response?.status || 'Network Error'}`);
      }

      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      // Check for parsing errors
      const parserError = xmlDoc.querySelector('parsererror');
      if (parserError) {
        throw new Error('Failed to parse RSS feed');
      }

      const items = xmlDoc.querySelectorAll('item');
      const parsedEvents: StatusEvent[] = [];

      items.forEach((item, index) => {
        if (index < maxEvents) {
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

      setEvents(parsedEvents);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching RSS feed:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch status updates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    parseRSSFeed();
    
    // Refresh every 5 minutes
    const interval = setInterval(parseRSSFeed, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [maxEvents]);

  const getStatusIcon = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('operational') || lowerTitle.includes('resolved')) {
      return <CheckCircle className="text-green-400" size={16} />;
    } else if (lowerTitle.includes('degraded') || lowerTitle.includes('investigating')) {
      return <AlertCircle className="text-yellow-400" size={16} />;
    } else if (lowerTitle.includes('outage') || lowerTitle.includes('down')) {
      return <WifiOff className="text-red-400" size={16} />;
    }
    return <Wifi className="text-cyan-400" size={16} />;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return 'Unknown time';
    }
  };

  const getStatusColor = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('operational') || lowerTitle.includes('resolved')) {
      return 'border-green-400/30 bg-green-400/5';
    } else if (lowerTitle.includes('degraded') || lowerTitle.includes('investigating')) {
      return 'border-yellow-400/30 bg-yellow-400/5';
    } else if (lowerTitle.includes('outage') || lowerTitle.includes('down')) {
      return 'border-red-400/30 bg-red-400/5';
    }
    return 'border-cyan-400/30 bg-cyan-400/5';
  };

  if (loading) {
    return (
      <div className="w-full max-w-md">
        <div className="tech-card">
          <div className="tech-card-header">
            <span className="text-cyan-400 font-mono text-sm">// LOADING_STATUS</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="animate-spin w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full"></div>
            <span className="text-gray-300 font-mono text-sm">Fetching status updates...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-md">
        <div className="tech-card border-red-400/30">
          <div className="tech-card-header">
            <span className="text-red-400 font-mono text-sm">// ERROR_STATUS</span>
          </div>
          <div className="flex items-center space-x-3 mb-4">
            <AlertCircle className="text-red-400" size={16} />
            <span className="text-red-400 font-mono text-sm">Connection Failed</span>
          </div>
          <p className="text-gray-400 text-xs mb-3">{error}</p>
          <button
            onClick={parseRSSFeed}
            className="px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30 hover:border-red-400 rounded font-mono text-xs transition-all duration-300"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="tech-card">
        <div className="tech-card-header">
          <span className="text-green-400 font-mono text-sm">// SYSTEM_STATUS</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-mono text-lg">
            <span className="text-cyan-400">{'>'}</span> STATUS_FEED
          </h3>
          <div className="flex items-center space-x-2">
            <div className="status-dot bg-green-400"></div>
            <span className="text-green-400 font-mono text-xs">LIVE</span>
          </div>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {events.length === 0 ? (
            <div className="text-center py-4">
              <Clock className="text-gray-500 mx-auto mb-2" size={24} />
              <p className="text-gray-500 font-mono text-sm">No recent events</p>
            </div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={event.guid}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`p-3 rounded border ${getStatusColor(event.title)} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    {getStatusIcon(event.title)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-mono text-sm font-medium mb-1 truncate">
                      {event.title}
                    </h4>
                    {event.description && (
                      <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                        {event.description.replace(/<[^>]*>/g, '').substring(0, 100)}
                        {event.description.length > 100 ? '...' : ''}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-mono text-xs">
                        {formatDate(event.pubDate)}
                      </span>
                      {event.link && (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 font-mono text-xs transition-colors"
                        >
                          VIEW
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {lastUpdated && (
          <div className="mt-4 pt-3 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 font-mono text-xs">
                Last updated: {formatDate(lastUpdated.toISOString())}
              </span>
              <button
                onClick={parseRSSFeed}
                disabled={loading}
                className="text-cyan-400 hover:text-cyan-300 font-mono text-xs transition-colors disabled:opacity-50"
              >
                REFRESH
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};