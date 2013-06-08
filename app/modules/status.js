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
            previousFrame: null,
            currentLayer: null,
            copiedLayer: null
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

                this.setCurrentLayer( null );
            }
        },

        setCurrentLayer: function( layerModel ) {
            var previousLayer = this.get("currentLayer");

            if ( previousLayer != layerModel ) {
                if ( previousLayer && layerModel === null ) {
                    console.log("prev no current", previousLayer )
                    previousLayer.trigger("blur");
                    previousLayer._layerListView.controls.remove(); // not sure why I have to do this
                    this.set("currentLayer", layerModel );
                } else if ( !previousLayer && layerModel ) {
                    this.set("currentLayer", layerModel );
                    layerModel.trigger("focus");
                } else if ( previousLayer && layerModel ) {
                    previousLayer.trigger("blur");
                    this.set("currentLayer", layerModel );
                    layerModel.trigger("focus");
                }
            }
            
        },

        copyLayer: function( layer ) {
            if ( this.get("copiedLayer") ) {
                this.get("copiedLayer").trigger("copy_blur");
            }
            this.set("copiedLayer", layer );
            this.get("copiedLayer").trigger("copy_focus");

            return _.extend({}, layer.toJSON(), { id: null });
        },

        onCurrentRemove: function( model, collection, options ) {
            var nextFrame, index;

            index = this.get("currentSequence").frames.length <= options.index ? this.get("currentSequence").frames.length - 1 : options.index;
            nextFrame = this.get("currentSequence").frames.at( index );
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
