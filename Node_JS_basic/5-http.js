const http = require('http');
const fs = require('fs').promises;

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

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    res.statusCode = 200;
    const dbPath = process.argv[2];
    try {
      const lines = await buildStudentsReport(dbPath);
      const body = ['This is the list of our students', ...lines].join('\n');
      res.end(body);
    } catch (err) {
      res.end(`This is the list of our students\n${err.message}`);
    }
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
});

app.listen(1245);

module.exports = app;
