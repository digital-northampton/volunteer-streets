"use strict";

const parser = require ('fast-xml-parser')
const fs = require ('fs')

const streets_data_path = "data/streets.xml"

let streets_data

const loadStreetsXML = () => {
  return new Promise ((resolve, reject) => {
    fs.readFile (streets_data_path, (error, data) => {
      if (error) {
          reject (error);
        } else {
          resolve ()
        }
    })
  })
}

loadStreetsXML ()
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))