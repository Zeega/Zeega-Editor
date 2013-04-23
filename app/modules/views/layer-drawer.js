define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        el: null,
        template: "layer-drawer",

        events: {
            "click a": "clickedLayerType"
        },

        clickedLayerType: function( e ) {
            var layerType = $(e.target).closest("a").data("layerType");

            app.status.get('currentFrame').addLayerType( layerType );
            app.trigger("layer_type_added", layerType );
        }
        
    });

});
