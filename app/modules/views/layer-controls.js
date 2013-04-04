define([
    "app",

    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        controls: [],
        inFocus: null,

        template: "layer-controls",
        className: "ZEEGA-control-floater",

        initialize: function() {
            app.status.on("change:currentLayer", this.onLayerFocus, this );
        },

        afterRender: function() {
            var $target = this.options.target.$el;

            app.trigger("rendered", this );
            this.loadControls();

            this.$el.css({
                top: $target.offset().top + "px",
                right: "160px",
                height: ( $target.height() - 2 )+ "px"
            });
        },

        loadControls: function() {
            _.each( this.model._controls, function( control ) {
                this.$(".layer-controls-inner").append( control.el );
                control.render();
            });

        },

        cleanup: function() {
            this.$el.empty();
        }

    });

});
