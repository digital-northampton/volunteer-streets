"use strict";

const fs = require ('fs')
const path = require ('path')

const streets_data_url = "docs/streets.json"
const volunteer_data_url = "data/volunteers.json"
const streets_output_dir = "data/streets/"
const volunteer_output_dir = "data/volunteers/"

let streets_data
let volunteer_data

const clearDirs = (directories) => {
  return new Promise ((resolve, reject) => {
    directories.forEach (directory => {
      fs.readdir(directory, (err, files) => {
        if (err) {
          reject (err)
        }

        for (const file of files) {
          if (file != ".gitignore") {
            fs.unlink(path.join(directory, file), err => {
              if (err) {
                reject (err)     
              }
            });
          }
        }
      });
    })

    resolve ()
  })
}

const loadStreetsJSON = () => {
  return new Promise ((resolve, reject) => {
    fs.readFile (streets_data_url, function (err, data) {
      if (err) {
        reject (err)
      } else {
        streets_data = JSON.parse (data)
        resolve ()
      }
    })
  })
}

const loadVolunteerJSON = () => {
  return new Promise ((resolve, reject) => {
    fs.readFile (volunteer_data_url, function (err, data) {
      if (err) {
        reject (err)
      } else {
        volunteer_data = JSON.parse (data)
        resolve ()
      }
    })
  })
}

const makeStreetData = () => {
  return new Promise ((resolve, reject) => {

    console.log ("writing streets")

    streets_data.forEach ((s,i) => {
      const filename = streets_output_dir + s.id + ".json"
      const output_file = fs.openSync (filename, 'w');
      const data = JSON.stringify (s)
      fs.writeFileSync (output_file, data);

      const percent = Math.round (100*i/streets_data.length)
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(percent + '% Streets');
    })
    resolve ()
  })
}

const makeVolunteerData = () => {
  return new Promise ((resolve, reject) => {

    console.log ("writing colunteers")

    volunteer_data.forEach ((v,i) => {
      const stub = v.postcode.toLowerCase ().replace (/ /g, "-")
      const filename = volunteer_output_dir + stub + ".json"
      const output_file = fs.openSync (filename, 'w');
      const data = JSON.stringify (v)
      fs.writeFileSync (output_file, data);

      const percent = Math.round (100*i/volunteer_data.length)
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(percent + '% Volunteers');
    })
    resolve ()
  })
}

clearDirs ([streets_output_dir, volunteer_output_dir])
  .then (loadStreetsJSON)
  .then (loadVolunteerJSON)
  .then (makeStreetData)
  .then (makeVolunteerData)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))

// { id: '3365689', name: 'Grass Close' },