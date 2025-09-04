const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = data
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      if (lines.length <= 1) {
        console.log('Number of students: 0');
        resolve();
        return;
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
          if (!groups[field]) {
            groups[field] = [];
          }
          groups[field].push(firstname);
          total += 1;
        }
      }

      console.log(`Number of students: ${total}`);
      Object.keys(groups).forEach((f) => {
        const list = groups[f];
        console.log(`Number of students in ${f}: ${list.length}. List: ${list.join(', ')}`);
      });

      resolve();
    });
  });
}

module.exports = countStudents;
