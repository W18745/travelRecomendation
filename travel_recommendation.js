const searchInput = document.getElementById("search_input");
const searchSubmit = document.getElementById("search_submit");
const searchClear = document.getElementById("search_clear");
const mainSection = document.getElementById("Main_Section")
function peformSearch(){
    
    let searchText = searchInput.value.toLowerCase();
    
    //Setting key based on search term
    switch(searchText){
        case "beach":
            searchText = "beaches";
        break;
        case "country":
            searchText = "countries";
        break;
        case "temple":
            searchText = "temples";
        break;
        default:
    }
    console.log(searchText);

    //Fetch the travel json list and search for key to list areas
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        console.log(`Looking for: ${searchText} in:`);
        console.log(data[searchText]);
        mainSection.innerHTML = `<h1 class="headline">Search Results</h1`
        //Results found
        if (data[searchText]){
            const mainList = document.createElement("ul");
            mainList.classList.add("Search_REsult_List");

            data[searchText].forEach(e => {
                const result = document.createElement("li");
                result.classList.add("Search_Result");
                mainList.appendChild(result);
            });
            mainSection.appendChild(mainList);
        }
        //No results
        else{
            const result = document.createElement("p");
            result.innerHTML = `No Results`;
            mainSection.appendChild(result);
        }
        ;})
      .catch(error => {
        console.error('Error:', error);
      });
}
searchSubmit.addEventListener('click', peformSearch);