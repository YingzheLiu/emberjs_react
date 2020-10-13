export function fetchData(url) {
  return fetch(url, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      console.log(response.status);
      if (response.status >= 400) {
        return Promise.reject();
      }
      return response.json();
    })
    .then((responseData) => {
      return responseData;
    });
}
