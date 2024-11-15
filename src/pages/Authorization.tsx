import { useState } from 'react';

const Authorization = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="authorization">
      <div className="authorization__box">
        <div className="authorization__header">
          <button
            className={`authorization__button ${isLogin ? 'active' : ''}`}
            onClick={toggleForm}
          >
            Войти
          </button>
          <button
            className={`authorization__button ${!isLogin ? 'active' : ''}`}
            onClick={toggleForm}
          >
            Зарегистрироваться
          </button>
        </div>

        <form className="authorization__form">
          <div className="authorization__input-group">
            <label htmlFor="email" className="authorization__label">Email</label>
            <input
              type="email"
              id="email"
              className="authorization__input"
              placeholder="tyler_durden@beer.com"
              required
            />
          </div>

          <div className="authorization__input-group">
            <label htmlFor="password" className="authorization__label">Пароль</label>
            <input
              type="password"
              id="password"
              className="authorization__input"
              placeholder="Не менее шести символов"
              required
            />
          </div>

          {!isLogin && (
            <div className="authorization__input-group">
              <label htmlFor="confirmPassword" className="authorization__label">Подтвердите пароль</label>
              <input
                type="password"
                id="confirmPassword"
                className="authorization__input"
                placeholder="Пароли должны совпадать"
                required
              />
            </div>
          )}

          <button type="submit" className="authorization__submit">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authorization;
