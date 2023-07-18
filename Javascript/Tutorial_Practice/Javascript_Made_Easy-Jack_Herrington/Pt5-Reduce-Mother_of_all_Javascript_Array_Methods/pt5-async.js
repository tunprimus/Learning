function getById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Got ${id}`);
      resolve(id);
    }, 1000);
  });
}

/* 
(async function () {
  const ids = [10, 20, 30];
  ids.forEach(async (id) => {
    await getById(id);
  });
})();
 */

const ids = [10, 20, 30];

ids.reduce(async (promise, id) => {
  await promise;
  return getById(id);
}, Promise.resolve());