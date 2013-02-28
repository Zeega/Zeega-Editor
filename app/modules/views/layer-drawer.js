define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        el: null,
        template: "layer-drawer",

        afterRender: function() {
            this.$("li").draggable({
                revert: "invalid",
                helper: "clone",
                cursorAt: {
                    left: 0,
                    top: 0
                },
                // helper: function( e ) {
                //     return $(this).find(".item-thumb").clone().addClass("item-dragging");
                // },
                start: function( e, ui ) {
                    app.dragging = $(e.target).find("a").data("layerType");
                }.bind( this ),
                stop: function( e, ui ) {
                    app.dragging = null;
                }.bind( this )
            });
        },

        events: {
            "click .ZEEGA-layer-drawer a": "createLayer"
        },

        createLayer: function( e ) {
            var type = $(e.target).closest("a").data("layerType");

            app.status.get('currentFrame').addLayerType( type );
        }

    });

});
