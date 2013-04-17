define([
    "app",
    "backbone"
],

function( app ) {


    return Backbone.View.extend({
        
        className: "ZEEGA-modal ZEEGA-item-collection-viewer",
        template: "soundtrack-viewer",

        initialize: function(){
            this.listen();
        },
        serialize: function() {
            return this.model.get("attr");
        },
        events: {
            "click .modal-close": "close"
        },

        listen: function() {
            $("body").bind("keyup.modal", function( e ) { this.keyup( e ); }.bind( this ));
        },

        unlisten: function() {
            $("body").unbind("keyup.modal");
        },


        keyup: function( e ) {
            if ( e.which == 27 ) { // esc
                this.close();
            }
        },

        close: function(){
            this.$(".viewer-preview").empty();
            this.unlisten();
            $("#main").removeClass("modal");
            this.$el.fadeOut("fast");
        }
        
    });

});
