import Link from "next/link"

interface Props {
    params: Promise<{ name: string }>
}

export default async function Pokemon({ params }: Props) {
    const { name } = await params
    const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon = await resPokemon.json()

    const resPokelist = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
    const data = await resPokelist.json()
    const pokemons = data.results

    const atual = pokemons.findIndex((p: any) => p.name === name)

    return (
        <div className="
            flex flex-col justify-center items-center gap-
            w-lg p-4 mx-auto mt-10 border border-blue-400/50 rounded-2xl
            bg-blue-50
        ">
            <div className="
            flex flex-row items-center w-full
            ">
                <div className={`${atual || 'hidden'}`}>
                    <Link href={`/pokemon/${pokemons[atual - 1]?.name}`}>{'<'}</Link>
                </div>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt=""
                    className="
                    flex-1
                    size-50
                "/>
                <div className={`${pokemons.length === atual && 'hidden'}`}>
                    <Link href={`/pokemon/${pokemons[atual + 1].name}`}>{'>'}</Link>
                </div>
            </div>
            <p>id: {pokemon.id}</p>
            <p>nome: {pokemon.name}</p>
            <div className="flex flex-col items-center">
                <div>Tipos:</div>
                <ul className="flex flex-row justify-center flex-wrap gap-1">
                    {pokemon.types.map(({ type }: any) => (
                        <li key={type.name} className="px-2 rounded-full text-sm bg-blue-300">
                            {type.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col items-center">
                <div>Abilidades:</div>
                <ul className="flex flex-row justify-center flex-wrap gap-1">
                    {pokemon.abilities.map(({ ability }: any) => (
                        <li key={ability.name} className="px-2 rounded-full text-sm bg-blue-300">
                            {ability.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col items-center">
                <div>Jogos:</div>
                <ul className="flex flex-row justify-center flex-wrap gap-1">
                    {pokemon.game_indices.map(({ version }: any) => (
                        <li key={version.name} className="px-2 rounded-full text-sm bg-blue-300">
                            {version.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}