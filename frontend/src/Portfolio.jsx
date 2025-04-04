import React, { useState, useEffect } from 'react';

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/.netlify/functions/server');

        if (!response.ok) {
          throw new Error('Response was incorrect');
        }

        const data = await response.json();
        console.log('Projects fetched:', data);

        if (Array.isArray(data)) {
          setProjects(data);
        } else {
          throw new Error('Data is not formatted as an Array');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError(error.message);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Projects</h2>
      {error ? (
        <p className="text-danger">Error: {error}</p>
      ) : (
        <>
          <input type="text" placeholder="Search available projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control mb-4"/>
          <ul>
            {filteredProjects.map((project, index) => (
              <div key={index} style={{ marginBottom: '1rem' }}>
                <li>
                  <strong>{project.name}</strong> - {project.description}
                  <p><strong>Author:</strong> {project.author}</p>
                  <p><strong>Languages:</strong> {project.languages.join(', ')}</p>
                </li>
              </div>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Portfolio;