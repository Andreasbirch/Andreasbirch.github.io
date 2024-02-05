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
    spaceship.fuel.capacity -= (spaceship.engine.consumption_max/100) * spaceship.throttle;
    spaceship.engine.thrust = (spaceship.engine.thrust_max/100) * spaceship.throttle;
    if(spaceship.fuel.capacity <= 0) {
        spaceship.engine.thrust = 0;
        spaceship.fuel.capacity = 0;
    }
}

function move() {
    spaceship.acceleration = -physics_constants.gravitational_acceleration + spaceship.engine.thrust/spaceship.mass;
    spaceship.velocity += spaceship.acceleration / 30;
    spaceship.y += spaceship.velocity / 30;

    if(spaceship.y < 0) {
        spaceship.velocity = 0;
        spaceship.y = 0;
    }
}

function calculate_velocity() {

}

function calculate_height() {
    
}



function draw() {
    // Draw the state of the world
    document.getElementById('time-id').innerHTML = niceRound(lastRender/1000);
    document.getElementById('height-id').innerHTML = niceRound(spaceship.y);
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
