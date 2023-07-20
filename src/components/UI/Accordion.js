import { useEffect, useState } from "react";
import { fetchTags } from "@/assets/hooks/useFetch";
import tagsData from "@/assets/libs/tagsData";
import AccordionElements from "./AccordionElements";
import Image from "next/image";
import TagBox from "./TagBox";
import { useQuery } from "@tanstack/react-query";

export default function Accordion() {
  // const { status, data } = useQuery(["tags"], fetchTags);
  const [isHidden, setIsHidden] = useState(true);
  const [unusedTags, setUnusedTags] = useState([
    "Action",
    "Aventure",
    "Puzzle",
    "Golf",
    "Horror",
    "RPG",
  ]);
  const [currentTags, setCurrentTags] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // if (status === "success") {
    //   const results = data?.results;
    //   if (!results) return;
    //   const tagNames = results.map((tag) => {
    //     return tag.name;
    //   });
    const tagNames = tagsData();
    //
    const sessionTags = JSON.parse(sessionStorage.getItem("UsedTags"));
    setCurrentTags(sessionTags ?? []);
    setUnusedTags(
      tagNames.filter((tag) => {
        if (sessionTags !== null && sessionTags !== undefined) {
          for (let i = 0; i < sessionTags.length; i++) {
            if (sessionTags[i] === tag) return false;
          }
        }
        return true;
      })
    );
    //}
  }, []);

  return (
    <>
      {/* {status === "success" &&  */}
      <>
        <div className="flex flex-col">
          <div
            className={
              isHidden
                ? "rounded p-2 text-gray-200 bg-gray-500 dark:bg-gray-700"
                : "rounded p-2 text-gray-200 bg-gray-500 dark:bg-gray-700"
            }
          >
            <div className="flex gap-2 justify-center">
              <p>Choose a tag:</p>
              <button
                onClick={() => {
                  setIsHidden(false);
                }}
              >
                <input
                  type="text"
                  placeholder="Filter by Tag"
                  className="px-2 rounded-sm text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 dark:placeholder:text-gray-500"
                  value={inputValue}
                  onChange={(event) => {
                    setInputValue(event.currentTarget.value);
                  }}
                />
              </button>
              <button
                onClick={() => {
                  setIsHidden(!isHidden);
                }}
              >
                <Image
                  src="/../public/arrowUp.png"
                  alt="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-512.png"
                  height={25}
                  width={25}
                  className={isHidden ? "rotate-180" : ""}
                ></Image>
              </button>
            </div>
          </div>
          {!isHidden ? (
            <div className="flex flex-col overflow-y-auto max-h-64">
              {unusedTags
                .sort((a, b) => a > b)
                .filter((tag) => {
                  return tag.toLowerCase().includes(inputValue.toLowerCase());
                })
                .map((tag) => {
                  return (
                    <AccordionElements
                      setIsHidden={setIsHidden}
                      currentTags={currentTags}
                      setCurrentTags={setCurrentTags}
                      unusedTags={unusedTags}
                      setUnusedTags={setUnusedTags}
                      value={tag}
                      key={tag}
                    />
                  );
                })}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="text-center p-2">
          <p className="p-2"> Current Tags:</p>
          {currentTags.length > 0 ? (
            <div className="flex flex-col gap-2">
              {currentTags.map((tag) => {
                return (
                  <TagBox
                    key={tag}
                    value={tag}
                    setIsHidden={setIsHidden}
                    currentTags={currentTags}
                    setCurrentTags={setCurrentTags}
                    unusedTags={unusedTags}
                    setUnusedTags={setUnusedTags}
                  />
                );
              })}
            </div>
          ) : (
            <div>No tags</div>
          )}
        </div>
      </>
      {/* } */}
    </>
  );
}
