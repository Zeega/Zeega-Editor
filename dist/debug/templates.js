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
__p+='<div class="frame-menu tooltip"\n    title="delete page"\n    data-gravity="n"\n>\n    <a href="#" class="action tooltip" data-action="deleteFrame">\n        <i class="icon-trash icon-white"></i>\n    </a>\n</div>\n\n<a href="#" class="frame-thumb"\n    data-id="'+
( id )+
'"\n    style="\n        ';
 if( thumbnail_url !== "" ) { 
;__p+='\n            background: url('+
( thumbnail_url )+
') no-repeat center center; \n            -webkit-background-size: cover;\n            -moz-background-size: cover;\n            -o-background-size: cover;\n            background-size: cover;\n        ';
 } 
;__p+='\n"></a>\n\n<a title="';
 if ( attr.advance ) { 
;__p+=' remove default advance ';
 } else {  
;__p+=' add default advance ';
 }
;__p+='" data-gravity="n" href="#" class="advance-toggle';
 if ( attr.advance ) { 
;__p+=' active';
 } 
;__p+='">\n    <i class="icon-chevron-right"></i>\n</a>\n';
}
return __p;
};

this["JST"]["app/templates/frames.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="add-frame"\n    title="add new page"\n    data-gravity="n"\n>\n    <a href="#">\n        <div class="frame-ghost">\n            <i class="icon-plus icon-white"></i>\n            <br/>\n            Add Page\n        </div>\n    </a>\n</div>\n<ul class="frame-list"></ul>';
}
return __p;
};

this["JST"]["app/templates/intro-modal.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="modal-wrapper">\n\n    <div class="modal-content">\n\n        <div class="step-1">\n\n            <h1>Heya! Welcome to <img class="zeega-intro-logo" src="assets/img/zeega-logo-500.png" width="190px"/></h1>\n\n            <p>\n                Zeega is a community creating everything from stories to interactive music to memes.\n            </p>\n            <p>\n                We’ve got a few fun prompts to get you started.\n            </p>\n\n            <div class="intro-graphic">\n                <img src="assets/img/intro-graphic.png" width="100%"/>\n            </div>\n            <a href="#" class="finish btnz btnz-submit">Start Making <i class="icon-chevron-right icon-white"></i></a>\n        </div>\n\n\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/item-collection-viewer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="prev arrow arrow-left"></a>\n<a href="#" class="next arrow arrow-right"></a>\n\n<div class="modal-content">\n\n    <div class="modal-title"></div>\n    <a href="#" class="modal-close">&times;</a>\n    <div class="modal-body"></div>\n    <div class="modal-footer"></div>\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/item-viewer-audio.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="viewer-preview" style="">\n    <iframe width="100%" height="166" autoplay="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url='+
( attribution_uri )+
'?sharing=false&liking=false&download=false&show_comments=false&show_playcount=false&buying=false"></iframe>\n</div>\n<div class="viewer-controls">\n    <a class="add-to-frame audio" href="#"><i class="icon-download"></i> make soundtrack</a>\n    <a href="'+
( attribution_uri )+
'" target="blank"><i class="icon-share-alt"></i> view original</a>\n   \n     ';
 if( allowDelete == 1  ) { 
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
');\n    background-size: contain;\n    background-position: 50% 50%;\n    background-repeat: no-repeat;\n"></div>\n<div class="viewer-controls">\n    <a class="add-to-frame image" href="#"><i class="icon-download"></i> add to page</a>\n    <a href="'+
( attribution_uri )+
'" target="blank"><i class="icon-share-alt"></i> view original</a>\n    ';
 if( allowDelete == 1  ) { 
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
 if( allowDelete == 1  ) { 
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
'" frameborder="0" allowfullscreen></iframe>\n</div>\n<div class="viewer-controls">\n    <a class="add-to-frame youtube" href="#"><i class="icon-download"></i> add to page</a>\n    <a href="'+
( attribution_uri )+
'" target="blank"><i class="icon-share-alt"></i> view original</a>\n   \n     ';
 if( allowDelete == 1  ) { 
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
;__p+='\n        <img class="browser-thumb '+
( media_type )+
'" src="'+
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
__p+='<div class="ZEEGA-layer-drawer ZEEGA-hmenu clear">\n    <ul>\n         <li>\n            <a href="#"\n                data-layer-type="Rectangle"\n                title="add color box"\n                data-gravity="n"\n            >\n                <div class="item-label">color</div>\n                <i class="icon-th-large"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#"\n                data-layer-type="TextV2"\n                title="add text"\n                data-gravity="n"\n            >\n                <div class="item-label">text</div>\n                <i class="icon-font"></i>\n            </a>\n        </li>\n       \n        \n        <!--\n        <li>\n            <a href="#" data-layer-type="Link"\n                title="add interactivity"\n                data-gravity="n"\n            >\n                <div class="item-label">link</div>\n                <i class="icon-arrow-up"></i>\n            </a>\n        </li>\n        -->\n\n    </ul>\n</div>';
}
return __p;
};

this["JST"]["app/templates/layer-list.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="layer-marker">\n\n';
 if ( !attr.thumbnail_url ) { 
;__p+='\n    <div class="layer-list-top">\n        <span class="layer-title">'+
( attr.title )+
'</span>\n    </div>\n';
 } 
;__p+='\n\n    <div class="layer-list-bottom clearfix">\n        <a href="#" class="action-bg pull-left"><i class="zicon-'+
( type.toLowerCase() )+
' zicon-white"></i></a>\n        <a href="#" class="action-bg pull-right tooltip"\n            title="delete layer"\n            data-gravity="e"\n        ><i data-action="deleteLayer" class="action icon-trash icon-white"></i></a>\n    </div>\n</div>\n\n';
 if ( attr.thumbnail_url ) { 
;__p+='\n    <div class="layer-list-bg"\n        style="\n            background: url('+
( attr.thumbnail_url )+
');\n            background-size: cover;\n        "\n    ></div>\n';
 } 
;__p+='';
}
return __p;
};

this["JST"]["app/templates/layer-panel.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-hmenu dark">\n    <ul class=\'pull-left\'>\n        <li>\n            <a href="#" data-layerType="Rectangle">\n                <div class="hmenu-label">color</div>\n                <i class="icon-th-large icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" data-layerType="Text">\n                <div class="hmenu-label">text</div>\n                <i class="icon-font icon-white"></i>\n            </a>\n        </li>\n        \n        <li>\n            <a href="#" data-layerType="Geo">\n                <div class="hmenu-label">streetview</div>\n                <i class="icon-map-marker icon-white"></i>\n            </a>\n        </li>\n        <li>\n            <a href="#" data-layerType="Popup">\n                <div class="hmenu-label">popup</div>\n                <i class="icon-share icon-white"></i>\n            </a>\n        </li>\n    </ul>\n</div>\n\n<div class="ZEEGA-layer-list">\n    <ul></ul>\n</div>';
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
__p+='<div class="project-head"></div>\n\n<div class=\'left-column\'>\n    <div class="media-drawer"></div>\n</div>\n\n<div class=\'right-column\'>\n\n    <div class="project-navs">\n        <div class="frames"></div>\n        <div class="soundtrack"></div>\n    </div>\n    <div class="edit-box">\n        <div class="workspace"></div>\n    </div>\n\n    <div class="layer-picker"></div>\n    <div class="layers"></div>\n</div>';
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
;__p+='\n            <p>Zeega\'s favorites for '+
( day )+
'</p>\n        ';
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
__p+='<div class="media-drawer-controls ZEEGA-hmenu light img-tabs">\n    <ul class=\'pull-left\'>\n        \n        <li>\n            <a href="#" data-api = "Zeega" class="active media-toggle"\n                title="our faves from across the web"\n                data-gravity="sw"\n            ><i class="socialz-zeega socialz-white"></i></a>\n        </li>\n\n        <li>\n            <a href="#" data-api = "Soundcloud" class="media-toggle"\n                title="sounds from SoundCloud"\n                data-gravity="sw"\n            ><i class="socialz-soundcloud"></i></a>\n        </li>\n\n<!--\n        <li>\n            <a href="#" data-api="Tumblr" class="media-toggle"\n                title="GIFs and images from Tumblr"\n                data-gravity="sw"\n            ><i class="socialz-tumblr"></i></a>\n        </li>\n    -->\n        <!--\n        <li>\n            <a href="#" data-api = "Instagram" class="media-toggle"\n                title="images from Instagram"\n                data-gravity="sw"\n            ><i class="socialz-instagram"></i></a>\n        </li>\n    -->\n        <li>\n            <a href="#" data-api = "Flickr" class="media-toggle"\n                title="images from Flickr"\n                data-gravity="sw"\n            ><i class="socialz-flickr"></i></a>\n        </li>\n\n        <li>\n            <a href="#" data-api = "Giphy" class="media-toggle"\n                title="GIFs from Giphy"\n                data-gravity="sw"\n            ><i class="socialz-giphy"></i></a>\n        </li>\n       \n       <!--  \n        <li>\n            <a href="#" data-api = "Youtube" class="media-toggle"\n                title="Videos from Youtube"\n                data-gravity="sw"\n            ><i class="socialz-youtube"></i></a>\n        </li>\n\n           -->\n         <!--\n        <li >\n            <a href="#" data-api = "MyZeega" class="media-toggle"><i class="socialz-user"></i></a>\n        </li>\n         -->\n\n    </ul>\n    <ul class="pull-right">\n        <li >\n            <a id="media-upload-tab" href="#" data-api = "MyZeega" class="media-toggle">UPLOAD</a>\n        </li>\n    </ul>\n    \n    \n</div>\n<div class="ZEEGA-items"></div>\n';
}
return __p;
};

this["JST"]["app/templates/media-upload.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="upload-chooser">\n    <a href="#" class="upload-image-action active">upload an image file</a> | <a href="#" class="paste-url-action">paste a url</a>\n</div>\n\n<div class="upload-toggle">\n    <div class="upload-file">\n        <div class = "upload-progress" ></div>\n        <span class="upload-instructions">click or drag an image here to upload</span>\n        <input id="imagefile"  name="imagefile"  type="file" href="#"></input>\n    </div>\n    <div class="paste-url">\n        <input class="url-box" type="text" placeholder="enter url here" value="" />\n    </div>\n</div>\n\n\n\n<!-- \n<div class = "image-uploads" >\n    <span class="add-photo" href="#">\n        <input id="imagefile"  name="imagefile"  type="file" href="#"></input>\n    </span>\n</div>\n<ul class=\'pull-left search-bar\'>\n    <li>\n        <input class="url-box" type="text" placeholder="enter url here" value="" />\n    </li>\n</ul>\n -->';
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

this["JST"]["app/templates/pointer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+=''+
( content )+
'\n';
 if ( canCancel ) { 
;__p+='\n    <small>[<a href="#" class="stop-pointing">close</a>]</small>\n';
 } 
;__p+='';
}
return __p;
};

this["JST"]["app/templates/project-head.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="http://www.zeega.com" class="ZEEGA-tab">\n    <span class="ZTab-logo"></span>\n</a>\n\n<div class="nav-wrapper">\n    <div class="nav col-left navbar">\n        <ul class=\'pull-left\'>\n            <li>\n                <a href="'+
( webRoot )+
'profile/'+
( userId )+
'"\n                    title="my profile"\n                    data-gravity="n"\n                    ><span class="user-token"\n                        style="\n                            background-image:url('+
( userThumbnail )+
');\n                            background-size: cover;\n                        "\n                    ></span></a>\n            </li>\n            <li>\n                <a href="#" class="editor-help btnz btnz-light"\n                    title="view instructions"\n                    data-gravity="n"\n                >Help</a>\n            </li>\n           \n        </ul>\n    </div>\n\n    <ul class="nav-buttons-right">\n        \n        <li>\n            <a href="#" class="project-preview btnz"\n                title="see what you\'re making"\n                data-gravity="n"\n            ><i class="icon-play icon-white"></i> Preview</a>\n        </li>\n        <li>\n            <a href="#" class="project-share btnz btnz-blue btnz-fullwidth"\n                title="share your Zeega with the world"\n                data-gravity="n"\n            ><i class="icon-retweet icon-white"></i> Share</a>\n        </li>\n         <li>\n                <a href="'+
( webRoot )+
'project/new"\n                    class="btnz new-zeega"\n                    title="start a new Zeega"\n                    data-gravity="ne"\n                    >New</a>\n        </li>\n\n    </ul>\n\n</div>\n\n<div class="share-grave">\n\n    <div class="close-wrapper">\n        <a href="#" class="close-grave">&times;</a>\n    </div>\n\n    <div class="grave-inner">\n\n        <div class="share-meta">\n            <div class="cover-image-wrapper">\n                <div class="project-cover" style="\n                    background: url('+
( cover_image )+
');\n                    background-size: cover;\n                "></div>\n                <div class="caption-info">Drag cover image here</div>\n            </div>\n            <div class="caption-side">\n                <textarea id="project-caption" placeholder="Caption your Zeega before sharing" maxlength="80">'+
( title )+
'</textarea>\n                <div class="caption-info">80 character limit</div>\n            </div>\n        </div>\n\n\n        <div class="share-tab-content">\n            <div class="share-network share-window active">\n\n                <div>\n                    <a href="https://twitter.com/intent/tweet?original_referer='+
( webRoot )+
''+
( item_id )+
'&text='+
( title )+
' made w/ @zeega&url='+
( webRoot )+
''+
( item_id )+
'"\n                            class="social-share share-twitter"\n                            data-itemid="'+
( id )+
'"\n                            target="blank">\n                        <i class="zitem-twitter zitem-30 color"></i>\n                    </a>\n                    <a href="http://www.facebook.com/sharer.php?u='+
( webRoot )+
''+
( id )+
'"\n                                    class="social-share share-facebook"\n                                    data-itemid="'+
( id )+
'"\n                                    target="blank">\n                        <i class="zitem-facebook zitem-30 color"></i>\n                    </a>\n                    <a id ="tumblr-share" href="http://www.tumblr.com/share/photo?'+
( tumblr_share )+
'" \n                                    class="social-share share-tumblr"\n                                    data-itemid="'+
( id )+
'"\n                                    target="blank">\n                        <i class="zitem-tumblr zitem-30 color"></i>\n                    </a>\n                </div>\n\n                <div>\n                    <input class="text-box" type="text" value="'+
( webRoot )+
''+
( id )+
'" readonly></input>\n                </div>\n\n            </div>\n            <div class="share-embed share-window">\n                <div>\n                    <p>Use this snippet of code to showcase your Zeega on your own site</p>\n                </div>\n                <div>\n                    <input class="text-box" type="text" value=\'<iframe src="'+
( webRoot )+
''+
( id )+
'/embed" width="100%" height="100%" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>\'></input>\n                </div>\n                \n            </div>\n        </div>\n\n        <div class="share-tabs">\n            <ul>\n                <li>\n                    <a href="#" class="share-zeega active">Share your Zeega</a>\n                </li>\n                <li>\n                    <a href="#" class="embed-zeega">Embed</a>\n                </li>\n            </ul>\n        </div>\n\n    </div>\n\n</div>\n';
}
return __p;
};

this["JST"]["app/templates/soundtrack-viewer.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="modal-content">\n\n    <div class="modal-title"></div>\n    <a href="#" class="modal-close">&times;</a>\n    <div class="modal-body">\n        <div class="viewer-preview" style="">\n            <iframe ="sc" width="100%" height="166" autoplay="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url='+
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
;__p+='\n    <span class="soundtrack-drop-icon"\n        title="drag audio to add soundtrack"\n        data-gravity="ne"\n    ></span>\n    <span class="soundtrack-sub">soundtrack</span>\n';
 } else { 
;__p+='\n    <div class="soundtrack-controls">\n        <a href="#" class="playpause"\n            title="listen"\n            data-gravity="n"\n        ><i class="icon-play icon-white"></i></a>\n        <a href="#" class="remove"\n            title="remove soundtrack"\n            data-gravity="n"\n        ><i class="icon-remove icon-white"></i></a>\n    </div>\n';
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

this["JST"]["app/zeega-parser/plugins/controls/dropdown/dropdown.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( title )+
'</div>\n<div class="dropdown-wrapper">\n    <select class="'+
( propertyName )+
'-dropdown">\n        ';
 _.each( optionList, function( option ) { 
;__p+='\n            <option value="'+
( option.value )+
'">'+
( option.title )+
'</option>\n        ';
 }); 
;__p+='\n    </select>\n</div>';
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

this["JST"]["app/zeega-parser/plugins/layers/audio/audio-flash.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="audio-flash-'+
( id )+
'" data-src="'+
( attr.uri )+
'"  data-cue="'+
( attr.cue_in )+
'"  >\n    <div id="flash-'+
( id )+
'" %>" > \n    </div>\n</div>';
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

this["JST"]["app/zeega-parser/plugins/layers/end_page/endpage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/image/image.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target" style="\n    background: url('+
( attr.uri )+
');\n    background-size: cover;\n    background-position: center;\n"></div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/link/frame-chooser.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="modal-close">&times;</a>\n<div class="modal-content">\n    <div class="modal-title">Where do you want your link to go?</div>\n    <div class="modal-body">\n        <a href="#" class="link-new-page"><i class="icon-plus icon-white"></i></br>New Page</a>\n        <div class="divider">or</div>\n        <ul class="page-chooser-list clearfix"></ul>\n        <div class="bottom-chooser">\n            <a href="#" class="submit btnz btnz-submit btnz-inactive">OK</a>\n        </div>\n    </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/link/link.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div href=\'#\' class=\'ZEEGA-link-inner\'></div>';
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

this["JST"]["app/zeega-parser/plugins/layers/text/text.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target">'+
( attr.content )+
'</div>\n<div class="controls-inline"></div>';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/text_v2/text-v2.html"] = function(obj){
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
__p+='<div class="modal-content">\n    <div class="modal-title">Edit your text</div>\n    <div class="modal-body">\n\n        <div class="top-box clearfix">\n            <textarea rows="4" cols="59" maxlength="140">'+
( attr.content )+
'</textarea>\n            <select class="font-list" id="font-list-'+
( id )+
'"></select>\n            <div class="textarea-info">max 140 characters</div>\n        </div>\n\n        <div class="bottom-box clearfix">\n            <a href="#" class="link-page-open action ';
 if ( attr.to_frame ) { 
;__p+='hide';
 } 
;__p+='"><i class="icon-plus-sign"></i> link to page</a>\n\n            <div class="page-chooser-wrapper ';
 if ( !attr.to_frame ) { 
;__p+='hide';
 } 
;__p+='">\n                <a href="#" class="link-new-page"><i class="icon-plus icon-white"></i></br>New Page</a>\n                <div class="divider">or</div>\n                <ul class="page-chooser-list clearfix"></ul>\n                <a href="#" class="unlink-text action"><i class="icon-minus-sign"></i> remove link</a>\n            </div>\n        </div>\n\n        <div class="bottom-chooser clearfix">\n            <a href="#" class="text-modal-save btnz btnz-submit">OK</a>\n        </div>\n    </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/zeega-parser/plugins/layers/youtube/youtube.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div   class="youtube-player"  class="visual-target">\n    \n\n    <iframe id="yt-player-'+
( id )+
'" type="text/html" width="100%" height="100%"\n        src="http://www.youtube.com/embed/'+
( attr.uri )+
'?enablejsapi=1&iv_load_policy=3&showinfo=0';
 if ( !/iPad/i.test(navigator.userAgent) ) { 
;__p+='&controls=0';
 } 
;__p+='&modestbranding=1&disablekb=1&rel=0&wmode=opaque"\n        frameborder="0">\n    </iframe>\n</div>\n<div class="play-button"></div>\n<div class="ipad-cover"> pause video to return to Zeega </div>\n<div class="controls-inline"></div>\n\n';
}
return __p;
};