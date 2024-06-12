import {dataMusic} from "./dataMusic.js"
import {loadTrack } from "../UI/player.js"
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('resultsContainer');

searchInput.addEventListener('input', function() {
    const searchText = this.value.toLowerCase();

    const filteredData = dataMusic.filter(function(item) {
        if(searchText !== ""){
            return item.title.toLowerCase().includes(searchText) || item.artist.toLowerCase().includes(searchText);
        }
    });
    
    displayResults(filteredData);
      
});

function displayResults(results) {
    console.log(resultsContainer)
    resultsContainer.innerHTML = '';

    results.forEach(function(item) {
        const resultElement = document.createElement('div');
        resultElement.classList.add('result');
        resultElement.innerHTML = `<h3>${item.title}</h3><p>${item.artist}</p>`;
        resultElement.addEventListener("click", ()=>{
            loadTrack(item.id - 1)
            resultsContainer.innerHTML = '';

        })
        resultsContainer.appendChild(resultElement);
        
    });
}

resultsContainer.addEventListener("click", ()=>{
    searchInput.value = ""

})