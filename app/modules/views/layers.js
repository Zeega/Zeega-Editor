define([
    "app",

    "modules/views/layer-list",

    "jqueryUI",
    "backbone"
],

function( app, LayerList ) {


    return Backbone.View.extend({

        template: "app/templates/layers",
        className: "ZEEGA-layers",
        layerViews: [],

        manage: true,
        
        initialize: function() {
            app.on("window-resize rendered", this.onResize, this );
            app.status.on("change:currentPage", this.onChangeFrame, this );
        },

        onChangeFrame: function( status, frameModel ) {
            this.unrenderLayers();
            this.renderFrameLayers( frameModel );
        },

        afterRender: function() {
            this.renderFrameLayers( app.zeega.get("currentPage") );
            app.emit("layers_rendered", this );
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
            if ( app.zeega.get("previousPage") ) {
                app.zeega.get("previousPage").layers.off("add", this.refresh, this );
            }
            app.zeega.get("currentPage").layers.on("add", this.refresh, this );
        },

        refresh: function( layerModel ){
            var layerView = new LayerList({
                    model: layerModel,
                    attributes: {
                        "data-id": layerModel.id || 0
                    }
                });

            this.$("ul.layer-list").sortable("destroy");

            this.layerViews.push( layerView );
            this.renderFrameLayers( app.zeega.get("currentPage") );
            layerView.render();
        },

        renderFrameLayers: function( frameModel ) {
            this.updateListeners();

            frameModel.layers.each(function( layer, i ) {
                // only generate layer list views if not cached!
                if ( !layer._layerListView ) {
                    var layerView = new LayerList({
                        model: layer,
                        attributes: {
                            "data-id": layer.id
                        }
                    });

                    layer._layerListView = layerView;
                    this.layerViews.push( layerView );
                }

                // prepend because layers come in z-index order
                this.$("ul.layer-list").prepend( layer._layerListView.el );
                layer._layerListView.render();
            }, this );

            this.makeSortable( frameModel );
        },

        makeSortable: function( frameModel ) {
            this.$("ul.layer-list").sortable({
                containment: "parent",
                tolerance: "pointer",
                start: function() {
                    app.status.setCurrentLayer( null );
                },
                update: function( e, ui ) {
                    this.updateLayerOrder( frameModel );
                    app.emit("layers_reordered", frameModel );
                }.bind(this)
            });
        },

        updateLayerOrder: function( frameModel ) {
            var layerOrder = _.map( this.$("ul.layer-list li"), function( layer ) {
                return $( layer ).data("id");
            });

            layerOrder.reverse();
            _.each( layerOrder, function( layerID, i ) {
                frameModel.layers.get( layerID ).order[ frameModel.id ] = i;
            });
            frameModel.layers.sort();
        }
        
    });

});
