// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018
// (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
$(document).ready(function() {
  $.ajax(
    {
      "url": " https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      "method": "GET",
      "success": function (data, stato) {
        console.log(data);
      },
      error: function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errore);
      }
    }
  );
});
