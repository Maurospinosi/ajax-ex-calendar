// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
// (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.

$(document).ready(function() {
  // Data di partenza del calendario
  var date = "2018-01-01";
  var momentDate = moment(date);
  console.log(momentDate);

  // Stampo come titolo il mese selezionato
  $("#title").text(momentDate.format("MMMM"));

  // Stampo il giorno e il mese slezionato nella data di partenza
  var source = $("#month-template").html();
  var template = Handlebars.compile(source);

  for (var i = 1; i <= momentDate.daysInMonth(); i ++){

    // var date = addZero(i);
    // var dateComplete = momentDate.format("YYYY") + "-" + momentDate.format("MM")  + "-" + day;

    var context = {
      "day": i,
      "month": momentDate.format("MMMM"),
      // "dateComplete" : holiday,
    };

    var html = template(context);
    $("#mese").append(html);
  }
  $.ajax(
    {
      "url": " https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      "method": "GET",
      "data" : {
        "year" : 2018,
        "month" : 1,
      },
      "success": function (data, stato) {
        var resp = data.response;
        // printHolidays(resp);
      },
      error: function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errore);
      }
    }
  );
});
//
// function printHolidays(holidays) {
//   for(var i=0; i<holidays.length;i++){
//     var holidayName = holidays[i].name;
//     var holidayDate = holidays[i].date;
//
//     $(".day[data-hol='"+holidayDate+"']").addClass("style");
//     $(".day[data-hol='"+holidayDate+"'].holidayType").text("-" + holidayName);
//   }
// }
//
// function addZero(day) {
//  if(day<0){
//    return 0 + day;
//  }
//  return day;
// }
