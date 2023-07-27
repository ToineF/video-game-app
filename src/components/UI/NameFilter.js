import { useState, useEffect } from "react";
import Image from "next/image";

export default function NameFilter() {
  const [name, setName] = useState("");
  const [confirmedName, setConfirmedName] = useState("");

  useEffect(() => {
    const sessionName = JSON.parse(sessionStorage.getItem("NameFilter"));
    setConfirmedName(sessionName ?? "");
  }, []);

  function UpdateSessionStorageName(value) {
    setConfirmedName(value);
    sessionStorage.setItem("NameFilter", JSON.stringify(value));
    window.dispatchEvent(new Event("modifyNameFilter"));
  }

  return (
    <div className="flex flex-col gap-4 pb-10">
      <div>
        <p className="text-lg font-bold">Current Name Filter:</p>
        {confirmedName === "" ? (
          <p>No filter</p>
        ) : (
          <div className="flex gap-2">
            <p>
              <b>|</b> {confirmedName}
            </p>
            <button
              onClick={() => {
                UpdateSessionStorageName("");
              }}
            >
              <Image
                src="/static/images/cross_white.png"
                alt="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png"
                height={10}
                width={25}
                className="brightness-0 dark:brightness-100"
              />
            </button>
          </div>
        )}
      </div>
      <form
        className="flex px-4 py-2 gap-2 rounded bg-gray-500 dark:bg-gray-700"
        onSubmit={(event) => {
          event.preventDefault();
          if (name === confirmedName) return;
          UpdateSessionStorageName(name);
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
