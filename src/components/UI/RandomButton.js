import Link from "next/link";

export default function RandomButton({ text = "Random Game" }) {
  return (
    <Link href={"/games/id"}>
      <button className="bg-gray-500 p-2 rounded text-gray-200 hover:bg-gray-600">
        {text}
      </button>
    </Link>
  );
}
