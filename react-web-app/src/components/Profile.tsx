import '../App.css';

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

export const Profile = () => {
  const { data, loading, error } = useQuery(ME);

  if (loading) return <Spinner />;
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
        <div className="h1">User Profile - Private Route</div>
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
      </div>
    );
  }
};
