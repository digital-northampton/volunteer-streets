"use strict";

const fs = require ('fs')
const path = require ('path')

const street_data_dir = "docs/streets/"
const volunteer_data_path = "docs/volunteers.json"

let ids
let volunteers

const measure = (lat1, lon1, lat2, lon2) => {
  var R = 6378.137; // Radius of earth in KM
  var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
  return d * 1000; // meters
}

const getIDs = () => {
  return new Promise ((resolve, reject) => {
    const files = fs.readdirSync (street_data_dir)

    ids = files
            .filter (f => f.indexOf (".json") > -1)
            .map (f => f.replace (".json", ""))
            .map (f => parseInt (f))
    
    resolve ()
  })
}

const loadVolunteers = () => {
  return new Promise ((resolve, reject) => {
    const rawdata = fs.readFileSync (volunteer_data_path)
    volunteers = JSON.parse (rawdata)
    resolve ()
  })
}

const setPostcodes = () => {
  return new Promise ((resolve, reject) => {

    ids.forEach ((id, index) => {
      const filename = street_data_dir + id + ".json"
      const rawdata = fs.readFileSync (filename)
      const street = JSON.parse (rawdata)
      
      let closest_distance = 99999999999999;
      let closest_volunteer_postcode = "";

      street.nodes.forEach (n => {
        volunteers.forEach (v => {
          const m = Math.round (measure (v.lat, v.lng, n.lon, n.lat))
          // note n coords are wrong way round
          if (m < closest_distance) {
            closest_volunteer_postcode = v.postcode
            closest_distance = m
          }
        })
      })

      street.volunteer_postcode = closest_volunteer_postcode
      street.closest_distance = closest_distance

      const data = JSON.stringify (street)
      fs.writeFileSync (filename, data);
    })

    resolve ()
  })
}

getIDs ()
  .then (loadVolunteers)
  .then (setPostcodes)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))
