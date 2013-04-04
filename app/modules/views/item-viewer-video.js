define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.View.extend({
        
        className: "item-viewer item-viewer-video",
        template: "item-viewer-video",

        serialize: function() {
            return this.model.toJSON();
        },

        exit: function() {
            this.$("video").attr("src", "");
        }
        
    });

});
