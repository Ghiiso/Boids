import {Canvas} from "./Canvas.js";
import { Boid } from "./Boid.js";
import { fetchJSON,settings } from "./Utils.js";

async function main() {
    await fetchJSON("settings.json");
    var canvas = new Canvas(document.getElementsByTagName("canvas")[0]);
    canvas.init();

    window.addEventListener('resize', () => canvas.init());

    for(let i=0; i<settings.numberOfBoids; i++) {
        canvas.addBoid(new Boid(canvas, settings.sizeOfBoids));
    }
    
    canvas.render();
}

window.addEventListener("load", main);
