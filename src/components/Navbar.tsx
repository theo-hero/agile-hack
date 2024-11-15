import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__links">
        <Link to="/" className="navbar__link">Главная</Link>
        <Link to="/sprints" className="navbar__link">Спринты</Link>
        <Link to="/analytics" className="navbar__link">Аналитика</Link>
        <Link to="/team" className="navbar__link">Команда</Link>
      </div>
      <div className="navbar__user">
        <span className="navbar__user-name">Пользователь</span>
      </div>
    </nav>
  );
};

export default Navbar;
