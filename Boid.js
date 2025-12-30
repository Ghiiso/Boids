import { Vector2 } from "./Vector2.js";
import {mouseDown, mousePosition, randomFromRange, settings} from "./Utils.js";

export class Boid {
    #canvas;
    #position;
    #size;
    #speed;
    #color;

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     * @param {number} size 
     */
    constructor(canvas, size) {
        this.#canvas    = canvas;
        if(settings.startFromCenter)
            this.#position  = new Vector2(
                randomFromRange(this.#canvas.getWidth()/2-10, this.#canvas.getWidth()/2+10), 
                randomFromRange(this.#canvas.getHeight()/2-10, this.#canvas.getHeight()/2+10));
        else 
            this.#position  = new Vector2(randomFromRange(0, this.#canvas.getWidth()), randomFromRange(0, this.#canvas.getHeight()));
        this.#size      = size;
        //this.#speed     = new Vector2(randomFromRange(-1,1)*10, randomFromRange(-1,1)*10);
        this.#speed     = new Vector2(0,0);
        this.#color     = "#ffffff";
    }

    draw() {
        let ctx = this.#canvas.getCtx();
        let x = this.#position.getX();
        let y = this.#position.getY();
        let size = this.#size
        let d = this.#speed.angle();

        ctx.fillStyle = this.#color;
        ctx.beginPath();
        ctx.moveTo(x + size*Math.cos(d), y + size*Math.sin(d));
        ctx.lineTo(x + size/2*Math.cos(d+(2*Math.PI/3)), y + size/2*Math.sin(d+(2*Math.PI/3)));
        ctx.lineTo(x + size/2*Math.cos(d+(4*Math.PI/3)), y + size/2*Math.sin(d+(4*Math.PI/3)));
        ctx.fill();

        if(settings.showFieldOfView) {
            ctx.fillStyle = "rgba(174, 174, 174, 0.2)";
            ctx.beginPath();
            ctx.arc(x,y,settings.fieldOfView,0, Math.PI*2,true)
            ctx.fill() 
        }
    }

    update() {
        let width = this.#canvas.getWidth();
        let height = this.#canvas.getHeight();
        this.#speed = this.#speed.multiplyScalar(settings.inertia)
                                .add(this.centreOfMassSpeed()) // 1
                                .add(this.proximitySpeed()) // 2
                                .add(this.centreOfVelocitySpeed()) // 3
                                .add(this.boundPosition(settings.boundingSize, width-settings.boundingSize, settings.boundingSize, height-settings.boundingSize))
                                .add(mouseDown ? this.tendToPosition(new Vector2(mousePosition)) : new Vector2(0, 0))
                                .add(new Vector2(settings.windDirection));
        this.limitSpeed();
        this.#position = this.#position.add(this.#speed);
        this.#position = new Vector2 (
                            this.#position.getX() < 0 ? width - 1 : this.#position.getX() % width, 
                            this.#position.getY() < 0 ? height - 1 : this.#position.getY() % height
                        );
    }

    getPosition() {return this.#position;}
    getSpeed() {return this.#speed;}
    getSize() {return this.#size;}
    setColor(color) {this.#color = color;}

    /**
     * 
     * @param {Boid} boid 
     * @returns {number}
     */
    distance(boid) {
        return this.#position.distance(boid.getPosition());
    }

    /**
     * Rule 1: Boids try to fly towards the centre of mass of neighbouring boids
     * @returns {Vector2}
     */
    centreOfMassSpeed() {
        return this.#canvas.percievedCentreOfMass(this, settings.fieldOfView)
                    .sub(this.#position)
                    .multiplyScalar(settings.centreOfMassFactor / 100)
    }

    /**
     * Rule 2: Boids try to avoid collision with other boids
     * @returns {Vector2}
     */
    proximitySpeed() {
        let res = new Vector2(0,0);
        this.#canvas.getBoids().forEach(boid => {
            if(this !== boid && this.distance(boid) < settings.proximityThresh)
                res = res.sub(boid.getPosition().sub(this.#position));
        });
        return res.multiplyScalar(settings.proximityDeviationFactor);
    }

    /**
     * Rule 3: Boids try to match velocity with near boids
     * @returns {Vector2}
     */
    centreOfVelocitySpeed() {
        return this.#canvas.percievedCentreOfVelocity(this, settings.fieldOfView)
                    .sub(this.#speed)
                    .multiplyScalar(settings.centreOfVelocityFactor / 100);
    }

    // additional rules

    limitSpeed() {
        if(this.#speed.magnitude() > settings.speedCap)
            this.#speed = (this.#speed.multiplyScalar(1 / this.#speed.magnitude())).multiplyScalar(settings.speedCap);
    }

    /**
     * avoid screen border
     * @param {number} minX min x admitted
     * @param {number} maxX max x admitted
     * @param {number} minY min y admitted
     * @param {number} maxY max y admitted
     * @returns {Vector2}
     */
    boundPosition(minX, maxX, minY, maxY) {
        let res = new Vector2(0, 0);
        let x = this.#position.getX();
        let y = this.#position.getY();

        if(x < minX)
            res.setX(settings.boundersDeviationFactor)
        else if(x > maxX)
            res.setX(-settings.boundersDeviationFactor)

        if(y < minY)
            res.setY(settings.boundersDeviationFactor)
        else if(y > maxY)
            res.setY(-settings.boundersDeviationFactor)

        return res;
    }

    /**
     * tend to follow passed position
     * @param {Vector2} position 
     * @returns {Vector2}
     */
    tendToPosition(position) {
        return position.sub(this.#position).multiplyScalar(settings.placeTendencyFactor)
    }
}