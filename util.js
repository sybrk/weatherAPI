let utils = {
  cookie: {
    setCookie: function (cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },

    getCookie: function (cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    },

    deleteCookie: function (cname) {
      this.setCookie(cname, "", -1);
    },
  },
  loadJS: function (jsFilePath, cb) {
    //todo check script elementId
    let checkElem = document.getElementById(jsFilePath);
    if (checkElem !== null) {
      cb && cb();
      return;
    }

    let elem = document.createElement("script");
    elem.src = jsFilePath;
    elem.id = jsFilePath;
    elem.addEventListener("load", () => {
      console.log("File loaded");

      cb && cb();

      // if(cb !== undefined){
      //   cb();
      // }
    });
    document.getElementsByTagName("body")[0].appendChild(elem);
  },
  loadJSAsync: function (jsFilePath) {
    return new Promise(function (resolve, reject) {
      utils.loadJS(jsFilePath, function () {
        resolve();
      });
    });
  },
};
