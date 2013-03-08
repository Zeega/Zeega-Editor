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
                var args = this.collection.at(0).get("urlArguments");

                args.q = this.$(".search-box").val();
                this.collection.at(0).set("urlArguments", args );
                this.collection.at(0).mediaCollection.fetch();
            }
        },

        onResize: function() {
            var leftCol = $(".left-column .static-upper").height() +
                $(".left-column .media-drawer-controls").height();

            this.$(".ZEEGA-items").css("height", window.innerHeight - leftCol );
        }


    });

});
