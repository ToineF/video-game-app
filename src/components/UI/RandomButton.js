import Link from "next/link";
import { useFetch } from "@hyper-fetch/react";
import { getGames } from "@/assets/libs/httpClient";
import { useRouter } from "next/router";

export default function RandomButton({ text = "Random Game" }) {
  const router = useRouter();
  const { data, loading, error } = useFetch(getGames);

  function RandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min));
  }

  return (
    <button
      className="bg-gray-500 p-2 rounded text-gray-200 hover:bg-gray-600"
      onClick={(event) => {
        {
          if (data === null) {
            event.preventDefault();
            return;
          }
          const gamesNumber = data.count;
          const randomURL = RandomInt(0, gamesNumber);
          router.push(`/games/${randomURL}`);
        }
      }}
    >
      {text}
    </button>
  );
}
