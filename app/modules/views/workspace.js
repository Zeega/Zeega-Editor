define([
    "app",
    "backbone"
],

function( app, Backbone, WorkspaceMedia ) {


    return Backbone.View.extend({

        aspectRatio: 4/3,

        //template: "workspace",
        className: "ZEEGA-workspace",

        initialize: function() {
            app.on("window-resize", this.onResize, this );
        },

        afterRender: function() {
            this.onResize();
            this.renderFrame( this.model.status.get("currentFrame") );
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

        clearWorkspace: function() {
            this.$el.empty();
        },

        renderFrame: function( frame ) {
            frame.layers.each(function( layer ) {
                layer.enterEditorMode();
                this.$el.append( layer.visual.el );
            }, this );

        }
        
    });

});
