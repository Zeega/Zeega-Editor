define([
    "app",
    "modules/media-browser/item-view",
    "backbone"
],

function( app, ItemView ) {

    var UploadItem = Backbone.Model.extend({
        modelType: "item",
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
            "archive": "Upload",
            "media_geo_latitude": null,
            "media_geo_longitude": null,
            "media_date_created": "",
            "child_items_count": 0,
            "editable": true,
            "published": false,
            "enabled": true,
            "allowDelete": true
        },

        initialize: function() {
            this.view = new ItemView({ model: this });
        }
    });

    var WebItem = UploadItem.extend({
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
            "enabled": true,
            "allowDelete": true
        },
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

            if(!_.isUndefined(res.item)){
                item = res.item[ 0 ];
            } else {
                item = res.items[ 0 ];
            }

            
            item.editable = -1;

            return item;
        }

    });

    return Backbone.View.extend({

        template: "app/templates/media-upload",
        className: "media-upload",

        events: {
            "click .upload-image-action": "showUploadImage",
            "click .paste-url-action": "showPasteBox",
            "change #imagefile": "imageUpload",
            "keyup .url-box": "onSearchKeyPress"
        },

        showUploadImage: function() {
            this.model.set("tabState", "upload");
            this.$("#image-file").trigger("click");
            this.$(".upload-file").show();
            this.$(".paste-url").hide();
            this.$(".upload-image-action").addClass("active");
            this.$(".paste-url-action").removeClass("active");
        },

        showPasteBox: function() {
            this.model.set("tabState", "url");
            this.$(".upload-file").hide();
            this.$(".paste-url").show();
            this.$(".upload-image-action").removeClass("active");
            this.$(".paste-url-action").addClass("active");
        },

        afterRender: function(){
            console.log(this.model.get("tabState"));
            if(this.model.get("tabState") == "url" ){
                this.showPasteBox();
            } else {
                this.showUploadImage();
            }
        },
        
        onSearchKeyPress: function( e ) {
            var url = this.$(".url-box").val();
            if ( e.which == 13 ) {
                this.$(".url-box").val("");
                this.search( url );
                return false;
            }
        },

        addItem: function( item ) {
            item.off("sync");
            app.layout.$(".intro").remove();
            item.url = app.api + "items";
            item.on("sync", this.refreshUploads, this );


            // gifs only
            if( item.get("thumbnail_url").indexOf(".gif") > 0 ){
                item.set({
                    "attributes": {
                        animate_url: item.get("thumbnail_url")
                    }
                });
                item.unset("thumbnail_url");
            }

            item.save();


            if ( item.get("layer_type")  && _.contains( ["Audio"], item.get("layer_type") )) {
                app.status.get('currentSequence').setSoundtrack( item, app.layout.soundtrack, { source: "import-item", itemSource: item.get("Archive") } );
            } else {
                app.status.get('currentFrame').addLayerByItem( item, { source: "import-item", itemSource: item.get("Archive") } );
            }
        },

        search: function( url ){
            var item = new WebItem({ web_url: url });
            item.on("sync", this.addItem, this );
            item.fetch();
        },

        refreshUploads: function( item ){

            this.model.mediaCollection.add( item, {at:0} );
            this.model.mediaCollection.trigger("sync");

        },
        updateProgress: function(){
            console.log("updating progress");
        },
        imageUpload: function(event) {

            this.$('.upload-instructions').html("uploading... ");

            var fileInput = event.target,
                imageData,
                _this = this;

            imageData = new FormData();
            imageData.append( "file", fileInput.files[0] );

            var updateProgress = function( e ){
                var w = e.loaded * 141 / e.total;
                _this.$('.upload-progress').clearQueue().animate ({ "width": w + "px"}, 1000);
                if(  w == 141 ) {
                    _this.$('.upload-progress').clearQueue().animate ({ "width": "283px"}, 10000);
                }

            };

            $.ajax({
                url: app.mediaServer + "image",
                type: "POST",
                data: imageData,
                dataType: "json",
                processData: false,
                contentType: false,
                fileElementId: "imagefile",
                
                xhr: function() {  // custom xhr
                    myXhr = $.ajaxSettings.xhr();
                    if(myXhr.upload){ // check if upload property exists
                        myXhr.upload.addEventListener('progress', updateProgress, false); // for handling the progress of the upload
                    }
                    return myXhr;
                },
                
                success: function( data ) {
                    var item = new UploadItem({
                        "title": data.title,
                        "uri": data.fullsize_url,
                        "attribution_uri": data.fullsize_url,
                        "thumbnail_url": data.image_url_4
                    });

                    $(".intro").remove();
                    this.addItem( item );
                    this.render();
                }.bind(this)
            });
        }


    });

});
