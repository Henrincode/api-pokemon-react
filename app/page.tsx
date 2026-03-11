import Link from "next/link";

export default async function Home() {

  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
  const data = await response.json()
  const pokemons = data.results

  return (
    <>
      <img src="https://pngimg.com/uploads/pokemon_logo/small/pokemon_logo_PNG5.png" alt="" className="mx-auto"/>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 p-4">

        {pokemons.map((p: any) => {
          const id = p.url.split('/').filter(Boolean).pop()

          if (id >= 10000) return
          return (
            <Link href={`/pokemon/${p.name}`} key={p.name} className="p-2 border rounded-lg text-center border-blue-400/50 bg-blue-50 hover:bg-blue-300 transition-all hover:-translate-y-2">
              <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="" className="w-full"/>
              {p.name}
            </Link>
          )
        })}
      </div>
    </>
  );
}