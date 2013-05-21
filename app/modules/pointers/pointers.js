define([
    "app",
    "modules/pointers/pointer.model",
    "backbone"
],

function( app, PointerModel ) {

    return Backbone.Collection.extend({

        model: PointerModel,
        index: 0,

        startPointing: function() {
            this.index = 0;
            this.point( this.at( this.index ));
        },

        point: function( pointer ) {
            console.log("Pointer", pointer, this)
            pointer.once("end", this.pointNext, this );
            pointer.point()
        },

        pointNext: function() {
            var next;

            this.index++;
            next = this.at( this.index );
console.log("point next", next, this.index)

            if ( next ) {
                this.point( next );
            }
        },

        stopPointing: function() {

        },

        cancel: function() {
            this.trigger("cancel")
        }

    });
});
