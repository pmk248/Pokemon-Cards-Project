const MY_POKE_COLLECTION = JSON.parse(localStorage.getItem('pokeCollection')) || [];
const CARD_TITLE = document.getElementById('card-name');
const CARD_IMAGE = document.getElementById('card-image');
const CARD_STATS = document.getElementById('card-stats');
const BUTTON_PREVIOUS = document.getElementById('previous-button');
const BUTTON_NEXT = document.getElementById('next-button');
const CARD = document.getElementById('card');
let currentPokemon;
let INDEX = 1; 

getPokemonData(INDEX);

function updateCollection(){
    localStorage.setItem('pokeCollection', JSON.stringify(MY_POKE_COLLECTION));
};

async function getPokemonData(index = 1) {
    const url = `https://pokeapi.co/api/v2/pokemon/${index}`;
    checkIndex(index); 
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        const imageUrl = data.sprites.front_default;
        const height = data.height;
        const weight = data.weight;
        
        const stats = data.stats.reduce((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat;
            return acc;
        }, {});

        const hp = stats.hp;
        const attack = stats.attack;
        const types = data.types.map(typeInfo => typeInfo.type.name);    

        const pokemonName = data.name;
        
        const newPokemon = {
            Avatar: imageUrl, // URL
            Name: capitalizeFirstLetter(pokemonName), // STRING
            Stats: {
                Height: Number(height), // INT
                Weight: Number(weight), // INT
                Hitpoints: Number(hp), // INT
                Attack: Number(attack), // INT
                Type: types // LIST
            }
        };
        currentPokemon = newPokemon;
        populateCard(newPokemon);
        
    } catch (error) {
        console.error('Error receiving Pokémon data:', error);
        alert('Error receiving Pokémon data');
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function checkIndex(index) {
    if (index <= 1) {
        BUTTON_PREVIOUS.style.display = "none";
    } else {
        BUTTON_PREVIOUS.style.display = "block";
    }
    if (index >= 898) { 
        BUTTON_NEXT.style.display = "none";
    } else {
        BUTTON_NEXT.style.display = "block";
    }
}

function populateCard(pokemon) {
    CARD_TITLE.textContent = pokemon.Name;
    CARD_IMAGE.src = pokemon.Avatar;  

    CARD_STATS.innerHTML = '';

    for (let key in pokemon.Stats) {
        let newDataValue = pokemon.Stats[key];

        if (key === 'Type') {
            let typeRow = document.createElement('div');
            typeRow.classList.add("card-stat");
            typeRow.textContent = `Type: `;
            
            newDataValue.forEach(type => {
                let typeElement = document.createElement('span');
                typeElement.classList.add('type');
                typeElement.textContent = type;
                typeRow.appendChild(typeElement);
            });

            CARD_STATS.appendChild(typeRow);
        } else {
            let newRow = document.createElement('span');
            newRow.classList.add("card-stat");
            newRow.textContent = `${key}: ${newDataValue}`;

            CARD_STATS.appendChild(newRow);
        }
    }
}

async function previous() {
    if (INDEX > 1) {
        INDEX -= 1;
        await getPokemonData(INDEX); 
    }
}

async function next() {
    if (INDEX < 898) { 
        INDEX += 1;
        await getPokemonData(INDEX); 
    }
}

const SAVE_BUTTON = document.getElementById('save-button');

function saveToCollection() {
    const pokemonName = currentPokemon.Name;
    const existingPokemon = MY_POKE_COLLECTION.find(pokemon => pokemon.Name === pokemonName);

    if (existingPokemon) {
        alert('This Pokémon is already in your collection.');
        return;
    }

    MY_POKE_COLLECTION.push(currentPokemon);
    localStorage.setItem('pokeCollection', JSON.stringify(MY_POKE_COLLECTION));
    alert('Pokémon added to your collection!');
    updateCollection();
}


getPokemonData(INDEX);
