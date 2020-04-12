"use strict";

const fs = require ('fs')
const path = require ('path')

const street_data_dir = "data/streets/"
const volunteer_data_path = "data/volunteers.json"

let ids
let volunteers

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
		  		const a = parseFloat (v.lat) - parseFloat (n.lon)
					const b = parseFloat (v.lng) - parseFloat (n.lat)
					const c = Math.sqrt (a * a + b * b)

					if (c < closest_distance) {
						closest_volunteer_postcode = v.postcode
						closest_distance = c
					}
		  	})
	  	})

	  	street.volunteer_postcode = closest_volunteer_postcode
	  	console.log (index, ids.length)
  	})

  	resolve ()
  })
}

getIDs ()
	.then (loadVolunteers)
	.then (setPostcodes)
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))
