define([
    "app",
    "modules/item.model",
    "modules/media-browser/media-collection-view",
    "modules/media-browser/media-collection",
    "modules/views/item-collection-viewer",
    "backbone"
],

function( app, ItemModel, CollectionView, Collection, ItemCollectionViewer ) {


    var Search = {};

    Search.Zeega = Backbone.Model.extend({

        api: "Zeega",
        mediaCollection: null,
        apiUrl: app.searchAPI,
        favUrl: app.searchAPI + "type=Image&user=" + app.metadata.favId + "&limit=48",
        allowSearch: false,

        defaults: {
                urlArguments: {
                    collection: "",
                    type: "Image",
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
            this.view = new CollectionView[ this.api ]({ model: this });
            this.mediaCollection = new Collection[ this.api ]();
            this.mediaCollection.searchModel = this;
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
        more: function(){
            this._more();
        },
        _more: function(){

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


    Search.Giphy = Search.Zeega.extend({
        
        api: "Giphy",
        apiUrl: app.api + "items/parser?",
        allowSearch: true,
        favUrl: app.searchAPI + "archive=Giphy&type=Image&user=" + app.metadata.favId + "&limit=48&sort=date-desc",


        defaults: {
            urlArguments: {
                url: "",
                tag: "",
                offset: 0
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

         
            args.offset = 0;
            args.tag = query;
            args.url = "http://giphy.com/tags/" + args.tag + "/offset/" + args.offset;

            this.set("urlArguments", args );
            this.mediaCollection.fetch();
            
        },
        _more: function(){

            var args = this.get("urlArguments");
            args.offset += 50;
            args.url = "http://giphy.com/tags/" + args.tag + "/offset/" + args.offset;

            this.set("urlArguments", args );
            this.mediaCollection.fetch({remove: false});
        }
    });

    Search.MyZeega = Search.Zeega.extend({

        api: "MyZeega",
        allowSearch: true,
        defaults: {
                urlArguments: {
                    collection: "",
                    type: "",
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
            if( query !== args.q ) {
                args.q = query;
            }
            args.page = 1;
            this.set("urlArguments", args );
            this.mediaCollection.fetch();
        },
        _more: function(){
            
            var args = this.get("urlArguments");
            args.page += 1;
            this.set("urlArguments", args );
            this.mediaCollection.fetch({remove: false});
        }
    });

    Search.Flickr = Search.Zeega.extend({
        
        api: "Flickr",
        apiUrl: "https://secure.flickr.com/services/rest/?",
        
        favUrl: "https://secure.flickr.com/services/rest/?nojsoncallback=1&format=json&method=flickr.interestingness.getList&extras=owner_name&per_page=100&api_key=97ac5e379fbf4df38a357f9c0943e140",
        //favUrl: app.searchAPI + "archive=Flickr&type=Image&user=" + app.metadata.favId + "&limit=48&sort=date-desc",
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

            var args = this.get("urlArguments");
            args.page = 1;
            args.text = query;
            this.set("urlArguments", args );
            this.mediaCollection.fetch();
  
        },
        _more: function(){
            
            var args = this.get("urlArguments");
            args.page += 1;
            this.set("urlArguments", args );
            this.mediaCollection.fetch({remove: false});
        }
    });

    Search.Soundcloud = Search.Zeega.extend({
        
        api: "Soundcloud",
        apiUrl: "https://api.soundcloud.com/tracks.json?",
        favUrl: app.searchAPI + "archive=SoundCloud&type=Audio&user=" + app.metadata.favId + "&limit=48&sort=date-desc",
        
        allowSearch: true,
        defaults: {
            urlArguments: {
                callback: "?",
                q: "",
                consumer_key: "lyCI2ejeGofrnVyfMI18VQ"
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

                args.offset = 0;
                args.q = query;
                this.set("urlArguments", args );
                this.mediaCollection.fetch();
            
        },
        _more: function(){
            
            var args = this.get("urlArguments");
            args.offset += 50;
            this.set("urlArguments", args );

            this.mediaCollection.fetch({remove: false});
        }
    });

    Search.Instagram = Search.Zeega.extend({
        
        api: "Instagram",
        apiUrl: "https://api.instagram.com/v1/",
        queryType: "tag",
        favUrl: "https://api.instagram.com/v1/media/popular?client_id=725bbc7af5094c8682bdb322d29734cc&callback=?",
        //favUrl: app.searchAPI + "archive=Instagram&type=Image&user=" + app.metadata.favId + "&limit=48&sort=date-desc",
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

    

    Search.Tumblr = Search.Zeega.extend({
        
        api: "Tumblr",
        apiUrl: app.api + "items/parser?",
        allowSearch: true,
        favUrl: app.searchAPI + "archive=Tumblr&type=Image&user=" + app.metadata.favId + "&limit=48&sort=date-desc",

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

            args.before = new Date().getTime();
            args.tag = query;
            args.url = "http://www.tumblr.com/tagged/" + args.tag + "/before/" + args.before;

            this.set("urlArguments", args );
            this.mediaCollection.pumpkin ="orange";
            this.mediaCollection.fetch();
            
        },
        _more: function( query ){

            var args = this.get("urlArguments");

            args.before = this.mediaCollection.at(this.mediaCollection.length - 1).get("attributes").timestamp;

            args.url = "http://www.tumblr.com/tagged/" + args.tag + "/before/" + args.before;

            this.set("urlArguments", args );
            this.mediaCollection.fetch({remove:false});
        }

    });

    Search.Youtube = Search.Zeega.extend({
        
        api: "Youtube",
        apiUrl: "https://gdata.youtube.com/feeds/api/videos?",
        favUrl: app.searchAPI + "archive=Youtube&user=" + app.metadata.favId + "&limit=48&sort=date-desc",

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


            args.q = query;
            this.set("urlArguments", args );
            this.mediaCollection.fetch();
    
        }
    });

    return Search;


    

});
