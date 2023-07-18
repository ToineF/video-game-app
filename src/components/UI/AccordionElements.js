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
      <div className="bg-gray-100 p-2 text-gray-600 text-center hover:bg-gray-200">
        <p>{value}</p>
      </div>
    </button>
  );
}
