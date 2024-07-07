document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:5000/api/v1/users/instructors")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const container = document.getElementById("instructors-container");
            data.forEach(instructor => {
                const card = document.createElement("div");
                card.className = "col-md-4";
                card.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${instructor.fullName}</h5>
                            <p class="card-text">Email: ${instructor.email}</p>
                            <p class="card-text">Class: ${instructor.level}</p>
                            <button class="btn btn-danger" onclick="removeInstructor('${instructor._id}')">Remove</button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function removeInstructor(id) {
    fetch(`http://localhost:5000/api/v1/users/deleteInstructor/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        location.reload();
    })
    .catch(error => console.error('Error removing instructor:', error));
}
