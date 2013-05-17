define([
    "app",
    "modules/views/pointer.view",
    "backbone"
],

function( app, PointerView ) {

    return Backbone.Model.extend({

        defaults: {
            listenFor: null,
            start: null, // function
            end: null, // function
            pointers: []
        },

        views: null,

        initialize: function() {
            this.views = _.map( this.get("pointers"), function( pointer ) {
                return new PointerView({ model: new Backbone.Model( pointer )});
            });
        },

        point: function() {
            console.log("POINT", this)

            app.once( this.get("listenFor"), this.stopPointing, this );
            _.each( this.views, function( view ) {
                view.show();
            });
        },

        stopPointing: function() {
            console.log("STOP POINTING")
            // unrender pointers
            _.each( this.views, function( view ) {
                view.hide();
            });
        }
    });
});
