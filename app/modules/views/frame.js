define([
    "app",
    "engine/modules/askers/asker",
    "backbone"
],

function( app, Asker ) {

    return Backbone.View.extend({

        tagName: "li",
        template: "app/templates/frame",
        className: "ZEEGA-frame",

        serialize: function() {
            return this.model.toJSON();
        },

        initialize: function() {
            this.model.on("focus", this.onFocus, this );
            this.model.on("blur", this.onBlur, this );
            this.model.on("thumbUpdateStart", this.onThumbUpdateStart, this );
            this.model.on("change:thumbnail_url", this.onThumbUpdateComplete, this );
            this.model.on("no_advance", this.turnOffAdvance, this );
        },

        onThumbUpdateStart: function() {
            this.$el.css({
                background: "url(assets/img/tiny-stripes.png)"
            });
            this.$(".frame-thumb").css({
                opacity: 0.5
            });
        },

        onThumbUpdateComplete: function() {
            this.$el.css({
                background: "transparent"
            });
            this.$(".frame-thumb").css({
                background: "url(" + this.model.get("thumbnail_url") + ") no-repeat center center",
                opacity: 1
            });
        },

        events: {
            "click .frame-thumb": "viewFrame",
            "click .action": "doAction",
            "click .advance-toggle": "toggleAdvance"
        },

        toggleAdvance: function() {
            //console.log("toggle advance", this.model.get("attr"), this.model.get("attr").advance );

            this.$(".advance-toggle").toggleClass("active");
            
            if( this.model.get("attr").advance ){
                this.$(".advance-toggle").attr({ "title" : "add default advance" });
            } else {
                this.$(".advance-toggle").attr({ "title" : "remove default advance" });
            }

            this.model.saveAttr({
                advance: !this.model.get("attr").advance
            });
        },

        turnOffAdvance: function() {
           // console.log("TURN OFF ADVANCE")
            this.$(".advance-toggle").removeClass("active").attr({ "original-title" : "add default advance" });

        },

        doAction: function( e ) {
            this[ $(e.target).closest("a").data("action") ]();
        },

        deleteFrame: function() {
            new Asker({
                question: "Do you really want to delete this page?",
                description: "This cannot be undone.",
                okay: function() {
                    $(".tipsy").remove();
                    app.emit("page_delete", this.model );
                    this.model.collection.remove( this.model );
                }.bind( this )
            });
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
