define([
    "app",
    "backbone"
],

function( app, Backbone ) {

    return Backbone.View.extend({

        el: null,
        template: "items",

        initialize: function() {
            app.on("window-resize", this.onResize, this );
        },

        renderItems: function() {
            this.$(".ZEEGA-items").empty();
            this.onResize();
            this.collection.each(function( item ) {
                this.$(".ZEEGA-items").append( item.view.el );
                item.view.render();
            }, this );
        },

        events: {
            "click .grid": "goGrid",
            "click .list": "goList",
            "keyup .search-box": "onSearchKepress"
        },

        goGrid: function() {
            this.$el.removeClass("list");
        },

        goList: function() {
            this.$el.addClass("list");
        },

        onSearchKepress: function( e ) {
            if ( e.which == 13 ) {
                console.log('search query:', this.$(".search-box").val() );
                app.search.set("q", this.$(".search-box").val() );
            }
        },

        onResize: function() {
            var leftCol = 0;

            leftCol += $(".left-column .nav").height();
            leftCol += $(".left-column .project-meta").height();
            leftCol += $(".left-column .media-drawer-controls").height();

            this.$(".ZEEGA-items").css("height", window.innerHeight - leftCol );
        }


    });

});
