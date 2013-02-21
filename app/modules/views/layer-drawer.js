define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        el: null,
        template: "layer-drawer",

        initialize: function() {

        },

        events: {
            "click .layer-menu a": "createFrame"
        },

        createFrame: function( e ) {
            var type = $(e.target).closest("a").data("layerType");

            app.status.get('currentFrame').addLayerType( type );
        },


    });

});
