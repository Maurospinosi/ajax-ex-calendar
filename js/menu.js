// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
$(document).ready(function() {
  // Data di partenza del calendario
  var date = "2018-01-01";
  var momentDate = moment(date);

  renderCalendar(momentDate);
  renderHolidays(momentDate);

  $( ".prev" ).click(function() {
    if (momentDate.format("M") == 1){
      alert("Non puoi andare a Dicembre 2017!");
    } else {
      momentDate.subtract(1, "months");
      renderCalendar(momentDate);
      renderHolidays(momentDate);
    }
  });

  $( ".next" ).click(function() {
    if (momentDate.format("M") == 12){
      alert("Non puoi andare a Gennaio 2018!");
    } else {
      momentDate.add(1, "months");
      renderCalendar(momentDate);
      renderHolidays(momentDate);
    }
  });

});

//FUNZIONI//
//Funzione che stampa il mese
function renderCalendar (momentDate){

 $("#mese").html("");

  // Stampo come titolo il mese selezionato
  $("#title").text(momentDate.format("MMMM YYYY"));

  // Stampo il giorno e il mese slezionato nella data di partenza
  var source = $("#month-template").html();
  var template = Handlebars.compile(source);

  for (var i = 1; i <= momentDate.daysInMonth(); i ++){

    var dateComplete =  momentDate.format("YYYY") + "-" +  momentDate.format("MM") + "-" + addZero(i);

    var context = {
      "day": i,
      "month": momentDate.format("MMMM"),
      "holiday" : dateComplete,
    };

    var html = template(context);
    $("#mese").append(html);
  }
}

//Funzione che colora di rosso i giorni del mese festivi e aggiunge il nome della festività corrispondente
function printHolidays(holidays) {
  for(var i=0; i < holidays.length; i++){
    var holidayName = holidays[i].name;
    var holidayDate = holidays[i].date;

    $(".day[data-hol='"+holidayDate+"']").addClass("style");
    $(".day[data-hol='"+holidayDate+"'] .hol-date").text("-" + " " + holidayName);
  }
}

//Funzione che aggiounge lo zero ai numeri < 10
function addZero (num) {
  if(num < 10){
    return "0" + num;
  }
  return num;
}

function renderHolidays(momentDate) {
  $.ajax(
    {
      "url": " https://flynn.boolean.careers/exercises/api/holidays",
      "data" : {
        "year" : 2018,
        "month" : momentDate.format("M") - 1,
      },
      "method": "GET",
      "success": function (data) {
        var resp = data.response;
        printHolidays(resp);
      },
      error: function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errore);
      }
    }
  );
}
