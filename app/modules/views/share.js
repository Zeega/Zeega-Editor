define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        drawerClass: "",
        template: "project-title",
        
        serialize: function() {
            return _.extend({ drawerClass: this.drawerClass }, this.model.project.toJSON() );
        },

        afterRender: function() {

            if ( app.project.get("cover_image") === "" ) {
                this.model.on("layer_added", this.onLayerAdded, this );
            }

            this.model.project.on("sync", this.render, this );
        },

        events: {
            "keypress .project-info": "onTitleKeyup",
            "blur .project-info": "onBlur",
            // "click .project-share-toggle": "toggleShare",
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
