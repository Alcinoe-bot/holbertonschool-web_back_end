import readDatabase from './utils.js';

async function main() {
  try {
    const result = await readDatabase('database.csv');
    console.log(result);
  } catch (err) {
    console.log(err.message);
  }
}
main();
