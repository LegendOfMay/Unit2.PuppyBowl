//store base url 
const apiBaseURL = `https://fsa-puppy-bowl.herokuapp.com/api/2310-FSA-ET-WEB-FT-SF/players`;
// create array to hold player data 
const state = {
    allPlayers : []
}
//Fetch data from API 
const getAllPlayers = async () => {
const response = await fetch(`${apiBaseURL}`)
const result = await response.json();
state.allPlayers= result.data.players;

console.log(state.allPlayers)

renderPlayers()
}
getAllPlayers();




//Render players to  home page 

const renderPlayers = () => {
    const main = document.getElementById("playerContainer");
    main.innerHTML = "";


    state.allPlayers.slice(0, 20).forEach((puppy) => {
        const playerDiv = document.createElement("div");
       
        playerDiv.innerHTML = `
            <img src="${puppy.imageUrl}" alt="${puppy.name}">
            <h3>${puppy.name}</h3>
            <p>Status: ${puppy.status}</p>
            <button data-player-id="${puppy.id}">See Details</button>
        `;

        main.appendChild(playerDiv);
    });
    main.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const playerId = event.target.getAttribute("data-player-id");
            showPlayerDetails(playerId);
        }
})};


// Show PlayerDetails function (onClick)
const showPlayerDetails = async (playerId) => {
    console.log(`Showing details for player ID: ${playerId}`);
    const main = document.getElementById("playerContainer");
    main.innerHTML = "";


    const response = await fetch(`${apiBaseURL}/${playerId}`);
    const playerDetails = await response.json();
    renderPlayerDetails(playerDetails.data.player);

};

// Render player details function to pass to (showPlayerDetails)

const renderPlayerDetails = (player) => {

    const playerDetailsContainer = document.getElementById("playerDetailsModal");
    playerDetailsContainer.innerHTML = "";

    const detailsContainer = document.createElement("div");
    
    // Add player details to the container
    detailsContainer.innerHTML = `
        <img src="${player.imageUrl}" alt="${player.name}">
        <h2>${player.name}</h2>
        <p>Status: ${player.status}</p>
        <p>Breed: ${player.breed}</p>
        <p>Age: ${player.age}</p>

        <button onclick="closePlayerDetails()">Close</button>
    `;

    playerDetailsContainer.appendChild(detailsContainer);
    playerDetailsContainer.style.display = "block";
};


// Function to close player details
const closePlayerDetails = () => {
    const playerDetailsContainer = document.getElementById("playerDetailsModal");
    playerDetailsContainer.style.display = "none";
    renderPlayers();
};

// Function to add players via form and (preventDefault)

document.getElementById("playerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from the form
    const name = document.getElementById("name").value;
    const imageUrl = document.getElementById("imageUrl").value;
    const status = document.getElementById("status").value;
    const breed = document.getElementById("breed").value;
    const age = document.getElementById("age").value;

    // Create a new player object
    const newPlayer = {
        name,
        imageUrl,
        status,
        breed,
        age: parseInt(age),
    };

    // Add the new player to the state
    state.allPlayers.push(newPlayer);

    // Clear the form inputs
    document.getElementById("playerForm").reset();

    // Render the updated player list
    renderPlayers();
});








