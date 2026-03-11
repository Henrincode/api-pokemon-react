import Link from "next/link"
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md"

interface Props {
    params: Promise<{ name: string }>
}

export default async function Pokemon({ params }: Props) {
    const { name } = await params
    const resPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon = await resPokemon.json()

    const resPokelist = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000")
    const data = await resPokelist.json()

    const pokemons = data.results.filter((p: any) => {
        const id = parseInt(p.url.split('/').filter(Boolean).pop())
        return id < 10000
    })

    const atual = pokemons.findIndex((p: any) => p.name === name)

    return (
        <div className="h-dvh flex flex-col justify-center items-center p-4">
            <img src="https://pngimg.com/uploads/pokemon_logo/small/pokemon_logo_PNG5.png" alt="" />
            <div className="
            flex flex-col justify-center items-center gap-
            max-w-lg w-full p-4 mx-auto border border-blue-400/50 rounded-2xl
            bg-blue-50
        ">
                <div className="
            flex flex-row justify-center items-center w-full
            ">
                    <div className={`${atual || 'hidden'}`}>
                        <Link href={`/pokemon/${pokemons[atual - 1]?.name}`} className="flex rounded-full bg-blue-400 hover:animate-pulse"><MdNavigateBefore size={30} /></Link>
                    </div>
                    <div className="flex-1 flex flex-row justify-center">
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} alt=""
                            className="
                    w-80
                "/>
                    </div>
                    <div className={`${pokemons.length - 1 == atual && 'hidden'}`}>
                        <Link href={`/pokemon/${pokemons[atual + 1]?.name}`} className="flex rounded-full bg-blue-400 hover:animate-pulse"><MdNavigateNext size={30} /></Link>
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
            <Link href={'/'} className="px-6 py-2 mt-2 rounded-full font-semibold text-xl text-white bg-blue-500 hover:bg-blue-700 transition-all">Voltar</Link>
        </div>
    )
}