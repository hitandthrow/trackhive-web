export default async function handler(req, res) {
  const { awb } = req.query;

  if (!awb) return res.status(400).json({ error: 'AWB is required' });

  const body = `csrf_test_name=skip&trackid=${awb}&isawb=Yes`;

  try {
    const response = await fetch('https://old-xpressbees.xbees.in/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:140.0) Gecko/20100101 Firefox/140.0',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': 'https://old-xpressbees.xbees.in',
        'Referer': `https://old-xpressbees.xbees.in/track?isawb=Yes&trackid=${awb}`,
      },
      body,
    });

    const raw = await response.text(); // raw text first
    const outer = JSON.parse(raw); // outer JSON
    const final = JSON.parse(outer.result); // nested result

    res.status(200).json(final);
  } catch (error) {
    res.status(500).json({ error: 'Tracking failed', details: error.message });
  }
}
