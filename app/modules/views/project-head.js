define([
    "app",
    "player/modules/player",
    "backbone"
],

function( app, Zeega ) {

    return Backbone.View.extend({

        firstPreview: true,

        template: "app/templates/project-head",

        serialize: function() {
            return _.extend({
                    user_id: app.userId,
                    web_root: app.webRoot,
                    share_links: this.getShareLinks()
                },
                app.metadata,
                this.model.project.toJSON(),
                { userThumbnail: app.metadata.userThumbnail === "" ? "https://s3.amazonaws.com/zeegastatic/default_profile.jpeg" : app.metadata.userThumbnail }

            );
        },

        getShareLinks: function() {
            var title, html,
                links = {},
                webRoot = app.webRoot;

            if(_.isUndefined( this.$("#project-caption").val()) ){
                title = app.project.get("title");
            } else {
                title = this.$("#project-caption").val();
            }

            html = "<p>" + title + "</p>" +
                "<p><a href='" + webRoot + this.model.project.get("id") + "'>" +
                "<strong>►&nbsp;Play&nbsp;Zeega&nbsp;►</strong></a>" +
                "</p><p>by&nbsp;<a href='" + webRoot + "profile/" + this.model.project.get("user_id") + "'>" + this.model.project.get("authors") + "</a></p>";

            links.tumblr = "http://www.tumblr.com/share/photo?source=" + encodeURIComponent( this.model.project.get("cover_image") ) +
                "&caption=" + encodeURIComponent( html ) +
                "&click_thru="+ encodeURIComponent( webRoot ) + this.model.project.get("id");

            links.reddit = "http://www.reddit.com/submit?url=" + encodeURIComponent( app.webRoot ) + this.model.project.get("id") +
                "&title=" + encodeURIComponent( title );

            links.twitter = "https://twitter.com/intent/tweet?original_referer=" + encodeURIComponent( webRoot ) + this.model.project.get("id") +
                "&text=" + encodeURIComponent( title  + " made w/ @zeega") +
                "&url=" + encodeURIComponent( webRoot ) + this.model.project.get("id");

            share_links.facebook = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent( app.webRoot ) + this.model.project.get("id");

            return links;
        },

        initialize: function() {
            this.model.project.on("sync", this.onSync, this );
        },

        onSync: function() {
            this.updateShareUrls();
            this.$(".project-cover").css({
                background: "url(" + this.model.project.get("cover_image") + ")",
                backgroundSize: "cover"
            });
        },

        updateShareUrls: function() {

            _.each( this.getShareLinks(), function(value, key){
                this.$(".share-" + key ).attr("href", value );
            });
        },

        afterRender: function() {
            if ( app.project.get("cover_image") === "" ) {
                this.model.on("layer_added", this.onLayerAdded, this );
            }

            this.makeCoverDroppable();
        },

        makeCoverDroppable: function() {
            this.$(".project-cover").droppable({
                accept: ".item",
                tolerance: "pointer",
                hoverClass: "can-drop",
                drop: function( e, ui ) {
                    if ( _.contains( ["Image"], app.dragging.get("layer_type") )) {

                        console.log("update cover", app.dragging );

                        this.updateCoverImage( app.dragging.get("uri") );
                        // this.updateWaveform( app.dragging.get("thumbnail_url") );

                        // app.trigger("soundtrack_added", app.dragging );
                        // app.status.get('currentSequence').setSoundtrack( app.dragging, this );
                    }
                }.bind( this )
            });
        },

        onLayerAdded: function( layer ) {
            if ( this.model.project.get("cover_image") === "" ) {
                if ( layer.get("type") == "Image" ) {
                    this.updateCoverImage( layer.getAttr("uri") );
                }
            } else {
                this.model.off("layer_added");
            }
        },

        updateCoverImage: function( url ) {
            app.project.save("cover_image", url );

            tumblr_caption = "<p><a href='" + app.webRoot + app.project.get("id") + "'><strong>Play&nbsp;► " +
                            app.project.get("title") + "</strong></a></p><p>A Zeega by&nbsp;<a href='" +
                            app.webRoot + "profile/" + app.project.get("user_id") + "'>" + app.project.get("authors") + "</a></p>";


            tumblr_share = "source=" + encodeURIComponent( app.project.get("cover_image") ) +
                            "&caption=" + encodeURIComponent( tumblr_caption ) +
                            "&click_thru="+ encodeURIComponent( app.webRoot ) + app.project.get("id");
            this.$("#tumblr-share").attr("href", "http://www.tumblr.com/share/photo?" + tumblr_share );

        },

        events: {
            "click .project-share": "toggleShareGrave",
            "click .editor-help": "initHelpSequence",
            "keypress .project-info": "onTitleKeyup",
            "blur .project-info": "onBlur",
            "click .project-preview": "projectPreview",

            "click .close-grave": "closeGrave",
            "mousedown .text-box": "onBoxFocus",
            "click .share-zeega": "showShare",
            "click .embed-zeega": "showEmbed",
            "keyup #project-caption": "onCaptionKeypress",
            "blur #project-caption": "updateShareUrls"
        },

        initHelpSequence: function() {
            if ( app.layout.initialInstructions.pointing ) {
                app.layout.initialInstructions.cancel();
            } else {
                app.layout.initialInstructions.startPointing();
            }
        },

        showEmbed: function() {
            this.$(".share-zeega, .share-network").removeClass("active");
            this.$(".embed-zeega, .share-embed").addClass("active");
        },

        showShare: function() {
            this.$(".embed-zeega, .share-embed").removeClass("active");
            this.$(".share-zeega, .share-network").addClass("active");
        },

        onBoxFocus: function( e ) {
            $(e.target).select();
            return false;
        },

        closeGrave: function() {
            this.$(".share-grave").slideUp("fast");
        },

        toggleShareGrave: function() {

            this.model.status.setCurrentLayer( null );

            if( !this.$(".share-grave").is(":visible") ) {
                app.emit("grave_open", null );
            } else {
                app.emit("grave_closed", null );
            }
            this.$(".share-grave")
                .toggleClass("active")
                .slideToggle("fast");
        },

        onTitleKeyup: function( e ) {
            if ( e.which == 13 ) {
                this.$(".project-info").blur();
                return false;
            }
        },

        onCaptionKeypress: function( e ) {
            this.captionSave();
        },

        captionSave: _.debounce(function() {
            this.model.project.save("title", this.$("#project-caption").val() );
        }, 1000 ),

        onMenuClick: function( e ) {
            var $target = $(e.target).closest("a");

            if ( !$target.hasClass("disabled") ) {
                this[ $target.data("action") ]();
            }
        },

        projectPreview: function() {
            var projectData = { project: app.project.getProjectJSON()};

            app.zeegaplayer = null;
            app.emit("project_preview", null );
            
            
            app.zeegaplayer = new Zeega.player({
                // debugEvents: true,
                scalable: true,

                previewMode: "mobile",
                data: projectData,
                controls: {
                    arrows: true,
                    close: true,
                    sizeToggle: true
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

            this.firstPreview = false;
        },

        stopListeningToPlayer: function() {
            $("body").unbind("keyup.player");
            app.emit("project_preview_ended", null );
        },

        onBlur: function() {
            if ( this.model.project.get("title") != this.$(".project-info").text() ) {
                this.model.project.save("title", this.$(".project-info").text() );
            }
        }

    });

});
