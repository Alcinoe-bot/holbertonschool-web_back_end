export default function getResponseFromAPI() {
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve('OK'), 1000);
  });
  return promise;
}
