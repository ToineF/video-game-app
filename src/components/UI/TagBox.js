import Image from "next/image";

export default function TagBox({
  value,
  setIsHidden,
  currentTags,
  setCurrentTags,
  unusedTags,
  setUnusedTags,
}) {
  return (
    <div className="flex justify-between p-2 gap-2 bg-gray-500 rounded">
      <p> {value}</p>
      <button
        onClick={() => {
          setIsHidden(true);
          if (currentTags.includes(value) && !unusedTags.includes(value)) {
            setUnusedTags((currentValue) => [value, ...currentValue]);
            const indexOfValue = currentTags.indexOf(value);
            const newCurrentTags = currentTags;
            newCurrentTags.splice(indexOfValue, 1);
            setCurrentTags(() => [...newCurrentTags]);
          }
        }}
      >
        <Image
          src="/../public/cross.png"
          alt="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png"
          height={10}
          width={25}
        />
      </button>
    </div>
  );
}
