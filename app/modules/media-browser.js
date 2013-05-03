define([
    "app",
    "modules/item.model",
    "modules/views/media-collection-view",
    "modules/views/item-collection-viewer",
    "backbone"
],

function( app, ItemModel, MediaView, ItemCollectionViewer ) {


    var Media = {
        
        Zeega: {},
        Instagram: {},
        Flickr: {},
        Soundcloud: {},
        Tumblr: {},
        Giphy: {},
        Youtube: {},
        MyZeega:{}
    };


    Media.Zeega.Collection = Backbone.Collection.extend({

        model: ItemModel,
        view: null,
        mediaModel: null,
        itemsCount: 0,

        url: function() {
            var url;


            if( this.mediaModel.getQuery() === "" && this.mediaModel.api != "MyZeega" ){
                
                url = this.mediaModel.favUrl;

            } else {

                url = this.mediaModel.apiUrl;
                _.each( this.mediaModel.toJSON().urlArguments, function( value, key ) {
                    if ( value !== "" && value !== null ) {
                        url += key + "=" + ( _.isFunction( value ) ? value() : value ) + "&";
                    }
                });
            }
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

    Media.MyZeega.Collection = Media.Zeega.Collection.extend({

        parse: function( res ) {
            var photos = res.items,
                count = 1;
            
            _.each( photos, function( photo ){
                photo.id = count;
                photo.allowDelete = 1;
                count++;
            });

            this.itemsCount = res.items_count;
            return photos;
        }
    });

    Media.Flickr.Collection = Media.Zeega.Collection.extend({

        parse: function( res ) {

            if(!_.isUndefined( res.items_count )){
                this.itemsCount = res.items_count;

                return res.items;
            }


            var items =[],
                item;

            _.each( res.photos.photo, function( photo ){

                item = {};
                item.id = photo.id;
                item.layer_type = "Image";
                item.media_type = "Image";
                item.archive = "Flickr";
                item.title = photo.title;
                item.thumbnail_url = "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
                                    photo.id + "_" + photo.secret + "_s.jpg";
                item.uri = "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
                                    photo.id + "_" + photo.secret + ".jpg";
                item.attribution_uri =  "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
                item.media_user_realname = photo.owner_name;
                items.push( item );
            });


            this.itemsCount = res.photos.perpage;
            return items;
        }
    });

    Media.Instagram.Collection = Media.Zeega.Collection.extend({
        

        url : function(){
            var url;
            if( this.mediaModel.getQuery() === "" ){
                url = this.mediaModel.favUrl;
            } else {
                if( this.mediaModel.queryType == "tag" ){
                    url = this.mediaModel.apiUrl + "tags/" + this.mediaModel.get("query") +
                            "/media/recent?client_id=725bbc7af5094c8682bdb322d29734cc&callback=?";
                } else {

                    // Instagram User queries require user id, route through Zeega
                    url = app.api + "items/parser?url=http://instagram.com/" + this.mediaModel.get("query");
                }
            }
            return url;
        },
        

        parse: function(res){
            
            if( this.mediaModel.queryType == "tag" || this.mediaModel.getQuery() === ""){
                var items = [];

                _.each( res.data, function( photo ){

                    var item = {};
                    item.id = photo.id;
                    if( !_.isNull( photo.caption ) && !_.isNull( photo.caption.text ) ){
                        var tmp = document.createElement("DIV");
                        tmp.innerHTML = photo.caption.text;
                        item.title = tmp.textContent||tmp.innerText;
                    } else {
                        item.title = "Instagram by " + photo.user.user_name;
                    }
                    

                    item.archive = "Instagram";
                    item.layer_type ="Image";
                    item.media_type = "Image";

                    item.thumbnail_url = photo.images.thumbnail.url;
                    item.uri = photo.images.standard_resolution.url;
                    item.attribution_uri =  photo.link;
                    item.media_user_realname = photo.user.user_name;

                    items.push( item );
                });
                return items;
            } else {
                var photos,
                    count = 1;

                if ( res.code == 500 ){
                    this.itemsCount = 0;
                    return array();
                }


                photos = res.items;
                
                _.each( photos, function( photo ){
                    photo.id = count;
                    count++;
                });
     
                this.itemsCount = res.items_count;

                return res.items;

            }
        }
    });

    Media.Soundcloud.Collection = Media.Zeega.Collection.extend({
            
            parse: function(res){
                var items = [],
                    item,
                    count =1;

                if(!_.isUndefined( res.items_count )){
                    this.itemsCount = res.items_count;

                    return res.items;
                }

                _.each( res, function( track ){
                    item = {};
                    item.id = count;
                    count++;
                    item.layer_type ="Audio";
                    item.media_type = "Audio";
                    item.archive = "SoundCloud";
                    item.title = track.title;

                    if( !_.isNull( track.artwork_url )){
                        item.thumbnail_url = track.artwork_url;
                    } else if( !_.isNull( track.user.avatar_url )){
                        item.thumbnail_url = track.user.avatar_url;
                    } else {
                        item.thumbnail_url = track.waveform_url;
                    }

                    
                    item.uri = track.stream_url + "?consumer_key=lyCI2ejeGofrnVyfMI18VQ";
                    item.attribution_uri =  track.permalink_url;
                    item.media_user_realname = track.user.username;
                    item.archive = "SoundCloud";
                    items.push( item );
                });

                return items;
            }
    });

    Media.Giphy.Collection = Media.Zeega.Collection.extend({

        parse: function(res){
            
            var photos = res.items,
                count = 1;
            
            _.each( photos, function( photo ){
                photo.id = count;
                count++;
            });

            this.itemsCount = res.items_count;
            return photos;
        }
    });


    Media.Tumblr.Collection = Media.Zeega.Collection.extend({

        parse: function(res){
            var photos = res.items,
                count = 1;
            
            _.each( photos, function( photo ){
                photo.id = count;
                count++;
            });

            this.itemsCount = res.items_count;
            return photos;
        }
    });

    Media.Youtube.Collection = Media.Zeega.Collection.extend({

        parse: function(res){
            var items = [],
                count = 1;

            
            _.each( res.data.items, function( video ){
                var item = {};
                item.id = count;
                item.layer_type = "Youtube";
                item.media_type = "Video";
                count++;

                item.uri = video.id;
                item.title = video.title;
                item.attribution_uri = video.player[ "default" ];
                item.thumbnail_url = video.thumbnail.hqDefault;
                item.aspectRatio = video.aspectRatio;


                if( video.accessControl.embed == "allowed" ){
                     items.push( item );
                }

            });

            this.itemsCount = res.items_count;
            return items;
        }
    });








    Media.Zeega.Model = Backbone.Model.extend({

        api: "Zeega",
        mediaCollection: null,
        apiUrl: app.searchAPI,
        favUrl: app.searchAPI + "type=-project AND -Collection AND -Video AND -Audio&user=1&limit=48&sort=date-desc",
        allowSearch: false,

        defaults: {
                urlArguments: {
                    collection: "",
                    type: "-project AND -Collection AND -Video",
                    page: 1,
                    q: "",
                    limit: 48,
                    user: 1,
                    sort: "date-desc"
            },
            title: "Zeega",
            placeholder: "search Zeega favorites",
            searchQuery:""
        },

        initialize: function() {
            this.view = new MediaView[ this.api ].View({ model: this });
            this.mediaCollection = new Media[ this.api ].Collection();
            this.mediaCollection.mediaModel = this;
            //this.mediaCollection.on("sync", this.onSync, this );
            this.search( "" );
            this.listen();
        },
        getQuery: function(){
            return this.get("urlArguments").q;
        },
        search: function( query ){
            this.set( "searchQuery", query );
            this._search( query );
        },
        _search: function( query ){

            var args = this.get("urlArguments");

            if( query !== args.q ) {
                args.q = query;
            }

            this.set("urlArguments", args );
            this.mediaCollection.fetch();
        },

        listen: function() {
        },

        onSync: function( collection ) {
            this.mediaBrowser.trigger( "media_ready", collection );
        }
    });

    Media.MyZeega.Model = Media.Zeega.Model.extend({

        api: "MyZeega",
        allowSearch: true,
        defaults: {
                urlArguments: {
                    collection: "",
                    type: "-project AND -Collection AND -Video",
                    page: 1,
                    q: "",
                    limit: 48,
                    data_source: "db",
                    user: function() {
                        return app.userId;
                },
                sort: "date-desc"
            },
            title: "My Media",
            placeholder: "search your media",
            searchQuery:""
        },

        
        _search: function( query ){


            var args = this.get("urlArguments");

           

            if(query === ""){
                args.data_source = "db";
            } else if( query !== args.q ) {
                args.q = query;
                args.data_source = "solr";
            }

            this.set("urlArguments", args );
            this.mediaCollection.fetch();
        }
    });

    Media.Flickr.Model = Media.Zeega.Model.extend({
        
        api: "Flickr",
        apiUrl: "https://secure.flickr.com/services/rest/?",
        
        favUrl: "https://secure.flickr.com/services/rest/?nojsoncallback=1&format=json&method=flickr.interestingness.getList&extras=owner_name&per_page=100&api_key=97ac5e379fbf4df38a357f9c0943e140",
        //favUrl: app.searchAPI + "archive=Flickr&type=Image&user=1&limit=48&sort=date-desc",
        allowSearch: true,

        defaults: {
            urlArguments: {
                nojsoncallback: "1",
                format: "json",
                method: "flickr.photos.search",
                extras: "owner_name",
                per_page: "100",
                api_key: "97ac5e379fbf4df38a357f9c0943e140",
                text: ""
    
            },
            title: "Flickr",
            placeholder: "search Flickr photos",
            searchQuery:""
        },
        getQuery: function(){
            return this.get("urlArguments").text;
        },
        _search: function( query ){

            var args= this.get("urlArguments");

            
            
            
            args.text = query;
            this.set("urlArguments", args );
            this.mediaCollection.fetch();
            


            
        }
    });

    Media.Soundcloud.Model = Media.Zeega.Model.extend({
        
        api: "Soundcloud",
        apiUrl: "https://api.soundcloud.com/tracks.json?",
        favUrl: app.searchAPI + "archive=SoundCloud&type=Audio&user=1&limit=48&sort=date-desc",
        
        allowSearch: true,
        defaults: {
            urlArguments: {
                callback: "?",
                q: "",
                consumer_key: "lyCI2ejeGofrnVyfMI18VQ"
                //client_id: "d2976f4acb249154e1095377a705c6c4"
            },
            title: "Soundcloud",
            placeholder: "search SoundCloud audio",
            searchQuery:""
        },
        getQuery: function(){
            return this.get("urlArguments").q;
        },
        _search: function( query ){

            var args= this.get("urlArguments");

            
                args.q = query;
                this.set("urlArguments", args );
                this.mediaCollection.fetch();
            
        }
    });

    Media.Instagram.Model = Media.Zeega.Model.extend({
        
        api: "Instagram",
        apiUrl: "https://api.instagram.com/v1/",
        queryType: "tag",
        favUrl: "https://api.instagram.com/v1/media/popular?client_id=725bbc7af5094c8682bdb322d29734cc&callback=?",
        //favUrl: app.searchAPI + "archive=Instagram&type=Image&user=1&limit=48&sort=date-desc",
        allowSearch: true,

        defaults: {
            query: "",
            title: "Instagram",
            placeholder: "search Instagram photos",
            searchQuery:""
        },
        getQuery: function(){
            return this.get("query");
        },

        setQueryType: function( selection ){
            this.queryType = selection;
        },
        _search: function( query ){

            this.set("query", query );
            this.mediaCollection.fetch();
        }
    });

    Media.Giphy.Model = Media.Zeega.Model.extend({
        
        api: "Giphy",
        apiUrl: app.api + "items/parser?",
        allowSearch: true,
        favUrl: app.searchAPI + "archive=Giphy&type=Image&user=1&limit=48&sort=date-desc",


        defaults: {
            urlArguments: {
                url: "",
                tag: ""
            },
            title: "Giphy",
            placeholder: "search Giphy gifs",
            searchQuery: ""
        },
        getQuery: function(){
            return this.get("urlArguments").tag;
        },
        _search: function( query ){

            var args = this.get("urlArguments");

         
            args.tag = query;
            args.url = "http://giphy.com/tags/" + query;

            this.set("urlArguments", args );
            this.mediaCollection.fetch();
            
        }
    });

    Media.Tumblr.Model = Media.Zeega.Model.extend({
        
        api: "Tumblr",
        apiUrl: app.api + "items/parser?",
        allowSearch: true,
        favUrl: app.searchAPI + "archive=Tumblr&type=Image&user=1&limit=48&sort=date-desc",

        defaults: {
            urlArguments: {
                url: "",
                tag: ""
            },
            title: "Tumblr",
            placeholder: "search Tumblr posts",
            searchQuery: ""
        },
        getQuery: function(){
            return this.get("urlArguments").tag;
        },
        _search: function( query ){

            var args = this.get("urlArguments");

           
            args.tag = query;
            args.url = "http://www.tumblr.com/tagged/" + query;

            this.set("urlArguments", args );
            this.mediaCollection.fetch();
            
        }
    });

    Media.Youtube.Model = Media.Zeega.Model.extend({
        
        api: "Youtube",
        apiUrl: "https://gdata.youtube.com/feeds/api/videos?",
        favUrl: app.searchAPI + "archive=Youtube&user=1&limit=48&sort=date-desc",

        allowSearch: true,

        defaults: {
            urlArguments: {
                callback: "?",
                orderby: "relevance",
                alt: "jsonc",
                v: "2",
                "max-results": "50",
                q: ""
    
            },
            title: "Youtube",
            placeholder: "search Youtube",
            searchQuery:""
        },
        getQuery: function(){
            return this.get("urlArguments").q;
        },
        _search: function( query ){

            var args= this.get("urlArguments");

            
            
            if( query !== "" && query !== args.q ){
                args.q = query;
                this.set("urlArguments", args );
                this.mediaCollection.fetch();
            }


            
        }
    });




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
                this.set( api, media );
            }

            this.set ( "currentAPI", api );

        },

        getCurrent: function(){
            return this.get( this.get("currentAPI") );
        },

        search: function( query ){
            this.get( this.get("currentAPI") ).search( query );

        }



    });

});
