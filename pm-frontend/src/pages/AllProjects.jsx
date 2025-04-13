import { useEffect, useState } from 'react';
import axios from 'axios';

function AllProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/projects/all")
      .then(res => setProjects(res.data))
      .catch(err => console.error("Failed to fetch projects:", err));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '3rem auto' }}>
      <h2>All Open Source Projects</h2>
      {projects.length === 0 ? (
        <p>No projects yet. Be the first to submit one, darling.</p>
      ) : (
        projects.map((proj) => (
          <div key={proj._id} style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem 0' }}>
            <h3>{proj.name}</h3>
            <p>{proj.description}</p>
            <p><strong>Tech Stack:</strong> {proj.techStack.join(', ')}</p>
            <div>
              <strong>Submitted by:</strong>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={proj.owner.avatarUrl} alt="User avatar" width="30" style={{ borderRadius: '50%' }} />
                <p style={{ marginLeft: '10px' }}>{proj.owner.username}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllProjects;
