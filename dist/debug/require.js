/**
 * almond 0.2.0 Copyright (c) 2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        aps = [].slice;

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                //Convert baseName to array, and lop off the last part,
                //so that . matches that "directory" and not name of the baseName's
                //module. For instance, baseName of "one/two/three", maps to
                //"one/two/three.js", but we want the directory, "one/two" for
                //this normalization.
                baseParts = baseParts.slice(0, baseParts.length - 1);

                name = baseParts.concat(name.split("/"));

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            return req.apply(undef, aps.call(arguments, 0).concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (waiting.hasOwnProperty(name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!defined.hasOwnProperty(name) && !defining.hasOwnProperty(name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (typeof callback === 'function') {

            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (defined.hasOwnProperty(depName) ||
                           waiting.hasOwnProperty(depName) ||
                           defining.hasOwnProperty(depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback.apply(defined[name], args);

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 15);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        config = cfg;
        return req;
    };

    define = function (name, deps, callback) {

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        waiting[name] = [name, deps, callback];
    };

    define.amd = {
        jQuery: true
    };
}());

this["JST"] = this["JST"] || {};

this["JST"]["app/templates/frame-properties.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-hmenu light">\n    <ul class="layer-menu">\n        <li>\n            <a href="#" data-layer-type="Text">\n                <div class="hmenu-label">text</div>\n                <i class="icon-font icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" data-layer-type="Rectangle">\n                <div class="hmenu-label">color</div>\n                <i class="icon-th-large icon-white"></i>\n            </a>\n        </li>\n    </ul>\n</div>';
}
return __p;
};

this["JST"]["app/templates/frame.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="options"><i class="icon-edit icon-white"></i></a>\n<a href="#" class="frame-thumb"\n    data-id="'+
( id )+
'"\n    style="\n        ';
 if( thumbnail_url !== "" ) { 
;__p+='\n            background: url('+
( thumbnail_url )+
') no-repeat center center; \n            -webkit-background-size: cover;\n            -moz-background-size: cover;\n            -o-background-size: cover;\n            background-size: cover;\n        ';
 } 
;__p+='\n"></a>';
}
return __p;
};

this["JST"]["app/templates/frames.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="frame-list"></ul>\n<div class="add-frame"><a href="#"><i class="icon-plus icon-white"></i> add frame</a></div>';
}
return __p;
};

this["JST"]["app/templates/item.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#">\n    <div class="item-thumb">\n        <img src="'+
( thumbnail_url )+
'"\n            alt="'+
( title )+
'"\n            title="'+
( title )+
'"\n            height="100%"\n            width="100%"/>\n    </div>\n    <div class="item-title">\n        <i class="zicon-'+
( layer_type.toLowerCase() )+
' zicon-white"></i>\n        <span class="item-title-text">'+
( title )+
'</span>\n    </div>\n</a>';
}
return __p;
};

this["JST"]["app/templates/items.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="media-drawer-controls ZEEGA-hmenu dark">\n    <ul class=\'pull-left\'>\n        <li>\n            <a href="#" class="grid"><i class="icon-th icon-white"></i></a>\n        </li>\n        <li>\n            <a href="#" class="list"><i class="icon-th-list icon-white"></i></a>\n        </li>\n    </ul>\n    <ul class=\'pull-right\'>\n        <li>\n            <input class="search-box" type="text" placeholder="search media"/>\n        </li>\n    </ul>\n</div>\n<ul class="ZEEGA-items"></ul>';
}
return __p;
};

this["JST"]["app/templates/layer-list.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="layer-marker">\n    <a href="#"><i class="icon-chevron-left icon-white"></i></a>\n    <a href="#"><i class="zicon-'+
( type.toLowerCase() )+
' zicon-white"></i></a>\n    <a href="#"><i class="icon-chevron-right icon-white"></i></a>\n    <a href="#"><i class="icon-forward icon-white"></i></a>\n</div>';
}
return __p;
};

this["JST"]["app/templates/layer-panel.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-hmenu dark">\n    <ul class=\'pull-left\'>\n        <li>\n            <a href="#" data-layerType="Text">\n                <div class="hmenu-label">text</div>\n                <i class="icon-font icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" data-layerType="Rectangle">\n                <div class="hmenu-label">color</div>\n                <i class="icon-th-large icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" data-layerType="Geo">\n                <div class="hmenu-label">streetview</div>\n                <i class="icon-map-marker icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" data-layerType="Popup">\n                <div class="hmenu-label">popup</div>\n                <i class="icon-share icon-white"></i>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<div class="ZEEGA-layer-list">\n    <ul></ul>\n</div>';
}
return __p;
};

this["JST"]["app/templates/layers.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="layer-list"></ul>';
}
return __p;
};

this["JST"]["app/templates/layout-main.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'left-column\'>\n    <div class="nav"></div>\n    <div class="project-meta"></div>\n    <div class="media-drawer"></div>\n</div>\n<div class=\'right-column\'>\n    <div class="project-navs">\n        <div class="sequences"></div>\n        <div class="frames"></div>\n        <div class="frame-properties"></div>\n    </div>\n    <div class="workspace"></div>\n    <div class="layers"></div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/navbar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class=\'pull-left\'>\n    <li class=\'logo\'>\n        <a href="#"><img src="assets/img/zeega-logo-header.png"/></a>\n    </li>\n</ul>\n<ul class=\'pull-right\'>\n    <li>\n        <a href="#"><i class="icon-user icon-white"></i></a>\n    </li>\n    <li>\n        <a href="#"><i class="icon-folder-open icon-white"></i></a>\n    </li>\n    <li>\n        <a href="#"><i class="icon-question-sign icon-white"></i></a>\n    </li>\n</ul>';
}
return __p;
};

this["JST"]["app/templates/project-meta.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="project-top">\n    <div class="ZEEGA-project-cover" style="\n        background: url('+
( cover_image )+
') no-repeat center center;\n        -webkit-background-size: cover;\n        background-size: cover;\n    "></div>\n    <div class="ZEEGA-project-title" contenteditable="true">'+
( title )+
'</div>\n</div>\n<div class="ZEEGA-hmenu light">\n    <ul class=\'meta-menu pull-right\'>\n        <li>\n            <a href="#" class="options disabled" data-action="projectOptions">\n                <div class="hmenu-label">options</div>\n                <i class="icon-list-alt icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" class="publish disabled" data-action="projectPublish">\n                <div class="hmenu-label">publish</div>\n                <i class="icon-share icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" class="share disabled" data-action="projectShare">\n                <div class="hmenu-label">share</div>\n                <i class="icon-envelope icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" class="preview" data-action="projectPreview">\n                <div class="hmenu-label">preview</div>\n                <i class="icon-play icon-white"></i>\n            </a>\n        </li>\n    </ul>\n</div>';
}
return __p;
};

this["JST"]["app/templates/sequence.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="sequence-title">'+
( title )+
'</a>\n<a href="#" class="dropdown"><i class="icon-edit icon-white"></i></a>';
}
return __p;
};

this["JST"]["app/templates/sequences.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="sequence-list"></ul>\n<div class="add-sequence"><a href="#"><i class="icon-plus icon-white"></i> add sequence</a></div>';
}
return __p;
};

this["JST"]["app/templates/workspace.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="frame-workspace"></div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/opacity/opacity.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="hover-icon">\n    <div class="hidden-controls">\n        <div class="opacity-slider"></div>\n        <input type="text" class="text-input" value="'+
( Math.floor( attr.opacity * 100 ) )+
'">\n    </div>\n    <i class="icon-eye-open id-icon"></i>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/audio/audio.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/geo/geo.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/image/image.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target">\n    <img src="'+
( attr.uri )+
'" width=\'100%\' />\n</div>\n<div class="controls-inline"></div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/link/link.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href=\'#\' class=\'ZEEGA-link-inner\'></a>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/popup/popup-image.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'ZEEGA-popup-click-content popup-image\' style="\n  background: url('+
( attr.popup_content.uri )+
') no-repeat center center;\n  -webkit-background-size: contain;\n  -moz-background-size: contain;\n  -o-background-size: contain;\n  background-size: contain;\n">\n  <a href="#" class="popup-close">close</a>\n</div>\n';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/popup/popup-video.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'ZEEGA-popup-click-content popup-video\' >\n  <a href="#" class="popup-close">close</a>\n</div>\n';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/popup/popup.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a\n  href="#"\n  class="ZEEGA-popup-click-target"\n  ';
 if ( attr.popup_target ) { 
;__p+='\n  style="\n    background: url('+
( attr.popup_target.uri )+
') no-repeat center center;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover;\n  "\n  ';
 } 
;__p+='\n  data-caption="';
 if ( attr.popup_content ) { 
;__p+=''+
( attr.popup_content.title )+
'';
 } 
;__p+='"\n  >\n  ';
 if ( attr.popup_content ) { 
;__p+='<span class="popup-title" style=\'display:none\'>'+
( attr.popup_content.title )+
'</span>';
 } 
;__p+='\n</a>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/rectangle/rectangle.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target"></div>\n<div class="controls-inline"></div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/slideshow/slideshow-metadata.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'slide-title\'>'+
( title )+
'</div>\n<div class=\'slide-description\'>'+
( description )+
'</div>\n<a href="'+
( attribution_uri )+
'" target=\'blank\' class=\'attribution-link\'>\n    '+
( media_creator_username )+
'\n    <i class=\'slideshow-icon-'+
( archive.toLowerCase() )+
' ssarchive\'></i>\n</a>\n';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/slideshow/slideshow.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href=\'#\' class=\'slideshow-arrow arrow-left slideshow-control-prev disabled\'></a>\n<a href=\'#\' class=\'slideshow-arrow arrow-right slideshow-control-next\'></a>\n\n<div class=\'slideshow-container\'>\n\t';
 _.each( attr.slides, function(slide,i){ 
;__p+='\n\t\t<div class=\'slideshow-slide slideshow-slide-'+
( i )+
'\' style=\'\n      background:url('+
( slide.attr.uri )+
') no-repeat center center;\n      -webkit-background-size: ';
 if( slides_bleed ) { 
;__p+='cover';
 } else { 
;__p+='contain';
 } 
;__p+=';\n      -moz-background-size: ';
 if( slides_bleed ) { 
;__p+='cover';
 } else { 
;__p+='contain';
 } 
;__p+=';\n      -o-background-size: ';
 if( slides_bleed ) { 
;__p+='cover';
 } else { 
;__p+='contain';
 } 
;__p+=';\n      background-size: ';
 if( slides_bleed ) { 
;__p+='cover';
 } else { 
;__p+='contain';
 } 
;__p+=';\n    \'></div>\n\t';
 }) 
;__p+='\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/slideshow/slideshowthumbslider.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class=\'slideshow-thumb-wrapper\'>\n    <ul>\n        ';
 _.each(attr.slides, function(slide, i){ 
;__p+='\n            <li>\n                <div class=\'slideshow-thumbnail\' style="background:url('+
( slide.attr.thumbnail_url )+
'); background-repeat:no-repeat;background-size:100%;background-position:center">\n                    <a href=\'#\' class=\'slider-thumb\' data-slidenum="'+
( i )+
'"></a>\n                </div>\n            </li>\n        ';
 });
;__p+='\n    </ul>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/text/text.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+=''+
( attr.content )+
'';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/video/video.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};