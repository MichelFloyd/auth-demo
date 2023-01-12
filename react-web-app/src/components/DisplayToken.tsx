import { iToken } from '../util/tokens';
import jwt_decode from 'jwt-decode';

interface Props {
  token: string;
  name: string;
}

export const DisplayToken: React.FC<Props> = ({ token, name }) => {
  if (token) {
    const { exp, iat, user } = jwt_decode<iToken>(token);
    return (
      <div>
        {name}
        <div>Issued at (iat): {new Date(iat).toLocaleString()}</div>
        <div>Expires at(exp): {new Date(exp).toLocaleString()}</div>
        <div>user.id: {user.id}</div>
      </div>
    );
  } else return <div>No {name}!</div>;
};
