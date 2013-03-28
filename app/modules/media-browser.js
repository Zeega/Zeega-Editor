define([
    "app",
    "modules/item.model",
    "modules/views/media-collection-view",
    "modules/views/item-collection-viewer",
    "backbone"
],

function( app, ItemModel, MediaView, ItemCollectionViewer ) {


    var Media = {
        Instagram: {},
        Zeega: {},
        Flickr: {},
        Soundcloud: {},
        Web: {}
    };


    Media.Zeega.Collection = Backbone.Collection.extend({

        model: ItemModel,
        view: null,
        mediaModel: null,
        itemsCount: 0,

        url: function() {
            var url = this.mediaModel.apiUrl;

            _.each( this.mediaModel.toJSON().urlArguments, function( value, key ) {
                if ( value !== "" && value !== null ) {
                    url += key + "=" + ( _.isFunction( value ) ? value() : value ) + "&";
                }
            });

            return url;
        },

        itemViewer: function( model ) {
            var startIndex = _.indexOf( this.pluck("id"), model.id );

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

    Media.Flickr.Collection = Media.Zeega.Collection.extend({

        parse: function( res ) {
            var photos = res.photos.photo;

            _.each( photos, function( photo ){
                photo.layer_type ="Image";
                photo.thumbnail_url = "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
                                    photo.id + "_" + photo.secret + "_s.jpg";
                photo.uri = "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
                                    photo.id + "_" + photo.secret + ".jpg";
                photo.attribution_uri =  "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
                photo.media_user_realname = photo.owner_name;
            });


            this.itemsCount = res.photos.perpage;
            return res.photos.photo;
        }
    });

    Media.Instagram.Collection = Media.Zeega.Collection.extend({
        

        url : function(){
            var url = this.mediaModel.apiUrl + "tags/" + this.mediaModel.get("query") +
                        "/media/recent?client_id=725bbc7af5094c8682bdb322d29734cc&callback=?";
            return url;
        },
        

        parse: function(res){
            console.log(res);
            var photos = res.data;
            _.each( photos, function( photo ){
                console.log(photo);
                photo.layer_type ="Image";
                photo.thumbnail_url = photo.images.thumbnail.url;
                photo.uri = photo.images.standard_resolution.url;
                photo.attribution_uri =  photo.link;
                photo.media_user_realname = photo.user.user_name;
                if( !_.isNull( photo.caption ) && !_.isNull( photo.caption.text ) ){
                    photo.title = photo.caption.text;
                } else {
                    photo.title = "";
                }
                
            });
            return photos;
        }
    });

    Media.Soundcloud.Collection = Media.Zeega.Collection.extend({
            
            

            parse: function(res){
                var tracks = res;
                _.each( tracks, function( track ){

                    track.layer_type ="Audio";
                    track.media_type = "Audio";
                    track.archive = "SoundCloud";

                    track.thumbnail_url = track.waveform_url;
                    track.uri = track.stream_url + "?consumer_key=lyCI2ejeGofrnVyfMI18VQ";
                    track.attribution_uri =  track.permalink_url;
                    track.media_user_realname = track.user.username;
                    

                });
                return tracks;
            }
    });

    Media.Web.Collection = Media.Zeega.Collection.extend({

        parse: function( res ) {
            console.log(res);
            this.itemsCount = 1;

            return res.items;
        }
    });


    Media.Zeega.Model = Backbone.Model.extend({

        api: "Zeega",
        mediaCollection: null,
        apiUrl: app.searchAPI,

        // should this be a model?
        defaults: {
                urlArguments: {
                    collection: "",
                    type: "-project AND -Collection AND -Video",
                    page: 1,
                    q: "",
                    data_source: "db",
                    user: function() {
                        return app.userId;
                },
                sort: "date-desc"
            },
            title: "My Media"
        },

        initialize: function() {
            console.log("initializing this shit!!!!!")
            this.view = new MediaView[ this.api ].View({ model: this });
            this.mediaCollection = new Media[ this.api ].Collection();
            this.mediaCollection.mediaModel = this;
            //this.mediaCollection.on("sync", this.onSync, this );

            this.listen();
        },

        search: function( query ){

            var args = this.get("urlArguments");

           

            if(query === ""){
                args.data_source = "db";
            } else if( query === args.q ) {
                this.mediaCollection.trigger( "sync" );
            } else {
                 args.q = query;
                args.data_source = "solr";
            }

            this.set("urlArguments", args );
            this.mediaCollection.fetch();
        },

        listen: function() {

            // fetch user items on window focus !
            // window.addEventListener("focus", function() {
            //     this.mediaCollection.fetch();
            // }.bind( this ));
        },

        onSync: function( collection ) {
            this.mediaBrowser.trigger( "media_ready", collection );
        }
    });

    Media.Flickr.Model = Media.Zeega.Model.extend({
        
        api: "Flickr",
        apiUrl: "https://secure.flickr.com/services/rest/?",

        defaults: {
            urlArguments: {
                nojsoncallback: "1",
                format: "json",
                method: "flickr.photos.search",
                extras: "owner_name",
                type: "-project AND -Collection AND -Video",
                per_page: "50",
                api_key: "97ac5e379fbf4df38a357f9c0943e140",
                text: ""
    
            },
            title: "Flickr"
        },
        search: function( query ){

            var args= this.get("urlArguments");

            
            
            if( query === "" || query === args.text ){
                this.mediaCollection.trigger("sync");
            } else {
                args.text = query;
                this.set("urlArguments", args );
                this.mediaCollection.fetch();
            }


            
        }
    });

    Media.Soundcloud.Model = Media.Zeega.Model.extend({
        
        api: "Soundcloud",
        apiUrl: "https://api.soundcloud.com/tracks.json?",

        defaults: {
            urlArguments: {
                callback: "?",
                q: "",
                consumer_key: "lyCI2ejeGofrnVyfMI18VQ"
                //client_id: "d2976f4acb249154e1095377a705c6c4"
            },
            title: "Soundcloud"
        },
        search: function( query ){

            var args= this.get("urlArguments");

            if( query === "" || query === args.q ){
                this.mediaCollection.trigger("sync");
            } else {
                args.q = query;
                this.set("urlArguments", args );
                this.mediaCollection.fetch();
            }
        }
    });

    Media.Instagram.Model = Media.Zeega.Model.extend({
        
        api: "Instagram",
        apiUrl: "https://api.instagram.com/v1/",

        defaults: {
            query: "",
            title: "Instagram"
        },
        search: function( query ){

            
            if( query === "" || query === this.get("query") ){
                this.mediaCollection.trigger("sync");
            } else {
                this.set("query", query );
                this.mediaCollection.fetch();
            }


            
        }
    });

    Media.Web.Model = Media.Zeega.Model.extend({
        
        api: "Web",
        apiUrl: "https://zeega.com/api/items/parser?",

         defaults: {
            urlArguments: {
                url: ""
            },
            title: "The web"
        },

        search: function( query ){

            
            
            var args= this.get("urlArguments");

            if( query === "" || query === args.url ){
                this.mediaCollection.trigger("sync");
            } else {
                args.url = query;
                this.set("urlArguments", args );
                this.mediaCollection.fetch();
            }


            
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
            return "http://staging.zeega.org/api/items/featured";
        },

        parse: function( res ) {
            return res.items;
        }
    });



    // This collection is responsible for keeping track of various media collections, caching and

    return Backbone.Model.extend({

        initialize: function() {
            var userMedia = new Media.Zeega.Model();
            var _this = this;
            userMedia.mediaBrowser = this;
            this.set("Zeega", userMedia );
            this.set("currentAPI", "Zeega");
            this.search("");
        },

    

        setAPI: function( api, query ){
        
            if( _.isUndefined( this.get( api ) ) ){

                var media = new Media[ api ].Model();
                media.mediaBrowser = this;
                media.on("media_ready", this.onMediaReady );
                this.set( api, media );
            }

            this.set ( "currentAPI", api );
            this.search( query );

        },

        getCurrent: function(){
            return this.get( this.get("currentAPI") );
        },

        search: function( query ){
            this.get( this.get("currentAPI") ).search( query );

        }



    });

});
