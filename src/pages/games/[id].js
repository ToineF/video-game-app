import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getDateFormat } from "@/assets/libs/UtilityFunctions";
import { fetchGeneral } from "@/assets/hooks/useFetch";
import { useEffect, useState } from "react";

export default function GameID() {
  const { asPath } = useRouter();

  // FETCH PAGE
  const currentURL = asPath.split("/").slice(-1)[0].replaceAll("%20", " ");
  const URL = "/games/" + currentURL;
  const { data, status, refetch, isRefetching } = useQuery(
    ["gamePage"],
    fetchGeneral(URL)
  );

  useEffect(() => {
    refetch();
  }, [refetch, data, currentURL]);

  // FETCH SCREENSHOTS
  const ScreenshotsURL = URL + "/screenshots";
  const {
    data: screenshotsData,
    status: screenshotsStatus,
    refetch: screenshotsRefetch,
    isRefetching: screenshotsIsRefetching,
  } = useQuery(["gameScreenshots"], fetchGeneral(ScreenshotsURL));

  useEffect(() => {
    screenshotsRefetch();
  }, [screenshotsRefetch, screenshotsData, currentURL]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-8 sm:px-16 px-8 py-24">
      {status === "loading" || data === null || isRefetching ? (
        <p>Fetching data...</p>
      ) : null}

      {status === "error" ? <p>Error...</p> : null}

      {status === "success" &&
      data &&
      data?.detail !== ("Not found." || undefined) ? (
        <div key={data.id} className="flex flex-col sm:flex-row gap-8 w-full">
          <div className="flex flex-col text-center gap-8 gaga">
            <div className="flex flex-col text-lg">
              <div className="font-bold text-3xl">{data.name}</div>
              <div>
                {data.developers !== (null || undefined) &&
                data.developers.length > 0 ? (
                  <p>
                    Developped by
                    <b>
                      {data.developers.map((developer, index) => {
                        let name = " " + developer.name;
                        if (index + 2 < data.developers.length) name += ",";
                        if (index + 2 === data.developers.length)
                          name += " and";
                        return name;
                      })}
                    </b>
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
              {/* {window.innerWidth <= 640 ? (
                <div className="flex justify-center">
                  {data.background_image !== null ? (
                    <Image
                      src={data.background_image}
                      alt="Main Picture of the game"
                      width={500}
                      height={250}
                    ></Image>
                  ) : null}
                </div>
              ) : null} */}
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </div>

          {screenshotsStatus === "error" ? "Screenshots failed to load" : ""}
          {screenshotsStatus === "loading" ||
          screenshotsIsRefetching ||
          screenshotsData === null
            ? "Screenshots loading..."
            : ""}
          {screenshotsStatus === "success" && screenshotsData ? (
            screenshotsData.count > 0 && screenshotsData.results?.length > 0 ? (
              <div className="flex flex-col gap-2 sm:w-1/3">
                {screenshotsData.results.map((screenshot, index) => {
                  return (
                    <Image
                      key={index}
                      src={screenshot.image}
                      alt={`Screenshot ${index} from the game`}
                      width={1000}
                      height={1000}
                    ></Image>
                  );
                })}
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
      ) : null}
    </div>
  );
}
