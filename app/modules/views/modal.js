define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.View.extend({

        template: "modal",
        modalClass: "",
        
        className: function() {
            return "ZEEGA-modal " + this.modalClass;
        },
        
        events: {
            "click .modal-close": "close"
        },

        close: function() {
            this.$el.fadeOut(function() {
                this.remove();
            }.bind( this ));
        }

    });

});
