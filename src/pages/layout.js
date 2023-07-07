import RandomButton from "@/components/UI/RandomButton";
import Menubutton from "@/components/UI/MenuButton";

export default function Layout({ children }) {
  return (
    <main>
      <div className="flex flex-row justify-between p-5 bg-gray-300">
        <Menubutton />
        <RandomButton />
      </div>
      <div>{children}</div>
      <footer className="flex justify-center p-5">Data from RAWG.io API</footer>
    </main>
  );
}
