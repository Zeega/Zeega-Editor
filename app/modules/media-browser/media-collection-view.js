define([
    "app",
    "modules/views/media-upload",
    "spin",
    "backbone"
],

function( app, UploadView, Spinner ) {

    var Views = {};

    Views.Zeega = Backbone.View.extend({

        busy: false,
        spinner: null,

        defaults: {
            title: "untitled"
        },

        className: "media-collection",
        template: "app/templates/media-collection",

        serialize: function() {
            var d=new Date();
            var weekday=new Array(7);

            weekday[0]="Sunday";
            weekday[1]="Monday";
            weekday[2]="Tuesday";
            weekday[3]="Wednesday";
            weekday[4]="Thursday";
            weekday[5]="Friday";
            weekday[6]="Saturday";

            return _.extend({},
                _.defaults( this.model.toJSON(), this.defaults ),
                { day: weekday[d.getDay()] }
            );
        },

        listen: null,

        initialize: function() {
            this.listen = _.once(function() {
                this.model.mediaCollection.on("sync", this.renderItems, this );
            }.bind( this ));

            this.initSpinner();
        },

        initSpinner: function() {
            var opts = {
                lines: 12, // The number of lines to draw
                length: 5, // The length of each line
                width: 2, // The line thickness
                radius: 5, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                color: '#fff' // #rgb or #rrggbb
            };
            this.spinner = new Spinner( opts );
        },

        afterRender: function() {
            
            this.renderItems();
            this._afterRender();
            
            if( this.model.allowSearch ){
                $(".media-collection-search").show();
            }

        },

        //extend this function
        _afterRender: function(){

        },

        renderItems: function() {

            

            this.$(".more-tab").remove();
            if ( this.model.mediaCollection.length && this.model.mediaCollection.at( 0 ).get("uri") ) {
                this.model.mediaCollection.each(function( item ) {
                    this.$(".media-collection-items").append( item.view.el );
                    item.view.render();
                }, this );
                if( this.model.mediaCollection.more ){
                    this.$(".media-collection-items").append("<li class='item more-tab'><h2>more</h2></li>");
                }
                
            } else if( this.model.getQuery() !== "" &&  this.$(".media-collection-items li").length === 0) {
                this.$(".media-collection-items").append("<div class='empty-collection'>no items found :( try again?</div>");
            }


            this.listen();

            this.$(".search-box, .media-collection-wrapper").css({
                opacity: 1
            });
            this.$(".label").css("visibility", "visible");

            if( this.model.getQuery() === "" && this.model.api != "MyZeega" ){
                this.$(".media-collection-headline").show();
            } else {
                this.$(".media-collection-headline").hide();
            }

            this.spinner.stop();
            this.busy = false;

            $(this.el).find("img").on("error", function(e) {
                $(e.target).closest("li").hide();
            });
        },

        events: {
            "keyup .search-box": "onSearchKeyPress",
            "click .submit": "onSubmitClick",
            "click .more-tab": "loadMore"
        },

        onSearchKeyPress: function( e ) {
            if ( !this.busy ){
                if ( e.which == 13 ) {
                    this.search( this.$(".search-box").val() );
                }
            }
        },

        onSubmitClick: function() {
            if ( !this.busy ) {
                this.search( this.$(".search-box").val() );
            }
        },
        loadMore: function(){
            this.busy = true;
            this.$( ".more-tab").empty();
            this.spinner.spin( this.$( ".more-tab")[0] );
            this.model.more();
        },
        search: function( query ) {
            this.busy = true;
            this.$(".media-collection-items").empty();
            this.model.search( query );
            this.$(".search-box").blur();
            this.$(".search-box, .media-collection-wrapper").css({
                opacity: 0.5
            });

            this.$(".label").css("visibility", "hidden");

            this.spinner.spin( this.$(".submit")[0] );

        }

    });

    Views.Instagram  = Views.Zeega.extend({


        _afterRender: function(){

            this.$el.find(".collection-options").append("<select class = 'query-type' >" +
              "<option value='user'>username</option>" +
              "<option value='tag'>tag</option>" +
            "</select>");
        },

        events: {
            "keyup .search-box": "onSearchKeyPress",
            "change .query-type": "onQueryTypeChange"
        },

        onQueryTypeChange: function( ){
            var type = this.$el.find(".query-type").attr("value");
            this.model.setQueryType( type );

        }

    });
    Views.Flickr        = Views.Zeega.extend({});
    Views.Soundcloud    = Views.Zeega.extend({});
    Views.Giphy         = Views.Zeega.extend({});
    Views.Tumblr        = Views.Zeega.extend({});
    Views.Youtube       = Views.Zeega.extend({});
    Views.Web           = Views.Zeega.extend({});
    
    Views.MyZeega       = Views.Zeega.extend({

        template: "media-collection",

        _afterRender: function(){
            var uploadView = new UploadView({ model: this.model });
            this.$el.find(".media-collection-header").append( uploadView.el );
            uploadView.render();
        }


    });

    return Views;

});
