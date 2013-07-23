define([
    "app",
    "modules/media-browser/api/zeega",
    "modules/media-browser/api/flickr",
    "modules/media-browser/api/tumblr",
    "modules/media-browser/api/soundcloud",
    "modules/media-browser/api/giphy",
    "modules/media-browser/api/favorites",
    "backbone"
],

function( app, ZeegaSearch, FlickrSearch, TumblrSearch, SoundcloudSearch, GiphySearch, FavoritesSearch ) {



    return Backbone.Model.extend({

        defaults:{
            Flickr: new FlickrSearch(),
            Zeega: new ZeegaSearch(),
            Tumblr: new TumblrSearch(),
            Soundcloud: new SoundcloudSearch(),
            Giphy: new GiphySearch(),
            Favorites: new FavoritesSearch()
        },
        
        initialize: function() {
             this.set ( "currentAPI", "Zeega" );
             app.mediaSearchQuery = "";
        },

        setAPI: function( api ){
            this.set ( "currentAPI", api );
        },

        getAPI: function(){
            return this.get( this.get("currentAPI") );
        },

        more: function(){
            this.get( this.get("currentAPI")).more();
        }



    });

});
