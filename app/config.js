// Set the require.js configuration for your application.
require.config({

  // Initialize the application with the main application file and the JamJS
  // generated configuration file.
  deps: ["zeegaplayer", "../vendor/jam/require.config", "main", "spin"],

  paths: {

    jqueryUI: "../assets/js/plugins/jquery-ui/js/jquery-ui-1.10.1.custom",

    zeega_parser: "zeega-parser",
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
    vendor: "../vendor",

    zeegaplayer: "../vendor/zeegaplayer/dist/debug/zeega",

//    colorpicker: "../vendor/colorpicker/js/colorpicker",
    simpleColorPicker: "../vendor/simple-color-picker/jquery.simple-color",
    ddslick: "../assets/js/plugins/jquery.ddslick",
    mousetrap: "../vendor/mousetrap/mousetrap",
    spin: "../assets/js/libs/spin"

  },

  shim: {
    jqueryUI: ["jquery"],
//    colorpicker: ["jquery"],
    ddslick: ["jquery"],
    simpleColorPicker: ["jquery"],

    mousetrap: {
        exports: 'Mousetrap'
    },
  }

});
