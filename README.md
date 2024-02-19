<h1 align="center">Boids</h1>

Implementation of Boids simulations rules in plain Javascript. 

## Usage 
- to run open index file using a live server. 
- pause the simulation by pressing **p** key
- attract boid to your mouse cursor by pressing and holding left mouse key

> [!NOTE]
> The code is not yet optimized and a large number of boids might cause a saturation of browser resources

## Simulation rules
The boids follow the three main rules that defines a boid:

1) boids tends to fly towards the <b>average position</b> (the centre of mass) of neighbouring boids
1) boids try to <b>avoid collision</b> with other boids
1) boids tends to head in the <b>same direction</b> (average velocity) of neighbouring boids

plus some extra:

- boids tends to avoid screen border
- boids tends to follow mouse pointer if left click button is pressed
- boids tends to the center of the screen if no boid is in proximity

## Settings
You can play around with the simulation parameters inside the [settings](./settings.json) file. The meaning of each parameter is explained below:

|Parameter|Description
|-|-
|**numberOfBoids**| number of rendered boids object 
| **inertia** |  tendency to maintain the same orientation
| **centreOfMassFactor** |  attraction strength of rule 1
| **fieldOfView** |  radius of view circle
| **showFieldOfView** |  show field of view circle around boids
| **proximityThresh** |  threshold distance for rule 2
| **proximityDeviationFactor** |  deviation strength of rule 2
| **centreOfVelocityFactor** |  attraction strength of rule 3
| **speedCap** |  max reachable speed
| **boundingSize** |  size of bounding box (distance from screen border)
| **boundersDeviationFactor** |  repulsion strength of bounding box
| **windDirection** | 	 direction and strength of wind (2d array)
| **placeTendencyFactor** |  attraction strength to cursor

## References and inspiration
- [Wikipedia page](https://en.wikipedia.org/wiki/Boids)
- [Flocks, Herds, and Schools by Craig W. Reynolds](https://www.cs.toronto.edu/~dt/siggraph97-course/cwr87/)
- [Boids by Conrad Parker](https://vergenet.net/~conrad/boids/pseudocode.html)
- [Sebastian Lague video](https://www.youtube.com/watch?v=bqtqltqcQhw)