var localApp = {
  initialise: function () {
    document.addEventListener('deviceready', function () {
      var parentElement = document.querySelector(".app");
      var listeningElement = parentElement.querySelector('.listening');
      var receivedElement = parentElement.querySelector('.received');

      listeningElement.setAttribute('style', 'display:none;');
      receivedElement.setAttribute('style', 'display:block;');

      endpoint = document.querySelector("meta[name='content-endpoint']").getAttribute("content");
      console.debug('Device ready');
      localApp.injectScript(endpoint + 'application.js');
    }, false);
  },
  
  injectScript: function (src, complete) {
    console.debug("Injecting Javascript from", src);

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.onload = function () {
      // Avoid memory leaks in old IE versions.
      script.onload = null;
      console.debug("Completed loading", src);
      if (complete !== undefined) {
        complete();
      }
    }

    var head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
    
    script.src = src;
  }
}

localApp.initialise();
