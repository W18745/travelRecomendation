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
        mainSection.innerHTML = `<h1>Search Results</h1`
        mainSection.classList.toggle("Headline")
        mainSection.classList.toggle("Search")
        //Results found
        if (data[searchText]){
            const mainList = document.createElement("ul");
            mainList.classList.add("Search_Result_List");

            data[searchText].forEach(e => {
                if (searchText === "countries"){
                    e["cities"].forEach(e2 =>{
                        const result = document.createElement("li");
                        result.classList.add("Search_Result");
                        result.innerHTML=`<img src="${e2["imageUrl"]}">
                        <h2>${e2["name"]}</h1>
                        <p>${e2["description"]}</p>
                        <p>Current Time: ${new Date().toLocaleTimeString('en-US',{timeZone: e2["timezone"], hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' })}`
                        mainList.appendChild(result);
                    })

                }
                else{
                    const result = document.createElement("li");
                    result.classList.add("Search_Result");
                    result.innerHTML=`<img src="${e["imageUrl"]}">
                    <h2>${e["name"]}</h1>
                    <p>${e["description"]}</p>`
                    mainList.appendChild(result);
                }
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
function peformSearchReset(){
    mainSection.innerHTML=`<h1>Travel your Way</h1>
    <p>
        Welcome to Travel Pro, were your one stop to finding beautiful vacation getaways, exploration, celebrations and manny more.
        Please use our services to explore getaway locations and plan you travels
    </p>`
    mainSection.classList.add("Headline");
    mainSection.classList.remove("Search")
    
}

searchSubmit.addEventListener('click', peformSearch);
searchClear.addEventListener('click', peformSearchReset);