import React, { useState, useEffect } from "react";
import './styles.css'

function Pokebox() {
    const [pokemon, setPokemon] = useState<any>();
    const [habilidade, sethabilidade] = useState<any>();
    const [species, setSpecies] = useState<any>();

    useEffect(() => {
        const inicializar = async () => {
            try {
                const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=50`);
                const pokeObj = await pokeData.json();
                setSpecies(pokeObj.results);
            } catch (error) {
                alert("Erro ao inicializar");
            }
        }
        inicializar();

    }, [])

    const handleDigita = async (e: any) => {
        if (e.code !== 'Enter') return;
        try {
            const pokeName: string = e.target.value.toLowerCase();
            const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
            const pokeObj = await pokeData.json();
            setPokemon(pokeObj);
        } catch (error) {
            alert("Pokemon não encontrado");
        }
    }

    const handleClickHabilidade = async (nome: string) => {
        try {
            const pokeData = await fetch(`https://pokeapi.co/api/v2/ability/${nome}`);
            const pokeObj = await pokeData.json();
            sethabilidade(pokeObj);
        } catch (error) {
            alert("Habilidade não encontrado");
        }
    }

    const handleModal = () => {
        sethabilidade(null);
    }

    return (
        <div className="card">
            <h1>Mini - PokeDex</h1>
            <input list="pokemons" id='pokelista' onKeyPress={(e) => handleDigita(e)} placeholder='Digite e de enter' />
            <datalist id='pokemons'>
                {species && species.map((s: any) => <option value={s.name} key={s.name} />)}
            </datalist>
            <h2>Pokemon:</h2>
            {pokemon &&
                <div className="poke-infos">
                    <div>
                        <p>Nome: <strong>{pokemon.species.name}</strong></p>
                        <p>Altura: {pokemon.height}</p>
                        <p>Peso: {pokemon.weight}</p>
                        <p>Altura: {pokemon.height}</p>
                        <p>
                            Habilidades:
                            {pokemon.abilities.map((a: any) => <Hab nome={a.ability.name} handleClick={handleClickHabilidade} key={a.ability.name} />)}
                        </p>
                        <p className="poke-imgs">
                            {
                                Object.keys(pokemon.sprites).map
                                    ((key: string) => (pokemon.sprites[key] && key !== 'other' && key !== 'versions') &&
                                        <img className="poke-sprite" src={pokemon.sprites[key]} alt={key} />)
                            }
                        </p>
                    </div>
                    <div>
                        <img className="poke-img" src={pokemon.sprites.other["official-artwork"].front_default} alt="Foto Pokemon" />
                    </div>
                </div>
            }
            {habilidade &&
                <div className="hidden" onClick={handleModal}>
                    {habilidade.nome} - {habilidade.effect_entries[1].effect}
                </div>

            }
        </div>
    );
}

export function Hab({ nome, handleClick }: { nome: string, handleClick: Function }) {
    return (
        <span className="habilidadeBtn" onClick={() => handleClick(nome)}>{nome}</span>
    )
}

export default Pokebox;