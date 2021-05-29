namespace aniemierteWiese {
    let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("canvas");
    let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");

    let sky: Cloud[] = [];
    let flowerField: Flower[] = [];
    let beeHive: Bee[] = [];
    let mntPoints: number [][] = [];

    let thicc: number = canvas.width / 20;
    let treeThiccness: number = Math.floor(Math.random() * thicc + 150);


    class Bee {
        x: number;
        y: number;
        //vX = Velocity in X Richtung
        vX: number;
        vY: number;
        size: number;

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height / 2 + 50;
            this.vX = Math.random() * 20 - 10;
            this.vY = Math.random() * 20 - 10;
            this.size = 10;
        }

        spawn(): void {
            crc2.beginPath();
            crc2.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            crc2.fillStyle = "yellow";
            crc2.fill();
        }

        fly(): void {
            this.x += this.vX;
            this.y += this.vY;
            if (this.x > canvas.width + this.size) {
                this.x = -this.size;
            }
            if (this.x < 0 - this.size) {
                this.x = canvas.width + this.size;
            }
            if (this.y > canvas.height + this.size) {
                this.y = -this.size;
            }
            if (this.y < 0 - this.size) {
                this.y = canvas.height + this.size;
            }

            this.spawn();
        }
    }

    class Cloud {
        x: number;
        y: number;
        vX: number;
        w: number;
        h: number = 42;

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height / 4;
            this.vX = Math.random() * 10 - 5;
            this.w = 200;
        }

        spawn(): void {
            crc2.beginPath();
            crc2.ellipse(this.x, this.y, this.w, this.h, 0, 0, 2 * Math.PI);
            crc2.fillStyle = "#cfffdb";
            crc2.fill();
        }

        float(): void {
            this.x += this.vX;
            if (this.x >= canvas.width) {
                this.x = -this.w;
            }
            this.spawn();
        }
    }

    class Flower {
        x: number;
        y: number;
        angle: number;
        petalX: number;
        petalOrigin: number;
        petalColor: string [] = ["#f7437b", "#af8ad3", "#f1ef17", "#327aee"];
        color: string;

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height / 2 + canvas.height / 2;
            this.angle = 0;
            this.petalOrigin = this.x + 5;
            this.color = this.petalColor[Math.floor(Math.random() * 4)];
        }

        spawn(): void {
            crc2.beginPath();
            crc2.rect(this.x, this.y, 10, 50);
            crc2.fillStyle = "green";
            crc2.fill();
            crc2.beginPath();
            crc2.arc(this.petalOrigin + this.petalX, this.y, 15, 0, 2 * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
        }

        wave(): void {
            this.angle += 0.1;
            this.petalX = Math.sin(this.angle);
            this.spawn();
        }
    }




    function fillSky(_cnt: number): void {
        for (let i:number = 0; i < _cnt; i++) {
            sky.push(new Cloud());
        }
    }


    function fillField(_cnt: number): void {
        for (let i:number = 0; i < _cnt; i++) {
            flowerField.push(new Flower());
        }
    }


    function fillHive(_cnt: number): void {
        for (let i:number = 0; i < _cnt; i++) {
            beeHive.push(new Bee());
        }
    }


    function updateIMG(): void {
        canvas.innerHTML = "";
        drawSky();
        drawGrass();
        drawMountains();
        for (let i:number = 0; i < beeHive.length; i++) {
            beeHive[i].fly();
        }

        for (let i:number = 0; i < flowerField.length; i++) {
            flowerField[i].wave();
        }

        for (let i:number = 0; i < sky.length; i++) {
            sky[i].float();
        }

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

    function drawMountains(): void {
        crc2.beginPath();
        crc2.moveTo(mntPoints[0][0], mntPoints[0][1]);



        for (let i:number = 1; i < mntPoints.length; i++) {
            crc2.lineTo(mntPoints[i][0], mntPoints[i][1]);
        }

        
        crc2.fillStyle = "#e0e0e0";
        crc2.fill();
        crc2.stroke();
    }

    function generateMountains(_mntCnt: number): void {
        mntPoints.push([0, canvas.height / 2]);
        for (let i:number = 1; i < _mntCnt * 2 - 1; i++) {
            let trash: number [] = [];
            trash.push(i * canvas.width / (_mntCnt * 2));
            trash.push(Math.random() * canvas.height / 2);
            mntPoints.push(trash);
        }
        mntPoints.push([canvas.width, canvas.height / 2]);
    }


    function drawTree(): void {
        let h: number = 3 * canvas.height / 4;
        let pos: number[] = [0, canvas.height];

        crc2.beginPath();
        crc2.fillStyle = "#462917";
        crc2.fillRect(pos[0], pos[1], thicc, -h);
        crc2.closePath();

        crc2.beginPath();
        crc2.arc(pos[0] + thicc / 2, pos[1] - h, treeThiccness , 0, 2 * Math.PI);
        crc2.fillStyle = "#b237d8";
        crc2.fill();
    }

    window.addEventListener("load", handleLoad);



    function handleLoad(): void {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");
        fillSky(Math.random() * 10 + 1);
        fillField(Math.random() * 50 + 1);
        fillHive(5);
        generateMountains(Math.random() * 2 + 3);
        setInterval(updateIMG, 16.666);
    }
}