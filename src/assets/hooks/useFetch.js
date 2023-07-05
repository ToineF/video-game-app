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
