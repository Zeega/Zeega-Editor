define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.View.extend({
        
        className: "item-viewer item-viewer-image",
        template: "item-viewer-image",

        serialize: function() {
            console.log("img", this)
            return this.model.toJSON();
        },

        exit: function() {
            
        }
        
    });

});
