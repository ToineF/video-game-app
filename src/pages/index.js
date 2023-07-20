import { useQuery } from "@tanstack/react-query";
import { fetchGames } from "@/assets/hooks/useFetch";
import Accordion from "@/components/UI/Accordion";
import RandomButton from "@/components/UI/RandomButton";
import { useState, useEffect } from "react";

export default function Home() {
  const { data, status, isRefetching, refetch } = useQuery(
    ["games"],
    fetchGames
  );

  useEffect(() => {
    window.addEventListener("addTag", refetch);
    return () => {
      window.removeEventListener("addTag", refetch);
    };
  }, []);
  useEffect(() => {
    window.addEventListener("removeTag", refetch);
    return () => {
      window.removeEventListener("removeTag", refetch);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24">
      <div className="text-4xl font-bold">Want a Random Game?</div>
     <div  className="flex flex-col p-8 gap-2">
      <div>
          {status === "loading" || isRefetching ? <p>Fetching data...</p> : ""}
          {status === "error" ? <p>Error...</p> : ""}
          {status === "success" && !isRefetching
            ? "from " + JSON.stringify(data.count) + " games"
            : ""}
        </div>
        <RandomButton size="text-3xl p-2"/>
      </div>
      <Accordion />
    </main>
  );
}
