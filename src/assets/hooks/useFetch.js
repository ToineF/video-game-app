import { RandomInt } from "../libs/UtilityFunctions";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const RawgURLPreffix = "https://api.rawg.io/api";
const tagLimit = 10000;

const hasTag = () => {
  const tags = getSessionStorageQueryParams();
  if (tags === {}) return false;
  return Object.keys(tags).length > 0;
};

const setQueryParams = (url, params = {}) => {
  let queryParamsString = `?key=${API_KEY}`;
  if (params !== {}) {
    const paramKeys = Object.keys(params);
    const paramValues = Object.values(params);
    //console.log(params);
    for (let i = 0; i < paramKeys.length; i++) {
      queryParamsString += `&${paramKeys[i]}=${paramValues[i]}`;
    }
    const sessionStorageObject = getSessionStorageQueryParams();
    if (sessionStorageObject !== (null || undefined)) {
      const storageKeys = Object.keys(sessionStorageObject);
      const storageValues = Object.values(sessionStorageObject);
      for (let i = 0; i < storageKeys.length; i++) {
        if (
          storageValues[i] !== "" &&
          storageValues[i] !== null &&
          storageValues[i] !== undefined
        ) {
          //console.log(`&${storageKeys[i]}=${storageValues[i]}`);
          queryParamsString += `&${storageKeys[i]}=${storageValues[i]}`;
        }
      }
    }
  }
  //console.log(RawgURLPreffix + url + queryParamsString);
  return RawgURLPreffix + url + queryParamsString;
};

function getSessionStorageQueryParams() {
  let queryParamsObject = {};
  if (typeof window !== "undefined") {
    // NAME
    const name = sessionStorage.getItem("NameFilter");
    if (name != null && name != undefined) {
      const nameString = JSON.parse(name);
      if (nameString !== "") {
        queryParamsObject.search = nameString;
        queryParamsObject.search_precise = true;
        queryParamsObject.search_exact = true;
      }
    }
    // TAGS
    const tags = sessionStorage.getItem("UsedTags");
    if (tags !== null && tags !== undefined) {
      const tagsArray = JSON.parse(tags);
      const newSlugTags = tagsArray.map((tag) => {
        return String(tag).toLowerCase().replaceAll(" ", "-");
      });
      const tagsString = newSlugTags.join(",");
      if (tagsString !== "") {
        queryParamsObject.tags = tagsString;
      }
    }
  }
  //console.log(queryParamsObject);
  return queryParamsObject;
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

export const fetchGames = fetchGeneral("/games");

export const fetchTags = fetchGeneral("/tags", { page: 1 });

export const fetchRandomGamePage = async () => {
  try {
    const res = await fetchGames();
    console.log(res);
    let gamesTotalCount = res.count;
    if (hasTag()) gamesTotalCount = Math.min(gamesTotalCount, tagLimit);
    const gamePerPage = res.results.length;
    if (gamesTotalCount === 0 && gamePerPage === 0) return "/";
    const randomPageID = RandomInt(
      1,
      Math.ceil(gamesTotalCount / gamePerPage) + 1
    );
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
