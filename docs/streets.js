'use strict'

var data_url = "https://digital-northampton.github.io/volunteer-streets/streets.json"

$ (document).ready (function () {
  var $table = $("table#streets")
  var $button = $("button#download")

  var numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var addRow = function (street) {
    var html = ""

    html += "<tr>"
    html += "<td>"+street.name+"</td>"
    html += "</tr>"

    $table.find ("tbody").append (html)
  }

  $.getJSON (data_url, function (data) {    
    data.forEach (street => {
      addRow (street)
    })
  })

  $button.bind ("click", function () {
    $table.first().table2csv({filename: 'postcodes.csv'});
  })
}) 