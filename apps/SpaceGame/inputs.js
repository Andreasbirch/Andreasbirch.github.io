const inputs = {
    pressedKeys: {
        left: false,
        right: false,
        up: false,
        down: false
    }
}

const keyMap = {
    37: 'left',
    39: 'right',
    38: 'up',
    40: 'down'
}

function keydown(event) {
    var key = keyMap[event.keyCode]
    inputs.pressedKeys[key] = true
}

function keyup(event) {
    var key = keyMap[event.keyCode]
    inputs.pressedKeys[key] = false
}
  
window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)