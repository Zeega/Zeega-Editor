define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({
        
        className: "item-viewer item-viewer-audio",
        template: "item-viewer-audio",

        serialize: function() {
            console.log("audio", this)
            return this.model.toJSON();
        },

        exit: function() {
            this.$("audio").attr("src", "");
        }
        
    });

});
