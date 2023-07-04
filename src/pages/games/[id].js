import { useRouter } from "next/router";
import { useFetch } from "@hyper-fetch/react";
import { getGame, getGames } from "@/assets/libs/httpClient";

export default function GameID() {
  const { asPath } = useRouter();

  const currentURL = asPath.split("/").slice(-1)[0].replaceAll("%20", " ");
  const target_page = getGame(currentURL).game;
  const { data, loading, error } = useFetch(target_page);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-8 p-24">
      {data === null || loading ? (
        "Fetching data..."
      ) : (
        <div key={data.id} className="flex flex-col text-center gap-2">
          <div className="font-bold">{data.name}</div>
          <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        </div>
      )}
      {console.log(data)}
    </div>
  );
}
