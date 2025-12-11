import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [myProjects, setMyProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Not logged in", err);
        window.location.href = "/login";
      });

    // Get my projects
    axios
      .get("http://localhost:5000/api/projects/my", { withCredentials: true })
      .then((res) => setMyProjects(res.data))
      .catch((err) => console.error("Error fetching my projects", err));

    // Get all projects
    axios
      .get("http://localhost:5000/api/projects/all")
      .then((res) => setAllProjects(res.data))
      .catch((err) => console.error("Error fetching all projects", err));
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

      <h3>My Projects</h3>
      {myProjects.length === 0 ? <p>No projects yet.</p> : (
        <div>
          {myProjects.map((project) => (
            <div key={project._id} style={{ border: '1px solid #ddd', margin: '10px', padding: '10px' }}>
              <h4>{project.name}</h4>
              <p>{project.description}</p>
              <small>Tech: {project.techStack.join(", ")}</small>
            </div>
          ))}
        </div>
      )}

      <h3>Explore Projects</h3>
      <div>
        {allProjects.map((project) => (
          <div key={project._id} style={{ border: '1px solid #eee', margin: '10px', padding: '10px', background: '#f9f9f9' }}>
            <h4>{project.name}</h4>
            <p>{project.description}</p>
            <p><strong>Owner:</strong> {project.owner?.username || "Unknown"}</p>
            <p>Tech Stack: {project.techStack.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
