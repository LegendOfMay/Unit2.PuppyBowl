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

//Render players to page 

const renderPlayers = () => {
    const main = document.getElementById("playerContainer");
    main.innerHTML = "";

    state.allPlayers.forEach((puppy) => {
        const playerDiv = document.createElement("div");
       
        playerDiv.innerHTML = `
            <img src="${puppy.imageUrl}" alt="${puppy.name}">
            <h3>${puppy.name}</h3>
            <p>Status: ${puppy.status}</p>
            <button onclick="showPlayerDetails('${puppy.id}')">See Details</button>
        `;

        main.appendChild(playerDiv);
    });
};




