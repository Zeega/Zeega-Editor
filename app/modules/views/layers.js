define([
    "app",
    "backbone"
],

function( app, Backbone ) {


    return Backbone.View.extend({

        //template: "frames",
        className: "ZEEGA-layers",
        
        initialize: function() {
            app.on("window-resize", this.onResize, this );
        },

        afterRender: function() {
            this.onResize();
        },

        onResize: function() {
            var height = window.innerHeight - $(".project-navs").height();
            
            this.$el.css({
                height: height
            });
        }
        
    });

});
