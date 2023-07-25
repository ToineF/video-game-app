export default async function handler(req, res) {
  try {
    //console.log(req.query);
    const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
    const slug = req.query.id;
    const RawgURL = `https://api.rawg.io/api/games/${slug}?key=${API_KEY}`;
    //console.log(RawgURL);
    const result = await fetch(RawgURL);
    const data = await result.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
