const http = require('http');
const countStudents = require('./3-read_file_async');

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.statusCode = 200;
    res.end('Hello Holberton School!');
    return;
  }

  if (req.url === '/students') {
    res.statusCode = 200;
    try {
      const lines = await countStudents(process.argv[2]);
      const body = ['This is the list of our students', ...(lines || [])].join('\n');
      res.end(body);
    } catch (error) {
      res.end(`This is the list of our students\n${error.message}`);
    }
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
});

app.listen(1245);
module.exports = app;
