define([
    "app",
    "modules/media-browser/search-model",
    "backbone"
],

function( app, SearchModel ) {

    return SearchModel.extend({

        api: "Favorites",
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
            searchQuery: null
        },

        _initialize: function(){
            this.mediaCollection.url = function() {
                var url;

                if( this.searchModel.getQuery() === "" && this.searchModel.api != "Zeega" ){
                    
                    url = this.searchModel.favUrl;

                } else {

                    url = this.searchModel.apiUrl;
                    _.each( this.searchModel.toJSON().urlArguments, function( value, key ) {
                        if ( value !== "" && value !== null ) {
                            url += key + "=" + ( _.isFunction( value ) ? value() : value ) + "&";
                        }
                    });
                }
                return url;
            };
        }
    });

});
