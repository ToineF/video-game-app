import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UseFetchRandomGame } from "@/assets/hooks/useFetch";
import { RandomInt } from "@/assets/libs/UtilityFunctions";

export default function RandomButton({ text = "Random Game" }) {
  const [gamesData, setGamesData] = useState(null);
  const [pageData, setPageData] = useState(null);

  async function pageFetchData() {
    const gamesNumber = gamesData.count;
    const gamePerPage = gamesData.results.length;
    const randomURL = RandomInt(1, Math.ceil(gamesNumber / gamePerPage) + 1);

    const page_res = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&page=${randomURL}`
    );
    setPageData(await page_res.json());
  }

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const games_res = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
      );
      const games_data = await games_res.json();
      setGamesData(games_data);
    }
    if (gamesData === null) fetchData();
    else pageFetchData();
  }, [gamesData]);

  return (
    <button
      className="bg-gray-500 p-2 rounded text-gray-200 hover:bg-gray-600"
      onClick={(event) => {
        {
          if (pageData === null || undefined) {
            event.preventDefault();
            return;
          }

          const gameInPage = pageData.results.length;
          const randomGame = RandomInt(0, gameInPage);
          const randomGameURL = pageData.results[randomGame].id;

          if (gamesData === null) return;
          pageFetchData();

          router.push(`/games/${randomGameURL}`);
        }
      }}
    >
      {text}
    </button>
  );
}
