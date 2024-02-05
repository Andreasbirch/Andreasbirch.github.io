//Constants
const fps = 60;
const msPerFrame = 1000/fps;

function update(progress) {
    //Throttle
    if (inputs.pressedKeys.up) {
        if(spaceship.throttle < 100) {
            spaceship.throttle++;
        }
    }
    
    if (inputs.pressedKeys.down) {
        if(spaceship.throttle > 0) {
            spaceship.throttle--;
        }
    }

    burnRocket();
    move();
}

//Lås fps til 60 https://chriscourses.com/blog/standardize-your-javascript-games-framerate-for-different-monitors
function burnRocket() {
    spaceship.fuel.capacity -= spaceship.engine.consumption_max;
    if(spaceship.fuel.capacity <= 0) {
        spaceship.engine.thrust = 0;
        spaceship.fuel.capacity = 0;
    }
    // let consumedFuel = (spaceship.engine.consumption_max/100) * spaceship.throttle;
    // let acceleration = (spaceship.engine.acceleration_max/100) * spaceship.throttle;

    // if(spaceship.throttle == 0) {
    //     return;
    // }
    
    // if(spaceship.fuel.capacity - consumedFuel > 0) {
    //     spaceship.thrust += acceleration;
    //     spaceship.fuel.capacity -= consumedFuel;
    // } else {
    //     spaceship.fuel.capacity = 0;
    //     spaceship.thrust = 0;
    // }
}

function move() {
    spaceship.acceleration = -physics_constants.gravitational_acceleration + spaceship.engine.thrust/spaceship.mass;
    spaceship.velocity += spaceship.acceleration;
    spaceship.height += spaceship.velocity;

    if(spaceship.height < 0) {
        spaceship.velocity = 0;
        spaceship.height = 0;
    }
    // var ay = -physics_constants.gravitational_acceleration + (spaceship.thrust/spaceship.mass);
    // if(spaceship.height < 0) {
    //     spaceship.height = 0;
    // }

    // if(spaceship.height >= 0) {
    //     spaceship.velocity += ay;
    //     spaceship.height += spaceship.velocity;
    // }
}

function calculate_velocity() {

}

function calculate_height() {
    
}



function draw() {
    // Draw the state of the world
    document.getElementById('height-id').innerHTML = niceRound(spaceship.height);
    document.getElementById('throttle-id').innerHTML = niceRound(spaceship.throttle);
    document.getElementById('speed-id').innerHTML = niceRound(spaceship.velocity);
    document.getElementById('acceleration-id').innerHTML = niceRound(spaceship.acceleration);
    document.getElementById('fuel-capacity-id').innerHTML = niceRound(spaceship.fuel.capacity);
}

function niceRound(num) {
    return Math.round(num * 100) / 100
}


function loop(timestamp) {
    window.requestAnimationFrame(loop);

    //Cap fps to 60
    var progress = timestamp - lastRender
    if(progress < msPerFrame) return;
    const excessTime = progress % msPerFrame;
    lastRender = timestamp - excessTime;
    
    update(progress);
    draw();
}

var lastRender = 0
window.requestAnimationFrame(loop)
