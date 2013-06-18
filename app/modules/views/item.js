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
            var w, h, offset,
                style = "";
            if( this.model.get("attributes").height ){
                if( this.model.get("attributes").width > this.model.get("attributes").height ){
                    h = 75;
                    w = h * this.model.get("attributes").width / this.model.get("attributes").height ;
                    offset = ( 75 - w )/2;
                    style = "width:" + w +"px; height:" + h + "px; left:" + offset + "px;";
                } else {
                    w = 75;
                    h = this.model.get("attributes").height * w / this.model.get("attributes").width;
                    offset = ( 75 - h )/2;
                    style = "width:" + w +"px; height:" + h + "px; top:" + offset + "px;";
                }
                
            }
            return _.extend( {
                        style: style
                    },
                    this.model.toJSON()
            );
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
                    if ( this.model.get("media_type") == "Image" ) {
                        $("body").append("<img class='img-preload' src='" + this.model.get("uri") + "' height='1px' width='1px' style='position:absolute;left:-1000%;top:-1000%'/>");
                    }
                    app.emit("item_drag_start", this.model );
                    app.dragging = this.model;
                }.bind( this ),
                stop: function() {
                    $(".img-preload").remove();
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

            if( this.model.get("attributes") && !_.isUndefined( this.model.get("attributes").animate_url ) ){
                this.$("img").attr("src", this.model.get("attributes").animate_url );
            }
        },

        onMouseOut: function(){
            if( this.model.get("archive") == "Giphy" ){
                this.$("img").attr("src", this.model.get("thumbnail_url"));
            }

            if( this.model.get("attributes") && !_.isUndefined( this.model.get("attributes").animate_url ) ){
                this.$("img").attr("src", this.model.get("thumbnail_url"));
            }
        },

        viewItem: function() {
            this.model.collection.itemViewer( this.model );
        }

    });

});
