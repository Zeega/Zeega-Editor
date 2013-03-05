define([
    "app",

    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        controls: [],

        template: "layer-control-bar",
        className: "ZEEGA-layer-control-bar",

        initialize: function() {
            app.status.on("change:currentLayer", this.onLayerFocus, this );
        },

        afterRender: function() {
            app.trigger("rendered", this );
        },

        onLayerFocus: function( status, layerModel ) {
            if ( layerModel !== null ) {
                this.$(".layer-bar-title").text( layerModel.getAttr("title") );
                this.loadControls( layerModel );
            } else if ( layerModel === null ) {
                this.$(".layer-bar-title").empty();
                this.clearControls();
            }
        },

        loadControls: function( layerModel ) {
            this.clearControls();

            _.each( layerModel._controls, function( control ) {
                    this.$(".layer-controls-inner").append( control.el );
                    control.render();
            });

        },

        clearControls: function() {
            this.$(".layer-controls-inner").empty();
        }

    });

});
