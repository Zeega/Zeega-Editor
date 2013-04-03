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
            this.model.setAPI( api );
            this.renderMedia();

            if( api === "Soundcloud" ){
                this.$el.addClass("list");
            } else {
                this.$el.removeClass("list");
            }

            return false;
        },

        onSearchFocus: function() {
            
        },

        

        onResize: function() {
            //var leftCol = $(".left-column .static-upper").height() + 30;

            //console.log("resizeeee", leftCol, window.innerHeight - leftCol )

            //this.$(".ZEEGA-items").css("height", window.innerHeight - leftCol );
        }


    });

});
