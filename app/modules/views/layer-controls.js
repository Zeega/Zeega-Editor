define([
    "app",
    "zeega_parser/plugins/controls/_all-controls",

    "backbone"
],

function( app, Controls ) {

    return Backbone.View.extend({

        controls: [],

        template: "layer-control-bar",
        className: "ZEEGA-layer-control-bar",

        initialize: function() {
            app.status.on("change:currentLayer", this.onLayerFocus, this );
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

            this.controls = _.map( layerModel.controls, function( controlType ) {
                var control;

                if ( _.isObject( controlType ) && Controls[ controlType.type ] ) {
                    control = new Controls[ controlType.type ]({ model: layerModel, options: controlType.options });
                    this.$(".layer-controls-inner").append( control.el );
                    control.render();
                } else if ( Controls[ controlType ] ) {
                    control = new Controls[ controlType ]({ model: layerModel });
                    this.$(".layer-controls-inner").append( control.el );
                    control.render();

                    return control;
                }

                return false;
            }, this );
            this.controls = _.compact( this.controls );
        },

        clearControls: function() {
            this.$(".layer-controls-inner").empty();
        }

    });

});
