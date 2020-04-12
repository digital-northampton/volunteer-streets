"use strict";

const fs = require ('fs')
const path = require ('path')

const streets_data_url = "docs/streets.json"
const streets_output_dir = "data/streets/"
const volunteer_output_dir = "data/volunteers/"

let streets_data

const clearDirs = (directories) => {
  return new Promise ((resolve, reject) => {
    directories.forEach (directory => {
      fs.readdir(directory, (err, files) => {
        if (err) {
          reject (err)
        }

        for (const file of files) {
          fs.unlink(path.join(directory, file), err => {
            if (err) {
              reject (err)     
            }
          });
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
        // console.log (streets_data)
        resolve ()
      }
    })
  })
}

clearDirs ([streets_output_dir, volunteer_output_dir])
  .then (loadStreetsJSON)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))