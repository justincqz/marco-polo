$(document).ready(function() {
  var app = new Vue({
    el: '#app',
    data: {
      section: 1,
      flights: [],
      selectedFlights: [],
      accommodations: [],
      selectedAccommodations: [],
      thingstodo: [],
      selectedTodos: [],
      events: [],
      selectedEvents: [],
      votingLink: ""
    },
    methods: {
      generateRandomId: function() {
        return (+new Date).toString(36).slice(-5);
      },
      getChoices: function() {
        this.getFlights();
        this.getAccomodation();
        this.getThingsToDo();
        this.getEvents();
      },
      getFlights: function() {
        $.get("/flights"), {}, function(data) {
          app.flights = JSON.parse(data);
          console.log('Flights', app.flights);
        }
      },
      getAccomodation: function() {
        $.get("/accommodation", {}, function(data) {
          app.accommodations = JSON.parse(data);
          console.log('Flights', app.accommodations);
        });
      },
      getThingsToDo: function() {
        $.get("/thingstodo", {destCity: 'Rome'}, function(data) {
          app.thingstodo = JSON.parse(data);
          console.log('Flights', app.thingstodo);
        });
      },
      getEvents: function() {
        $.get("/events", {}, function(data) {
          app.events = JSON.parse(data);
          console.log('Flights', app.events);
        });
      },
      select: function(itemType, item) {
        switch (itemType) {
          case 'flight':
            this.selectedFlights.push(item);
            break;
          case 'accommodation':
            this.selectedAccommodations.push(item);
            break;
          case 'todo':
            this.selectedTodos.push(item);
            break;
          case 'event':
            this.selectedEvents.push(item);
            break;
        }
        this.section += 1;
      },
      submit: function() {
        var randId = this.generateRandomId();
        params = {
          id: this.generateRandomId(),
          data: {
            flights: selectedFlights,
            accommodations: selectedAccommodations,
            todos: selectedTodos,
            events: selectedEvents
          }
        }
        $.post("addPoll", params, function(res) {
          console.log(res);
        });
        this.votingLink = "url/" + randId;
      }
    }
  });

  console.log("running");
  app.getChoices();
});