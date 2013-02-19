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