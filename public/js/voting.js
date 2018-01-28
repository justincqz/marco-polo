$(document).ready(function() {
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
      getData: function() {
        var id = $("#id").text();
        console.log(id);
        $.get("/getPoll"), {id: id}, function(data) {
          console.log(data);
        }
      },
      upvote: function(id) {
        var params = {
          id: id,
          flights: [],
          accommodations: [],
          todos: [],
          events: []
        }
        var elem = $(event.currentTarget);
        if (elem.hasClass('selected')) {
          // TODO
        } else {
          elem.addClass('selected');
          switch (itemType) {
            case 'flight':
              params.flights.add(this.selectedFlights.indexOf(item));
              break;
            case 'accommodation':
              params.accommodations.add(this.selectedAccommodations.indexOf(item));
              break;
            case 'todo':
              params.todo.add(this.selectedTodos.indexOf(item));
              break;
            case 'event':
              params.event.add(this.selectedEvents.indexOf(item));
              break;
          }
        }
        $.post("/vote"), params, function(res) {
          console.log(res);
        }
      },
      next: function() {
        console.log("next");
        this.section += 1;
      },
      prev: function() {
        this.section -= 1;
      }
    }
  });

  app.getData();
});
