define([
    "app",
    "modules/views/layer-controls",
    "backbone"
],

function( app, LayerControls ) {

    // This will fetch the tutorial template and render it.
    return Backbone.View.extend({

        tagName: "li",
        template: "layer-list",
        className: "ZEEGA-layer-list",

        serialize: function() {
            return this.model.toJSON();
        },

        initialize: function() {
            this.controls = new LayerControls({ model: this.model, target: this });

            this.model.on("focus", this.onFocus, this );
            this.model.on("blur", this.onBlur, this );
            this.model.on("remove", this.onRemove, this );
            this.model.on("sync", this.onSync, this );
            this.model.on("copy_focus", this.onCopyFocus, this );
            this.model.on("copy_blur", this.onCopyBlur, this );
        },

        afterRender: function() {
            if ( app.status.get("copiedLayer") && app.status.get("copiedLayer").id == this.model.id ) {
                this.onCopyFocus();
            }
        },

        events: {
            "click .action": "doAction",
            "click": "selectLayer"
        },

        onCopyFocus: function() {
            this.$el.addClass("copied");
            this.$el.effect("bounce", { times:3, distance: 5, direction: "right" }, 500);
        },

        onCopyBlur: function() {
            this.$el.removeClass("copied");
        },

        doAction: function( e ) {
            this[ $(e.target).data("action") ]();
        },

        continueToNextFrame: function() {
            this.$el.attr("data-continue", "true");
            app.status.get("currentSequence").continueLayerToNextFrame( this.model );
        },

        continueToChapter: function() {
            this.$el.attr("data-persist", "true"); // this will toggle!!
            app.status.get("currentSequence").togglePersistance( this.model );
        },

        deleteLayer: function() {
            if ( confirm("do you really want to delete this layer?") ) {
                this.model.collection.remove( this.model );
            }
        },

        selectLayer: function() {
            if ( app.status.get("currentLayer") != this.model ) {
                app.status.setCurrentLayer( this.model );
            } else {
                app.status.setCurrentLayer( null );
            }
        },

        onFocus: function() {
            this.$el.addClass("active");
            this.openControls();
        },

        onBlur: function() {
            this.$el.removeClass("active");
            this.closeControls();
        },

        onRemove: function() {
            this.remove();
        },

        onSync: function() {
            this.updateTitle();
        },

        updateTitle: function() {
            this.$(".layer-title").text( this.model.getAttr("title"));
        },

        openControls: function() {
            $("#main").append( this.controls.el );
            this.controls.render();
        },

        closeControls: function() {
            console.log("close controls");
            this.controls.remove();
        }
        
    });

});
