define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        template: "project-head",

        serialize: function() {
            return _.extend({
                userId: app.userId,
                userProjects: $.parseJSON( window.userProjects ),
                directory: app.directory,
                root: app.root
            }, this.model.project.toJSON() );
        },

        events: {
            "click .project-share a": "toggleShareGrave",
            "keypress .project-info": "onTitleKeyup",
            "blur .project-info": "onBlur",
            "click .project-preview": "projectPreview",

            "click .close-grave": "closeGrave"
            // "click .project-share-toggle": "toggleShare",
        },

        closeGrave: function() {
            this.$(".share-grave").hide();
        },

        toggleShareGrave: function() {
            this.$(".share-grave").toggle();
        },

        onTitleKeyup: function( e ) {
            if ( e.which == 13 ) {
                this.$(".project-info").blur();
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
            
console.log("preview project", projectData);
            app.zeegaplayer = new Zeega.player({
                data: projectData,
                startFrame: app.status.get("currentFrame").id,

                controls: {
                    arrows: true,
                    close: true
                }
            });

            // listen for esc key to close preview
            $("body").bind("keyup.player", function( e ) {
                if ( e.which == 27 ) {
                    app.zeegaplayer.destroy();
                }
            });

            this.stopListening( app.zeegaplayer );
            app.zeegaplayer.on("player_destroyed", this.stopListeningToPlayer, this );
        },

        stopListeningToPlayer: function() {
            $("body").unbind("keyup.player");
        },

        onBlur: function() {
            if ( this.model.project.get("title") != this.$(".project-info").text() ) {
                this.model.project.save("title", this.$(".project-info").text() );
            }
        }

    });

});
