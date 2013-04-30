define([
    "app",
    "backbone"
],

function( app ) {

    return Backbone.View.extend({

        el: $("body"),

        step: 0,
        ended: false,

        initialize: function() {
            var isEmpty =  app.project.sequences.length == 1 &&
                app.project.sequences.at( 0 ).frames.length == 1 &&
                app.project.sequences.at( 0 ).frames.at( 0 ).layers.length === 0;

            if ( true ) {
                this.startIntroSequence();
            }
        },

        events: {
            "click .close-ins": "cancelInstructions"
        },

        cancelInstructions: function() {
            $(".instruction").remove();
            this.ended = true;
        },


        startIntroSequence: function() {
            if ( !this.ended ) {
                var $first, $second;

                $first = this.insertInstructions({
                    target: $(".ZEEGA-items"),
                    direction: "l",
                    content: "Drag stuff from here…",
                    close: false,
                    progress: null
                });
                $second = this.insertInstructions({
                    target: $(".ZEEGA-workspace"),
                    direction: "r",
                    color: "red",
                    content: "…to here",
                    close: true,
                    progress: "1/4",
                    avoid: $first
                });

                app.once("item_dropped", function( e ) {
                    $first.fadeOut(function() {
                        $first.remove();
                        this.step2();
                    }.bind( this ));
                    $second.fadeOut(function() {
                        $second.remove();
                    });
                }, this );
            }
            
        },

        // Now pick a soundtrack for your Zeega. Click here to explore soundcloud.
        step2: function() {
            if ( !this.ended ) {
                var $first = this.insertInstructions({
                    target: $(".socialz-soundcloud"),
                    direction: "l",
                    content: "Now pick a soundtrack for your Zeega. Click here to explore soundcloud.",
                    close: true,
                    progress: "2/4"
                });

                app.once("media_drawer_toggle", function( api ) {
                    if ( api == "Soundcloud" ) {
                        $first.fadeOut(function() {
                            $first.remove();
                            this.step3();
                        }.bind( this ));
                    }

                }, this );
            }
        },

        // Drag a sound from here to here (Pro-tip: You can also search for sounds on Soundcloud here (w an arrow)
        step3: function() {
            if ( !this.ended ) {
                var $first, $second;

                $first = this.insertInstructions({
                    target: $(".ZEEGA-items"),
                    direction: "l",
                    content: "Drag stuff from here…",
                    close: false,
                    progress: null
                });
                $second = this.insertInstructions({
                    target: $(".soundtrack"),
                    direction: "l",
                    color: "red",
                    content: "…to here",
                    close: true,
                    progress: "3/4",
                    avoid: $first
                });

                app.once("soundtrack_added", function( e ) {
                    $first.fadeOut(function() {
                        $first.remove();
                        this.step4();
                    }.bind( this ));
                    $second.fadeOut(function() {
                        $second.remove();
                    });
                }, this );
            }
        },

        step4: function() {
            if ( !this.ended ) {
                var $first = this.insertInstructions({
                    target: $(".project-preview"),
                    direction: "r",
                    content: "Click here to see what you’ve made so far!",
                    close: true,
                    progress: "4/4"
                });

                app.once("project_preview", function( e ) {
                    $first.fadeOut(function() {
                        $first.remove();
                        this.step5();
                    }.bind( this ));
                }, this );
            }
        },

        step5: function() {
            if ( !this.ended ) {
                var $first = this.insertInstructions({
                    target: $(".ZEEGA-close"),
                    parent: "body",
                    direction: "r",
                    content: "Hit “Esc” or x (w an arrow) to return to the editor",
                    close: false
                });

                app.once("project_preview_ended", function( e ) {
                    $first.fadeOut(function() {
                        $first.remove();
                        this.step6();
                    }.bind( this ));
                }, this );
            }
        },

        // Now “share” what you’ve made!
        step6: function() {
            if ( !this.ended ) {
                var $first = this.insertInstructions({
                    target: $(".project-share"),
                    direction: "r",
                    content: "Now “share” what you’ve made!",
                    close: true
                });

                app.once("grave_open", function( e ) {
                    $first.fadeOut(function() {
                        $first.remove();
                    }.bind( this ));
                }, this );
            }
        },

        insertInstructions: function( opts ) {
            var $instruction, $small, css;

            $instruction = $("<div>")
                .addClass("instruction")
                .addClass( opts.direction ? "ins-" + opts.direction : "ins-l")
                .text( opts.content );

            $small = $("<small>");
            if ( opts.progress ) {
                $small.text(opts.progress);
            }
            if ( opts.close ) {
                $small.append("  [<a href='#' class='close-ins'>end</a>]");
            }
            $instruction.append( $small );

            if ( opts.color ) {
                $instruction.addClass("ins-" + opts.color );
            }

            $instruction.css({
                top: ( opts.target.offset().top + ( opts.target.height() / 2 ) - 21 ),
                left: "-1000%"
            });

            if ( opts.avoid ) {
                var avoidTop, potentialTop;

                avoidTop = opts.avoid.offset().top;
                potentialTop = ( opts.target.height() / 2 ) + opts.target.offset().top - 21;

                if ( potentialTop <= avoidTop + 62 && potentialTop >= avoidTop - 62 ) {
                    $instruction.css("top", avoidTop + 62 );
                }
                
            }

            if ( opts.parent ) {
                $( opts.parent ).prepend( $instruction );
            } else {
                $("#main").prepend( $instruction );
            }
            css = {};
            if ( opts.direction == "r" ) {
                css.left = opts.target.offset().left - $instruction.width() - 20 - 15 ; 
            } else {
                css.left = opts.target.offset().left + opts.target.width() + 15;
            }

            $instruction.css( css );

            return $instruction;
        }


        // // drag from here to here
        // startIntroSequence: function() {
        //     $("body")
        //         .prepend("<img class='intro-sequence intro-00' src='assets/img/intro-00.png' width='100%' />")
        //         .prepend("<img class='intro-sequence intro-01' src='assets/img/intro-01.png' width='100%' />");

        //     app.once("item_dropped", function( e ) {
        //         $(".intro-01").fadeOut(function() {
        //             $(".intro-00, .intro-01").remove();
        //             this.step2();
        //         }.bind( this ));
        //         $(".intro-00").fadeOut(function() {
        //             $(".intro-00, .intro-01").remove();
        //         }.bind( this ));
        //     }, this );
        // },

        // // create a new page
        // step2: function() {
        //     $("body").prepend("<img class='intro-sequence intro-02' src='assets/img/intro-02.png' width='100%' />");

        //     app.once("page_added", function( e ) {
        //         $(".intro-02").fadeOut(function() {
        //             $(".intro-02").remove();
        //             this.step3();
        //         }.bind( this ));
        //     }, this );
        // },

        // // drag from here to here
        // step3: function() {
        //     $("body")
        //         .prepend("<img class='intro-sequence intro-03' src='assets/img/intro-03.png' width='100%' />")
        //         .prepend("<img class='intro-sequence intro-01' src='assets/img/intro-01.png' width='100%' />");

        //     app.once("item_dropped", function( e ) {
        //         $(".intro-01").fadeOut(function() {
        //             $(".intro-00, .intro-01").remove();
        //             this.step4();
        //         }.bind( this ));
        //         $(".intro-03").fadeOut(function() {
        //             $(".intro-03").remove();
        //         }.bind( this ));
        //     }, this );
        // },

        // // create a new hotspot
        // step4: function() {
        //     $("body").prepend("<img class='intro-sequence intro-04' src='assets/img/intro-04.png' width='100%' />");

        //     app.once("layer_type_added", function( type ) {

        //         if ( type == "Link" ) {
        //             $(".intro-04").fadeOut(function() {
        //                 $(".intro-04").remove();
        //                 this.step5();
        //             }.bind( this ));
        //         }
        //     }, this );
        // },

        // // link to a new page
        // step5: function() {
        //     $("body").prepend("<img class='intro-sequence intro-05' src='assets/img/intro-05.png' width='100%' />");

        //     app.once("page_added", function( e ) {
        //         $(".intro-05").fadeOut(function() {
        //             $(".intro-05").remove();
        //             this.step6();
        //         }.bind( this ));
        //     }, this );
        // },

        // // drag from here to here
        // step6: function() {
        //     $("body")
        //         .prepend("<img class='intro-sequence intro-03' src='assets/img/intro-03.png' width='100%' />")
        //         .prepend("<img class='intro-sequence intro-01' src='assets/img/intro-01.png' width='100%' />");

        //     app.once("item_dropped", function( e ) {
        //         $(".intro-03").fadeOut(function() {
        //             $(".intro-03").remove();
        //         }.bind( this ));
        //         $(".intro-01").fadeOut(function() {
        //             $(".intro-00, .intro-01").remove();
        //             this.step7();
        //         }.bind( this ));
        //     }, this );
        // },

        // // switch to soundcloud
        // step7: function() {
        //     $("body").prepend("<img class='intro-sequence intro-06' src='assets/img/intro-06.png' width='100%' />");

        //     app.once("media_drawer_toggle", function( api ) {

        //         if ( api == "Soundcloud" ) {
        //             $(".intro-06").fadeOut(function() {
        //                 $(".intro-06").remove();
        //                 this.step8();
        //             }.bind( this ));
        //         }

        //     }, this );
        // },

        // // add a soundtrack
        // step8 : function() {
        //     $("body").prepend("<img class='intro-sequence intro-07' src='assets/img/intro-07.png' width='100%' />");

        //     app.once("soundtrack_added", function( e ) {
        //         $(".intro-07").fadeOut(function() {
        //             $(".intro-07").remove();
        //             this.step9();
        //         }.bind( this ));
        //     }, this );
        // },

        // step9 : function() {
        //     $("body").prepend("<img class='intro-sequence intro-08' src='assets/img/intro-08.png' width='100%' />");

        //     app.once("project_preview", function( e ) {
        //         $(".intro-08").fadeOut(function() {
        //             $(".intro-08").remove();
        //         }.bind( this ));
        //     }, this );
        // }
        
    });

});
