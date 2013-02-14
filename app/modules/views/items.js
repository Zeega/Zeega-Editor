define([
    "app",
    "backbone"
],

function( app, Backbone ) {

    return Backbone.View.extend({

        el: null,
        template: "items",

        renderItems: function() {
            this.collection.each(function( item ) {
                this.$(".ZEEGA-items").append( item.view.el );
                item.view.render();
            }, this );
        }


    });

});
