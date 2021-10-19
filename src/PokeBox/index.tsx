import React, { useState, useEffect } from "react";
import './styles.css'

function Pokebox() {
  const [pokemon, setPokemon] = useState<any>({});
  const [habilidade, sethabilidade] = useState<any>();
  const [species, setSpecies] = useState<any>({});
  const [pegar, setpegar] = useState<boolean>(true);

  useEffect(() => {
    const inicializar = async () => {
      try {
        const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=150`);
        const pokeObj = await pokeData.json();
        setSpecies(pokeObj.results);
      } catch (error) {
        alert("Erro ao inicializar");
      }
    }
    inicializar();

  }, [])

  const handleDigita = (e: any) => {
    if (e.code !== 'Enter') return;
    if (e.target.value === '') return;
    const pokeName: string = e.target.value.toLowerCase();
    BuscaPokemon(pokeName);
    e.target.value = '';
  }

  const BuscaPokemon = async (pokeName: string) => {
    try {
      const url: string = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
      const pokeData = await fetch(url);
      const pokeObj = await pokeData.json();
      console.log(pokeObj);
      setPokemon(pokeObj);
      setpegar(false);
    } catch (error) {
      alert("Não foi possível achar o pokemon");
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

  const salvarPokemon = async () => {
    const url = `http://localhost:3001/pokemon`;
    pokemon.id = pokemon.name;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pokemon)
      });
      pegarPokemon();
      console.log(response);

    } catch (error) {
      alert("Falha ao add pokemon")
    }
  }

  const deletarPokemon = async () => {
    const url = `http://localhost:3001/pokemon/${pokemon.name}`;
    try {
      const response = await fetch(url, {
        method: 'DELETE'
      });
      console.log(response);

    } catch (error) {
      alert("Falha ao del pokemon");
    }
  }

  const pegarPokemon = () => {
    setpegar(true);
  }

  return (
    <div className="card">
      <h1>Mini - PokeDex</h1>
      <input list="pokemons"
        id='pokelista'
        onKeyPress={(e: any) => handleDigita(e)}
        placeholder='Digite e de enter'
      />
      <datalist id='pokemons'>
        {Object.keys(species).length > 0 && species.map((s: any) => <option value={s.name} key={s.name} />)}
      </datalist>
      <h2>Pokemon:</h2>
      {Object.keys(pokemon).length > 0 &&
        <div className="poke-infos">
          <div className="direita">
            <p>Nome: <strong>{pokemon.name}</strong></p>
            <div className="status">
              Status:
              {pokemon.stats.map((s: any) => <span key={'stat' + s.stat.name} style={{ width: s.base_stat * 7 + 'px' }}>{s.stat.name} {s.base_stat}</span>)}
            </div>
            <p className="Habilidades">
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
            <img className="poke-gif" src={`https://www.smogon.com//dex/media/sprites/xy/${pokemon.species.name}.gif`} alt="gif pokemon" />
          </div>
          <div>
            <img className={pegar ? 'poke-img poke-cap' : 'poke-img'} onClick={salvarPokemon} src={pokemon.sprites.other["official-artwork"].front_default} alt="Foto Pokemon" />
            <span onClick={deletarPokemon}>X</span>
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