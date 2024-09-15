const MY_POKE_COLLECTION = JSON.parse(localStorage.getItem('pokeCollection')) || [];
const CARD_TITLE = document.getElementById('card-name');
const CARD_IMAGE = document.getElementById('card-image');
const CARD_STATS = document.getElementById('card-stats');
BUTTON_PREVIOUS = document.getElementById('previous-button');
BUTTON_NEXT = document.getElementById('next-button');

let INDEX = 0;

populateCard(INDEX);

function updateCollection(){
    localStorage.setItem('pokeCollection', JSON.stringify(MY_POKE_COLLECTION));
};

function checkIndex() {
    if (INDEX <= 0) {
        BUTTON_PREVIOUS.style.display = "none";
    } else {
        BUTTON_PREVIOUS.style.display = "block"; 
    }
    
    if (INDEX >= MY_POKE_COLLECTION.length - 1) {
        BUTTON_NEXT.style.display = "none";
    } else {
        BUTTON_NEXT.style.display = "block"; 
    }
}

function populateCard(index = 0) {
    checkIndex();
    let currentCard = MY_POKE_COLLECTION[index];
    
    CARD_TITLE.textContent = currentCard.Name;
    CARD_IMAGE.src = currentCard.Avatar;  

    CARD_STATS.innerHTML = '';

    for (let key in currentCard.Stats) {
        let newDataValue = currentCard.Stats[key];

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

function removeFromCollection() {
    MY_POKE_COLLECTION.splice(INDEX, 1);
    alert('Pokemon removed from collection');
    updateCollection();
    populateCard();
}

function previous() {
    INDEX -= 1;
    populateCard(INDEX);
}

function next() {
    INDEX += 1;
    populateCard(INDEX);
}

