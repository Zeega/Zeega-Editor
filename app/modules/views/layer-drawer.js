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
            app.status.get('currentFrame').addLayerType( $(e.target).closest("a").data("layerType") );
            $(".intro").remove();

        }
        
    });

});
