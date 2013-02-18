define([
    "app",
    "backbone"
],

function( app ) {

    // This will fetch the tutorial template and render it.
    Navbar = Backbone.View.extend({

        template: "navbar",
        className: "navbar ZEEGA-hmenu dark",
        
        initialize: function() {
            
        }
    });

    // Required, return the module for AMD compliance
    return Navbar;

});
