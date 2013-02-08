define([
    "app",
    "backbone"
],

function( app, Backbone ) {

    return Backbone.Model.extend({
        
        defaults: {
            currentSequence: null,
            currentFrame: null
        }


    });

});
