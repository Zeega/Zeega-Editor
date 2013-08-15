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
            this.makeDroppable();
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

        makeDroppable: function() {
            this.$el.droppable({
                accept: ".item, .draggable-layer-type",
                tolerance: "pointer",
                greedy: true,
                drop: function( e, ui ) {
                    if ( _.contains( ["Audio"], app.dragging.get("layer_type") )) {
                        // app.emit("soundtrack_added", app.dragging );
                        // app.status.get('currentSequence').setSoundtrack( app.dragging, app.layout.soundtrack, { source: "drag-to-workspace" } );
                    } else {
                        app.emit("item_dropped", app.dragging );
                        this.model.addLayerByItem( app.dragging, { source: "drag-to-workspace" });
                    }
                }.bind( this )
            });
        },

        events: {
            "click .frame-thumb": "viewFrame",
            "click .action": "doAction",
            "click .advance-toggle": "toggleAdvance"
        },

        toggleAdvance: function() {
            this.$(".advance-toggle").toggleClass("active");
            
            if( this.model.get("attr").advance ){
                this.$(".advance-toggle").attr({ "title" : "add default advance" });
                app.emit("advance_toggle", {state: "noAdvance"});
            } else {
                this.$(".advance-toggle").attr({ "title" : "remove default advance" });
                app.emit("advance_toggle", {state: "advance"});
            }

            this.model.saveAttr({
                advance: !this.model.get("attr").advance
            });
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
            app.zeega.setCurrentPage( this.model );
        },

        onFocus: function() {
            this.$el.addClass("active");
        },
        onBlur: function() {
            this.$el.removeClass("active");
        }
        
    });

});
