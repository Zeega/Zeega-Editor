define([
    "app",
    "modules/views/modal",
    "backbone"
],

function( app, Modal ) {

    var Media = {
        Instagram: {},
        Zeega: {},
        Flickr: {},
        Soundcloud: {},
        Web: {}
    };

    Media.Zeega.View = Backbone.View.extend({

        bmModal: null,

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
            console.log("afer collection render");
            this.renderItems();
        },

        renderItems: function() {
            this.$(".media-collection-items").empty();

            if ( this.model.mediaCollection.length ) {
                this.model.mediaCollection.each(function( item ) {
                    this.$(".media-collection-items").append( item.view.el );
                    item.view.render();
                }, this );
            } else {
                this.$(".media-collection-items").append("<div class='empty-collection'>no items found :( try again?</div>");
            }

            this.listen();

            // show bookmarklet link
            if ( this.model.get("title") == "My Media" ) {
                this.$(".get-bookmarklet").show();
            }
        },

        events: {
            "click .get-bookmarklet": "bookmarkletModal",
            "keyup .search-box": "onSearchKepress"
        },

        onSearchKepress: function( e ) {
            if ( e.which == 13 ) {
                this.search( this.$(".search-box").val() );
            }
        },

        search: function( query ) {
            console.log(this.model);
            this.model.search( query );

        },

        bookmarkletModal: function() {
            if ( this.bmModal === null ) {
                this.bmModal = new Modal({
                    modal: {
                        title: "Get the Zeega Bookmarklet",
                        className: "bookmarklet-modal",
                        content: this.modalContent
                    }
                });
            }

            this.bmModal.show();
        },

        modalContent: "<div><p>Just drag this link to your browser's bookmark bar:</p></div>" +
            "<div class='bmLink'><a href=\"javascript:(function()%7Bvar%20head=document.getElementsByTagName('body')%5B0%5D,script=document.createElement('script');script.id='zeegabm';script.type='text/javascript';script.src='//zeega.com/js/widget/zeega.bookmarklet.js?'%20+%20Math.floor(Math.random()*99999);head.appendChild(script);%7D)();%20void%200\">Add to Zeega</a></div>" +
            "<div>" +
                "<p>When you find something awesome that you want to use in your Zeega, click the bookmark and follow the simple instructions</p>" +
                "<p class='small'><i class='icon-question-sign'></i> Don't see your bookmark bar? Go to View and select 'Always Show Bookmarks Bar'</p>" +
            "</div>" +
            "<img class='bm-instructions' src='assets/img/bookmarklet-arrow.png'/>"
            
    });

    Media.Instagram.View = Media.Zeega.View.extend({});
    Media.Flickr.View = Media.Zeega.View.extend({});
    Media.Soundcloud.View = Media.Zeega.View.extend({
        className: "media-collection list"
    });
    Media.Web.View = Media.Zeega.View.extend({});

    return Media;

});
