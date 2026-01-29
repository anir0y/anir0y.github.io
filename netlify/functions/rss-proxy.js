export default async (req, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (req.method === 'OPTIONS') {
    return new Response('', {
      status: 200,
      headers,
    });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const rssUrl = 'https://anir0y.cronitorstatus.com/history/rss';

    console.log('Fetching RSS feed from:', rssUrl);

    const response = await fetch(rssUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StatusFeedBot/1.0)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });

    if (!response.ok) {
      throw new Error(`RSS feed request failed with status: ${response.status}`);
    }

    const xmlText = await response.text();

    return new Response(xmlText, {
      status: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300',
      },
    });

  } catch (error) {
    console.error('RSS proxy error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to fetch RSS feed',
      details: error.message,
    }), {
      status: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });
  }
};
