define([
    "app",
    "backbone"
],

function( app ) {

    var UploadItem = Backbone.Model.extend({
            url: app.api + "items",
            defaults:{
                "title": "",
                "headline": "",
                "description": "",
                "text": "",
                "uri": "",
                "attribution_uri": "",
                "thumbnail_url": "",
                "media_type": "Image",
                "layer_type": "Image",
                "archive": "Absolute",
                "media_geo_latitude": null,
                "media_geo_longitude": null,
                "media_date_created": "",
                "child_items_count": 0,
                "editable": true,
                "published": false,
                "enabled": true
            }
    });

    var WebItem = UploadItem.extend({

        url: function(){

            var url = app.api + "items/parser?url=" + this.get("web_url");

            return url;
        },

        parse: function( res ) {
            var item;

            if ( res.code == 500 ){
                this.itemsCount = 0;
                return array();
            }

            item = res.items[ 0 ];
            item.editable = -1;

            return item;
        }

    });




    return Backbone.View.extend({

        template: "media-upload",
        className: "media-upload",

        events: {
            "click .upload-image-action": "showUploadImage",
            "click .paste-url-action": "showPasteBox",
            "change #imagefile": "imageUpload",
            "keyup .url-box": "onSearchKeyPress"
        },

        showUploadImage: function() {
            this.$(".upload-file").show();
            this.$(".paste-url").hide();
            this.$(".upload-image-action").addClass("active");
            this.$(".paste-url-action").removeClass("active");
        },

        showPasteBox: function() {
            this.$(".upload-file").hide();
            this.$(".paste-url").show();
            this.$(".upload-image-action").removeClass("active");
            this.$(".paste-url-action").addClass("active");
        },
        
        onSearchKeyPress: function( e ) {
            if ( e.which == 13 ) {
                this.search( this.$(".search-box").val() );
            }
        },

        addItem: function( item ) {

            item.url = app.api + "items";
            app.status.get('currentFrame').addLayerByItem( item );
            item.on("sync", this.refreshUploads, this );
            item.save();
        },

        search: function( url ){
            var item = new WebItem({ web_url: url });
            item.on("sync", this.addItem, this );
            item.fetch();
        },

        refreshUploads: function(){
            this.model.search("");
        },

        imageUpload: function(event) {
            var fileInput = event.target, imageData;

            imageData = new FormData();
            
            imageData.append( "file", fileInput.files[0] );

            $.ajax({
                url: app.mediaServer + "image",
                type: "POST",
                data: imageData,
                dataType: "json",
                processData: false,
                contentType: false,
                fileElementId: "imagefile",
                
                success: function( data ) {
                    var item = new UploadItem({
                        "title": data.title,
                        "uri": data.fullsize_url,
                        "attribution_uri": data.fullsize_url,
                        "thumbnail_url": data.image_url_4
                    });

                    this.addItem( item );
                    this.render();
                }.bind(this)
            });
        }


    });

});

