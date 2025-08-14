document.getElementById("signup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const messageEl = document.getElementById("message");

    try {
        console.log("Sending signup data:", { name, email, password });

        const response = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();
        console.log("Server response:", result);

        if (response.ok) {
            messageEl.textContent = "Account created successfully. Please log in.";
            messageEl.style.color = "green";
            document.getElementById("signup-form").reset();

            // Redirect to login after a short delay
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
        } else {
            messageEl.textContent = result.error || "Signup failed.";
            messageEl.style.color = "red";
        }
    } catch (error) {
        console.error("Error during signup:", error);
        messageEl.textContent = "An error occurred. Please try again later.";
        messageEl.style.color = "red";
    }
});
