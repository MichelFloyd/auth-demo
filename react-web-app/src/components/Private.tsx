import '../App.css';

import { clearTokens, hasValidTokens } from '../util/tokens';
import { useEffect, useState } from 'react';

import { Login } from '../components/Login';
import { Profile } from '../components/Profile';

export const Private = () => {
  const [isLoggedIn, setLogin] = useState(false);
  useEffect(() => setLogin(hasValidTokens()), []);

  return (
    <div className="container">
      {isLoggedIn ? (
        <>
          <Profile />
          {/* <Button
            title="Logout"
            onPress={() => {
              clearTokens();
              setLogin(false);
            }}
          /> */}
        </>
      ) : (
        <Login setLoggedIn={setLogin} />
      )}
    </div>
  );
};
