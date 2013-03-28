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
            //this.model.on("media_ready", this.renderMedia, this);
        },

        afterRender: function() {
            
            this.renderMedia();
            this.onResize();
        },
        renderMedia: function() {
            this.$(".ZEEGA-items").empty();
            var collection = this.model.getCurrent();
            this.$(".ZEEGA-items").append( collection.view.el );
            collection.view.render();
        },

        events: {
            "click .clear-search": "clearSearch",
            "focus .search-box": "onSearchFocus",
            "click .media-toggle": "onMediaToggle"
        },

        clearSearch: function() {
            this.$(".search-box").val("");
            this.search("");
        },

        onMediaToggle: function(event){
            var api = $(event.target).data("api");
            this.$el.find(".search-box").attr("placeholder", "search " + api);
            this.model.setAPI( api, this.$(".search-box").val() );
            this.renderMedia();
            return false;
        },

        onSearchFocus: function() {
            
        },

        

        onResize: function() {
            var leftCol = $(".left-column .static-upper").height() +
                $(".left-column .media-drawer-controls").height();

            this.$(".ZEEGA-items").css("height", window.innerHeight - leftCol );
        }


    });

});
