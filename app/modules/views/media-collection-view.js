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

        listen: null,

        initialize: function() {
            this.listen = _.once(function() {
                this.model.mediaCollection.on("sync", this.render, this );
            }.bind( this ));
        },

        afterRender: function() {
            console.log("AR", this.model.mediaCollection.length );
            this.$(".media-collection-items").empty();

            if ( this.model.mediaCollection.length ) {
                this.model.mediaCollection.each(function( item ) {
                    this.$(".media-collection-items").append( item.view.el );
                    item.view.render();
                }, this );
            } else {
                this.$(".media-collection-items").append("<div class='empty-collection'>no items found :( try again?</div>");
            }

            // this.$(".media-collection-items")
            //     .append("<li class='media-more'><a href='#'><div class='item-label'>more</div><i class='icon-plus icon-white'></i></a></li>");
            
            this.listen();
        }

    });

});
