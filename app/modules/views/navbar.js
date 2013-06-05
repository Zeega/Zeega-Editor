define([
    "app",
    "backbone"
],

function( app ) {

    // This will fetch the tutorial template and render it.
    Navbar = Backbone.View.extend({

        template: "app/templates/navbar",
        className: "navbar ZEEGA-hmenu clear",
        
        serialize: function() {
            return {
                userId: app.userId,
                userProjects: $.parseJSON( window.userProjects ),
                directory: app.directory,
                root: app.root
            };
        }
    });

    // Required, return the module for AMD compliance
    return Navbar;

});
