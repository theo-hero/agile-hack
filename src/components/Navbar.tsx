import { Link } from 'react-router-dom';

interface navProps {
  setAdd: (arg: boolean) => void;
}

const Navbar = ({setAdd}: navProps) => {
  return (
    <nav className="navbar">
      <div className="navbar__links">
        <Link to="/sprints" className="navbar__link">Спринты</Link>
        {/* <Link to="/teams" className="navbar__link">Команды</Link> */}
        <Link to="/" className="navbar__link"></Link>
      </div>
      <div className="navbar__addfile">
        <button onClick={() => setAdd(true)} className="navbar__button">Добавить файл</button>
      </div>
    </nav>
  );
};

export default Navbar;
