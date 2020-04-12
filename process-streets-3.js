"use strict";

const fs = require ('fs')
const path = require ('path')
const https = require ('https')

const request_url = "https://www.overpass-api.de/api/interpreter"
const request_data = "[out:json];way(ID);(._;>;);out body;"

const getStreetNodes = () => {
  return new Promise ((resolve, reject) => {
    const id = 100017851
    const url = request_url + "?data=" + request_data.replace ("ID", id)
    
    https.get (url, (resp) => {
      let data = '';

      resp.on('data', (chunk) => {
        data += chunk;
      });
      resp.on('end', () => {
        console.log(JSON.parse(data));
        resolve ()
      });
    }).on("error", (err) => {
      reject ("Error: " + err.message);
    });

    resolve ()
  })
}

getStreetNodes ()
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))

