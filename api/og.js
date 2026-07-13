// Serves a random theme OG card. Fronted by /og.png (see vercel.json rewrite).
// Each social scrape gets a different theme; platforms cache their scraped copy,
// so variety shows up across platforms and on re-scrapes.
const CARDS = [
  'og.png',              // skate 90s
  'og-ultramodern.png',
  'og-win98.png',
  'og-seventies.png',
  'og-synth80s.png',
];

export default async function handler(req, res) {
  const pick = CARDS[Math.floor(Math.random() * CARDS.length)];
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];

  try {
    const upstream = await fetch(`${proto}://${host}/assets/${pick}`);
    if (!upstream.ok) throw new Error('upstream ' + upstream.status);
    const buf = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', 'image/png');
    // Don't let the CDN pin one variant — let each scrape re-roll.
    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=0, must-revalidate');
    res.setHeader('X-OG-Card', pick);
    return res.status(200).send(buf);
  } catch (e) {
    // Fallback: redirect to the skate card so a preview always renders.
    res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
    return res.redirect(302, '/assets/og.png');
  }
}
