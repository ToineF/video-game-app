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
        className="flex px-4 py-2 gap-2 rounded bg-gray-500"
        onSubmit={(event) => {
          event.preventDefault();
          if (name === confirmedName) return;
          setConfirmedName(name);
          sessionStorage.setItem("NameFilter", JSON.stringify(name));
          window.dispatchEvent(new Event("modifyNameFilter"));
        }}
      >
        <input
          className="rounded px-2"
          placeholder="Filter by Name"
          value={name}
          onChange={(event) => {
            setName(event.currentTarget.value);
          }}
        ></input>
        <button>OK</button>
      </form>
    </div>
  );
}
