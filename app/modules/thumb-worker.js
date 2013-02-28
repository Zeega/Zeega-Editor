self.addEventListener("message", function( e ) {
    var data = e.data;

    switch (data.cmd) {
        case "capture":
            var xhr = new XMLHttpRequest();
            
            xhr.open("POST", data.msg, false );
            xhr.send();
            
            //self.postMessage(xhr.status);
            
            if( xhr.status == 200 ) {
                self.postMessage( xhr.responseText );
            } else {
                self.postMessage( false );
            }
            break;
        default:
            self.postMessage("Unknown command: " + data.msg);
  };
}, false);