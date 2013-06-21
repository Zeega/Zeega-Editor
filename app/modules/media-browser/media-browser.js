define([
    "app",
    "modules/media-browser/search-model",
    "backbone"
],

function( app, SearchModel ) {



    return Backbone.Model.extend({

        initialize: function() {
            var zeegaSearch = new SearchModel.Zeega();
            var _this = this;
            zeegaSearch.mediaBrowser = this;
            this.set("Zeega", zeegaSearch );
            this.set("currentAPI", "Zeega");
            this.get( this.get("currentAPI") ).search( "" );
        },

    

        setAPI: function( api, query ){
        
            if( _.isUndefined( this.get( api ) ) ){

                var apiSearch = new SearchModel[ api ]();
                apiSearch.mediaBrowser = this;
                this.set( api, apiSearch );
            }

            this.set ( "currentAPI", api );

        },

        getCurrent: function(){
            return this.get( this.get("currentAPI") );
        },

        // search: function( query ){
        //     this.get( this.get("currentAPI") ).search( query );

        // },

        more: function(){
            this.get( this.get("currentAPI")).more();
        }



    });

});
