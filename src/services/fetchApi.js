async function FetchApiResolved(perguntas, token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=${perguntas}&token=${token}`);
  const data = await response.json();

  console.log(data);

  return data;
}

export default async function FetchApi() {
  // return async (dispatch) => {
  // try {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  const NUMBER_FIVE = 5;
  console.log(typeof (data.token));
  localStorage.setItem('token', data.token);
  // console.log(data.token);
  // return data.token;
  return FetchApiResolved(NUMBER_FIVE, data.token);
  // await response.json().then((data) => dispatch(getExpenses(Object.keys(data))));
  // } catch (error) {
  //   console.error(error);
  // }
  // };
}
