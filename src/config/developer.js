/*
  Developer data — fetched from GitHub API at build time so the site
  always reflects the latest bio, location, and profile links.
  Falls back to static data if the fetch fails.
*/

const FALLBACK = {
  name: 'Divyakush Punjabi',
  jobTitle: 'Full Stack Developer & AI Engineer',
  bio: 'Full Stack Developer and AI Engineer specializing in enterprise web applications, AI/ML integration, and UI/UX engineering.',
  location: 'India',
  company: null,
  github: 'https://github.com/divyakush2006',
  linkedin: 'https://linkedin.com/in/divyakush-punjabi',
  portfolio: 'https://divyakush2006.github.io/divyakush-resume/',
};

export async function getDeveloperData() {
  try {
    const res = await fetch('https://api.github.com/users/divyakush2006', {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK;
    const gh = await res.json();
    return {
      ...FALLBACK,
      bio: gh.bio || FALLBACK.bio,
      location: gh.location || FALLBACK.location,
      company: gh.company,
      github: gh.html_url,
      avatar: gh.avatar_url,
      followers: gh.followers,
      publicRepos: gh.public_repos,
    };
  } catch {
    return FALLBACK;
  }
}
