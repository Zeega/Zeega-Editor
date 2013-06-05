define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.View.extend({

        aspectRatio: 0.75,

        className: "ZEEGA-workspace",
        manage: true,

        initialize: function() {
            this.aspectRatio = app.project.get("aspect_ratio");
            app.on("window-resize", this.onResize, this );
            app.status.on("change:currentFrame", this.onChangeFrame, this );
        },

        afterRender: function() {
            this.renderFrame( this.model.status.get("currentFrame") );
            this.makeDroppable();
        },

        instructions: function() {
            var isEmpty =  app.project.sequences.length == 1 &&
                app.project.sequences.at( 0 ).frames.length == 1 &&
                app.project.sequences.at( 0 ).frames.at( 0 ).layers.length === 0;

            if ( true ) {
                $("body")
                    .prepend("<img class='intro intro-00' src='assets/img/intro-00.png' width='100%' />")
                    .prepend("<img class='intro intro-01' src='assets/img/intro-01.png' width='100%' />")
                    .prepend("<img class='intro intro-02' src='assets/img/intro-02.png' width='100%' />")
                    .prepend("<img class='intro intro-03' src='assets/img/intro-03.png' width='100%' />");
            }
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
                            app.status.get('currentSequence').setSoundtrack( app.dragging, app.layout.soundtrack );
                        } else {
                            app.emit("item_dropped", app.dragging );
                            this.model.status.get('currentFrame').addLayerByItem( app.dragging );
                        }

                    }
                }.bind( this )
            });
        },

        onResize: function() {
            var h, w,
                workspace = this.$el.closest(".workspace");

            // h = window.innerHeight;
            // w = window.innerWidth;

            w = workspace.width();
            h = workspace.height();


            if ( w / h > this.aspectRatio ) {
                height = h - 20;
                width = this.aspectRatio * height;
            } else {
                width = w - 20 ;
                height = width / this.aspectRatio;
            }

            this.$el.animate({
                height: height,
                width: width,
                fontSize: ( width / 520 ) + "em"
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
