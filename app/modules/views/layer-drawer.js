define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        el: null,
        template: "app/templates/layer-drawer",

        afterRender: function() {
            var hasTextLayer = app.status.get("currentFrame").layers.any(function(layer){
                return layer.get("type") == "TextV2";
            });
        },

        events: {
            "click a": "clickedLayerType"
        },

        clickedLayerType: function( e ) {

            if ( !$(e.target).closest("a").hasClass("disabled") ) {
                var layerType = $(e.target).closest("a").data("layerType");

                app.status.get('currentFrame').addLayerType( layerType );
                app.trigger("layer_type_added", layerType );
            }
        }
        
    });

});
