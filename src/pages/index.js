import { useFetch } from "@hyper-fetch/react";
import { getGames } from "@/assets/libs/httpClient";

export default function Home() {
  const { data, loading, error } = useFetch(getGames);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {data !== null ? (!loading ? JSON.stringify(data.count) : "loading") : ""}{" "}
      games
      {console.log(data)}
    </main>
  );
}
