import { Vector2 } from "./Vector2.js";
import { Boid } from "./Boid.js";

export class Canvas {
    #canvas;
    #width;
    #height;
    #ctx;
    #boids;

    /**
     * Canvas class
     * @param {HTMLCanvasElement} canvasReference 
     */
    constructor(canvasReference) {
        this.#canvas    = canvasReference;
        this.#width     = parseInt(this.#canvas.getAttribute('width'));
        this.#height    = parseInt(this.#canvas.getAttribute('height'));
        this.#ctx       = this.#canvas.getContext('2d');
        this.#boids     = [];
        this.pause      = false;
        
        addEventListener("keydown", (evt) => {
            if(evt.key === 'p')
                this.pause = !this.pause;
        });
    }

    init(){
        this.#canvas.setAttribute('width', window.innerWidth);
        this.#canvas.setAttribute('height', window.innerHeight);
        
        this.#width = parseInt(this.#canvas.getAttribute('width'));
        this.#height = parseInt(this.#canvas.getAttribute('height'));
    }

    getWidth() {return this.#width;}
    getHeight() {return this.#height;}
    getCtx() {return this.#ctx;}
    getBoids() {return this.#boids;}

    /**
     * Add a boid Object to this canvas
     * @param {Boid} boid boid to add
     */
    addBoid(boid) {
        this.#boids.push(boid);
    }

    renderBoids() {
        this.#boids.forEach(boid => {
            boid.draw();
        });
    }

    updateBoids() {
        this.#boids.forEach(boid => {
            boid.update();
        });
    }

    render() {
        if(!this.pause) {
            this.#ctx.clearRect(0, 0, this.#width, this.#height);
            this.renderBoids();
            this.updateBoids();
        }
        window.requestAnimationFrame(() => this.render());
    }

    /**
     * Calculates center of mass percieved by "actor" boid
     * @param {Boid} actor boid object 
     * @param {number} threshold radius of proximity
     * @returns {Vector2}
     */
    percievedCentreOfMass(actor, threshold) {
        let sumVector = new Vector2(0,0);
        let count = 0;

        this.#boids.forEach(boid => {
            if(!Object.is(actor,boid) && actor.distance(boid) < threshold) {
                sumVector = sumVector.add(boid.getPosition());
                count++;
            }
        });
        if(sumVector.isNull()) return new Vector2(this.#width/2,this.#height/2);
        return sumVector.multiplyScalar(1 / count);
    }

    /**
     * Calculates center of velocity percieved by "actor" boid
     * @param {Boid} actor 
     * @param {number} threshold 
     * @returns {Vector2}
     */
    percievedCentreOfVelocity(actor, threshold) {
        var sumVector = new Vector2(0,0);
        let count = 0;

        this.#boids.forEach(boid => {
            if(boid !== actor && actor.distance(boid) < threshold) {
                sumVector.add(boid.getSpeed());
                count++;
            }
        });
        return sumVector.multiplyScalar(1 / count);
    }
}