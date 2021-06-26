namespace FarmInt {
    export let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector("canvas");
    export let crc2: CanvasRenderingContext2D = <CanvasRenderingContext2D> canvas.getContext("2d");
    let mntPoints: number [][] = [];
    let thicc: number = canvas.width / 20;
    let treeThiccness: number = Math.floor(Math.random() * thicc + 150);

    let movingArr: moving[] = [];
    export let flowerArray: flower[] = [];

    export let Beehive: hive = new hive();


    function fillSky(_cnt: number): void {
        for (let i:number = 0; i < _cnt; i++) {
            movingArr.push(new cloud());
        }
    }


    function fillField(_cnt: number): void {
        for (let i:number = 0; i < _cnt; i++) {
            let Bluemchen: flower = new flower();
            movingArr.push(Bluemchen);
            flowerArray.push(Bluemchen);
        }
        console.log(movingArr);
    }


    function fillHive(_cnt: number): void {
        for (let i:number = 0; i < _cnt; i++) {
            movingArr.push(new bee());
        }
    }

    window.addEventListener("click", spawnBee);

    function spawnBee(_event: MouseEvent): void {
        let spawnX = _event.pageX;
        let spawnY = _event.pageY;
        let Piene = new bee();
        Piene.x = spawnX;
        Piene.y = spawnY;
        movingArr.push(Piene);
    }

    function updateIMG(): void {
        canvas.innerHTML = "";
        drawSky();
        drawGrass();
        drawMountains();
        for (let i:number = 0; i < movingArr.length; i++) {
            movingArr[i].move();
        }

        drawTree();
        Beehive.spawn();
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
        let pos: number[] = [100, canvas.height];

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
