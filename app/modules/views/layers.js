define([
    "app",
    "backbone",

    "modules/views/layer-list",

    "jqueryUI"
],

function( app, Backbone, LayerList ) {


    return Backbone.View.extend({

        template: "layers",
        className: "ZEEGA-layers",
        
        initialize: function() {
            app.on("window-resize", this.onResize, this );
        },

        afterRender: function() {
            var firstFrame = this.model.project.sequences.at(0).frames.at(0);

            this.renderFrameLayers( firstFrame );
            this.onResize();
        },

        onResize: function() {
            var height = window.innerHeight - $(".project-navs").height();
            
            this.$el.css({
                height: height
            });
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
                this.$("ul.layer-list").prepend( layerView.el );
                layerView.render();
            }, this );

            this.$("ul.layer-list").sortable({
                containment: "parent",
                tolerance: "pointer",
                update: function( e, ui ) {
                    this.updateLayerOrder();
                }.bind(this)
            });
        },

        updateLayerOrder: function() {
            var layerOrder = _.map( this.$("ul.layer-list"), function( layer ) {
                return parseInt( $( layer ).data("id"), 10 );
            });

            // trigger a frame set and save
            console.log( layerOrder );
        }
        
    });

});
