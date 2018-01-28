var app = new Vue({
  el: '#app',
  data: {
    section: 1,
    flights: [],
    accommodations: [],
    thingstodo: [],
    votingLink: ""
  },
  methods: {
    getFlights: function() {
      $.get("/flights"), {}, function(data) {
        app.flights = JSON.parse(data);
      }
    },
    getAccomodation: function() {
      $.get("/accommodation", {}, function(data) {
        app.accommodations = JSON.parse(data);
      });
    },
    getThingsToDo: function() {
      $.get("/thingstodo", {destCity: 'Rome'}, function(data) {
        app.thingstodo = JSON.parse(data);
      });
    },
    voting: function(itemType, item) {
      $.post("/vote", params, function(res) {
        
      });
    }
  }
});