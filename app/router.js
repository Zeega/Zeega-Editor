define([
    // Application.
    "app",

    // Modules.
    "modules/initializer"
],

function(app, Initializer) {

    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({

        routes: {
            "": "index",
            ":projectID": "index"
        },

        index: function() {
            this.initialize();
        },

        initialize: _.once(function() {
            new Initializer();
        })

    });

    return Router;

});
