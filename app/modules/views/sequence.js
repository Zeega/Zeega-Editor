define([
    "app",
    "backbone"
],

function( app, Backbone, SequenceView ) {

    // This will fetch the tutorial template and render it.
    var Sequence = Backbone.View.extend({

        tagName: "li",
        template: "sequence",
        className: "ZEEGA-sequence",

        serialize: function() {
            return this.model.toJSON();
        },

        events: {
            //"click .controls-toggle": "toggleControls"
        }
        
    });

    return Sequence;

});
