define([
    "app",
    "backbone"
],

function( ) {

    return Backbone.View.extend({

        tagName: "li",
        template: "frame-properties",
        className: "ZEEGA-frame-properties",


        events: {
            "click .layer-menu a": "createFrame"
        },

        createFrame: function( e ) {
            var type = $(e.target).closest("a").data("layerType");

            this.model.status.get('currentFrame').addLayerType( type );
        },

        serialize: function() {
            // return this.model.toJSON();
        }
    });

});
