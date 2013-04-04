define([
    "app",
    "backbone"
],

function( app ) {

    var Media = {
        Zeega:{},
        Instagram: {},
        Flickr: {},
        Soundcloud: {},
        Giphy: {},
        Youtube: {},
        Web: {},
        MyZeega: {}
    };

    Media.Zeega.View = Backbone.View.extend({

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
                this.model.mediaCollection.on("sync", this.renderItems, this );
            }.bind( this ));
        },
        afterRender: function() {
            this.renderItems();
            this._afterRender();
        },

        //extend this function
        _afterRender: function(){

        },

        renderItems: function() {
            
            this.$(".media-collection-items").empty();

            if ( this.model.mediaCollection.length && this.model.mediaCollection.at( 0 ).get("uri") ) {
                this.model.mediaCollection.each(function( item ) {
                    this.$(".media-collection-items").append( item.view.el );
                    item.view.render();
                }, this );
            } else if( this.model.getQuery() !== "" ) {
                this.$(".media-collection-items").append("<div class='empty-collection'>no items found :( try again?</div>");
            }

            this.listen();

            // show bookmarklet link
            if ( this.model.get("title") == "My Media" ) {
                this.$(".get-bookmarklet").show();
            }
        },

        events: {
            "keyup .search-box": "onSearchKeyPress"
        },

        onSearchKeyPress: function( e ) {
            if ( e.which == 13 ) {
                this.search( this.$(".search-box").val() );
            }
        },

        search: function( query ) {
            console.log(this.model, query);
            this.model.search( query );

        }

    });

   
            

    Media.Instagram.View = Media.Zeega.View.extend({


        _afterRender: function(){
            console.log("beforerender");
            this.$el.find(".collection-options").append("<select class = 'query-type' >" +
              "<option value='user'>username</option>" +
              "<option value='tag'>tag</option>" +
            "</select>");
        },

        events: {
            "keyup .search-box": "onSearchKeyPress",
            "change .query-type": "onQueryTypeChange"
        },

        onQueryTypeChange: function( ){
            var type = this.$el.find(".query-type").attr("value");
            this.model.setQueryType( type );

        }

    });
    Media.Flickr.View = Media.Zeega.View.extend({});
    Media.Soundcloud.View = Media.Zeega.View.extend({});
    Media.Giphy.View = Media.Zeega.View.extend({});
    Media.Youtube.View = Media.Zeega.View.extend({});
    Media.Web.View = Media.Zeega.View.extend({});
     Media.MyZeega.View = Media.Zeega.View.extend();

    return Media;

});
