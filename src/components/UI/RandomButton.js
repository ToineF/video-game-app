import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchRandomGamePage, fetchGames } from "@/assets/hooks/useFetch";

export default function RandomButton({ text = "Random Game" }) {
  const router = useRouter();

  const { status, data, refetch, isRefetching } = useQuery(
    ["game"],
    fetchRandomGamePage
  );

  return (
    <button
      className="bg-gray-500 p-3 rounded text-gray-200 hover:bg-gray-600 flex gap-2"
      onClick={() => {
        if (status !== "success" || isRefetching) return;
        router.push(data);
        refetch();
      }}
    >
      <p>{text}</p>
      {status === "loading" || isRefetching ? (
        <div className="loader"></div>
      ) : (
        ""
      )}
      {status === "error" ? (
        <div className="errorCircle">
          <div className="errorLine"></div>
        </div>
      ) : (
        ""
      )}
    </button>
  );
}
