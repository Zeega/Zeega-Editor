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

            if ( isEmpty && $.parseJSON( window.userProjects ).length === 1 ) {
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
                    progress: null,
                    topDiv: 4
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
                    content: "Hit ESC or click X to return to the editor",
                    close: false,
                    zIndex: 200
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
                $second = this.insertInstructions({
                    target: $(".add-frame"),
                    direction: "r",
                    color: "red",
                    content: "…or add a new page and keep creating",
                    close: true,
                    progress: "3/4",
                    avoid: $first
                });

                app.once("grave_open page_added", function( e ) {
                    $first.fadeOut(function() {
                        $first.remove();
                    }.bind( this ));
                    $second.fadeOut(function() {
                        $second.remove();
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
            if ( opts.close ) {
                $small.append("  [<a href='#' class='close-ins'>close</a>]");
            }
            $instruction.append( $small );

            if ( opts.color ) {
                $instruction.addClass("ins-" + opts.color );
            }

            $instruction.css({
                top: ( opts.target.offset().top + ( opts.target.height() / (opts.topDiv || 2) ) - 21 ),
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
            
            if ( opts.zIndex ) {
                css.zIndex = opts.zIndex;
            }

            if ( opts.direction == "r" ) {
                css.left = opts.target.offset().left - $instruction.width() - 20 - 15 ; 
            } else {
                css.left = opts.target.offset().left + opts.target.width() + 15;
            }

            $instruction.css( css );

            return $instruction;
        }
        
    });

});
