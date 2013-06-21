define([
    "engineVendor/spin",
    "backbone.layoutmanager"
], function( Spinner ) {

    var meta = $("meta[name=zeega]");

    // Provide a global location to place configuration settings and module
    // creation.
    var app = {
        // The root path to run the application.
        attributes: { mobile: false },
        mode: "editor",
        parserPath: "app/engine/",
        dragging: null,
        mediaCollection: null,

        metadata: $("meta[name=zeega]").data(),

        userId: meta.data("userId") || null,
        userName: meta.data("userName") || null,
        projectId: meta.data("projectId")|| null,
        root: meta.data("root")|| null,
        apiRoot: meta.data("apiRoot")||  null, // dev only
        
        webRoot:  "http:" + meta.data("hostname") +  ( meta.data("apiRoot") ? meta.data("apiRoot") : meta.data("root") ) || null,
        api: "http:" + meta.data("hostname") +  ( meta.data("apiRoot") ? meta.data("apiRoot") : meta.data("root") ) + "api/"|| null,
        mediaServer: "http:" + meta.data("hostname") + meta.data("mediaRoot") || null,
        searchAPI: "http:" + meta.data("hostname") +  ( meta.data("apiRoot") ? meta.data("apiRoot") : meta.data("root") ) + "api/items/search?"|| null,
        featuredAPI: "http:" + meta.data("hostname") +  ( meta.data("apiRoot") ? meta.data("apiRoot") : meta.data("root") ) + "api/items/featured" || null,
        thumbnailServer: meta.data("thumbnailServer"),

        // function that editor events should call so they can be routed, inspected and modified
        emit: function( event, args ) {
            // other things can be done here as well
            this.trigger( event, args );
        }
    };

    var opts = {
        lines: 13, // The number of lines to draw
        length: 10, // The length of each line
        width: 4, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#FFF', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
    };
    app.spinner = new Spinner(opts);

    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};


    // Curry the |set| method with a { silent: true } version
    // to avoid repetitious boilerplate code throughout project
    Backbone.Model.prototype.put = function() {
        var args = [].slice.call( arguments ).concat([ { silent: true } ]);
        return this.set.apply( this, args );
    };

    $ = jQuery;

    Backbone.Layout.configure({
        manage: true,
        prefix: "",

        fetch: function(path) {
            // Concatenate the file extension.
            path = path + ".html";
            // If cached, use the compiled template.
            if (JST[path]) {
                return JST[path];
            }

            // Put fetch into `async-mode`.
            var done = this.async();

            // Seek out the template asynchronously.
            $.get(app.root + path, function(contents) {
                done(JST[path] = _.template(contents));
            });
        }
    });

    // Mix Backbone.Events, modules, and layout management into the app object.
    return _.extend(app, {

        Backbone: Backbone,
        // Create a custom object with a nested Views object.
        module: function(additionalProps) {
            return _.extend({ Views: {} }, additionalProps);
        },

        $: jQuery,

        // Helper for using layouts.
        useLayout: function(options) {
            // Create a new Layout with options.
            var layout = new Backbone.Layout(_.extend({
                el: "body"
            }, options));

            // Cache the refererence.
            return this.layout = layout;
        }
    }, Backbone.Events);

});
