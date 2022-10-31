export const users = [
  {
    id: 1,
    username: 'foo',
    nickname: 'bar',
    hash: 'xyz',
  },
  {
    id: 2,
    username: 'twiddle',
    nickname: 'dee',
    hash: 'abc',
  },
];

export const findUserByUserName = (username) =>
  users.find((user) => user.username === username);
