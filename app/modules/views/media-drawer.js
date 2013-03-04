define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        el: null,
        template: "media-drawer",

        initialize: function() {
            app.on("window-resize", this.onResize, this );
        },

        afterRender: function() {
            this.renderCollections();
            this.collection.on("add", this.renderCollection, this );
            this.onResize();
        },

        renderCollections: function() {
            this.$(".ZEEGA-items").empty();
            this.collection.each(function( collection ) {
                this.renderCollection( collection );
            }, this );
        },

        renderCollection: function( collection ) {
            this.$(".ZEEGA-items").append( collection.view.el );
            collection.view.render();
        },


        // renderItems: function() {
        //     this.$(".ZEEGA-items").empty();
        //     this.onResize();
        //     this.collection.each(function( item ) {
        //         this.$(".ZEEGA-items").append( item.view.el );
        //         item.view.render();
        //     }, this );
        // },

        events: {
            "click .gridToggle": "gridToggle",
            "keyup .search-box": "onSearchKepress"
        },

        gridToggle: function() {
            this.$el.toggleClass("list")
                .toggleClass("grid");

            this.$(".gridToggle i").toggleClass("icon-th")
                .toggleClass("icon-th-list");
        },

        onSearchKepress: function( e ) {
            if ( e.which == 13 ) {
                console.log('search query:', this.$(".search-box").val() );
                app.search.set("q", this.$(".search-box").val() );
            }
        },

        onResize: function() {
            var leftCol = $(".left-column .static-upper").height() +
                $(".left-column .media-drawer-controls").height();

            this.$(".ZEEGA-items").css("height", window.innerHeight - leftCol );
        }


    });

});
