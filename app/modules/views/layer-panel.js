define([
    "app",
    "backbone",

    "modules/views/layer-list",

    "jqueryUI"
],

function( app, Backbone, LayerList ) {

    // This will fetch the tutorial template and render it.
    return Backbone.View.extend({

        template: "layer-panel",
        className: "ZEEGA-layers",

        afterRender: function() {
            var firstFrame = this.model.project.sequences.at(0).frames.at(0);

            this.renderFrameLayers( firstFrame );
        },

        unrenderLayers: function() {
            this.getViews(".ZEEGA-layer-list ul").each(function( view ) {
                view.remove();
            }, this );
        },

        renderFrameLayers: function( frameModel ) {
            frameModel.layers.each(function( layer ) {
                var layerView = new LayerList({
                    model: layer,
                    attributes: {
                        "data-id": layer.id
                    }
                });

                // prepend because layers come in z-index order
                this.$(".ZEEGA-layer-list>ul").prepend( layerView.el );
                layerView.render();
            }, this );

            this.$(".ZEEGA-layer-list>ul").sortable({
                containment: "parent",
                tolerance: "pointer",
                update: function( e, ui ) {
                    this.updateLayerOrder();
                }.bind(this)
            });
        },

        updateLayerOrder: function() {
            var layerOrder = _.map( this.$(".ZEEGA-layer-list>ul>li"), function( layer ) {
                return parseInt( $( layer ).data("id"), 10 );
            });

            // trigger a frame set and save
            console.log( layerOrder );
        }
        
    });

});
