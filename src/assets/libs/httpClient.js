const API_Key = process.env.NEXT_PUBLIC_RAWG_API_KEY;

import { Client } from "@hyper-fetch/core";

export const client = new Client({
  url: `https://api.rawg.io/api/games?key=${API_Key}`,
});

export const getGames = client.createRequest()({
  endpoint: "",
});

export function getGame(page = 1) {
  return {
    game: new Client({
      url: `https://api.rawg.io/api/games/${page}?key=${API_Key}`,
    }).createRequest()({
      endpoint: "",
    }),
  };
}
