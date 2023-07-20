import RandomButton from "@/components/UI/RandomButton";
import Menubutton from "@/components/UI/MenuButton";

export default function Layout({ children }) {
  return (
    <main>
      <div className="flex flex-row items-center justify-between p-5 bg-gray-300 dark:bg-gray-700 fixed top-0 w-full">
        <Menubutton />
        <RandomButton size="text-xl p-1"/>
      </div>
      <div className="flex flex-col mt-16">
        <div>{children}</div>
        <footer className="flex justify-center p-5">
          Data from RAWG.io API
        </footer>
      </div>
    </main>
  );
}
