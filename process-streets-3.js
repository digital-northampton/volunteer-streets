"use strict";

const fs = require ('fs')
const path = require ('path')
const https = require ('https')

const street_data_dir = "data/streets/"
const request_url = "https://www.overpass-api.de/api/interpreter"
const request_data = "[out:json];way(ID);(._;>;);out body;"

let ids
let index = 0

const getIDs = () => {
  return new Promise ((resolve, reject) => {
    const files = fs.readdirSync (street_data_dir)

    ids = files
            .filter (f => f.indexOf (".json") > -1)
            .map (f => f.replace (".json", ""))
            .map (f => parseInt (f))
    
    //tmp
    ids = ids.slice (0, 2)

    resolve ()
  })
}

const getStreetNodes = () => {
  return new Promise ((resolve, reject) => {
    const id = ids[index]
    const url = request_url + "?data=" + request_data.replace ("ID", id)

    https.get (url, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });

      resp.on('end', () => {
        const nodes = JSON.parse (data).elements.filter (n => n.type == 'node')
        const percent = Math.round (100*index/ids.length)

        const filename = street_data_dir + id + ".json"

        const rawdata = fs.readFileSync (filename)
        const street = JSON.parse (rawdata)
        street.nodes = nodes
        const output_file = fs.openSync (filename, 'w')
        fs.writeFileSync (output_file, JSON.stringify (street))

        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(percent + '% Streets');
        
        index++
        if (ids [index] == undefined) {
          resolve ()
          return;
        }

        getStreetNodes ()
          .catch (() => reject ())
      });
    }).on("error", (err) => {
      reject ("Error: " + err.message);
    });
  })
}

getIDs ()
  .then (getStreetNodes)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))

