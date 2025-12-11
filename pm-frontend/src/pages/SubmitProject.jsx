import { useState } from 'react';
import axios from 'axios';

function SubmitProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [techStack, setTechStack] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/projects/submit', {
        name,
        description,
        techStack: techStack.split(',').map(tech => tech.trim()), // Convert string to array
      }, { withCredentials: true });

      console.log('Project submitted:', response.data);
      // Redirect to dashboard or show success message
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
      <h2>Submit Your Open Source Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Tech Stack (comma separated)"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Project</button>
      </form>
    </div>
  );
}

export default SubmitProject;
