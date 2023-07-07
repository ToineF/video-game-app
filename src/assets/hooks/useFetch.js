import { useFetch } from "@hyper-fetch/react";
import { Client } from "@hyper-fetch/core";

const client = new Client({ url: "https://api.rawg.io/api" });
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const queryParamsWithApiKey = (queries = {}) => {
  return { ...queries, key: API_KEY };
};

const fetchRessource = (param) => (queries) =>
  useFetch(
    client
      .createRequest()({
        method: "GET",
        endpoint: param,
      })
      .setQueryParams(queryParamsWithApiKey(queries))
  );

export const useFetchGames = fetchRessource("/games");
export const useFetchGenres = fetchRessource("/genres");
export const useFetchTags = fetchRessource("/tags");

export const useFetchGameByID = (id) => fetchRessource(`/games/${id}`)();

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
