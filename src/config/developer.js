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
    if (!res.ok) return { ...FALLBACK, repos: [] };
    const gh = await res.json();

    /* Fetch top public repos by stars — auto-syndication */
    let repos = [];
    try {
      const reposRes = await fetch(
        'https://api.github.com/users/divyakush2006/repos?sort=updated&per_page=6&type=owner',
        { next: { revalidate: 3600 } }
      );
      if (reposRes.ok) {
        const allRepos = await reposRes.json();

        /* Repos to hide from the developer page */
        const HIDDEN_REPOS = ['gai'];

        repos = allRepos
          .filter((r) => !r.fork && !r.private)
          .filter((r) => !HIDDEN_REPOS.some(
            (h) => r.name.toLowerCase() === h.toLowerCase()
          ))
          .slice(3) /* skip first 3 projects */
          .slice(0, 6)
          .map((r) => ({
            name: r.name,
            description: r.description,
            language: r.language,
            stars: r.stargazers_count,
            url: r.html_url,
            updatedAt: r.updated_at,
          }));
      }
    } catch {
      /* repos fetch is best-effort */
    }

    return {
      ...FALLBACK,
      bio: gh.bio || FALLBACK.bio,
      location: gh.location || FALLBACK.location,
      company: gh.company,
      github: gh.html_url,
      avatar: gh.avatar_url,
      followers: gh.followers,
      following: gh.following,
      publicRepos: gh.public_repos,
      blog: gh.blog || null,
      repos,
    };
  } catch {
    return { ...FALLBACK, repos: [] };
  }
}
