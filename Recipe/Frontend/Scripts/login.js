document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("loginForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const loginData = { email, password };

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok) {
                alert("Login Successful!");
                localStorage.setItem("token", data.token); // Store JWT token
                localStorage.setItem("userId", data.user.id); // Store user ID
                localStorage.setItem("username", data.user.username); // Store username
                window.location.href = "home.html"; // Redirect to home page
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please try again.");
        }
    });
});
