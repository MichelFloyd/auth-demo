import '../App.css';
import './Private.css';

import { gql, useQuery } from '@apollo/client';

import { Spinner } from '../components/Spinner';

const ME = gql`
  query {
    me {
      id
      username
      nickname
    }
  }
`;

interface Props {
  isLoggedIn: boolean;
  setLastUpdate: React.Dispatch<React.SetStateAction<Date>>;
}

export const Private: React.FC<Props> = ({ isLoggedIn, setLastUpdate }) => {
  const { data, loading, error, refetch } = useQuery(ME);
  const refetchHandler = () => refetch().then(() => setLastUpdate(new Date()));

  if (!isLoggedIn)
    return (
      <div>
        <div>Private Route</div>
        <div>Not logged in!</div>
      </div>
    );
  else if (loading) return <Spinner />;
  else if (error)
    return (
      <div className="container">
        <div>Error loading data: {error.message}</div>
      </div>
    );
  else {
    const { id, username, nickname } = data.me;
    return (
      <div className="container">
        <div>Private Route</div>
        <div className="h1">User Profile</div>
        <div className="label">
          id:
          <span className="value">{id}</span>
        </div>
        <div className="label">
          username:
          <span className="value">{username}</span>
        </div>
        <div className="label">
          nickname:
          <span className="value">{nickname}</span>
        </div>
        <button onClick={refetchHandler}>Refetch</button>
      </div>
    );
  }
};
