import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__info">
          <span className="footer__text">© 2024 Тренболон. All Rights Reserved.</span>
        </div>
        <div className="footer__links">
          <Link to="/auth" className="footer__link">О команде</Link>
          <Link to="/home" className="footer__link">Контакты</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
