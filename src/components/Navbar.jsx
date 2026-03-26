// Navbar.jsx - Navigation component for the app
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">📚 Study Companion</h1>
        
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/subjects" className="nav-link">Subjects</Link>
          </li>
          <li>
            <Link to="/tasks" className="nav-link">Tasks</Link>
          </li>
          <li>
            <Link to="/ai-tools" className="nav-link">AI Tools</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
