const API_URL = 'http://localhost:5000/api/v1/users/signup';

        document.getElementById('instructorForm').addEventListener('submit', async function (event) {
            event.preventDefault();

            const fullName = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const password = document.querySelector('#password').value.trim();
            const level = document.querySelector('#level').value.trim();
            const handleResponse = document.querySelector('#message');

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fullName, email, level, password })
                });

                const data = await response.json();

                if (response.ok) {
                    handleResponse.textContent = data.message;
                    handleResponse.style.color = 'green'; // Success message color
                } else {
                    handleResponse.textContent = data.message || 'Sign up failed';
                    handleResponse.style.color = 'red'; // Error message color
                }

                console.log(data);
            } catch (error) {
                console.error('Error while fetching:', error);
                handleResponse.textContent = 'An error occurred. Please try again later.';
                handleResponse.style.color = 'red'; // Error message color
            }
        });
