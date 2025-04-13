import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => {
        console.log("User data from backend:", res.data);  // Check data in console
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Not logged in", err);
        window.location.href = "/login";
      });

    // Get all projects
    axios
      .get("http://localhost:5000/api/projects/all")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error("Error fetching projects", err));
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/auth/logout", { withCredentials: true })
      .then(() => {
        window.location.href = "http://localhost:5173"; // Redirect to homepage
      })
      .catch((err) => console.error("Error logging out", err));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2>Welcome, {user.username}</h2>
      <img src={user.avatarUrl} alt="GitHub avatar" width="100" />
      <button onClick={handleLogout}>Logout</button>
      <h3>Your Projects</h3>
      <div>
        {projects.map((project) => (
          <div key={project._id}>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <p>Tech Stack: {project.techStack.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
