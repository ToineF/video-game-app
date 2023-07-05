import {
  useFetchGames,
  useFetchGenres,
  useFetchTags,
} from "@/assets/hooks/useFetch";

const TestApi = () => {
  const games = useFetchGames({ page: 1, page_size: 2 });
  const tags = useFetchTags({ page: 2, page_size: 2 });

  if (games.loading || tags.loading) return <p>Loading</p>;

  if (games.error || games.error) return <p>{JSON.stringify(games.error)}</p>;

  return (
    <div>
      <h2 className="text-2xl">Games</h2>
      <p>{JSON.stringify(games.data)}</p>
      <h2 className="text-2xl">Tags</h2>
      <p>{JSON.stringify(tags.data)}</p>
    </div>
  );
};

export default TestApi;
