const fs = require('fs');
const path = require('path');

let data = JSON.parse(fs.readFileSync(path.join(__dirname, '/../data.json')));

function set(chunk) {
  data = {
    ...data,
    ...chunk,
  };
  fs.writeFileSync(path.join(__dirname, '/../data.json'), JSON.stringify(data));
}

function get(key) {
  return data[key];
}

module.exports = {
  set,
  get,
};
