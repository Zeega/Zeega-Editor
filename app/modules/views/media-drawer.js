define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        el: null,
        template: "app/templates/media-drawer",

        initialize: function() {
            app.on("window-resize", this.onResize, this );
        },

        afterRender: function() {
            
            this.renderMedia();
        },
        renderMedia: function() {
            var collection = this.model.getCurrent();

            this.$(".ZEEGA-items").empty();
            this.$(".ZEEGA-items").append( collection.view.el );
            collection.view.render();
        },


        events: {
            "click .media-toggle": "onMediaToggle"
        },
        onMediaToggle: function(event){
            var api = $(event.target).closest("a").data("api");

            app.emit("media_drawer_toggle", api );
            this.$(".media-toggle").removeClass("active");
            this.$(".media-toggle i").removeClass("socialz-white");
            $(event.target).closest("a").addClass("active");
            $(event.target).closest("a").find("i").addClass("socialz-white");

            this.$el.find(".search-box").attr("placeholder", "search " + api);
            this.model.setAPI( api );
            this.renderMedia();

            if( api === "Soundcloud" ){
                this.$el.addClass("list");
            } else {
                this.$el.removeClass("list");
            }
            return false;
        }




    });

});
