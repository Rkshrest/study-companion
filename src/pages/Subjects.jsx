// Subjects.jsx - Manage study subjects
import { useState, useEffect } from 'react';

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load subjects from localStorage when component mounts
  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    setSubjects(savedSubjects);
  }, []);

  // Add a new subject
  const handleAddSubject = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a subject name');
      return;
    }

    const newSubject = {
      id: Date.now(),
      name: inputValue
    };

    const updatedSubjects = [...subjects, newSubject];
    setSubjects(updatedSubjects);
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    setInputValue('');
  };

  // Delete a subject
  const handleDeleteSubject = (id) => {
    const updatedSubjects = subjects.filter(s => s.id !== id);
    setSubjects(updatedSubjects);
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSubject();
    }
  };

  return (
    <div className="subjects">
      <h2>Subjects</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter subject name (e.g., Mathematics)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="text-input"
        />
        <button onClick={handleAddSubject} className="btn btn-primary">
          Add Subject
        </button>
      </div>

      {subjects.length === 0 ? (
        <p className="empty-message">No subjects added yet. Start by adding your first subject!</p>
      ) : (
        <div className="subjects-list">
          {subjects.map((subject) => (
            <div key={subject.id} className="subject-card">
              <h3>{subject.name}</h3>
              <button
                onClick={() => handleDeleteSubject(subject.id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
