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
      const data = await countStudents(process.argv[2]);
      res.end(`This is the list of our students\n${data.join('\n')}`);
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
