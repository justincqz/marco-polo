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
      vote: function(id) {
        var params = {
          id: id,
          flights: [],
          accommodations: [],
          todos: [],
          events: []
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
      },
    }
  });

  app.getData();
});
