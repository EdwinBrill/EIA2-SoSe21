namespace Lektion8_1_Canvas {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    canvas.width = 1280;
    canvas.height = 800;

    let colors: string [] = ["#e1f31b", "#f7094b", "#62e22e", "#010e55"];
    let zaehler: number = Math.floor(Math.random() * 420);

    for (let i: number = 0; i < zaehler; i++) {
        let x: number = Math.floor(Math.random() * 1280);
        let y: number = Math.floor(Math.random() * 800);

        let triColor: number = Math.floor(Math.random() * 4);
        crc2.beginPath();
        crc2.fillStyle = colors[triColor];
        crc2.moveTo(x, y);
        crc2.lineTo(x * 4, y);
        crc2.lineTo(x * 2, y * 2);
        crc2.fill();

        let circColor: number = Math.floor(Math.random() * 4);
        crc2.beginPath();
        crc2.fillStyle = colors[circColor];
        crc2.arc(x, y, 50, 0, 2 * Math.PI);
        crc2.fill();

        let lineColor: number = Math.floor(Math.random() * 4);
        crc2.beginPath();
        crc2.fillStyle = colors[lineColor];
        crc2.moveTo(x, y);
        crc2.lineTo(x * 2, y * 2);
        crc2.closePath();
        crc2.stroke();
    }
}



