// Tasks.jsx - Manage study tasks with filtering
import { useState, useEffect } from 'react';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Load tasks from localStorage when component mounts
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Add a new task
  const handleAddTask = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a task title');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: inputValue,
      status: 'Pending'
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setInputValue('');
  };

  // Toggle task status between Pending and Completed
  const handleToggleStatus = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: task.status === 'Pending' ? 'Completed' : 'Pending'
          }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // Get tasks based on filter
  const getFilteredTasks = () => {
    if (filterStatus === 'All') return tasks;
    if (filterStatus === 'Pending') return tasks.filter((t) => t.status === 'Pending');
    if (filterStatus === 'Completed') return tasks.filter((t) => t.status === 'Completed');
    return tasks;
  };

  const filteredTasks = getFilteredTasks();

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="tasks">
      <h2>✅ Tasks</h2>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter task title (e.g., Complete Chapter 5)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          className="text-input"
        />
        <button onClick={handleAddTask} className="btn btn-primary">
          Add Task
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filterStatus === 'All' ? 'active' : ''}`}
          onClick={() => setFilterStatus('All')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filterStatus === 'Pending' ? 'active' : ''}`}
          onClick={() => setFilterStatus('Pending')}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filterStatus === 'Completed' ? 'active' : ''}`}
          onClick={() => setFilterStatus('Completed')}
        >
          Completed
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty-message">
          {filterStatus === 'All'
            ? 'No tasks yet. Create your first task!'
            : `No ${filterStatus.toLowerCase()} tasks.`}
        </p>
      ) : (
        <div className="tasks-list">
          {filteredTasks.map((task) => (
            <div key={task.id} className={`task-card ${task.status.toLowerCase()}`}>
              <div className="task-content">
                <h3>{task.title}</h3>
                <span className={`status-badge ${task.status.toLowerCase()}`}>
                  {task.status}
                </span>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => handleToggleStatus(task.id)}
                  className={`btn ${task.status === 'Pending' ? 'btn-success' : 'btn-warning'}`}
                >
                  {task.status === 'Pending' ? 'Mark Complete' : 'Mark Pending'}
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
