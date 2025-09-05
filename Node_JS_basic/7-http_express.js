const express = require('express');
const fs = require('fs').promises;

const app = express();

async function buildStudentsReport(path) {
  try {
    const data = await fs.readFile(path, 'utf8');

    const lines = data
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    if (lines.length <= 1) {
      return ['Number of students: 0'];
    }

    const header = lines[0].split(',');
    const firstIndex = header.indexOf('firstname');
    const fieldIndex = header.indexOf('field');

    const groups = {};
    let total = 0;

    for (let i = 1; i < lines.length; i += 1) {
      const cols = lines[i].split(',').map((c) => c.trim());
      const firstname = cols[firstIndex];
      const field = cols[fieldIndex];

      if (firstname && field) {
        if (!groups[field]) groups[field] = [];
        groups[field].push(firstname);
        total += 1;
      }
    }

    const out = [`Number of students: ${total}`];
    Object.keys(groups).forEach((f) => {
      const list = groups[f];
      out.push(`Number of students in ${f}: ${list.length}. List: ${list.join(', ')}`);
    });

    return out;
  } catch (e) {
    throw new Error('Cannot load the database');
  }
}

app.get('/', (req, res) => {
  res.type('text/plain');
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  res.type('text/plain');
  const title = 'This is the list of our students';
  const dbPath = process.argv[2];

  try {
    const lines = await buildStudentsReport(dbPath);
    res.send([title, ...lines].join('\n'));
  } catch (err) {
    res.send(`${title}\n${err.message}`);
  }
});

app.listen(1245);

module.exports = app;
