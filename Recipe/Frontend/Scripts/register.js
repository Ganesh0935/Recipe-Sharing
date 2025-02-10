document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const username = document.getElementById("username").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Basic client-side validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        // Send data to backend API
        console.log(username,email,password,confirmPassword)
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
                confirmPassword,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Registration successful! Please login.");
            window.location.href = "login.html"; // Redirect to login page after successful registration
        } else {
            alert(`Registration failed: ${data.message}`);
        }
    } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again later.");
    }
});
