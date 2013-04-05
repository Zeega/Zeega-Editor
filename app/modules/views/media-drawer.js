define([
    "app",
    "modules/views/media-upload",
    "backbone"
],

function( app, MediaUpload ) {

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
            var api = $(event.target).closest("a").data("api");


            this.$(".media-toggle").removeClass("active");
            this.$(".media-toggle i").removeClass("socialz-white");
            $(event.target).closest("a").addClass("active");
            $(event.target).closest("a").find("i").addClass("socialz-white")

            this.$el.find(".search-box").attr("placeholder", "search " + api);
            this.model.setAPI( api );
            this.renderMedia();

            if( api === "Soundcloud" ){
                this.$el.addClass("list");
            } else {
                this.$el.removeClass("list");
            }

            if( api === "MyZeega" ){
                this.model.search( "" );
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
