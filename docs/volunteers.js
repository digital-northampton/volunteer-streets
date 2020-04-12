'use strict'

var data_url = "https://digital-northampton.github.io/volunteer-streets/volunteers.json"
var postcode = ""
$ (document).ready (function () {
  var $table = $("table#volunteers")
  var $button = $("button#download")

  var numberWithCommas = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  var addRow = function (volunteer) {
    var html = ""

    var url = "volunteer.html?postcode=" + encodeURI (volunteer.postcode)

    html += "<tr>"
    html += "<td><a href='"+url+"'>"+volunteer.postcode+"</a></td>"
    html += "<td>"+volunteer.streets.length+" streets</td>"
    html += "</tr>"

    $table.find ("tbody").append (html)
  }

  $.getJSON (data_url, function (data) {    
    console.log (data)
    data.forEach (volunteer => {
      addRow (volunteer)
    })
  })

  $button.bind ("click", function () {
    $table.first().table2csv({filename: 'postcodes.csv'});
  })
}) 
