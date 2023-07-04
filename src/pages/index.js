import { useFetch } from "@hyper-fetch/react";
import { getGames } from "@/assets/libs/httpClient";
import RandomButton from "@/components/UI/RandomButton";

export default function Home() {
  const { data, loading, error } = useFetch(getGames);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24">
      <p>
        {data !== null
          ? !loading
            ? JSON.stringify(data.count) + " games"
            : "loading"
          : ""}{" "}
      </p>
      <RandomButton />
    </main>
  );
}
