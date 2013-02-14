define([
    "app",
    "backbone"
],

function( app, Backbone ) {

    return Backbone.Model.extend({
        
        defaults: {
            currentSequence: null,
            previousSequence: null,
            currentFrame: null,
            previousFrame: null
        },

        setCurrentFrame: function( frameModel ) {
            if ( frameModel != this.get("currentFrame") ) {
                this.set({
                    previousFrame: this.get("currentFrame"),
                    currentFrame: frameModel
                });
            }
        },

        /*
            emit the state change to the external api
        */
        emit: function( e, info ) {
            app.trigger( e, info );
        }

    });

});
