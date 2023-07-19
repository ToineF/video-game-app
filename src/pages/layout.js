import RandomButton from "@/components/UI/RandomButton";
import Menubutton from "@/components/UI/MenuButton";

export default function Layout({ children }) {
  return (
    <main>
      <div className="flex flex-row justify-between p-5 bg-gray-400 dark:bg-gray-900 fixed top-0 w-full">
        <Menubutton />
        <RandomButton />
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
