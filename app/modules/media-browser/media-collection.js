define([
    "app",
    "modules/item.model",
    "modules/views/item-collection-viewer",
    "backbone"
],

function( app, ItemModel, ItemCollectionViewer ) {


    var Collections = {};


    Collections.Zeega = Backbone.Collection.extend({

        model: ItemModel,
        view: null,
        searchModel: null,
        itemsCount: 0,

        url: function() {
            var url;

            if( this.searchModel.getQuery() === "" && this.searchModel.api != "MyZeega" ){
                
                url = this.searchModel.favUrl;

            } else {

                url = this.searchModel.apiUrl;
                _.each( this.searchModel.toJSON().urlArguments, function( value, key ) {
                    if ( value !== "" && value !== null ) {
                        url += key + "=" + ( _.isFunction( value ) ? value() : value ) + "&";
                    }
                });
            }
            return url;
        },

        itemViewer: function( model ) {
            var startIndex = _.indexOf( this.pluck("id"), model.id );

            startIndex = startIndex < 0 ? 0 : startIndex;

            if ( this.view === null ) {
                this.view = new ItemCollectionViewer({ collection: this, start: startIndex });
            } else {
                this.view.init( startIndex );
            }

            $("body").append( this.view.el );
            this.view.render();
        },

        parse: function( res ) {
            this.itemsCount = res.items_count;

            return res.items;
        }
    });

    Collections.MyZeega = Collections.Zeega.extend({

        parse: function( res ) {
            var photos = res.items,
                count = 1;
            
            _.each( photos, function( photo ){
                //photo.id = count;
                photo.allowDelete = 1;
                count++;
            });

            this.itemsCount = res.items_count;
            return photos;
        }
    });

    Collections.Flickr = Collections.Zeega.extend({

        parse: function( res ) {

            if(!_.isUndefined( res.items_count )){
                this.itemsCount = res.items_count;

                return res.items;
            }


            var items =[],
                item;

            _.each( res.photos.photo, function( photo ){

                item = {};
                item.id = photo.id;
                item.layer_type = "Image";
                item.media_type = "Image";
                item.archive = "Flickr";
                item.title = photo.title;
                item.thumbnail_url = "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
                                    photo.id + "_" + photo.secret + "_s.jpg";
                item.uri = "https://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" +
                                    photo.id + "_" + photo.secret + ".jpg";
                item.attribution_uri =  "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;
                item.media_user_realname = photo.owner_name;
                items.push( item );
            });

            if( res.photos.page < res.photos.pages ){
                this.more = true;
            } else {
                this.more = false;
            }

            return items;
        }
    });

    Collections.Instagram = Collections.Zeega.extend({
        

        url : function(){
            var url;
            if( this.searchModel.getQuery() === "" ){
                url = this.searchModel.favUrl;
            } else {
                if( this.searchModel.queryType == "tag" ){
                    url = this.searchModel.apiUrl + "tags/" + this.searchModel.get("query") +
                            "/media/recent?client_id=725bbc7af5094c8682bdb322d29734cc&callback=?";
                } else {

                    // Instagram User queries require user id, route through Zeega
                    url = app.api + "items/parser?url=http://instagram.com/" + this.searchModel.get("query");
                }
            }
            return url;
        },
        

        parse: function(res){
            
            if( this.searchModel.queryType == "tag" || this.searchModel.getQuery() === ""){
                var items = [];

                _.each( res.data, function( photo ){

                    var item = {};
                    item.id = photo.id;
                    if( !_.isNull( photo.caption ) && !_.isNull( photo.caption.text ) ){
                        var tmp = document.createElement("DIV");
                        tmp.innerHTML = photo.caption.text;
                        item.title = tmp.textContent||tmp.innerText;
                    } else {
                        item.title = "Instagram by " + photo.user.user_name;
                    }
                    

                    item.archive = "Instagram";
                    item.layer_type ="Image";
                    item.media_type = "Image";

                    item.thumbnail_url = photo.images.thumbnail.url;
                    item.uri = photo.images.standard_resolution.url;
                    item.attribution_uri =  photo.link;
                    item.media_user_realname = photo.user.user_name;

                    items.push( item );
                });
                return items;
            } else {
                var photos,
                    count = 1;

                if ( res.code == 500 ){
                    this.itemsCount = 0;
                    return array();
                }


                photos = res.items;
                
                _.each( photos, function( photo ){
                    photo.id = count;
                    count++;
                });
     
                this.itemsCount = res.items_count;

                return res.items;

            }
        }
    });

    Collections.Soundcloud = Collections.Zeega.extend({
            
            parse: function(res){
                var items = [],
                    item,
                    count =1;

                if(!_.isUndefined( res.items_count )){
                    this.itemsCount = res.items_count;

                    return res.items;
                }

                _.each( res, function( track ){
                    item = {};
                    item.id = count;
                    count++;
                    item.layer_type ="Audio";
                    item.media_type = "Audio";
                    item.archive = "SoundCloud";
                    item.title = track.title;

                    if( !_.isNull( track.artwork_url )){
                        item.thumbnail_url = track.artwork_url;
                    } else if( !_.isNull( track.user.avatar_url )){
                        item.thumbnail_url = track.user.avatar_url;
                    } else {
                        item.thumbnail_url = track.waveform_url;
                    }

                    
                    item.uri = track.stream_url + "?consumer_key=lyCI2ejeGofrnVyfMI18VQ";
                    item.attribution_uri =  track.permalink_url;
                    item.media_user_realname = track.user.username;
                    item.archive = "SoundCloud";

                    if( track.streamable ){
                        items.push( item );
                    }
                    
                });
                this.more = true;
                return items;
            }
    });

    Collections.Giphy = Collections.Zeega.extend({

        parse: function(res){
            
            var photos = res.items,
                count = 1;
            
            _.each( photos, function( photo ){
                photo.id = photo.attributes.id;
                count++;
            });

            if(photos[0]){
                this.more = photos[0].attributes.more;
            } else {
                this.more = false;
            }
            
            return photos;
        }
    });

    Collections.Tumblr = Collections.Zeega.extend({

        parse: function(res){
            var photos = res.items,
                count = 1;
            
            _.each( photos, function( photo ){
                photo.id = count;
                count++;
            });

            this.itemsCount = res.items_count;
            return photos;
        }
    });

    Collections.Youtube = Collections.Zeega.extend({

        parse: function(res){
            var items = [],
                count = 1;

            //check if is favorites
            if(!_.isUndefined( res.items_count )){
                    this.itemsCount = res.items_count;

                    return res.items;
            }
            
            _.each( res.data.items, function( video ){
                var item = {};
                item.id = count;
                item.layer_type = "Youtube";
                item.media_type = "Video";
                count++;

                item.uri = video.id;
                item.title = video.title;
                item.attribution_uri = video.player[ "default" ];
                item.thumbnail_url = video.thumbnail.hqDefault;
                item.aspectRatio = video.aspectRatio;


                if( video.accessControl.embed == "allowed" ){
                     items.push( item );
                }

            });

            this.itemsCount = res.items_count;
            return items;
        }
    });


    return Collections;


});
