define([
    "app",

    "modules/views/layer-list",

    "jqueryUI",
    "backbone"
],

function( app, LayerList ) {


    return Backbone.View.extend({

        template: "layers",
        className: "ZEEGA-layers",
        layerViews: [],
        
        initialize: function() {
            app.on("window-resize rendered", this.onResize, this );
            app.status.on("change:currentFrame", this.onChangeFrame, this );
        },

        onChangeFrame: function( status, frameModel ) {
            this.unrenderLayers();
            this.renderFrameLayers( frameModel );
        },

        afterRender: function() {
            this.renderFrameLayers( this.model.status.get("currentFrame") );
        },

        onResize: function() {
            var height = window.innerHeight - $(".project-navs").height();
            
            this.$el.css({
                height: height
            });
        },

        unrenderLayers: function() {
            _.each( this.layerViews, function( layerView ) {
                // more should be done here probably
                layerView.remove();
            });
        },

        updateListeners: function() {
            if ( app.status.get("previousFrame") ) {
                app.status.get("previousFrame").layers.off("add", this.onLayerAdd, this );
            }
            app.status.get("currentFrame").layers.on("add", this.onLayerAdd, this );
        },

        onLayerAdd: function( layerModel, collection ) {
            var layerView = new LayerList({
                    model: layerModel,
                    attributes: {
                        "data-id": layerModel.id || 0
                    }
                });

            this.layerViews.push( layerView );
            this.$("ul.layer-list").prepend( layerView.el );
            layerView.render();
        },

        renderFrameLayers: function( frameModel ) {
            this.updateListeners();
            frameModel.layers.each(function( layer ) {
                var layerView = new LayerList({
                    model: layer,
                    attributes: {
                        "data-id": layer.id
                    }
                });

                this.layerViews.push( layerView );

                // prepend because layers come in z-index order
                this.$("ul.layer-list").prepend( layerView.el );
                layerView.render();
            }, this );

            this.makeSortable( frameModel );
        },

        makeSortable: function( frameModel ) {
            this.$("ul.layer-list").sortable({
                containment: "parent",
                tolerance: "pointer",
                update: function( e, ui ) {
                    this.updateLayerOrder( frameModel );
                }.bind(this)
            });
        },

        updateLayerOrder: function( frameModel ) {
            var layerOrder = _.map( this.$("ul.layer-list li"), function( layer ) {
                return parseInt( $( layer ).data("id"), 10 );
            });

            layerOrder.reverse();
            _.each( layerOrder, function( layerID, i ) {
                frameModel.layers.get( layerID ).order[ frameModel.id ] = i;
            });
            frameModel.layers.sort();
        }
        
    });

});
