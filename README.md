# Mini PokeBox - Tutorial

Tutorial React/TypeScript/API

## Criar projeto
Rodar no terminal:
### `npx create-react-app . --template typescript`

## index.tsx
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PokeBox from './PokeBox';

ReactDOM.render(<PokeBox />, document.getElementById('root'));
```

## PokeBox

Estados:
```
function Pokebox() {
    const [pokemon, setPokemon] = useState<any>();
    const [habilidade, sethabilidade] = useState<any>();
``` 

Busca pelo input: faz o fecth da API quando digitado enter
```
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
```


Clicando na Habilidade do pokemon: faz o fetch da API e salva nno estado, abrindo o Modal
```
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
```

Fechando Modal de Habilidades: setando null para o estado do modal
```
const handleModal = () => {
        sethabilidade(null);
    }
```

## Rodar o projeto
### `yarn test`