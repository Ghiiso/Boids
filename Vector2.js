export class Vector2 {
    #x;
    #y;

    static TO_DEGREES = 180 / Math.PI;		
	static TO_RADIANS = Math.PI / 180;
    
    constructor(x, y = null) {
        if(y==null) {
            this.#x = x[0] || 0; 
            this.#y = x[1] || 0;
        }
        else {
            this.#x= x || 0; 
            this.#y = y || 0;
        }
        
    }

    getX() {return this.#x;}
    getY() {return this.#y;}

    setX(value) {
        this.#x = value;
    }

    setY(value) {
        this.#y = value;
    }

    isNull() {
        return this.#x == 0 && this.#y == 0;
    }

    magnitudeSq() {
		return (this.#x*this.#x)+(this.#y*this.#y);
	}

    magnitude() {
		return Math.sqrt(this.magnitudeSq());
	}

    angle() {
        let asin = Math.asin(this.#y / this.magnitude());
        if(this.#x >= 0) return asin;
        return Math.PI - asin;
    }

    /**
     * Adds a Vector2 to this
     * @param {Vector2} vector 
     * @returns {Vector2}
     */
    add(vector) {
        return new Vector2(this.#x + vector.getX(), this.#y + vector.getY());
    }

    /**
     * Subtract a Vector2 to this
     * @param {Vector2} vector 
     * @returns {Vector2}
     */
    sub(vector) {
        return new Vector2(this.#x - vector.getX(), this.#y - vector.getY());
    }

    /**
     * Multiply this by a scalar value
     * @param {number} value 
     * @returns {Vector2}
     */
    multiplyScalar(value) {
        return new Vector2(this.#x * value, this.#y * value);
    }

    /**
     * Returns distance between this and vector
     * @param {Vector2} vector 
     * @returns {number}
     */
    distance(vector) {
        var dx = Math.abs(this.#x - vector.getX()),
            dy = Math.abs(this.#y - vector.getY());
        
        return Math.sqrt(dx*dx + dy*dy);
    }
}