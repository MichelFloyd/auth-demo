import './Layout.css';

import { useEffect, useState } from 'react';

import { DisplayToken } from './DisplayToken';
import { Login } from './Login';
import { Private } from './Private';
import { Public } from './Public';
import { getTokens } from '../util/tokens';

export const Layout = () => {
  const [isLoggedIn, setLogin] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [tokens, setTokens] = useState(getTokens());

  useEffect(() => {
    setTokens(getTokens());
  }, [isLoggedIn, lastUpdate]);

  return (
    <div className="grid">
      <div>
        <Login isLoggedIn={isLoggedIn} setLogin={setLogin} />
      </div>
      <div>
        <Public />
      </div>
      <div>
        <Private isLoggedIn={isLoggedIn} setLastUpdate={setLastUpdate} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <DisplayToken token={tokens.accessToken} name="accessToken" />
        <DisplayToken token={tokens.refreshToken} name="refreshToken" />
      </div>
    </div>
  );
};
