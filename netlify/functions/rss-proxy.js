exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
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

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300',
      },
      body: xmlText,
    };

  } catch (error) {
    console.error('RSS proxy error:', error);
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to fetch RSS feed',
        details: error.message,
      }),
    };
  }
};
