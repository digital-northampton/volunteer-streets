
var data_url = "https://digital-northampton.github.io/volunteer-streets/volunteers/"

$ (document).ready (function () {
  var urlParams = new URLSearchParams (window.location.search)
  var postcode = urlParams.get ('postcode');
  var $table = $("table#volunteer")
  var $button = $("button#download")

  $ ("h1").html (postcode)
  var url = data_url + postcode.replace (" ", "-") + ".json"

  var addRow = function (street) {
    var html = ""

    html += "<tr>"
    html += "<td>"+street.name+"</td>"
    html += "</tr>"

    $table.find ("tbody").append (html)
  }

  $.getJSON (url, function (data) {    
    console.log ()
    data.streets.forEach (street => {
      addRow (street)
    })
  })

  $button.bind ("click", function () {
    $table.first().table2csv({filename: postcode+'.csv'});
  })
})