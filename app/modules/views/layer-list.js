define([
    "app",
    "backbone"
],

function( app ) {

    // This will fetch the tutorial template and render it.
    return Backbone.View.extend({

        tagName: "li",
        template: "layer-list",
        className: "ZEEGA-layer-list",

        serialize: function() {
            return this.model.toJSON();
        },

        events: {
            "click .controls-toggle": "toggleControls"
        },

        toggleControls: function() {
            this.$(".layer-controls").toggleClass("open");
        },

        initialize: function() {

        }
        
    });

});
