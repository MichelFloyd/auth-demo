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
        <div className="h1">User Profile</div>
        <div className="label">
          id:
          <div className="value"></div>
          {id}
        </div>
        <div className="label">
          <div className="value">username:</div>
          {username}
        </div>
        <div className="label">
          <div className="value">nickname:</div>
          {nickname}
        </div>
      </div>
    );
  }
};
