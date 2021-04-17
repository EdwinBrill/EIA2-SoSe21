namespace L02_Events {

    window.addEventListener("load", handleLoad);

    function handleLoad() {
        document.addEventListener("mousemove", setinfoBox);
        document.addEventListener("click", loginfo);
        document.addEventListener("keyup", loginfo);
        document.getElementsByTagName("body")[0].addEventListener("click", loginfo);
        document.getElementsByTagName("body")[0].addEventListener("keyup", loginfo);

        let divs: NodeListOf<HTMLDivElement> = document.querySelectorAll("div");

        for (let i: number = 0; i < divs.length; i++) {
            divs[i].addEventListener("keyup", loginfo);
            divs[i].addEventListener("click", loginfo);
        }
    };

    function setinfoBox(_event: MouseEvent) {
        let x: number = _event.pageX;
        let y: number = _event.pageY;

        let span: HTMLElement = <HTMLElement> document.querySelector("span");

        let MousePosition: HTMLElement = span;

        MousePosition.style.left = x + "px";
        MousePosition.style.top = y + "px";

        MousePosition.textContent = "X: " + x + "px | " + "Y: " + y + "px ";
    };

    function loginfo(_event: Event) {
        console.log(_event);
        console.log(_event.target);
        console.log(_event.currentTarget);
        console.log(_event.type);
    };
}

