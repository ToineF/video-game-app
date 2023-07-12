import RandomButton from "@/components/UI/RandomButton";
import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "@/assets/hooks/useFetch";
import Accordion from "@/components/UI/Accordion";

export default function Home() {
  const { status, data } = useQuery({
    queryKey: ["games"],
    queryFn: fetchGames,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24">
      <div>
        {status === "loading" ? <p>Fetching data...</p> : ""}

        {status === "error" ? <p>Error ...</p> : ""}
        {status === "success" ? JSON.stringify(data.count) + " games" : ""}
      </div>
      {/* <RandomButton />
      <Accordion /> */}
    </main>
  );
}
