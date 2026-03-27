import { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    totalSubjects: 0
  });

  // Load data from localStorage when component mounts
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
    
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const pending = tasks.filter(t => t.status === 'Pending').length;
    
    setStats({
      totalTasks: tasks.length,
      completedTasks: completed,
      pendingTasks: pending,
      totalSubjects: subjects.length
    });
  }, []);

  // Rerun effect when localStorage changes (using a simple polling approach)
  useEffect(() => {
    const interval = setInterval(() => {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const subjects = JSON.parse(localStorage.getItem('subjects')) || [];
      
      const completed = tasks.filter(t => t.status === 'Completed').length;
      const pending = tasks.filter(t => t.status === 'Pending').length;
      
      setStats({
        totalTasks: tasks.length,
        completedTasks: completed,
        pendingTasks: pending,
        totalSubjects: subjects.length
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard-layout">
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Subjects</h3>
            <p className="stat-number">{stats.totalSubjects}</p>
          </div>

          <div className="stat-card">
            <h3>Total Tasks</h3>
            <p className="stat-number">{stats.totalTasks}</p>
          </div>

          <div className="stat-card completed">
            <h3>Completed Tasks</h3>
            <p className="stat-number">{stats.completedTasks}</p>
          </div>

          <div className="stat-card pending">
            <h3>Pending Tasks</h3>
            <p className="stat-number">{stats.pendingTasks}</p>
          </div>
        </div>

        <div className="dashboard-side">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
