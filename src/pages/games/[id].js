import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getDateFormat } from "@/assets/libs/UtilityFunctions";
import { fetchGeneral } from "@/assets/hooks/useFetch";
import { useEffect } from "react";

export default function GameID() {
  const { asPath } = useRouter();

  const currentURL = asPath.split("/").slice(-1)[0].replaceAll("%20", " ");
  const URL = "/games/" + currentURL;
  const { data, status, refetch, isRefetching } = useQuery(
    ["gamePage"],
    fetchGeneral(URL)
  );

  useEffect(() => {
    refetch();
  }, [refetch, data, currentURL]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-8 p-24">
      {status === "loading" || data === null || isRefetching ? (
        <p>Fetching data...</p>
      ) : null}

      {status === "error" ? <p>Error...</p> : null}

      {status === "success" &&
      data &&
      data?.detail !== ("Not found." || undefined) ? (
        <div key={data.id} className="flex flex-col text-center gap-2">
          <div className="font-bold text-lg">{data.name}</div>
          <div>
            {data.developers !== (null || undefined) ? (
              <p>
                {" "}
                Developped by
                {data.developers.map((developer, index) => {
                  let name = " " + developer.name;
                  if (index + 1 < data.developers.length) name += ",";
                  return name;
                })}
              </p>
            ) : (
              ""
            )}
          </div>
          <div>
            {data.released !== null ? (
              <p>Released on {getDateFormat(new Date(data.released))}</p>
            ) : (
              ""
            )}
          </div>

          <div className="flex justify-center">
            {data.background_image !== null ? (
              <Image
                src={data.background_image}
                alt="Main Picture of the game"
                width={500}
                height={250}
              ></Image>
            ) : (
              ""
            )}
          </div>
          <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
        </div>
      ) : null}
    </div>
  );
}
