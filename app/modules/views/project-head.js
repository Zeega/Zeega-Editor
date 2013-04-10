define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        template: "project-head",

        serialize: function() {

            var tumblr_share,
                tumblr_caption;

            tumblr_caption = "<p><a href='" + app.webRoot + app.project.get("item_id") + "'><strong>Play&nbsp;► " +
                            app.project.get("title") + "</strong></a></p><p>A Zeega by&nbsp;<a href='" +
                            app.webRoot + app.project.get("user_id") + "'>" + app.project.get("authors") + "</a></p>";


            tumblr_share = "source=" + encodeURIComponent( app.project.get("cover_image") ) +
                            "&caption=" + encodeURIComponent( tumblr_caption ) +
                            "&click_thru="+ encodeURIComponent( app.webRoot ) + app.project.get("item_id");

            return _.extend({
                userId: app.userId,
                userProjects: $.parseJSON( window.userProjects ),
                webRoot: app.webRoot,
                tumblr_share: tumblr_share

            }, this.model.project.toJSON() );
        },
        events: {
            "click .project-share a": "toggleShareGrave",
            "keypress .project-info": "onTitleKeyup",
            "blur .project-info": "onBlur",
            "click .project-preview": "projectPreview",

            "click .close-grave": "closeGrave",
            "mousedown .text-box": "onBoxFocus"
            // "click .project-share-toggle": "toggleShare",
        },

        onBoxFocus: function( e ) {
            $(e.target).select();
            return false;
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

            this.model.project.save( "publish_update", 1 );
            
            var projectData = app.project.getProjectJSON();

            app.zeegaplayer = new Zeega.player({
                data: projectData,
                startFrame: app.status.get("currentFrame").id,

                controls: {
                    arrows: true,
                    close: true
                }
            });

            //this is a wild hack, should not be necessary
            app.zeegaplayer.status.set("frameHistory",[]);

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
