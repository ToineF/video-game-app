import Link from "next/link";

export default function Menubutton() {
  return (
    <Link href={"/"}>
      <button>
        <p className="font-bold text-xl p-2 text-gray-800 dark:text-gray-100">Want a Random Game?</p>
      </button>
    </Link>
  );
}
