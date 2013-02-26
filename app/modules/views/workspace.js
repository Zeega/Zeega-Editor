define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.View.extend({

        aspectRatio: 4/3,

        //template: "workspace",
        className: "ZEEGA-workspace",

        initialize: function() {
            app.on("window-resize", this.onResize, this );
            app.once("rendered", this.onResize, this );
            app.status.on("change:currentFrame", this.onChangeFrame, this );
        },

        afterRender: function() {
            this.renderFrame( this.model.status.get("currentFrame") );
            this.makeDroppable();
        },

        makeDroppable: function() {
            this.$el.droppable({
                accept: ".item, .draggable-layer-type",
                tolerance: "pointer",
                drop: function( e, ui ) {
                    if ( _.isString( app.dragging ) ) {
                        app.status.get('currentFrame').addLayerType( app.dragging );
                    } else if ( _.contains( ["Image"], app.dragging.get("layer_type") )) {
                        this.model.status.get('currentFrame').addLayerByItem( app.dragging );
                    }
                }.bind( this )
            });
        },

        onResize: function() {
            var h, w;

            h = window.innerHeight;
            w = window.innerWidth;

            this.resizeParent( w, h );
        },

        resizeParent: function( w, h ) {
            var height, width;

            height = h - $(".project-navs").height();
            width = $(".right-column").width() - $(".layers").width();

            this.$el.parent().css({
                height: height,
                width: width
            });
            this.resizeWorkspace( width, height );
        },

        resizeWorkspace: function( w, h ) {
            var height, width;

            if ( w / h > this.aspectRatio ) {
                height = h - 20;
                width = this.aspectRatio * height;
            } else {
                width = w - 20;
                height = width / this.aspectRatio;
            }

            this.$el.animate({
                height: height,
                width: width
            });
        },

        onChangeFrame: function( status, frameModel ) {
            console.log('change frame', status, frameModel );
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
