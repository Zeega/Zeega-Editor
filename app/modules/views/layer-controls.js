define([
    "app",

    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        controls: [],
        inFocus: null,

        template: "app/templates/layer-controls",
        className: "ZEEGA-control-floater",

        initialize: function() {
            // app.status.on("change:currentLayer", this.onLayerFocus, this );
            this.model.on("focus", this.onLayerFocus, this );
        },

        afterRender: function() {
            var $target = this.options.target.$el;

            if ( $target.is(":visible") ) {
                app.emit("layer_rendered", this );
                this.loadControls();
                this.$el.css({
                    top: $target.offset().top + "px",
                    right: "82px"
                });
            } else {
                this.remove();
            }
        },

        loadControls: function() {
            _.each( this.model._controls, function( control ) {
                if ( control.template ) {
                    this.$(".layer-controls-inner").append( control.el );
                    control.render();
                }
            });
        },

        onLayerFocus: function() {
            $(window).unbind( "mouseup.layerControl" + this.model.id );
            $(window).bind("mouseup.layerControl" + this.model.id , function( e ) {
                var clickedInside = $.contains( this.$el[0], $(e.target)[0] ) || $( e.target ).hasClass("ZEEGA-control-floater");
                
                if ( !clickedInside ) {
                    $(window).unbind( "mouseup.layerControl" + this.model.id );
                    app.status.setCurrentLayer( null );
                }
            }.bind( this ));
        },

        cleanup: function() {
            $(window).unbind( "mouseup.layerControl" + this.model.id );
            this.$el.empty();
        }

    });

});
