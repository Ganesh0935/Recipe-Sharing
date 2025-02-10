const recipes = [
    { name: "Biriyani", img: "../Assets/biryani.jpg" },
    { name: "Chicken Curry", img: "../Assets/chicken_curry.jpg" },
    { name: "Mutton", img: "../Assets/mutton.jpg" },
    { name: "Sambar", img: "../Assets/sambar.webp" },
    { name: "Omelette", img: "../Assets/omelette.jpg" },
    { name: "Dosa", img: "../Assets/dosa.jpg" },
    { name: "Idly", img: "../Assets/idly.jpg" },
    { name: "Ice Cream", img: "../Assets/ice cream.jpg" },
    { name: "Potato Fry", img: "../Assets/potato_fry.jpg" },
    { name: "Pulihora", img: "../Assets/pulihora.webp" },
    { name: "Chocolate Cake", img: "../Assets/chocolatecake.jpg" },
    { name: "Red Velvet Cake", img: "../Assets/Red_velvet_cake.webp" },
    { name: "Egg Bhurji", img: "../Assets/egg_bhurji.jpg" },
    { name: "Black Current Icecream", img: "../Assets/black_current_icecream.jpg" },
    { name: "Chicken Fry", img: "../Assets/chicken_fry.jpg" },
    { name: "Mandi Biriyani", img: "../Assets/mandi_biriyani.jpg" },
    { name: "Mutton Biriyani", img: "../Assets/mutton_biriyani.jpg" },
    { name: "Prawns", img: "../Assets/prawns.jpg" },
    { name: "Fish Curry", img: "../Assets/fish_curry.jpg" },
    { name: "Fish Fry", img: "../Assets/fish_fry.jpg" }
];

let filteredRecipes = [];

function displayRecipes(filteredRecipes = recipes) {
    const container = document.getElementById("recipe-list");
    container.innerHTML = ""; // Clear previous results

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
            <a href="recipe-detail.html?recipe=${encodeURIComponent(recipe.name)}" class="view-recipe">View Recipe</a>
        `;
        container.appendChild(card);
    });
}

function filterRecipes() {
    const searchBar = document.getElementById("search-bar").value.toLowerCase().trim();
    
    // If search bar is empty, show all recipes
    if (searchBar === "") {
        displayRecipes(recipes);
        return;
    }

    // Filter recipes based on search
    const filteredRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchBar));
    displayRecipes(filteredRecipes);
}

function showSuggestions() {
    const searchBar = document.getElementById("search-bar").value.toLowerCase().trim();
    const suggestionsList = document.getElementById("suggestions-list");

    // Clear previous suggestions
    suggestionsList.innerHTML = "";

    if (searchBar === "") {
        suggestionsList.style.display = "none";
        return;
    }

    // Filter recipes for suggestions
    const suggestions = recipes.filter(recipe => recipe.name.toLowerCase().includes(searchBar));
    
    // Show suggestions
    if (suggestions.length > 0) {
        suggestions.forEach(suggestion => {
            const li = document.createElement("li");
            li.textContent = suggestion.name;
            li.onclick = function() {
                document.getElementById("search-bar").value = suggestion.name;
                suggestionsList.innerHTML = "";
                suggestionsList.style.display = "none";
                filterRecipes();
            };
            suggestionsList.appendChild(li);
        });
        suggestionsList.style.display = "block";
    } else {
        suggestionsList.style.display = "none";
    }
}

// Display all recipes on page load
document.addEventListener("DOMContentLoaded", function() {
    displayRecipes(); // Show all recipes initially
});
