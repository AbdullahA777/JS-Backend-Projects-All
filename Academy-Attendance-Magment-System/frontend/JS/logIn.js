const API_URL = 'http://localhost:5000/api/v1/users/login';

        document.getElementById('login-form').addEventListener('submit', async function (event) {
            event.preventDefault();

            const email = document.querySelector('#email').value.trim();
            const password = document.querySelector('#password').value.trim();
            const handleResponse = document.querySelector('#message');

            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (response.ok) {
                    console.log(data);
                    localStorage.setItem('id', data.data.user._id); // Store level
                    localStorage.setItem('level', data.data.user.level); // Store level
                    localStorage.setItem('insName', data.data.user.fullName); // Store InsName
                    handleResponse.textContent = data.message;
                    handleResponse.style.color = 'green'; // Success message color
                    window.location.href = 'file:///D:/D%20Drive%20Data/PROJECTS/Backend%20Projects/Sign%20up%20&%20Log%20In/frontend/userDash.html'; // Redirect to dashboard or another URL
                } else {
                    handleResponse.textContent = data.message || 'Login failed';
                    handleResponse.style.color = 'red'; // Error message color
                }

            } catch (error) {
                console.error('Error while fetching:', error);
                handleResponse.textContent = 'An error occurred. Please try again later.';
                handleResponse.style.color = 'red'; // Error message color
            }
        });


        // userDashJS
