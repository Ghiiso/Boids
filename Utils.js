export var mouseDown = 0;
export var mousePosition = [window.innerWidth,window.innerHeight];
export var settings;

window.onmousedown = () => {
  ++mouseDown;
}
window.onmouseup = () => {
  --mouseDown;
}

window.addEventListener('mousemove', (event) => {
    mousePosition = [event.clientX, event.clientY];
});

/**
 * Returns a random float number between min and max 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function randomFromRange(min, max) {
    return Math.random()*(max - min) + min;
}

export async function fetchJSON(jsonpath) {
	settings = await requestJSON(jsonpath);
}

async function requestJSON(jsonpath) {
  	let request = await fetch(new Request(jsonpath));
  	return request.json();
}