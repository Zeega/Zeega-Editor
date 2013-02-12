define([
    "app",
    "backbone"
],

function( app, Backbone ) {

    return Backbone.Model.extend({
        
        defaults: {
            currentSequence: null,
            currentFrame: null
        },

        /*
            emit the state change to the external api
        */
        emit: function( e, info ) {
            app.trigger( e, info );
        }

    });

});
