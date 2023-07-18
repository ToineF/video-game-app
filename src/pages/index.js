import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "@/assets/hooks/useFetch";
import Accordion from "@/components/UI/Accordion";
import RandomButton from "@/components/UI/RandomButton";
import { useEffect } from "react";

export default function Home() {
  const { data, status, isRefetching, refetch } = useQuery(
    ["games"],
    fetchGames
  );
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     window.addEventListener("addTag", () => {
  //       refetch();
  //       console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH");
  //     });
  //     return () =>
  //       window.removeEventListener("storage", () => {
  //         refetch();
  //         console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHH");
  //       });
  //   }
  // }, [refetch]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24">
      <div>
        {status === "loading" || isRefetching ? <p>Fetching data...</p> : ""}
        {status === "error" ? <p>Error...</p> : ""}
        {status === "success" ? JSON.stringify(data.count) + " games" : ""}
      </div>
      <RandomButton />
      <Accordion />
    </main>
  );
}
