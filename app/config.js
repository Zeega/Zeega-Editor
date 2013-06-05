require.config({

  deps: ["../vendor/jam/require.config", "main"],

  paths: {
    jqueryUI: "../assets/js/plugins/jquery-ui/js/jquery-ui-1.10.1.custom",

    zeega_parser: "zeega-parser",
    libs: "../assets/js/libs",
    plugins: "../assets/js/plugins",
    vendor: "../vendor",

    player: "player",

    simpleColorPicker: "../vendor/simple-color-picker/src/jquery.simple-color",
    ddslick: "../vendor/ddslick/jquery.ddslick",
    mousetrap: "../vendor/mousetrap/mousetrap",
    spin: "../assets/js/libs/spin",
    tipsy: "../vendor/tipsy/src/javascripts/jquery.tipsy",
    swfObject: "../app/zeega-parser/vendor/swfobject"
  },

  shim: {
    jqueryUI: ["jquery"],
    ddslick: ["jquery"],
    simpleColorPicker: ["jquery"],
    mousetrap: {
        exports: 'Mousetrap'
    },

    tipsy: ["jquery"]
  }

});