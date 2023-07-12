// import { useFetch } from "@hyper-fetch/react";
// import { Client } from "@hyper-fetch/core";

// const client = new Client({ url: "https://api.rawg.io/api" });

// const queryParamsWithApiKey = (queries = {}) => {
//   return { ...queries, key: API_KEY };
// };

// const fetchRessource = (param) => (queries) =>
//   useFetch(
//     client
//       .createRequest()({
//         method: "GET",
//         endpoint: param,
//       })
//       .setQueryParams(queryParamsWithApiKey(queries))
//   );

// export const useFetchGames = fetchRessource("/games");
// export const useFetchGenres = fetchRessource("/genres");
// export const useFetchTags = fetchRessource("/tags");

// export const useFetchGameByID = (id) => fetchRessource(`/games/${id}`)();

// export function UseFetchRandomGame() {
//   console.log("dd");
//   async function fetchRessources() {
//     console.log("hi");
//     const { data: gamesData } = await fetch(
//       "https://api.rawg.io/api/games?key=" + API_KEY
//     );
//     console.log(gamesData);
//     // const gamesNumber = await gamesData.count;
//     // const gamePerPage = gamesData.results.length;
//     // const randomPageURL =
//     //   RandomInt(0, Math.ceil(gamesNumber / gamePerPage)) + 1;
//     // console.log(randomPageURL);
//     // const { data: pageData } = fetch(randomPageURL);
//     // const gameInPage = pageData.results.length;
//     // const randomGame = RandomInt(0, gameInPage);
//     // const randomGameURL = pageData.results[randomGame].id;
//     //setURL(randomGameURL);
//   }
//   fetchRessources();
// }

import { RandomInt } from "../libs/UtilityFunctions";

const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;
const RawgURLPreffix = "https://api.rawg.io/api";

export const fetchGeneral =
  (fetchURL, params = {}) =>
  async () => {
    const url = setQueryParams(fetchURL, params);
    const res = await fetch(url);
    const data = res.json();
    return data;
  };

const setQueryParams = (url, params = {}) => {
  let queryParamsString = `?key=${API_KEY}`;
  const paramKeys = Object.keys(params);
  const paramValues = Object.values(params);
  for (let i = 0; i < paramKeys.length; i++) {
    queryParamsString += `&${paramKeys[i]}=${paramValues[i]}`;
  }
  return RawgURLPreffix + url + queryParamsString;
};

export const fetchGames = fetchGeneral("/games");

export const fetchRandomGamePage = async () => {
  const res = await fetchGames();
  const pageCount = res.count;
  const gamePerPage = res.results.length;
  const randomPageID = RandomInt(0, Math.ceil(pageCount / gamePerPage));
  const pageData = await fetchGeneral("/games", { page: randomPageID })();
  const gameCount = pageData.results.length;
  const randomGameID = RandomInt(0, gameCount - 1);
  const gameID = pageData.results[randomGameID].id;
  const gameURL = `/games/${gameID}`;

  return gameURL;
};
