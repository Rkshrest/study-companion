// Subjects.jsx - Manage study subjects
import { useState, useEffect } from 'react';

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [subtopicInputs, setSubtopicInputs] = useState({});

  // Load subjects from localStorage when component mounts
  useEffect(() => {
    const savedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    setSubjects(savedSubjects);
  }, []);

  // Sync to localStorage
  const saveSubjects = (newSubjects) => {
    setSubjects(newSubjects);
    localStorage.setItem('subjects', JSON.stringify(newSubjects));
  };

  // Add a new subject
  const handleAddSubject = () => {
    if (inputValue.trim() === '') return;

    const newSubject = {
      id: Date.now(),
      name: inputValue,
      subtopics: []
    };

    saveSubjects([...subjects, newSubject]);
    setInputValue('');
  };

  // Delete a subject
  const handleDeleteSubject = (id) => {
    const updatedSubjects = subjects.filter(s => s.id !== id);
    saveSubjects(updatedSubjects);
  };

  // Handle subtopic input change
  const handleSubtopicInputChange = (subjectId, value) => {
    setSubtopicInputs({
      ...subtopicInputs,
      [subjectId]: value
    });
  };

  // Add a subtopic
  const handleAddSubtopic = (subjectId) => {
    const value = subtopicInputs[subjectId];
    if (!value || value.trim() === '') return;

    const updatedSubjects = subjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          subtopics: [...(subject.subtopics || []), { id: Date.now(), name: value, completed: false }]
        };
      }
      return subject;
    });

    saveSubjects(updatedSubjects);
    handleSubtopicInputChange(subjectId, '');
  };

  // Delete a subtopic
  const handleDeleteSubtopic = (subjectId, subtopicId) => {
    const updatedSubjects = subjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          subtopics: subject.subtopics.filter(st => st.id !== subtopicId)
        };
      }
      return subject;
    });
    saveSubjects(updatedSubjects);
  };

  // Toggle subtopic completion
  const handleToggleSubtopic = (subjectId, subtopicId) => {
    const updatedSubjects = subjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          subtopics: subject.subtopics.map(st => 
            st.id === subtopicId ? { ...st, completed: !st.completed } : st
          )
        };
      }
      return subject;
    });
    saveSubjects(updatedSubjects);
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
          onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
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
              <div className="subject-header">
                <h3>{subject.name}</h3>
                <button
                  onClick={() => handleDeleteSubject(subject.id)}
                  className="btn btn-danger btn-sm"
                  title="Delete subject"
                >
                  Delete
                </button>
              </div>

              <div className="subtopics-section">
                <div className="subtopic-input-row">
                  <input
                    type="text"
                    placeholder="Add a subtopic..."
                    value={subtopicInputs[subject.id] || ''}
                    onChange={(e) => handleSubtopicInputChange(subject.id, e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSubtopic(subject.id)}
                    className="text-input subtopic-input"
                  />
                  <button onClick={() => handleAddSubtopic(subject.id)} className="btn btn-secondary btn-sm">
                    Add
                  </button>
                </div>

                <div className="subtopics-list">
                  {(subject.subtopics || []).map(subtopic => (
                    <div key={subtopic.id} className={`subtopic-item ${subtopic.completed ? 'completed' : ''}`}>
                      <div className="subtopic-left">
                        <input 
                          type="checkbox" 
                          checked={subtopic.completed}
                          onChange={() => handleToggleSubtopic(subject.id, subtopic.id)}
                          className="subtopic-checkbox"
                        />
                        <span className="subtopic-name">{subtopic.name}</span>
                      </div>
                      <button 
                        onClick={() => handleDeleteSubtopic(subject.id, subtopic.id)}
                        className="btn btn-danger btn-sm outline-none border-none"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
