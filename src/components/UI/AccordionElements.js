export default function AccordionElements({
  setIsHidden,
  currentTags,
  setCurrentTags,
  unusedTags,
  setUnusedTags,
  value,
}) {
  return (
    <button
      onClick={() => {
        setIsHidden(true);
        if (!currentTags.includes(value) && unusedTags.includes(value)) {
          setCurrentTags((currentValue) => [...currentValue, value]);
          const indexOfValue = unusedTags.indexOf(value);
          const newUnusedTags = unusedTags;
          newUnusedTags.splice(indexOfValue, 1);
          setUnusedTags(() => [...newUnusedTags]);
          sessionStorage.setItem(
            "UsedTags",
            JSON.stringify([...currentTags, value])
          );
          window.dispatchEvent(new Event("addTag"));
        }
      }}
    >
      <div className="p-2 text-center text-gray-600 dark:text-gray-200 bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-500">
        <p>{value}</p>
      </div>
    </button>
  );
}
