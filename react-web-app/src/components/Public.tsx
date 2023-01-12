import '../App.css';

import { gql, useQuery } from '@apollo/client';

import { Spinner } from '../components/Spinner';

const BOOKS = gql`
  query {
    books {
      id
      title
      author
    }
  }
`;

interface iBook {
  id: number;
  title: string;
  author: string;
}

export const Public = () => {
  const { data, error } = useQuery(BOOKS);
  if (data)
    return (
      <div className="container">
        <div>Public route</div>
        {data.books.map(({ id, title, author }: iBook) => (
          <div key={id} className="book">
            <div className="title">{title}</div>
            <div className="author">{author}</div>
          </div>
        ))}
      </div>
    );
  else if (error)
    return (
      <div className="container">
        <div>Error loading data: {error.message}</div>
      </div>
    );
  else return <Spinner />;
};
