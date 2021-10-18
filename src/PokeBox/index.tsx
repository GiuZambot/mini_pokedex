import React, { useState } from "react";
import './styles.css'

function Pokebox() {
    const [pokemon, setPokemon] = useState<any>();
    const [habilidade, sethabilidade] = useState<any>();

    const handleDigita = async (e: any) => {
        if (e.code !== 'Enter') return;
        try {
            const pokeName: string = e.target.value;
            const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
            const pokeObj = await pokeData.json();
            setPokemon(pokeObj);
        } catch (error) {
            alert("Pokemon não encontrado");
        }
    }

    const handleClick = async (nome: string) => {
        try {
            const pokeData = await fetch(`https://pokeapi.co/api/v2/ability/${nome}`);
            const pokeObj = await pokeData.json();
            console.log(pokeObj);

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
            <input type='text' onKeyPress={(e) => handleDigita(e)} placeholder="Digite e de enter" />
            <h2>Pokemon:</h2>
            {pokemon &&
                <>

                    <p>Nome: <strong>{pokemon.species.name}</strong></p>
                    <p>
                        Habilidades:
                        {pokemon.abilities.map((a: any) => <Hab nome={a.ability.name} handleClick={handleClick} />)}
                    </p>
                    <img className="poke-img" src={pokemon.sprites.front_default} alt="Foto Pokemon" />
                </>
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