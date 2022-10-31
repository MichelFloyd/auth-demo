export interface tUser {
  id: number;
  username: string;
  nickname: string;
  hash: string;
}

export const users = [
  {
    id: 1,
    username: 'foo',
    nickname: 'bar',
    hash: '$2b$11$Jc404/6L0GJ6glN3Ow.5huXuraZKFkAV7vv4.LOg7DRscbLQmxoGS', // 'notArealPassword'
  },
  {
    id: 2,
    username: 'twiddle',
    nickname: 'dee',
    hash: '$2b$11$AsFCQi.suXHSUY4UDMN0veUJO6Zf8KxoUkBlVcXDqJ0irA4zikeuK', // 'notArealPasswordEither'
  },
];

export const findUserByUserName = (username) =>
  users.find((user) => user.username === username);
