import '../App.css';

import { clearTokens, hasValidTokens } from '../util/tokens';

import { Login } from '../components/Login';
import { Profile } from '../components/Profile';
import { useEffect } from 'react';

interface Props {
  isLoggedIn: boolean;
}

export const Private: React.FC<Props> = ({ isLoggedIn }) => {
  return (
    <div className="container">
      {isLoggedIn ? <Profile /> : <span>Not logged in!</span>}
    </div>
  );
};
