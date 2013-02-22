define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.Model.extend({
        
        defaults: {
            currentSequence: null,
            previousSequence: null,
            currentFrame: null,
            previousFrame: null
        },

        setCurrentFrame: function( frameModel ) {
            if ( frameModel != this.get("currentFrame") ) {

                if ( this.get("currentFrame") ) {
                    this.get("currentFrame").off("remove");
                }

                this.set({
                    previousFrame: this.get("currentFrame"),
                    currentFrame: frameModel
                });

                frameModel.on("remove", this.onCurrentRemove, this );

                this.get("previousFrame").trigger("blur");
                frameModel.trigger("focus");
            }
        },

        onCurrentRemove: function( model, collection, options ) {
            var nextFrame, index;

            index = this.get("currentSequence").frames.length <= options.index ? this.get("currentSequence").frames.length - 1 : options.index;
            nextFrame = this.get("currentSequence").frames.at( index );
console.log(this.get("currentSequence").frames.length, index, nextFrame)
            this.setCurrentFrame( nextFrame );
        },

        /*
            emit the state change to the external api
        */
        emit: function( e, info ) {
            app.trigger( e, info );
        }

    });

});
