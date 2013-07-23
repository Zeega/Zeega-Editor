define([
    "app",
    "modules/media-browser/search-results-collection",
    "backbone"
],

function( app, MediaCollection ) {

    return Backbone.Model.extend({

        api: "",
        mediaCollection: null,
        apiUrl: "",
        favUrl: "",
        allowSearch: false,

        defaults: {
            urlArguments: {

            },
            title: "",
            placeholder: "",
            searchQuery: null
        },

        initialize: function() {

            this.mediaCollection = new MediaCollection();
            this.mediaCollection.searchModel = this;
            this._initialize();
        },

        getQuery: function(){
            return this.get("urlArguments").q;
        },

        getRawQuery: function(){
            return this.get("searchQuery");
        },

        resultsReturned: function(){

            return !this.mediaCollection.noResults;
        
        },

        search: function( query ){

            if( _.isUndefined( query ) || _.isNull( query ) ){
                query = "";
            }

            if( query !== this.get( "searchQuery" ) ){
                this.set( "searchQuery", query );
                this._search( query );
                if( query !== "" ){
                    app.emit("media_search",{
                        "query": query,
                       "api": this.api
                    });
                }
            }
            
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


        onSync: function( collection ) {
            this.mediaBrowser.trigger( "media_ready", collection );
        }
    });

});