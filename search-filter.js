function displayRecipes(filteredRecipes = recipes) {
    const container = document.getElementById("recipe-list");
    container.innerHTML = "";

    if (filteredRecipes.length === 0) {
        container.innerHTML = `<p class="no-results">No recipes found.</p>`;
        return;
    }

    filteredRecipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.innerHTML = `
            <img src="${recipe.img}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <a href="recipe.html?recipe=${encodeURIComponent(recipe.name)}" class="view-recipe">View Recipe</a>
        `;
        container.appendChild(card);
    });
}

function filterRecipes() {
    const searchBar = document.getElementById("search-bar").value.toLowerCase().trim();
    
    // If search is empty, show all recipes
    if (searchBar === "") {
        displayRecipes(recipes);
        return;
    }

    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchBar));
    displayRecipes(filteredRecipes);
}

// Load all recipes on page load
displayRecipes();