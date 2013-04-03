define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        drawerClass: "",
        template: "project-preview",
        
        serialize: function() {
            return _.extend({ drawerClass: this.drawerClass }, this.model.project.toJSON() );
        },

        events: {
            "click .preview": "projectPreview"
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
        }

    });

});
