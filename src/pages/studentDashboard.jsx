import "../styles/StudentDashboard.css"

function StudentDashboard({ student }) {
  if (!student) return <p>Loading...</p>;

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p><strong>Name:</strong> {student.name}</p>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Department:</strong> {student.department}</p>
      <p><strong>Courses:</strong> {student.courses.join(", ")}</p>
      <p><strong>Upcoming Events:</strong> {student.upcomingEvents.join(", ")}</p>
    </div>
  );
}

export default StudentDashboard;
