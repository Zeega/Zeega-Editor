define([
    "app",
    "backbone"
],

function( app, Backbone ) {

    return Backbone.View.extend({

        tagName: "li",
        template: "frame",
        className: "ZEEGA-frame",

        serialize: function() {
            return this.model.toJSON();
        },

        events: {
            "click .frame-thumb": "viewFrame"
        },

        viewFrame: function() {
            this.model.status.setCurrentFrame( this.model );
        }
        
    });

});
