
const userId = localStorage.getItem('id');
const level = localStorage.getItem('level');
const insName = localStorage.getItem('insName');
document.addEventListener('DOMContentLoaded', loadStudents);

function loadStudents() {
    fetch('http://localhost:5000/api/v1/users/students')
        .then(response => response.json())
        .then(data => {
            const studentList = document.getElementById('studentList');
            studentList.innerHTML = '';
            const filteredStudents = data.filter(student => student.userId == userId);
            filteredStudents.forEach(student => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerHTML = `
                    <div>
                        <input class="form-check-input ml-1" type="checkbox" id="flexCheckChecked" checked>
                        <label class="form-check-label ml-5" for="flexCheckChecked">${student.name}</label>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="removeStudent('${student._id}')">Remove</button>
                `;
                studentList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching students:', error));
}



const addStudent = async () => {
    const studentName = document.getElementById('studentName').value;
    console.log(userId);
    if (!studentName) {
        alert('Please enter a student name');
        return;
    }
    const data = {
        name: studentName,
        userId: userId
    };
    try {
        const response = await fetch('http://localhost:5000/api/v1/users/addStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const students = await response.json();
        loadStudents();
    } catch (error) {
        console.error('Error:', error);
    }
};



function removeStudent(id) {
    fetch(`http://localhost:5000/api/v1/users/deleteStudent/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        loadStudents();
    })
    .catch(error => {
        console.error('Error deleting student:', error);
    });
}



// SUBMIT ATTENDANCE LOGIC

function submitAttendance() {
    const studentListItems = document.querySelectorAll('#studentList .list-group-item');
    const students = [];

    studentListItems.forEach(item => {
        const studentName = item.querySelector('.form-check-label').innerText;
        const isChecked = item.querySelector('.form-check-input').checked;
        students.push({ name: studentName, attended: isChecked });
    });

    const data = {
        insName : insName,
        level : level,
        students: students
    };

    fetch('http://localhost:5000/api/v1/users/submitAttendance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        alert('Attendance submitted successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the attendance.');
    });
}
