import { RandomInt } from "../libs/UtilityFunctions";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const RawgURLPreffix = "https://api.rawg.io/api";
const tagLimit = 10000;

const hasTag = () => {
  const tags = getSessionStorageQueryParams();
  if (tags === {}) return false;
  console.log(tags, Object.keys(tags).length > 0);
  return Object.keys(tags).length > 0;
};

const setQueryParams = (url, params = {}) => {
  let queryParamsString = `?key=${API_KEY}`;
  if (params !== {}) {
    const paramKeys = Object.keys(params);
    const paramValues = Object.values(params);
    console.log(params);
    for (let i = 0; i < paramKeys.length; i++) {
      queryParamsString += `&${paramKeys[i]}=${paramValues[i]}`;
    }
    const sessionStorageObject = getSessionStorageQueryParams();
    if (sessionStorageObject !== (null || undefined)) {
      const storageKey = Object.keys(sessionStorageObject)[0];
      const storageValue = Object.values(sessionStorageObject)[0];
      console.log(`&${storageKey}=${storageValue}`);
      if (
        storageValue !== "" &&
        storageValue !== null &&
        storageValue !== undefined
      ) {
        queryParamsString += `&${storageKey}=${storageValue}`;
      }
    }
  }
  //console.log(RawgURLPreffix + url + queryParamsString);
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
      if (tagsString === "") return {};
      const tagsObject = { tags: tagsString };
      return tagsObject;
    }
  }
  return {};
}

export const fetchGeneral =
  (fetchURL, params = {}) =>
  async () => {
    //console.log(params);
    try {
      const url = setQueryParams(fetchURL, params);
      const res = await fetch(url);
      const data = res.json();
      return data;
    } catch {
      throw new Error("Invalid URL: " + setQueryParams(fetchURL, params));
    }
  };

export const fetchGames = fetchGeneral("/games");

export const fetchTags = fetchGeneral("/tags", { page: 1 });

export const fetchRandomGamePage = async () => {
  try {
    const res = await fetchGames();
    let pageCount = res.count;
    if (hasTag()) pageCount = Math.min(pageCount, tagLimit);
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
