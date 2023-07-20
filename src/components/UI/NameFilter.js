import { useState, useEffect } from "react";

export default function NameFilter() {
  const [name, setName] = useState("");
  const [confirmedName, setConfirmedName] = useState("");

  useEffect(() => {
    const sessionName = JSON.parse(sessionStorage.getItem("NameFilter"));
    setConfirmedName(sessionName ?? "");
  }, []);

  return (
    <div className="flex flex-col gap-4 pb-10">
      <div>
        <p className="text-lg font-bold">Current Name Filter:</p>
        {confirmedName === "" ? <p>No filter</p> : <p>| {confirmedName}</p>}
      </div>
      <form
        className="flex px-4 py-2 gap-2 rounded bg-gray-500 dark:bg-gray-700"
        onSubmit={(event) => {
          event.preventDefault();
          if (name === confirmedName) return;
          setConfirmedName(name);
          sessionStorage.setItem("NameFilter", JSON.stringify(name));
          window.dispatchEvent(new Event("modifyNameFilter"));
        }}
      >
        <input
          className="rounded px-2 text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 dark:placeholder:text-gray-500"
          placeholder="Filter by Name"
          value={name}
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
        ></input>
        <button className="border-2 px-2 rounded bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-100">
          OK
        </button>
      </form>
    </div>
  );
}
