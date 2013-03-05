define([
    "app",
    "modules/item.model",
    "modules/views/media-collection-view",
    "modules/views/item-collection-viewer",
    "backbone"
],

function( app, ItemModel, MediaCollectionView, ItemCollectionViewer ) {

    var MediaCollection = Backbone.Collection.extend({

        model: ItemModel,
        view: null,
        mediaModel: null,
        itemsCount: 0,

        url: function() {
            var url = app.searchAPI;

            _.each( this.mediaModel.toJSON().urlArguments, function( value, key ) {
                if ( value !== "" && value !== null ) {
                    url += key + "=" + ( _.isFunction( value ) ? value() : value ) + "&";
                }
            });
console.log('URL:', url, this.mediaModel.toJSON() );
            return url;
        },

        itemViewer: function( model ) {
            var startIndex = _.indexOf( _.toArray( this ), model );

            startIndex = startIndex < 0 ? 0 : startIndex;

            if ( this.view === null ) {
                this.view = new ItemCollectionViewer({ collection: this, start: startIndex });
            } else {
                this.view.init( startIndex );
            }

            $("body").append( this.view.el );
            this.view.render();
        },

        parse: function( res ) {
            this.itemsCount = res.items_count;

            return res.items;
        }
    });

    var UserMedia = Backbone.Model.extend({

        mediaCollection: null,

        // should this be a model?
        defaults: {
                urlArguments: {
                collection: "",
                type: "-project AND -collection",
                page: 1,
                q: "",
                user: function() {
                    return app.userId;
                },
                sort: "date-desc"
            },
            title: "Your Media"
        },

        initialize: function() {
            this.view = new MediaCollectionView({ model: this });
            this.mediaCollection = new MediaCollection();
            this.mediaCollection.mediaModel = this;
            this.mediaCollection.on("sync", this.onSync, this );
            this.mediaCollection.fetch();
        },

        onSync: function( collection ) {
            this.collection.trigger("user_media_ready", collection );
        }

    });

//////////////////////

    var FeaturedCollectionModel = Backbone.Model.extend({

        initialize: function() {
            this.mediaCollection = new MediaCollection( this.get("child_items") );
            this.view = new MediaCollectionView({ model: this });
        }
    });

    var FeaturedCollection = Backbone.Collection.extend({
        
        model: FeaturedCollectionModel,

        url: function() {
            return app.featuredAPI;
        },

        parse: function( res ) {
            return res.items;
        }
    });


    return Backbone.Collection.extend({

        initialize: function() {
            var userMedia = new UserMedia();

            userMedia.collection = this;
            this.unshift( userMedia );

            this.on("add", this.onAdd, this );
            this.getFeatured();
        },

        getFeatured: function() {
            var featured = new FeaturedCollection();

            featured.fetch().success(function() {
                featured.each(function( collection ) {
                    this.push( collection );
                }.bind( this ));
            }.bind( this ));
        },

        onAdd: function( collection, response ) {
            // console.log("onAdd", collection, this )
        }

    });

});
