define([
    "app",
    "backbone"
],

function( app, ItemView ) {

    return Backbone.View.extend({

        className: function() {
            return "item item-" + this.model.id; 
        },
        tagName: "li",
        template: "app/templates/item",

        serialize: function() {
            return this.model.toJSON();
        },

        afterRender: function() {
            this.listenTo(this.model, 'destroy', this.remove);
            this.$el.draggable({
                revert: "invalid",
                appendTo: $("body"),
                zIndex: 10000,
                cursorAt: {
                    left: 20,
                    top: 20
                },
                helper: function( e ) {
                    
                    return $(this).find(".item-thumb img").clone().addClass("item-dragging");
                },
                start: function() {
                    app.emit("item_drag_start", this.model );
                    app.dragging = this.model;
                }.bind( this ),
                stop: function() {
                    app.emit("item_drag_stop", this.model );
                    app.dragging = null;
                }
            });
        },

        events: {
            "click": "viewItem",
            "mouseover img": "onMouseOver",
            "mouseout img": "onMouseOut"
        },

        onMouseOver: function(){
            if( this.model.get("archive") == "Giphy" ){
                this.$("img").attr("src", this.model.get("thumbnail_url").replace("_s.gif", ".gif"));
            }
        },

        onMouseOut: function(){
            if( this.model.get("archive") == "Giphy" ){
                this.$("img").attr("src", this.model.get("thumbnail_url"));
            }
        },

        viewItem: function() {
            this.model.collection.itemViewer( this.model );
        }

    });

});
