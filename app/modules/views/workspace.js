define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.Layout.extend({

        aspectRatio: 0.75,
        workspacePadding: 40,

        className: "ZEEGA-workspace",
//        template: "app/templates/workspace",

        initialize: function() {
            this.aspectRatio = app.project.get("aspect_ratio");
            app.on("window-resize", this.onResize, this );
            app.status.on("change:currentFrame", this.onChangeFrame, this );
        },

        afterRender: function() {
            this.renderFrame( this.model.status.get("currentFrame") );
            this.makeDroppable();

            $(".workspace").prepend("<div class='workspace-overlay'></div>");
        },

        makeDroppable: function() {
            this.$el.droppable({
                accept: ".item, .draggable-layer-type",
                tolerance: "pointer",
                drop: function( e, ui ) {
                    if ( _.isString( app.dragging ) ) {
                        app.status.get('currentFrame').addLayerType( app.dragging );
                    } else if ( app.dragging.get("layer_type") ) {
                        if ( _.contains( ["Audio"], app.dragging.get("layer_type") )) {
                            //app.layout.soundtrack.updateWaveform( app.dragging.get("thumbnail_url") );

                            app.emit("soundtrack_added", app.dragging );
                            app.status.get('currentSequence').setSoundtrack( app.dragging, app.layout.soundtrack, { source: "drag-to-workspace" } );
                        } else {
                            app.emit("item_dropped", app.dragging );
                            this.model.status.get('currentFrame').addLayerByItem( app.dragging, { source: "drag-to-workspace" });
                        }

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
            if ( app.status.get("previousFrame") ) {
                app.status.get("previousFrame").layers.off("add", this.onLayerAdd, this );
            }
            app.status.get("currentFrame").layers.on("add", this.onLayerAdd, this );
        },

        clearWorkspace: function() {
            this.model.status.get("previousFrame").layers.editorCleanup();
            this.$el.empty();
        },

        renderFrame: function( frameModel ) {
            this.updateListeners();
            frameModel.layers.each(function( layer ) {
                this.onLayerAdd( layer );
            }, this );
        },

        onLayerAdd: function( layerModel ) {
            this.$el.append( layerModel.visual.el );
            layerModel.enterEditorMode();
            layerModel.visual.render();
            layerModel.visual.updateZIndex( app.status.get("currentFrame").layers.length );
        }
        
    });

});
