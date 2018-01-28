$(document).ready(function() {
  var app = new Vue({
    el: '#app',
    data: {
      section: 1,
      flights: [],
      accommodations: [],
      thingstodo: [],
      events: []
    },
    methods: {
      getData: function() {
        var id = $("#id").text();
        console.log('getting data for', id);
        $.get("../getPoll", {id: id}, function(data) {
          data = JSON.parse(data);
          app.flights = data.flights;
          app.accommodations = data.accommodations;
          app.thingstodo = data.thingstodo;
          app.events = data.events;
        });
      },
      upvote: function(itemType, item, event) {
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
          item.votes += 1;
          switch (itemType) {
            case 'flight':
              params.flights.push(this.flights.indexOf(item));
              break;
            case 'accommodation':
              params.accommodations.push(this.accommodations.indexOf(item));
              break;
            case 'todo':
              params.todos.push(this.todos.indexOf(item));
              break;
            case 'event':
              params.events.push(this.events.indexOf(item));
              break;
          }
        }
        $.post("/upvote"), params, function(res) {
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
