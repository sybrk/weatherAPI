let utils = {
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
