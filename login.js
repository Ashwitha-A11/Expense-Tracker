document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const messageElement = document.getElementById("message");

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            messageElement.style.color = "green";
            messageElement.textContent = data.message;

            // Redirect or show dashboard
            setTimeout(() => {
                window.location.href = "index.html"; // redirect to home page
            }, 1000);
        } else {
            messageElement.style.color = "red";
            messageElement.textContent = data.error || "Login failed.";
        }
    } catch (err) {
        messageElement.style.color = "red";
        messageElement.textContent = "Error: Could not connect to server.";
    }
});
