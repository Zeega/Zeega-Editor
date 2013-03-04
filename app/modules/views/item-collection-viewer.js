define([
    "app",
    "modules/views/frame",

    "backbone"
],

function( app, FrameView ) {


    return Backbone.View.extend({

        start: 0,

        template: "item-collection-viewer",
        className: "ZEEGA-item-collection-viewer",
        
        initialize: function() {
            this.start = this.options.start;

            // render into body as modal
            console.log('item viewr', this );
        },

        events: {
            "click .close": "onClose",
            "click .prev": "prev",
            "click .next": "next",
            "click .add-to-frame": "addToFrame"
        },

        prev: function() {

        },

        next: function() {

        },

        addToFrame: function() {
            // move to individual view?
        },

        onClose: function() {
            this.$el.fadeOut(function() {
                this.remove();
            }.bind( this ));
        }

    });

});
