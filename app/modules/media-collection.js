define([
    "app",
    "modules/item.model",
    "backbone"
],

function( app, ItemModel ) {

    var MediaCollection = Backbone.Collection.extend({

        model: ItemModel,
        mediaModel: null,
        itemsCount: 0,

        url: function() {
            var url = app.searchAPI;

            _.each( this.mediaModel.toJSON(), function( value, key ) {
                if ( value !== "" && value !== null ) {
                    url += key + "=" + value + "&";
                }
            });
            return url;
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
            collection: "",
            type: "-project AND -collection",
            page: 1,
            q: "",
            user: 36, // should not be hardcoded!
            sort: "date-desc"
        },

        initialize: function() {
            this.mediaCollection = new MediaCollection();
            this.mediaCollection.mediaModel = this;
            this.mediaCollection.on("sync", this.onSync, this );
            // this.mediaCollection.fetch();
        },

        onSync: function( collection ) {
            console.log("on sync", collection )
        }

    });

//////////////////////

    FeaturedCollectionModel = Backbone.Model.extend({

        initialize: function() {
            console.log( new MediaCollection() )
            this.mediaCollection = new MediaCollection( this.get("child_items") );
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
            this.on("add", this.onAdd, this );
            this.unshift( new UserMedia );
            this.getFeatured();
        },

        getFeatured: function() {
            var featured = new FeaturedCollection();
            
            featured.fetch().success(function() {
                featured.each(function( collection ) {
                    this.push( collection );
                }.bind( this ))
            }.bind( this ));
        },

        onAdd: function( collection, response ) {
            console.log("onAdd", collection, this )
        }

    });

});
