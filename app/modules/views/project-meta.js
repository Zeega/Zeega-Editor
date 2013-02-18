define([
    "app",
    "backbone"
],

function( app, Backbone ) {

    // This will fetch the tutorial template and render it.
    ProjectMeta = Backbone.View.extend({

        template: "project-meta",
        
        serialize: function() {
            return this.model.project.toJSON();
        },

        events: {
            "keypress .ZEEGA-project-title": "onTitleKeyup",
            "blur .ZEEGA-project-title" : "onBlur"
        },

        onTitleKeyup: function( e ) {
            if ( e.which == 13 ) {
                this.$(".ZEEGA-project-title").blur();
                return false;
            }
        },

        onBlur: function() {
            if ( this.model.project.get("title") != this.$(".ZEEGA-project-title").text() ) {
                this.model.project.save("title", this.$(".ZEEGA-project-title").text() );
            }
        }
    });

    // Required, return the module for AMD compliance
    return ProjectMeta;

});
