define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.View.extend({

        template: "intro-modal",
        
        className: "ZEEGA-intro-modal modal-overlay",

        start: function() {
            $("body").append( this.el );
            $("#main").addClass("modal");
            this.render();
        },

        events: {
            "click .next": "next"
        },

        next: function() {
            
        },

        hide: function() {
            this.fadeOut(function() {
                this.remove();
            }.bind( this ));
        }

    });

});
