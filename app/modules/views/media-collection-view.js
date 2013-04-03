define([
    "app",
    "modules/views/modal",
    "modules/views/upload-modal",
    "backbone"
],

function( app, Modal, UploadModal ) {

    var Media = {
        Base: {},
        Zeega:{},
        Instagram: {},
        Flickr: {},
        Soundcloud: {},
        Giphy: {},
        Youtube: {},
        Web: {}
    };

    Media.Base.View = Backbone.View.extend({

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

    Media.Zeega.View = Media.Base.View.extend({

        _afterRender: function(){
            $(this.el).find(".media-collection-extras").append("<a href='#' class='upload-images'>Upload</a><a href='#' class='get-bookmarklet'><i class='icon-bookmark icon-white'></i></a>");
        },

        events: {
            "click .get-bookmarklet": "bookmarkletModal",
            "click .upload-images": "uploadModal",
            "keyup .search-box": "onSearchKeyPress"
        },

        uploadModal: function(){
            var uploadModal = new UploadModal({ model: this.model });

            uploadModal.show();

        },

        bookmarkletModal: function() {

            var bmModal = new Modal({
                modal: {
                    title: "Get the Zeega Bookmarklet",
                    className: "bookmarklet-modal",
                    content: this.modalContent
                }
            });
            

            bmModal.show();
        },

        modalContent: "<div><p>Just drag this link to your browser's bookmark bar:</p></div>" +
            "<div class='bmLink'><a href=\"javascript:(function()%7Bvar%20head=document.getElementsByTagName('body')%5B0%5D,script=document.createElement('script');script.id='zeegabm';script.type='text/javascript';script.src='//zeega.com/js/widget/zeega.bookmarklet.js?'%20+%20Math.floor(Math.random()*99999);head.appendChild(script);%7D)();%20void%200\">Add to Zeega</a></div>" +
            "<div>" +
                "<p>When you find something awesome that you want to use in your Zeega, click the bookmark and follow the simple instructions</p>" +
                "<p class='small'><i class='icon-question-sign'></i> Don't see your bookmark bar? Go to View and select 'Always Show Bookmarks Bar'</p>" +
            "</div>" +
            "<img class='bm-instructions' src='assets/img/bookmarklet-arrow.png'/>"
            
    });

    Media.Instagram.View = Media.Base.View.extend({


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
    Media.Flickr.View = Media.Base.View.extend({});
    Media.Soundcloud.View = Media.Base.View.extend({});
    Media.Giphy.View = Media.Base.View.extend({});
    Media.Youtube.View = Media.Base.View.extend({});
    Media.Web.View = Media.Base.View.extend({});

    return Media;

});
