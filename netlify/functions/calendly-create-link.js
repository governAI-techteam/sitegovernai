export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const token = process.env.CALENDLY_API_TOKEN;
    const defaultUrl =
      process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/governai/office-hours';

    const body = event.body ? JSON.parse(event.body) : {};
    const { name, email } = body;

    const appendPrefill = (rawUrl) => {
      try {
        const url = new URL(rawUrl);
        if (name) url.searchParams.set('name', name);
        if (email) url.searchParams.set('email', email);
        return url.toString();
      } catch {
        return rawUrl;
      }
    };

    if (!token) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'standard',
          booking_url: appendPrefill(defaultUrl),
        }),
      };
    }

    let eventTypeUri = process.env.CALENDLY_EVENT_TYPE_URI;

    if (!eventTypeUri) {
      const userRes = await fetch('https://api.calendly.com/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        const userUri = userData.resource?.uri;

        if (userUri) {
          const eventsRes = await fetch(
            `https://api.calendly.com/event_types?user=${encodeURIComponent(userUri)}&active=true`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (eventsRes.ok) {
            const eventsData = await eventsRes.json();
            const firstEvent = eventsData.collection?.[0];
            if (firstEvent?.uri) {
              eventTypeUri = firstEvent.uri;
            }
          }
        }
      }
    }

    if (!eventTypeUri) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'standard',
          booking_url: appendPrefill(defaultUrl),
        }),
      };
    }

    const linkRes = await fetch('https://api.calendly.com/scheduling_links', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        max_event_count: 1,
        owner: eventTypeUri,
        owner_type: 'EventType',
      }),
    });

    if (!linkRes.ok) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'standard',
          booking_url: appendPrefill(defaultUrl),
        }),
      };
    }

    const linkData = await linkRes.json();
    const generatedUrl = linkData.resource?.booking_url;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'single_use',
        booking_url: appendPrefill(generatedUrl || defaultUrl),
      }),
    };
  } catch (error) {
    console.error('Netlify calendly-create-link error:', error);
    const defaultUrl =
      process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/governai/office-hours';
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'standard',
        booking_url: defaultUrl,
      }),
    };
  }
};
