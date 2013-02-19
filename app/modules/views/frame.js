define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        tagName: "li",
        template: "frame",
        className: "ZEEGA-frame",

        serialize: function() {
            return this.model.toJSON();
        },

        initialize: function() {
            this.model.on("focus", this.onFocus, this );
            this.model.on("blur", this.onBlur, this );
        },

        events: {
            "click .frame-thumb": "viewFrame"
        },

        viewFrame: function() {
            this.model.status.setCurrentFrame( this.model );
        },

        onFocus: function() {
            this.$el.addClass("active");
        },
        onBlur: function() {
            this.$el.removeClass("active");
        }
        
    });

});
