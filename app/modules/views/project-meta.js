define([
    "app",
    "backbone"
],

function( app ) {

    // This will fetch the tutorial template and render it.
    ProjectMeta = Backbone.View.extend({

        template: "project-meta",
        
        serialize: function() {
            return this.model.project.toJSON();
        },

        events: {
            "keypress .ZEEGA-project-title": "onTitleKeyup",
            "blur .ZEEGA-project-title": "onBlur",
            "click .meta-menu a": "onMenuClick"
        },

        onTitleKeyup: function( e ) {
            if ( e.which == 13 ) {
                this.$(".ZEEGA-project-title").blur();
                return false;
            }
        },

        onMenuClick: function( e ) {
            var $target = $(e.target).closest("a");

            if ( !$target.hasClass("disabled") ) {
                this[ $target.data("action") ]();
            }
        },

        projectPreview: function() {
            var projectData = app.project.getProjectJSON();

            console.log( projectData );
            app.zeegaplayer = new Zeega.player({
                data: projectData
            });
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
