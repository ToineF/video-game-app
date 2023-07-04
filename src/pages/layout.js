export default function Layout({ children }) {
  return (
    <main>
      <div className="flex flex-row justify-between p-5 bg-gray-300">
        <p className="font-bold text-lg p-2">LOGO</p>
        <button className="bg-gray-500 p-2 rounded text-gray-200 hover:bg-gray-600">
          Random Game
        </button>
      </div>
      <div>{children}</div>
    </main>
  );
}
