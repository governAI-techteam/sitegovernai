import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const token = process.env.CALENDLY_API_TOKEN;
    const defaultUrl =
      process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/governai/office-hours';

    const body = await request.json().catch(() => ({}));
    const { name, email } = body;

    // Helper to append prefill params
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

    // If no Personal Access Token is configured, return the standard prefilled URL
    if (!token) {
      return NextResponse.json({
        type: 'standard',
        booking_url: appendPrefill(defaultUrl),
      });
    }

    // If CALENDLY_EVENT_TYPE_URI is provided, generate a single-use scheduling link
    let eventTypeUri = process.env.CALENDLY_EVENT_TYPE_URI;

    // If eventTypeUri is not in env, lookup user's first active event type
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
      // Fallback to standard URL if event type couldn't be resolved
      return NextResponse.json({
        type: 'standard',
        booking_url: appendPrefill(defaultUrl),
      });
    }

    // Call Calendly API to create a 1-time single-use link
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
      const errData = await linkRes.json().catch(() => ({}));
      console.warn('Calendly scheduling_links API failed, using fallback:', errData);
      return NextResponse.json({
        type: 'standard',
        booking_url: appendPrefill(defaultUrl),
      });
    }

    const linkData = await linkRes.json();
    const generatedUrl = linkData.resource?.booking_url;

    return NextResponse.json({
      type: 'single_use',
      booking_url: appendPrefill(generatedUrl || defaultUrl),
    });
  } catch (error) {
    console.error('Calendly link generation error:', error);
    const defaultUrl =
      process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/governai/office-hours';
    return NextResponse.json({
      type: 'standard',
      booking_url: defaultUrl,
    });
  }
}
