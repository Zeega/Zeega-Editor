define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        defaults: {
            title: "untitled"
        },

        className: "media-collection",
        template: "media-collection",

        serialize: function() {
            return _.defaults( this.model.toJSON(), this.defaults );
        },

        afterRender: function() {
            console.log("AR", this, this.model.mediaCollection.length );
            this.$(".media-collection-items").empty();
            this.model.mediaCollection.each(function( item ) {
                this.$(".media-collection-items").append( item.view.el );
                item.view.render();
            }, this );

            this.$(".media-collection-items")
                .append("<li class='media-more'><a href='#'><div class='item-label'>more</div><i class='icon-plus icon-white'></i></a></li>");

            this.model.mediaCollection.on("sync", this.render, this );
        }


    });

});
