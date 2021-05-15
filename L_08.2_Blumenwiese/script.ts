namespace Lektion8_2_Blumenwiese {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    let FlowerColors: string [] = ["#f7437b", "#af8ad3", "#f1ef17", "#327aee"];

    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");
        drawSky();
        drawGrass();
        drawClouds(Math.random() * 2 + 3);
        drawMountains(Math.random() * 2 + 3);
        drawFlowers(Math.random() * 50 + 15);
        drawTree();
    }

    function drawSky(): void {
        crc2.fillStyle = "#dba100";
        crc2.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawGrass(): void {
        crc2.fillStyle = "#8207a8";
        crc2.fillRect(0, canvas.height, canvas.width, -canvas.height / 2);
        crc2.strokeRect(0, canvas.height, canvas.width, -canvas.height / 2);
    }

    function drawMountains(_mntCnt: number): void {
        crc2.beginPath();
        crc2.moveTo(0, canvas.height / 2);

        for (let i:number = 1; i < _mntCnt * 2 - 1; i++) {
            crc2.lineTo(i * canvas.width / (_mntCnt * 2), Math.random() * canvas.height / 2);
        }

        crc2.lineTo(canvas.width, canvas.height / 2);
        crc2.fillStyle = "#e0e0e0";
        crc2.fill();
        crc2.stroke();
    }

    function drawFlowers(_cnt: number): void {
        let size: number = 50;
        for (let i: number = 0; i < _cnt; i++) {
            let pos: number[] = [Math.random() * (canvas.width - size * 2) + size, Math.random() * canvas.height / 2 + canvas.height / 2];

            generateFlower(size, pos);
        }
    }

    function generateFlower(_size: number, _pos: number[]): void {
        let h: number = 30;

        crc2.beginPath();
        crc2.moveTo(_pos[0], _pos[1]);
        crc2.lineTo(_pos[0], _pos[1] + h);
        crc2.lineWidth = 5;
        crc2.strokeStyle = "green";
        crc2.closePath();
        crc2.stroke();

        crc2.fillStyle = FlowerColors[Math.floor(Math.random() * FlowerColors.length)];
        for (let i: number = 0; i < 5; i++) {
            //Variablen inspiriert von Leandra Philipp
            let x: number = _size / 5 * Math.cos(2 * Math.PI * i / 5) + _pos[0];
            let y: number = _size / 5 * Math.sin(2 * Math.PI * i / 5) + _pos[1] - h / 2;

            crc2.beginPath();
            crc2.arc(x, y, h / 3, 0, 2 * Math.PI);
            crc2.fill();
        }
    }

    function drawClouds(_cnt: number): void {
        for (let i: number = 0; i < _cnt; i++) {
            let x: number = Math.random() * canvas.width;
            let y: number = Math.random() * canvas.height / 4;
            let w: number = 187;
            let h: number = 42;

            crc2.beginPath();
            crc2.ellipse(x, y, w, h, 0, 0, Math.PI, true);
            crc2.fillStyle = "white";
            crc2.fill();

            crc2.beginPath();
            crc2.ellipse(x, y, w, h, 0, 0, Math.PI);
            crc2.fillStyle = "#cfffdb";
            crc2.fill();

            crc2.beginPath();
            crc2.ellipse(x, y, w, h, 0, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.stroke();
        }
    }

    function drawTree(): void {
        let h: number = 3 * canvas.height / 4;
        let pos: number[] = [0, canvas.height];
        let thicc: number = canvas.width / 20;

        crc2.beginPath();
        crc2.fillStyle = "#462917";
        crc2.fillRect(pos[0], pos[1], thicc, -h);
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(pos[0] + thicc / 2, pos[1] - h, Math.floor(Math.random() * thicc + 150), 0, 2 * Math.PI);
        crc2.fillStyle = "#b237d8";
        crc2.fill();
    }

}