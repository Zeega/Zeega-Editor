this["JST"] = this["JST"] || {};

this["JST"]["app/templates/frame-controls.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="section-header">Transition</div>\n<div class="advance-controls">\n    <div class="adv-section advance-manual">\n        <a href="#">\n            <div>click</div>\n            <i class="icon-hand-up icon-white"></i>\n        </a>\n    </div>\n    <div class="adv-section advance-auto">\n        <a href="#">\n            <div>timed</div>\n            <i class="icon-time icon-white"></i>\n            <input type="text" placeholder="sec"/>\n        </a>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/frame.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="frame-menu tooltip"\n    title="delete page"\n    data-gravity="n"\n>\n    <a href="#" class="action tooltip" data-action="deleteFrame"\n        \n\n    ><i class="icon-trash icon-white"></i></a>\n</div>\n\n<a href="#" class="frame-thumb"\n    data-id="'+
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
__p+='<ul class="frame-list"></ul>\n<div class="add-frame"\n    title="add new page"\n    data-gravity="ne"\n><a href="#"><i class="icon-plus icon-white"></i></a></div>';
}
return __p;
};

this["JST"]["app/templates/item-collection-viewer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="modal-close">&times;</a>\n<a href="#" class="prev arrow arrow-left"></a>\n<a href="#" class="next arrow arrow-right"></a>\n\n<div class="modal-content">\n\n    <div class="modal-title"></div>\n    <div class="modal-body"></div>\n    <div class="modal-footer"></div>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/item-viewer-audio.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="viewer-preview" style="">\n    <iframe width="100%" height="166" autoplay="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url='+
( attribution_uri )+
'?sharing=false&liking=false&download=false&show_comments=false&show_playcount=false&buying=false"></iframe>\n</div>\n<div class="viewer-controls">\n    <a class="add-to-frame" href="#"><i class="icon-download"></i> add to page</a>\n    <a href="'+
( attribution_uri )+
'" target="blank"><i class="icon-share-alt"></i> view original</a>\n   \n     ';
 if( editable == 1  ) { 
;__p+='\n            <a class="delete-item" href="#"><i class="icon-remove"></i> delete</a>\n    ';
 } 
;__p+='\n\n</div>';
}
return __p;
};

this["JST"]["app/templates/item-viewer-image.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="viewer-preview" style="\n    background: url('+
( uri )+
');\n    background-size: contain;\n    background-position: 50% 50%;\n    background-repeat: no-repeat;\n"></div>\n<div class="viewer-controls">\n    <a class="add-to-frame" href="#"><i class="icon-download"></i> add to page</a>\n    <a href="'+
( attribution_uri )+
'" target="blank"><i class="icon-share-alt"></i> view original</a>\n    ';
 if( editable == 1  ) { 
;__p+='\n        <a class="delete-item" href="#"><i class="icon-remove"></i> delete</a>\n    ';
 } 
;__p+='\n</div>';
}
return __p;
};

this["JST"]["app/templates/item-viewer-video.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="viewer-preview" style="">\n    <video class="preview-video" src="'+
( uri )+
'" controls="true" /></audio>\n</div>\n<div class="viewer-controls">\n    <a class="add-to-frame" href="#"><i class="icon-download"></i> add to page</a>\n    <a href="'+
( attribution_uri )+
'" target="blank"><i class="icon-share-alt"></i> view original</a>\n   \n     ';
 if( editable == 1  ) { 
;__p+='\n            <a class="delete-item" href="#"><i class="icon-remove"></i> delete</a>\n    ';
 } 
;__p+='\n\n</div>';
}
return __p;
};

this["JST"]["app/templates/item-viewer-youtube.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="viewer-preview" style="">\n    <iframe width="560" height="315" src="http://www.youtube.com/embed/'+
( uri )+
'" frameborder="0" allowfullscreen></iframe>\n</div>\n<div class="viewer-controls">\n    <a class="add-to-frame" href="#"><i class="icon-download"></i> add to page</a>\n    <a href="'+
( attribution_uri )+
'" target="blank"><i class="icon-share-alt"></i> view original</a>\n   \n     ';
 if( editable == 1  ) { 
;__p+='\n            <a class="delete-item" href="#"><i class="icon-remove"></i> delete</a>\n    ';
 } 
;__p+='\n\n</div>';
}
return __p;
};

this["JST"]["app/templates/item.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#">\n    <div class="item-thumb">\n        ';
 if ( layer_type == "Audio" ) { 
;__p+='\n            <div class="thumb-title">'+
( title )+
'</div>\n        ';
 } 
;__p+='\n        <img src="'+
( thumbnail_url )+
'"\n            alt="'+
( title )+
'"\n            title="'+
( title )+
'"\n            height="100%"\n            width="100%"/>\n    </div>\n    <div class="item-title">\n        \n        <span class="item-title-text">'+
( title )+
'</span>\n    </div>\n</a>';
}
return __p;
};

this["JST"]["app/templates/layer-controls.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="layer-edit-floater">\n    <div class="layer-controls-inner"></div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/layer-drawer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-layer-drawer ZEEGA-hmenu clear">\n    <ul>\n        <li class="draggable-layer-type">\n            <a href="#" data-layer-type="Link"\n                title="add interactivity"\n                data-gravity="n"\n            >\n                <div class="item-label">link</div>\n                <i class="icon-arrow-up"></i>\n            </a>\n        </li>\n        <li class="draggable-layer-type">\n            <a href="#" data-layer-type="TextV2"\n                title="add text"\n                data-gravity="n"\n            >\n                <div class="item-label">text</div>\n                <i class="icon-font"></i>\n            </a>\n        </li>\n        <li class="draggable-layer-type">\n            <a href="#" data-layer-type="Rectangle"\n                title="add color box"\n                data-gravity="n"\n            >\n                <div class="item-label">color</div>\n                <i class="icon-th-large"></i>\n            </a>\n        </li>\n    </ul>\n</div>';
}
return __p;
};

this["JST"]["app/templates/layer-list.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="layer-marker">\n    <div class="layer-list-top">\n        <span class="layer-title">'+
( attr.title )+
'</span>\n    </div>\n    <div class="layer-list-bottom clearfix">\n        <a href="#" class="action-bg pull-left"><i class="zicon-'+
( type.toLowerCase() )+
' zicon-white"></i></a>\n        <a href="#" class="action-bg pull-right tooltip"\n            title="delete layer"\n            data-gravity="e"\n        ><i data-action="deleteLayer" class="action icon-trash icon-white"></i></a>\n    </div>\n</div>';
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
__p+='<div class="project-head"></div>\n\n<div class=\'left-column\'>\n    <div class="media-drawer"></div>\n</div>\n\n<div class=\'right-column\'>\n\n    <div class="project-navs">\n        <div class="soundtrack"></div>\n        <div class="frames"></div>\n    </div>\n    <div class="edit-box">\n        <div class="workspace"></div>\n    </div>\n\n    <div class="section-head">Layers</div>\n    <div class="layer-picker"></div>\n    <div class="layers"></div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/media-collection.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="media-collection-header">\n    <div class="media-collection-search">\n\n        <input class="search-box" type="text" placeholder="'+
( placeholder )+
'" value="'+
( searchQuery )+
'" />\n        <a class="submit btnz"><span class="label">search</span></a>\n\n    </div>\n    <div class="media-collection-headline">\n        \n\n        ';
 if( title == "Zeega"  ) { 
;__p+='\n            <p> Some of our favorites </p>\n        ';
 } else { 
;__p+='\n\n        <p> Favorites from '+
( title )+
' </p>\n        \n        ';
 } 
;__p+='\n\n    </div>\n\n</div>\n<div class="media-collection-wrapper" >\n    <div class="media-collection-container">\n        <ul class="media-collection-items"></ul>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/media-drawer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="media-drawer-controls ZEEGA-hmenu light img-tabs">\n    <ul class=\'pull-left\'>\n        \n        <li>\n            <a href="#" data-api = "Zeega" class="active media-toggle"\n                title="our faves from across the web"\n                data-gravity="sw"\n            ><i class="socialz-zeega socialz-white"></i></a>\n        </li>\n\n      \n\n        <li>\n            <a href="#" data-api="Tumblr" class="media-toggle"\n                title="GIFs and images from Tumblr"\n                data-gravity="sw"\n            ><i class="socialz-tumblr"></i></a>\n        </li>\n\n        <li>\n            <a href="#" data-api = "Soundcloud" class="media-toggle"\n                title="sounds from SoundCloud"\n                data-gravity="sw"\n            ><i class="socialz-soundcloud"></i></a>\n        </li>\n\n        \n        <li>\n            <a href="#" data-api = "Instagram" class="media-toggle"\n                title="images from Instagram"\n                data-gravity="sw"\n            ><i class="socialz-instagram"></i></a>\n        </li>\n\n        <li>\n            <a href="#" data-api = "Flickr" class="media-toggle"\n                title="images from Flickr"\n                data-gravity="sw"\n            ><i class="socialz-flickr"></i></a>\n        </li>\n\n        <li>\n            <a href="#" data-api = "Giphy" class="media-toggle"\n                title="GIFs from Giphy"\n                data-gravity="sw"\n            ><i class="socialz-giphy"></i></a>\n        </li>\n       \n        <!--\n        <li>\n            <a href="#" data-api = "Youtube" class="media-toggle"><i class="socialz-youtube"></i></a>\n        </li>\n       \n        <li >\n            <a href="#" data-api = "MyZeega" class="media-toggle"><i class="socialz-user"></i></a>\n        </li>\n         -->\n\n    </ul>\n    <ul class="pull-right">\n        <li >\n            <a id="media-upload-tab" href="#" data-api = "MyZeega" class="media-toggle">UPLOAD</a>\n        </li>\n    </ul>\n    \n    \n</div>\n<ul class="ZEEGA-items"></ul>';
}
return __p;
};

this["JST"]["app/templates/media-upload.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="upload-chooser">\n    <a href="#" class="upload-image-action active">upload image file</a> | <a href="#" class="paste-url-action">paste an image url</a>\n</div>\n\n<div class="upload-toggle">\n    <div class="upload-file">\n        <div class = "upload-progress" ></div>\n        <span class="upload-instructions">click or drag an image here to upload</span>\n        <input id="imagefile"  name="imagefile"  type="file" href="#"></input>\n    </div>\n    <div class="paste-url">\n        <input class="url-box" type="text" placeholder="enter url here" value="" />\n    </div>\n</div>\n\n\n\n<!-- \n<div class = "image-uploads" >\n    <span class="add-photo" href="#">\n        <input id="imagefile"  name="imagefile"  type="file" href="#"></input>\n    </span>\n</div>\n<ul class=\'pull-left search-bar\'>\n    <li>\n        <input class="url-box" type="text" placeholder="enter url here" value="" />\n    </li>\n</ul>\n -->';
}
return __p;
};

this["JST"]["app/templates/modal.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="modal-close">&times;</a>\n<div class="modal-content">\n    <div class="modal-title">'+
( modal.title )+
'</div>\n    <div class="modal-body">'+
( modal.content )+
'</div>\n    <div class="modal-footer"></div>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/project-head.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="nav col-left navbar ZEEGA-hmenu clear">\n    <ul class=\'pull-left\'>\n        <li class=\'logo\'>\n            <a href="'+
( webRoot )+
'"><img src="assets/img/zeega-logo-header.png"/></a>\n        </li>\n    </ul>\n    <ul class=\'pull-right\'>\n        <li>\n            <a href="'+
( webRoot )+
'profile/'+
( userId )+
'"\n                title="user profile"\n                data-gravity="n"\n                ><i class="icon-user"></i></a>\n        </li>\n        <li>\n            <a href="#"><i class="icon-folder-open"></i></a>\n            <ul class="submenu">\n                <li>\n                    <a href="'+
( webRoot )+
'project/new" data-bypass="true" ><i class="icon-file"></i> New Zeega</a>\n                </li>\n                <li class="divider"></li>\n\n                ';
 _.each( userProjects, function( project) { 
;__p+='\n                    <li>\n                        <a href="'+
( webRoot )+
'editor/'+
( project.id )+
'"  data-bypass="true" >'+
( project.title )+
'</a>\n                    </li>\n                ';
 }); 
;__p+='\n\n            </ul>\n        </li>\n\n        <li>\n            <a href="http://blog.zeega.com/faq" data-bypass="true" target="blank"\n                title="FAQ"\n                data-gravity="n"\n            ><i class="icon-question-sign"></i></a>\n        </li>\n\n        \n    </ul>\n</div>\n<div class="project-title col-middle clearfix">\n    <div class="project-info" contenteditable\n        title="title of your Zeega"\n        data-gravity="n"\n    >'+
( title )+
'</div>\n    <a href="#" class="project-preview btnz"\n        title="see what you\'re making"\n        data-gravity="n"\n    ><i class="icon-play icon-white"></i> Preview</a>\n</div>\n<div class="project-share col-right clearfix">\n    <a href="#" class="project-share btnz btnz-blue btnz-fullwidth"\n        title="share your Zeega with the world"\n        data-gravity="ne"\n    ><i class="icon-retweet icon-white"></i> Share</a>\n</div>\n\n<div class="share-grave">\n\n    <div class="close-wrapper">\n        <a href="#" class="close-grave">&times;</a>\n    </div>\n\n    <div class="project-share">\n\n        <input class="text-box" type="text" value=\'<iframe src="'+
( webRoot )+
''+
( item_id )+
'/embed" width="100%" height="100%" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>\'></input>\n        ∞\n        <input class="text-box" type="text" value="'+
( webRoot )+
''+
( item_id )+
'"></input>\n        <a href="https://twitter.com/intent/tweet?original_referer='+
( webRoot )+
''+
( item_id )+
'&text=Zeega%20Project%3A%20'+
( title )+
' &url='+
( webRoot )+
''+
( item_id )+
'"\n                        class="social-share"\n                        data-itemid="'+
( item_id )+
'"\n                        target="blank">\n            <i class="zitem-twitter zitem-30 color"></i>\n        </a>\n        <a href="http://www.facebook.com/sharer.php?u='+
( webRoot )+
''+
( item_id )+
'"\n                        class="social-share"\n                        data-itemid="'+
( item_id )+
'"\n                        target="blank">\n            <i class="zitem-facebook zitem-30 color"></i>\n        </a>\n        <a id ="tumblr-share" href="http://www.tumblr.com/share/photo?'+
( tumblr_share )+
'" \n                        class="social-share"\n                        data-itemid="'+
( item_id )+
'"\n                        target="blank">\n            <i class="zitem-tumblr zitem-30 color"></i>\n        </a>\n    </div>\n</div>';
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

this["JST"]["app/templates/soundtrack-viewer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="modal-close">&times;</a>\n\n<div class="modal-content">\n\n    <div class="modal-title"></div>\n    <div class="modal-body">\n        <div class="viewer-preview" style="">\n            <iframe ="sc" width="100%" height="166" autoplay="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url='+
( attribution_uri )+
'?auto_play=true&sharing=false&liking=false&download=false&show_comments=false&show_playcount=false&buying=false"></iframe>\n        </div>\n    </div>\n    <div class="modal-footer"></div>\n</div>\n\n\n';
}
return __p;
};

this["JST"]["app/templates/soundtrack.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="elapsed tooltip"></div>\n<div class="soundtrack-waveform"\n    \n';
 if ( model ) { 
;__p+='\n    style=" background: url('+
( attr.thumbnail_url )+
');\n    background-size: 100% 100%"\n';
 } 
;__p+='\n></div>\n\n';
 if ( model === false ) { 
;__p+='\n    <span class="instructions-1">Drag audio here to add soundtrack</span>\n    <span class="instructions-2">Drop to add soundtrack</span>\n';
 } else { 
;__p+='\n    \n    <!--\n    <div class="soundtrack-info">\n        <span class="title">'+
( attr.title )+
'</span>\n        <span class="time-display"></span>\n    </div>\n    -->\n    <div class="soundtrack-controls">\n        <a href="#" class="playpause"\n            title="listen"\n            data-gravity="n"\n        ><i class="icon-play icon-white"></i></a>\n        <a href="#" class="remove"\n            title="remove soundtrack"\n            data-gravity="n"\n        ><i class="icon-remove icon-white"></i></a>\n    </div>\n';
 } 
;__p+='';
}
return __p;
};

this["JST"]["app/templates/workspace.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-workspace"\n    title="drag media here to add to your Zeega"\n    data-gravity="n"\n></div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/av/av.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">media controls</div>\n<a href="#" class="playpause"><i class="icon-play icon-white"></i></a>\n<div class="av-slider"></div>\n';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/checkbox/checkbox.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( title )+
'</div>\n<div class="roundedOne">\n    <input type="checkbox" value="None" id="roundedOne" name="check" />\n    <label for="roundedOne"></label>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/color/color.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( _title )+
'</div>\n<div class="color-selector">\n    <input class="simple_color" value="'+
( attr[ _propertyName ] )+
'"/>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/linkimage/linkimage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">type</div>\n<select class="link-image-select">\n    <option value="arrow_up">Up Arrow</option>\n    <option value="arrow_down">Down Arrow</option>\n    <option value="arrow_left">Left Arrow</option>\n    <option value="arrow_right">Right Arrow</option>\n    <option value="default">Glowing Rectangle</option>\n</select>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/linkto/linkto.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">link to</div>\n<div class="control-frame-thumb" style="\n    background: url('+
( thumbnail_url )+
') no-repeat center center; \n    -webkit-background-size: cover;\n    background-size: cover;\n">\n    <a href="#"></a>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/opacity/opacity.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="hover-icon">\n    <i class="icon-eye-open id-icon icon-white"></i>\n    <input type="text" class="text-input" value="'+
( Math.floor( attr.opacity * 100 ) )+
'">\n    <div class="hidden-controls">\n        <div class="opacity-slider"></div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/slider/slider.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="hover-icon">\n    <div class="control-name">'+
( title )+
'</div>\n    <input type="text" class="text-input" value="'+
( Math.floor( attr[ _propertyName ] * 100 ) )+
'">\n    <div class="hidden-controls">\n        <div class="control-slider"></div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/controls/textbar/textbar.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">text controls</div>\n\n<a data-action="bold" class="textbar-btn" href="#" >\n    <i class="icon-bold"></i>\n</a>\n<a data-action="italic" class="textbar-btn" href="#" >\n    <i class="icon-italic"></i>\n</a>\n<a data-action="clear" class="textbar-btn" href="#" >\n    <i class="icon-ban-circle"></i>\n</a>\n\n<div class="font-chooser control">\n    <select class="font-list" style=""></select>\n    <select class="size-list" style="">\n        <option value="100">8</option>\n        <option value="125">10</option>\n        <option value="150">12</option>\n        <option value="175">14</option>\n        <option value="200">18</option>\n        <option value="250">24</option>\n        <option value="375">36</option>\n        <option value="500">48</option>\n        <option value="800">72</option>\n        <option value="1600">144</option>\n        <option value="2400">200</option>\n        <option value="3600">300</option>\n    </select>\n</div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/audio/audio.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<audio id="audio-el-'+
( id )+
'" src="'+
( attr.uri )+
'"\n    ';
 if ( attr.loop ) { 
;__p+='\n        loop\n    ';
 } 
;__p+='\n    preload\n></audio>';
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

this["JST"]["app/zeega-parser/plugins/layers/link/frame-chooser.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="modal-close">&times;</a>\n<div class="modal-content">\n    <div class="modal-title">Where do you want your link to go?</div>\n    <div class="modal-body">\n        <ul class="frame-chooser-list clearfix">\n        </ul>\n        <div class="bottom-chooser">\n            <div class="new-frame">\n                <a href="#" class="link-new-frame"><i class="icon-plus"></i> New Page</a>\n            </div>\n            <a href="#" class="submit btnz btnz-submit">OK</a>\n        </div>\n    </div>\n</div>\n';
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
__p+='<div class="visual-target">'+
( attr.content )+
'</div>\n<div class="controls-inline"></div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/text_v2/text.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target">'+
( attr.content )+
'</div>\n<div class="controls-inline"></div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/text_v2/textmodal.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="modal-content">\n    <div class="modal-title">Edit your text</div>\n    <div class="modal-body">\n\n        <textarea rows="4" cols="59" maxlength="140" >'+
( attr.content )+
'</textarea>\n\n        <div class="text-controls clearfix">\n            <div class="color-selector">\n                <input class="simple-color" value="'+
( attr.color )+
'"/>\n            </div>\n            <a href="#" class="btnz btnz-light text-btn-bold"><i class="icon-bold"></i></a>\n            <a href="#" class="btnz btnz-light text-btn-italic"><i class="icon-italic"></i></a>\n            <a href="#" class="btnz btnz-light text-btn-align-left"><i class="icon-align-left"></i></a>\n            <a href="#" class="btnz btnz-light text-btn-align-center"><i class="icon-align-center"></i></a>\n            <a href="#" class="btnz btnz-light text-btn-align-right"><i class="icon-align-right"></i></a>\n\n            <select class="font-list" style=""></select>\n            <select class="size-list" style="">\n                <option value="100">8</option>\n                <option value="125">10</option>\n                <option value="150">12</option>\n                <option value="175">14</option>\n                <option value="200">18</option>\n                <option value="250">24</option>\n                <option value="375">36</option>\n                <option value="500">48</option>\n                <option value="800">72</option>\n                <option value="1600">144</option>\n                <option value="2400">200</option>\n                <option value="3600">300</option>\n            </select>\n            \n        </div>\n\n        <div class="sample-header">sample</div>\n        <div class="text-sample">'+
( attr.content )+
'</div>\n\n        <div class="bottom-chooser clearfix">\n            <a href="#" class="submit btnz btnz-submit">OK</a>\n        </div>\n    </div>\n</div>\n';
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