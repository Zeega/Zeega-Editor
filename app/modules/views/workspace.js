define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.Layout.extend({

        aspectRatio: 0.751174,
        workspacePadding: 40,

        className: "ZEEGA-workspace",

        initialize: function() {

            app.on("window-resize", this.onResize, this );
            app.status.on("change:currentFrame", this.onChangeFrame, this );
        },

        afterRender: function() {
            this.renderFrame( app.zeega.get("currentPage") );
            this.makeDroppable();

            $(".workspace").prepend("<div class='workspace-overlay'></div>");
        },

        makeDroppable: function() {
            this.$el.droppable({
                accept: ".item, .draggable-layer-type",
                tolerance: "pointer",
                drop: function( e, ui ) {
                    if ( _.contains( ["Audio"], app.dragging.get("layer_type")) ) {
                        if ( !app.project.get("remix").remix ) {
                            app.emit("soundtrack_added", app.dragging );
                            app.status.get('currentSequence').setSoundtrack( app.dragging, app.layout.soundtrack, { source: "drag-to-workspace" } );
                        }
                    } else {
                        app.emit("item_dropped", app.dragging );
                        app.zeega.getCurrentPage().addLayerByItem( app.dragging, { source: "drag-to-workspace" });
                    }
                }.bind( this )
            });
        },

        onResize: function() {
            var h, w,
                workspace = this.$el.closest(".workspace");

            w = workspace.width();
            h = workspace.height();


            if ( w / h > this.aspectRatio ) {
                height = h - this.workspacePadding;
                width = this.aspectRatio * height;
            } else {
                width = w - this.workspacePadding ;
                height = width / this.aspectRatio;
            }

            this.$el.animate({
                height: height,
                width: width,
                fontSize: ( height *  16 / 426 ) + "px"
            });

            $(".workspace-overlay").animate({
                height: height + 30,
                width: width + 30
            });
        },

        onChangeFrame: function( status, frameModel ) {
            this.clearWorkspace();
            this.renderFrame( frameModel );
        },

        updateListeners: function() {
            if ( app.zeega.get("previousPage") ) {
                app.zeega.get("previousPage").layers.off("add", this.onLayerAdd, this );
            }
            app.zeega.get("currentPage").layers.on("add", this.onLayerAdd, this );
        },

        clearWorkspace: function() {
            app.zeega.get("previousPage").layers.editorCleanup();
            this.$el.empty();
        },

        renderFrame: function( frameModel ) {
            this.updateListeners();
            frameModel.layers
                .each(function( layer ) {
                    this.onLayerAdd( layer );
                }, this );
        },

        onLayerAdd: function( layerModel ) {
            this.$el.append( layerModel.visual.el );
            layerModel.enterEditorMode();
            layerModel.visual.render();
            layerModel.visual.updateZIndex( layerModel.get("_order") );
        }
        
    });

});
