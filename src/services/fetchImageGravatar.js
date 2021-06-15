import md5 from 'crypto-js/md5';

export default async function FetchImageGravatar(email) {
  const hash = md5(email).toString();
  // console.log(hash);
  const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  const data = await response;
  // console.log(data.url);

  return data.url;
  // localStorage.setItem('token', data.token);
  // return FetchApiResolved(NUMBER_FIVE, data.token);
}
