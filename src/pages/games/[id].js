import { useRouter } from "next/router";
import Image from "next/image";
import { useFetchGameByID } from "@/assets/hooks/useFetch";
import { getDateFormat } from "@/assets/libs/UtilityFunctions";

export default function GameID() {
  const { asPath } = useRouter();

  const currentURL = asPath.split("/").slice(-1)[0].replaceAll("%20", " ");
  const { data, loading, error } = useFetchGameByID(currentURL);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-8 p-24">
      {loading || data === null ? <p>Fetching data...</p> : null}

      {error ? <p>Error ...</p> : null}

      {data ? (
        <div key={data.id} className="flex flex-col text-center gap-2">
          <div className="font-bold text-lg">{data.name}</div>
          <div>
            {data.developers !== null ? (
              <p>
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
