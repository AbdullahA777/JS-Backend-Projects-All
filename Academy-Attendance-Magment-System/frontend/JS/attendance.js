document.addEventListener('DOMContentLoaded', () => {
    const attendanceList = document.getElementById('attendanceList');
  
    const fetchAttendance = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/users/showTodayAttendance'); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok OR todays attendance was not found ');
        }
        const data = await response.json();
  
        if (!data.success) {
          throw new Error(data.message || 'Failed to fetch attendance records');
        }
  
        displayAttendance(data.data);
      } catch (error) {
        console.error('Error fetching Attendace records:', error);
        attendanceList.innerHTML = `<div>Error: ${error.message}</div>`;
      }
    };
  
    const displayAttendance = (records) => {
      if (records.length === 0) {
        attendanceList.innerHTML = '<p>No attendance records found for today.</p>';
        return;
      }
  
      attendanceList.innerHTML = records.map(record => {
        const presentStudentsCount = record.students.filter(student => student.attended).length;
        const absentStudentsCount = record.students.filter(student => !student.attended).length;
  
        return `
          <div class="record">
            <p><strong>Instructor Name:</strong> ${record.insName}</p>
            <p><strong>Level:</strong> ${record.level}</p>
            <p><strong>Total Strength:</strong> ${record.students.length}</p>
            <p><strong>Present Strength:</strong> ${presentStudentsCount}</p>
            <p><strong>Absent Strength:</strong> ${absentStudentsCount}</p>
  
            <div class="students-list mt-5">
              <h3>Students:</h3>
              ${record.students.map(student => `
                <div class="student">
                  <span>${student.name}</span>
                  <span class="status">
                    ${student.attended ? '<i class="fa fa-check"></i>' : '<i class="fa fa-times"></i>'}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');
    };
  
    fetchAttendance();
  });
  