import Link from "next/link";

export default function Menubutton() {
  return (
    <Link href={"/"}>
      <button>
        <p className="font-bold text-lg p-2">LOGO</p>
      </button>
    </Link>
  );
}
