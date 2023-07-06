import RandomButton from "@/components/UI/RandomButton";
import { useFetchGames } from "@/assets/hooks/useFetch";

export default function Home() {
  const { data, loading, error } = useFetchGames();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24">
      <div>
        {console.log(data)}
        {loading ? <p>Fetching data...</p> : null}

        {error ? <p>Error ...</p> : null}
        {data !== null ? JSON.stringify(data.count) + " games" : ""}
      </div>
      <RandomButton />
    </main>
  );
}
