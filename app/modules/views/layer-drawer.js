define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        el: null,
        template: "layer-drawer",

        initialize: function() {
            app.status.on("change:currentFrame", this.checkText, this );

            // ensures that only one text layer exists at a time.
            // sort of a hack?
            app.on("layer_deleted", this.onLayerDelete, this );
            app.on("layer_added_success", this.onLayerAdd, this );
        },

        afterRender: function() {
            var hasTextLayer = app.status.get("currentFrame").layers.any(function(layer){
                return layer.get("type") == "TextV2";
            });

            this.toggleTextButton( hasTextLayer );
        },

        checkText: function( status, frame ) {
            var hasTextLayer = frame.layers.any(function(layer){
                return layer.get("type") == "TextV2";
            });

            this.toggleTextButton( hasTextLayer );
        },

        toggleTextButton: function( disabled ) {
            if ( disabled ) {
                this.$("a[data-layer-type='TextV2']")
                    .addClass("disabled")
                    .attr("title", "only one text layer per page");
            } else {
                this.$("a[data-layer-type='TextV2']")
                    .removeClass("disabled")
                    .attr("title", "add text");
            }
        },

        onLayerDelete: function( layerModel ) {
            if ( layerModel.get("type") == "TextV2") {
                this.$("a[data-layer-type='TextV2']").removeClass("disabled");
            }
        },

        onLayerAdd: function( layerModel ) {
            // console.log("on layer ADD",layerModel.get("type"), layerModel)
            if ( layerModel.get("type") == "TextV2") {
                this.$("a[data-layer-type='TextV2']").addClass("disabled");
            }
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
