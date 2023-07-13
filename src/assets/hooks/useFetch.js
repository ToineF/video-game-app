import { RandomInt } from "../libs/UtilityFunctions";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const RawgURLPreffix = "https://api.rawg.io/api";

const setQueryParams = (url, params = {}) => {
  let queryParamsString = `?key=${API_KEY}`;
  const paramKeys = Object.keys(params);
  const paramValues = Object.values(params);
  console.log(params);
  for (let i = 0; i < paramKeys.length; i++) {
    queryParamsString += `&${paramKeys[i]}=${paramValues[i]}`;
  }
  console.log(RawgURLPreffix + url + queryParamsString);
  return RawgURLPreffix + url + queryParamsString;
};

function getSessionStorageQueryParams() {
  if (typeof window !== "undefined") {
    const tags = sessionStorage.getItem("UsedTags");
    if (tags !== null && tags !== undefined) {
      const tagsArray = JSON.parse(tags);
      const newSlugTags = tagsArray.map((tag) => {
        return String(tag).toLowerCase().replaceAll(" ", "-");
      });
      const tagsString = newSlugTags.join(",");
      const tagsObject = { tags: tagsString };
      return tagsObject;
    }
  }
  return {};
}

export const fetchGeneral =
  (fetchURL, params = {}) =>
  async () => {
    console.log(params);
    try {
      const url = setQueryParams(fetchURL, params);
      const res = await fetch(url);
      const data = res.json();
      return data;
    } catch {
      throw new Error("Invalid URL: " + setQueryParams(fetchURL, params));
    }
  };

export const fetchGames = fetchGeneral(
  "/games",
  getSessionStorageQueryParams()
);

export const fetchTags = fetchGeneral("/tags", { page: 3 });

export const fetchRandomGamePage = async () => {
  try {
    const res = await fetchGames();
    const pageCount = res.count;
    const gamePerPage = res.results.length;
    if (pageCount === 0 && gamePerPage === 0) return "/";
    const randomPageID = RandomInt(0, Math.ceil(pageCount / gamePerPage));
    const pageData = await fetchGeneral("/games", { page: randomPageID })();
    const gameCount = pageData.results.length;
    const randomGameID = RandomInt(0, gameCount - 1);
    const gameID = pageData.results[randomGameID].id;
    const gameURL = `/games/${gameID}`;

    return gameURL;
  } catch {
    throw new Error("Unable to fetch Random URL");
  }
};
