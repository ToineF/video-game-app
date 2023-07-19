import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchRandomGamePage } from "@/assets/hooks/useFetch";

export default function RandomButton({ text = "Random Game" }) {
  const router = useRouter();

  const { status, data, refetch, isRefetching } = useQuery(
    ["game"],
    fetchRandomGamePage
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
    <button
      className="flex rounded-md p-3 gap-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-800 dark:hover:bg-blue-700 text-gray-200 font-semibold"
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
