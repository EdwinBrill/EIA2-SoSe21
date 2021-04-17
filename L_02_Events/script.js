var L02_Events;
(function (L02_Events) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        document.addEventListener("mousemove", setinfoBox);
        document.addEventListener("click", loginfo);
        document.addEventListener("keyup", loginfo);
        document.getElementsByTagName("body")[0].addEventListener("click", loginfo);
        document.getElementsByTagName("body")[0].addEventListener("keyup", loginfo);
        var divs = document.querySelectorAll("div");
        for (var i = 0; i < divs.length; i++) {
            divs[i].addEventListener("keyup", loginfo);
            divs[i].addEventListener("click", loginfo);
        }
    }
    ;
    function setinfoBox(_event) {
        var x = _event.pageX;
        var y = _event.pageY;
        var span = document.querySelector("span");
        var MousePosition = span;
        MousePosition.style.left = x + "px";
        MousePosition.style.top = y + "px";
        MousePosition.textContent = "X: " + x + "px | " + "Y: " + y + "px ";
    }
    ;
    function loginfo(_event) {
        console.log(_event);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event.type);
    }
    ;
})(L02_Events || (L02_Events = {}));
//# sourceMappingURL=script.js.map