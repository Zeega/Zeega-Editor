define([
    "app",
    "modules/pointer.model",
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
            pointer.once("end", this.pointNext, this );
            pointer.point()
        },

        pointNext: function() {
            var next;

            this.index++;
            next = this.at( index );

            if ( next ) {
                this.point( next );
            }
        },

        stopPointing: function() {

        }

    });
});


/*
// data structure
[{
        listenFor: "thing_done",
        
        start: null, // function
        end: null, // function

        pointers: [{
            el: ".foo",
            content: "do this",
            color: "red",
            canCancel: false,
            position: "left"
        },{
            el: "#bar",
            content: "then that",
            color: "blue"
            canCancel: true,
            position: "right"
        }]
    },
    // second
    {}
]
*/