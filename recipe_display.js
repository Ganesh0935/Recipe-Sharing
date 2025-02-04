document.addEventListener("DOMContentLoaded", function () {
    const recipes = [
        { name: "Biriyani", img: "../Assets/biryani.jpg" },
        { name: "Chicken Curry", img: "../Assets/chicken_curry.jpg" },
        { name: "Mutton", img: "../Assets/mutton.jpg" },
        { name: "Sambar", img: "../Assets/sambar.webp" },
        { name: "Omelette", img: "../Assets/omelette.jpg" },
        { name: "Dosa", img: "../Assets/dosa.jpg" },
        { name: "Idly", img: "../Assets/idly.jpg" },
        { name: "Ice Cream", img: "../Assets/ice-cream.jpg" }, 
        { name: "Potato Fry", img: "../Assets/potato_fry.jpg" },
        { name: "Pulihora", img: "../Assets/pulihora.webp" },
        { name: "Chocolate Cake", img: "../Assets/chocolatecake.jpg" },
        { name: "Red Velvet Cake", img: "../Assets/red_velvet_cake.webp" },
        { name: "Egg Bhurji", img: "../Assets/egg_bhurji.jpg" },
        { name: "Black Current Ice Cream", img: "../Assets/black_current_icecream.jpg" },
        { name: "Chicken Fry", img: "../Assets/chicken_fry.jpg" },
        { name: "Mandi Biriyani", img: "../Assets/mandi_biriyani.jpg" },
        { name: "Mutton Biriyani", img: "../Assets/mutton_biriyani.jpg" },
        { name: "Prawns", img: "../Assets/prawns.jpg" },
        { name: "Fish Curry", img: "../Assets/fish_curry.jpg" },
        { name: "Fish Fry", img: "../Assets/fish_fry.jpg" }
    ];

    const recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.innerHTML = recipes.map(recipe => `
        <div class="recipe-card">
            <img src="${recipe.img}" alt="${recipe.name}">
            <h3>${recipe.name}</h3>
            <a href="recipe.html?recipe=${encodeURIComponent(recipe.name)}" class="view-recipe">View Recipe</a>
        </div>
    `).join("");
});