define([
    "app",
    "backbone"
],

function( app ) {

    // This will fetch the tutorial template and render it.
    return Backbone.View.extend({

        tagName: "li",
        template: "layer-list",
        className: "ZEEGA-layer-list",

        serialize: function() {
            return this.model.toJSON();
        },

        initialize: function() {
            this.model.on("focus", this.onFocus, this );
            app.on("layersBlur", this.onBlur, this );
            this.model.on("remove", this.onRemove, this );
        },

        events: {
            "click .action": "doAction",
            "click": "selectLayer"
        },

        doAction: function( e ) {
            this[ $(e.target).data("action") ]();
        },

        continueToNextFrame: function() {
            console.log('continue to next frame')
        },

        continueToChapter: function() {
            console.log('continue to chapter')
            app.status.get("currentSequence").togglePersistance( this.model );
        },

        deleteLayer: function() {
            console.log("delete layer", this);
            this.model.collection.remove( this.model );
        },

        selectLayer: function() {
            app.trigger("layersBlur");
            this.model.trigger("focus");
        },

        onFocus: function() {
            this.$el.addClass("active");
        },

        onBlur: function() {
            this.$el.removeClass("active");
        },

        onRemove: function() {
            // this.model.onRemoveFrom Edito()>>???
            this.remove();
        }
        
    });

});
