define([
    "app",
    "backbone",
    "modules/views/sequence"
],

function( app, Backbone, SequenceView ) {


    var Sequences = Backbone.View.extend({

        template: "sequences",
        className: "ZEEGA-sequences",

        initialize: function() {
            this.model.project.sequences.each(function( sequence ) {
                this.insertView(".sequence-list", new SequenceView({ model: sequence }) );
            }.bind( this ));
        },

        events: {
            "click .add-sequence a": "addSequence"
        },

        addSequence: function() {
            
        }
        
    });

    return Sequences;

});
