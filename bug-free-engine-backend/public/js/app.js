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
        params = {
          origin:
          destLoc:
          pax:
          date:
        }
        $.get("/flights", params, function(data) {
          console.log('flights', data);
          app.flights = data;
        });
      },
      getAccomodation: function() {
        $.get("/accommodation", {}, function(data) {
          console.log('accommodations', data);
          app.accommodations = data.splice(0,2);
        });
      },
      getThingsToDo: function() {
        $.get("/thingstodo", {destCity: 'Rome'}, function(data) {
          console.log('thingstodo', data);
          app.thingstodo = data;
        });
      },
      getEvents: function() {
        $.get("/events", {destCity: 'Rome', startDate: '20180428', endDate: '20180510'}, function(data) {
          console.log('events', data);
          app.events = data;
        });
      },
      select: function(itemType, item, event) {
        var elem = $(event.currentTarget);
        if (elem.hasClass('selected')) {
          var array;
          switch (itemType) {
            case 'flight':
              array = this.selectedFlights;
              break;
            case 'accommodation':
              array = this.selectedAccommodations;
              break;
            case 'todo':
              array = this.selectedTodos;
              break;
            case 'event':
              array = this.selectedEvents;
              break;
          }
          var index = array.indexOf(item);
          if (index > -1) {
            array.splice(index, 1);
          }
          elem.removeClass('selected');
        } else {
          elem.addClass('selected');
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
        }
      },
      next: function() {
        console.log("next");
        this.section += 1;
        $('body').scrollTop(0);
      },
      prev: function() {
        this.section -= 1;
      },
      submit: function() {
        var randId = this.generateRandomId();
        params = {
          id: this.generateRandomId(),
          data: {
            flights: this.selectedFlights,
            accommodations: this.selectedAccommodations,
            todos: this.selectedTodos,
            events: this.selectedEvents
          }
        }
        $.post("addPoll", params, function(res) {
          console.log(res);
        });
        $('.btn.submit').hide();
        this.votingLink = "http://localhost:8080/p/" + randId;
      }
    }
  });

  console.log("running");
  app.getChoices();

  $('.option').on('click', function() {
    console.log("clicked");
    $(this).addClass("selected");
  });
});
