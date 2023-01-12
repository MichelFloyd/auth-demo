import '../App.css';

import { clearTokens, hasValidTokens } from '../util/tokens';

import { Login } from '../components/Login';
import { Profile } from '../components/Profile';
import { useEffect } from 'react';

interface Props {
  isLoggedIn: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Private: React.FC<Props> = ({ isLoggedIn, setLogin }) => {
  useEffect(() => setLogin(hasValidTokens()), [setLogin]);

  const logout = () => {
    clearTokens();
    setLogin(false);
  };

  return (
    <div className="container">
      {isLoggedIn ? (
        <>
          <Profile />
          <button className="button" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <Login setLoggedIn={setLogin} />
      )}
    </div>
  );
};
