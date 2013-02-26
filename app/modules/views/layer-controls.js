define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        template: "layer-control-bar",
        className: "ZEEGA-layer-control-bar",

        initialize: function() {
            app.status.on("change:currentLayer", this.onLayerFocus, this );
        },

        onLayerFocus: function( status, layerModel ) {
            this.$(".layer-bar-title").text( layerModel.getAttr("title") );
        }

    });

});
