import './Layout.css';

import { useEffect, useState } from 'react';

import { DisplayToken } from './DisplayToken';
import { Login } from './Login';
import { Private } from './Private';
import { Public } from './Public';
import { getTokens } from '../util/tokens';

export const Layout = () => {
  const [isLoggedIn, setLogin] = useState(false);
  const [tokens, setTokens] = useState(getTokens());

  useEffect(() => {
    setTokens(getTokens());
  }, [isLoggedIn]);

  return (
    <div className="grid">
      <div>
        <Public />
      </div>
      <div>
        <Login isLoggedIn={isLoggedIn} setLogin={setLogin} />
      </div>
      <div>
        <Private isLoggedIn={isLoggedIn} />
      </div>
      <div>
        <DisplayToken token={tokens.accessToken} name="accessToken" />
        <DisplayToken token={tokens.refreshToken} name="refreshToken" />
      </div>
    </div>
  );
};
