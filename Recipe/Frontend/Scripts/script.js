document.addEventListener("DOMContentLoaded", function () {
    // Handle adding ingredients dynamically
    const addIngredientButton = document.getElementById("addIngredient");
    const ingredientsContainer = document.getElementById("ingredientsContainer");

    addIngredientButton.addEventListener("click", function () {
        const ingredientInput = document.createElement("input");
        ingredientInput.type = "text";
        ingredientInput.placeholder = "Enter ingredient";
        ingredientsContainer.appendChild(ingredientInput);
    });

    // Handle recipe form submission
    const recipeForm = document.getElementById("recipeForm");

    recipeForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get form values
        const recipeTitle = document.getElementById("recipeTitle").value;
        const description = document.getElementById("description").value;
        const instructions = document.getElementById("instructions").value;
        
        // Get ingredients values
        const ingredients = [];
        const ingredientInputs = ingredientsContainer.querySelectorAll("input");
        ingredientInputs.forEach(input => {
            if (input.value.trim()) {
                ingredients.push(input.value.trim());
            }
        });

        // Get userId from localStorage
        const userId = localStorage.getItem("userId");

        // Prepare the data to send to the backend
        const recipeData = {
            userId,
            recipeTitle,
            description,
            instructions,
            ingredients
        };

        try {
            // Send the data to the backend
            const response = await fetch("http://localhost:5000/api/recipes/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recipeData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Recipe submitted successfully!");
                recipeForm.reset();
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Error submitting recipe:", error);
            alert("There was an error submitting your recipe. Please try again.");
        }
    });
});
