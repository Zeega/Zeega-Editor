// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["../vendor/jam/require.config", "main"],

  paths: {

    jqueryUI: "../assets/js/plugins/jquery-ui.min",

    zeega_parser: "zeega-parser",
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
    vendor: "../vendor"

  },

  shim: {
    jqueryUI: ["jquery"]
  }

});
