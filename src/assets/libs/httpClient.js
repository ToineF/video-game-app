const API_Key = process.env.NEXT_PUBLIC_RAWG_API_KEY;

import { Client } from "@hyper-fetch/core";

const urlEnd = `?key=${API_Key}`;

export const client = new Client({
  url: `https://api.rawg.io/api/games`,
});

export const getGames = client.createRequest()({
  endpoint: urlEnd,
});

// export function getGame(page = 1) {
//   return {
//     game: client.createRequest()({
//       endpoint: `/${page}${urlEnd}`,
//     }),
//   };
// }

// export function getGamesPage(id = 1) {
//   return {
//     page: client.createRequest()({
//       endpoint: `${urlEnd}&page=${id}`,
//     }),
//   };
// }
