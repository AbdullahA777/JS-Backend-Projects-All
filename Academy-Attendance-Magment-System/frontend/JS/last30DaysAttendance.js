document.addEventListener('DOMContentLoaded', () => {
  const attendanceList = document.getElementById('attendanceList');

  const fetchAttendance = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/users/showLast30DaysAttendance'); // Adjust the URL as needed
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch attendance records');
      }
      console.log(data.data);

      displayAttendance(data.data);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      attendanceList.innerHTML = `<div>Error: ${error.message}</div>`;
    }
  };

  const displayAttendance = (groupedRecords) => {
    if (Object.keys(groupedRecords).length === 0) {
      attendanceList.innerHTML = '<p>No attendance records found for the last 30 days.</p>';
      return;
    }
    console.log(Object.keys(groupedRecords));

    attendanceList.innerHTML = Object.keys(groupedRecords).map(instructorName => {
      const records = groupedRecords[instructorName];
      console.log(groupedRecords[instructorName]);
      // Group records by date
      const recordsByDate = records.reduce((acc, record) => {
        const date = new Date(record.createdAt).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(record);
        return acc;
      }, {});

      return `
        <div class="instructor-record">
          <h2>Instructor Name: ${instructorName}</h2>
          ${Object.keys(recordsByDate).map(date => {
            const recordsForDate = recordsByDate[date];

            return `
              <div class="date-record">
                <h3>Date: ${date}</h3>
                ${recordsForDate.map(record => {
                  const presentStudentsCount = record.students.filter(student => student.attended).length;
                  const absentStudentsCount = record.students.filter(student => !student.attended).length;

                  return `
                    <div class="record">
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
                }).join('')}
              </div>
            `;
          }).join('')}
        </div>
      `;
    }).join('');
  };

  fetchAttendance();
});
