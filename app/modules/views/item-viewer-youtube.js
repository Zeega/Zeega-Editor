define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.View.extend({
        
        className: "item-viewer item-viewer-youtube",
        template: "item-viewer-youtube",

        serialize: function() {
            return this.model.toJSON();
        },

        exit: function() {
          
        }
        
    });

});
