document.addEventListener('DOMContentLoaded', () => {
    // Handle Registration Form Submission
    document.getElementById('registerForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // Basic validation
        if (!username || !password || !confirmPassword) {
            alert('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Store registration data
        localStorage.setItem('registeredUser', JSON.stringify({ username, password }));
        alert('Registration successful!');
        window.location.href = 'login.html'; // Redirect to login page
    });

    // Handle Login Form Submission
    document.getElementById('loginForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form data
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;

        // Retrieve registered user data
        const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

        // Basic validation
        if (!username || !password) {
            alert('All fields are required.');
            return;
        }

        if (registeredUser && username === registeredUser.username && password === registeredUser.password) {
            // Store login status
            localStorage.setItem('loggedIn', true);
            alert('Login successful!');
            window.location.href = 'customer.html'; // Redirect to customer page
        } else {
            alert('Invalid username or password.');
        }
    });

    // Handle Train Search
    document.getElementById('trainSearchForm')?.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const origin = document.getElementById('origin').value.trim();
        const destination = document.getElementById('destination').value.trim();
        const date = document.getElementById('date').value;

        if (!origin || !destination || !date) {
            alert('All fields are required.');
            return;
        }

        // Simulate train search and display results
        const resultsContainer = document.getElementById('trainResults');
        resultsContainer.innerHTML = ''; // Clear previous results

        // Dummy data for example purposes
        const trains = [
            { id: 1, name: 'Train Express 101', availableSeats: { 'First Class': 10, 'Second Class': 20 } },
            { id: 2, name: 'Train Fast 202', availableSeats: { 'First Class': 5, 'Second Class': 15 } }
        ];

        trains.forEach(train => {
            const trainDiv = document.createElement('div');
            trainDiv.classList.add('train');
            trainDiv.innerHTML = `
                <h3>${train.name}</h3>
                <div class="details">
                    <p><strong>Available Seats:</strong></p>
                    <ul>
                        ${Object.entries(train.availableSeats).map(([classType, seats]) => `<li>${classType}: ${seats} seats</li>`).join('')}
                    </ul>
                </div>
                <button class="btn" onclick="viewTrainDetails(${train.id})">View Details</button>
            `;
            resultsContainer.appendChild(trainDiv);
        });
    });

    // View Train Details Function
    window.viewTrainDetails = function(trainId) {
        // Redirect to train details page or show detailed information
        alert(`Viewing details for Train ID: ${trainId}`);
        // For demonstration, redirecting to a dummy details page
        // window.location.href = `trainDetails.html?id=${trainId}`;
    };

    // Handle Logout
    window.logout = function() {
        localStorage.removeItem('loggedIn');
        alert('Logged out successfully!');
        window.location.href = 'login.html'; // Redirect to login page
    };

    // Redirect to login if not logged in (on customer.html or other protected pages)
   
});
