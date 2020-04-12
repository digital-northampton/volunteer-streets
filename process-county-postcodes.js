"use strict";

const neatCsv = require ('neat-csv')
const fs = require ('fs')

const loadCountyPostcodes = () => {
  return new Promise ((resolve, reject) => {
    resolve ()
  })
}

loadCountyPostcodes ()
  .then (() => console.log ("🔥"))
  .catch (e => console.log (e))