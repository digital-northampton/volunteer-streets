'use strict'

var data_url = "https://digital-northampton.github.io/volunteer-streets/codes.json"

$ (document).ready (function () {
  var $table = $("table#codes tbody")

  var numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var addRow = function (code, rowData) {
    var html = ""
    var ppv

    if (rowData.volunteers == 0) {
      ppv = "No Volunteers"
    } else {
      ppv = Math.round (rowData.population/rowData.volunteers)
    }

    html += "<tr>"
    html += "<td><h4>"+code+"</h4></td>"
    html += "<td>"+rowData.areas.sort().join(", ")+"</td>"
    html += "<td class='right'>"+numberWithCommas (rowData.households)+"</td>"
    html += "<td class='right'>"+numberWithCommas (rowData.population)+"</td>"
    html += "<td class='right'>"+numberWithCommas (rowData.volunteers)+"</td>"
    html += "<td class='right'>"+ppv+"</td>"
    html += "/<tr>"

    $table.append (html)
  }

  $.getJSON (data_url, function (data) {
    for (var code in data) {
      addRow (code, data[code])
    }
  })
}) 