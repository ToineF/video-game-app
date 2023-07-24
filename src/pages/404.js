export default function Error404() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-2 p-24 text-center">
      <div className="text-3xl font-bold">
        404: An unexpected error occured.
      </div>
      <p className="text-lg">You might have typed an invalid URL.</p>
    </main>
  );
}
