define([
    "app",

    "modules/views/modal",

    "backbone"
],

function( app, Modal ) {


    return Modal.extend({

        template: "upload-modal",
        modalClass: "",
        
        className: "ZEEGA-modal upload-modal",

        events: {
            "click .modal-close": "hide",
            "click .close": "hide",
            "change .add-photo input" : "imageUpload"

        },

        addItem: function( data ) {



            var item = new Backbone.Model({
                // "id": -1,
                // "user_id": -1,
                // "username": "",
                // "display_name": "",
                "title": data.title,
                "headline": "",
                "description": "",
                "text": "",
                "uri": data.fullsize_url,
                "attribution_uri": data.fullsize_url,
                //"date_created": "2013-02-24 22:36:57",
                "media_type": "Image",
                "layer_type": "Image",
                "archive": "Absolute",
                "thumbnail_url": data.image_url_4,
                "media_geo_latitude": null,
                "media_geo_longitude": null,
                "media_date_created": "",
                "media_creator_username": app.userName,
                "media_creator_realname": app.userName,
                "child_items_count": 0,
                // "attributes": [],
                // "child_items": [],
                // "tags": [],
                "editable": true,
                "published": false,
                "enabled": true

            });

            


            item.url = app.api + "items";
            item.on("sync", this.updateMediaCollection, this );
            item.save();
        },

        updateMediaCollection: function(){
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

                    $(fileInput).parent('span').css({
                        "background-image" : "url(" + data.image_url_4 + ")",
                        "background-size" : "cover"
                    });
                    
                    this.addItem( data );

                    this.$el.find(".image-uploads").append("<span class='add-photo' href='#'><input id = 'imagefile' name = 'imagefile' type='file' href='#'></input></span>");
                    
                }.bind(this)
            });
        }


    });

});
