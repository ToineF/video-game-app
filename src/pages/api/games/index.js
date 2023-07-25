export default async function handler(req, res) {
  try {
    //console.log(req.query);
    const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
    const RawgURLPreffix = `https://api.rawg.io/api/games?key=${API_KEY}`;
    const queryKeys = Object.keys(req.query);
    const queryValues = Object.values(req.query);
    let RawgURLSuffix = "";
    for (let i = 0; i < queryKeys.length; i++) {
      RawgURLSuffix += `&${queryKeys[i]}=${queryValues[i]}`;
    }
    const RawgURL = RawgURLPreffix + RawgURLSuffix;
    //console.log(RawgURL);
    const result = await fetch(RawgURL);
    const data = await result.json();
    const { next, previous, ...rest } = data;
    res.status(200).json(rest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
