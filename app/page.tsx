import Link from "next/link";

export default async function Home() {

  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
  const data = await response.json()
  const pokemons = data.results

  return (
    <div className="flex min-h-screen flex-wrap gap-4 items-center justify-center bg-zinc-50 font-sans dark:bg-black p-10">

      {pokemons.map((p: any) => {
        const id = p.url.split('/').filter(Boolean).pop()
        return (
          <Link href={`/pokemon/${p.name}`} key={p.name} className="text-zinc-900 dark:text-zinc-100 border p-2 rounded">
            {p.name}
          </Link>
        )
      })}
    </div>
  );
}