import { useState } from "react";
import AccordionElements from "./AccordionElements";
import Image from "next/image";
import TagBox from "./TagBox";

export default function Accordion() {
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

  return (
    <>
      <div className="flex flex-col">
        <button
          className={
            isHidden
              ? "bg-gray-500 p-2 rounded text-gray-200 hover:bg-gray-600"
              : "bg-gray-600 p-2 rounded text-gray-200"
          }
          onClick={() => {
            setIsHidden(!isHidden);
          }}
        >
          <div className="flex gap-2">
            <p>Choose tag</p>
            <Image
              src="/../public/arrowUp.png"
              alt="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-512.png"
              height={25}
              width={25}
              className={isHidden ? "rotate-180" : ""}
            ></Image>
          </div>
        </button>
        {!isHidden ? (
          <>
            {unusedTags.map((tag) => {
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
          </>
        ) : (
          ""
        )}{" "}
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
  );
}
