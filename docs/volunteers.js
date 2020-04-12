'use strict'

var data_url = "https://digital-northampton.github.io/volunteer-streets/volunteers.json"

$ (document).ready (function () {
  var $table = $("table#volunteers")
  var $button = $("button#download")

  var numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var addRow = function (volunteer) {
    var html = ""

    html += "<tr>"
    html += "<td>"+volunteer.postcode+"</td>"
    html += "</tr>"

    $table.find ("tbody").append (html)
  }

  $.getJSON (data_url, function (data) {    
    data.forEach (volunteer => {
      addRow (volunteer)
    })
  })

  $button.bind ("click", function () {
    $table.first().table2csv({filename: 'postcodes.csv'});
  })
}) 