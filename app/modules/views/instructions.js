define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        el: $("body"),

        step: 0,
        //template: "instructions",
        //className: "ZEEGA-instructions",

        initialize: function() {
            var isEmpty =  app.project.sequences.length == 1 &&
                app.project.sequences.at( 0 ).frames.length == 1 &&
                app.project.sequences.at( 0 ).frames.at( 0 ).layers.length === 0;

            if ( isEmpty ) {
                this.startIntroSequence();
            }
        },

        // drag from here to here
        startIntroSequence: function() {
            $("body")
                .prepend("<img class='intro-sequence intro-00' src='assets/img/intro-00.png' width='100%' />")
                .prepend("<img class='intro-sequence intro-01' src='assets/img/intro-01.png' width='100%' />");

            app.once("item_dropped", function( e ) {
                $(".intro-01").fadeOut(function() {
                    $(".intro-00, .intro-01").remove();
                    this.step2();
                }.bind( this ));
                $(".intro-00").fadeOut(function() {
                    $(".intro-00, .intro-01").remove();
                }.bind( this ));
            }, this );
        },

        // create a new page
        step2: function() {
            console.log("STEP 2")
            $("body").prepend("<img class='intro-sequence intro-02' src='assets/img/intro-02.png' width='100%' />");

            app.once("page_added", function( e ) {
                $(".intro-02").fadeOut(function() {
                    $(".intro-02").remove();
                    this.step3();
                }.bind( this ));
            }, this );
        },

        // drag from here to here
        step3: function() {
            $("body")
                .prepend("<img class='intro-sequence intro-03' src='assets/img/intro-03.png' width='100%' />")
                .prepend("<img class='intro-sequence intro-01' src='assets/img/intro-01.png' width='100%' />");

            app.once("item_dropped", function( e ) {
                $(".intro-01").fadeOut(function() {
                    $(".intro-00, .intro-01").remove();
                    this.step4();
                }.bind( this ));
                $(".intro-03").fadeOut(function() {
                    $(".intro-03").remove();
                }.bind( this ));
            }, this );
        },

        // create a new hotspot
        step4: function() {
            $("body").prepend("<img class='intro-sequence intro-04' src='assets/img/intro-04.png' width='100%' />");

            app.once("layer_type_added", function( type ) {
                console.log("CREATED NEW LAYER", type )
                if ( type == "Link" ) {
                    $(".intro-04").fadeOut(function() {
                        $(".intro-04").remove();
                        this.step5();
                    }.bind( this ));
                }
            }, this );
        },

        // link to a new page
        step5: function() {
            $("body").prepend("<img class='intro-sequence intro-05' src='assets/img/intro-05.png' width='100%' />");

            app.once("page_added", function( e ) {
                $(".intro-05").fadeOut(function() {
                    $(".intro-05").remove();
                    this.step6();
                }.bind( this ));
            }, this );
        },

        // drag from here to here
        step6: function() {
            $("body")
                .prepend("<img class='intro-sequence intro-03' src='assets/img/intro-03.png' width='100%' />")
                .prepend("<img class='intro-sequence intro-01' src='assets/img/intro-01.png' width='100%' />");

            app.once("item_dropped", function( e ) {
                $(".intro-03").fadeOut(function() {
                    $(".intro-03").remove();
                }.bind( this ));
                $(".intro-01").fadeOut(function() {
                    $(".intro-00, .intro-01").remove();
                    this.step7();
                }.bind( this ));
            }, this );
        },

        // switch to soundcloud
        step7: function() {
            $("body").prepend("<img class='intro-sequence intro-06' src='assets/img/intro-06.png' width='100%' />")

            app.once("media_drawer_toggle", function( api ) {

                if ( api == "Soundcloud" ) {
                    $(".intro-06").fadeOut(function() {
                        $(".intro-06").remove();
                        this.step8();
                    }.bind( this ));
                }

            }, this );
        },

        // add a soundtrack
        step8 : function() {
            $("body").prepend("<img class='intro-sequence intro-07' src='assets/img/intro-07.png' width='100%' />")

            app.once("soundtrack_added", function( e ) {
                $(".intro-07").fadeOut(function() {
                    $(".intro-07").remove();
                    this.step9();
                }.bind( this ));
            }, this );
        },

        step9 : function() {
            $("body").prepend("<img class='intro-sequence intro-08' src='assets/img/intro-08.png' width='100%' />")

            app.once("project_preview", function( e ) {
                $(".intro-08").fadeOut(function() {
                    $(".intro-08").remove();
                }.bind( this ));
            }, this );
        }
        
    });

});
