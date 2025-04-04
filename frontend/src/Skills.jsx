import React, { useState } from 'react';

const Skills = () => {
  const [skills] = useState([
    { name: 'JavaScript', category: 'Frontend Development' },
    { name: 'React', category: 'Frontend Development' },
    { name: 'Node.js', category: 'Backend Development' },
    { name: 'Express', category: 'Backend Development' },
    { name: 'CSS', category: 'Frontend Development' },
    { name: 'Python', category: 'Programming Languages' },
    { name: 'SDLC (Software Development Life Cycle)', category: 'Project Management' },
    { name: 'Resource Planning', category: 'Project Management' },
    { name: 'Jira', category: 'Project Management Tools' },
    { name: 'Java', category: 'Programming Languages' },
    { name: 'PHP', category: 'Programming Languages' },
    { name: 'C/C++', category: 'Programming Languages' },
    { name: 'SQL (Postgres)', category: 'Database Management' },
    { name: 'HTML', category: 'Frontend Development' },
    { name: 'Call handling', category: 'Customer Service' },
    { name: 'Issue resolution', category: 'Customer Service' },
    { name: 'Documentation', category: 'Customer Service' },
    { name: 'Customer engagement', category: 'Sales' },
    { name: 'Product knowledge', category: 'Sales' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase()) && (selectedCategory ? skill.category === selectedCategory : true)
  );

  return (
    <div className="container mt-5">
      <h2>Skills</h2>
      <input type="text" placeholder="Search available skills..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control mb-4"/>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="form-control mb-4">
        <option value="">All Categories</option>
        <option value="Frontend Development">Frontend Development</option>
        <option value="Backend Development">Backend Development</option>
        <option value="Programming Languages">Programming Languages</option>
        <option value="Project Management">Project Management</option>
        <option value="Project Management Tools">Project Management Tools</option>
        <option value="Database Management">Database Management</option>
        <option value="Customer Service">Customer Service</option>
        <option value="Sales">Sales</option>
      </select>
      <ul>
        {filteredSkills.map((skill, index) => (
          <li key={index}>
            <strong>{skill.name}</strong> - {skill.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;