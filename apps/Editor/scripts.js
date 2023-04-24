$(function(){
    autocomplete(document.getElementById('input'), defaultIset, 'newInstruction');

});

//TODO:
//Få added tab-press til at navigere mellem inputfelter på linje

const operandType = {
    register: "register",
    immediate: "immediate"
};

class Instruction {
    constructor(opcode, operands) {
        this.opcode = opcode;
        this.operands = operands;
    }
};

class Operand {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
};

const program = [];

const regs = [
    "R1",
    "R2",
    "R3",
    "R4"
];

const defaultIset = [
    {
        opcode: "ADD",
        operands: [
            {
                type: operandType.register,
                value: "R1"
            },
            {
                type: operandType.register,
                value: "R1"
            },
            {
                type: operandType.register,
                value: "R1"
            } 
        ]
    },
    {
        opcode: "LI",
        operands: [
            {
                type: operandType.register,
                value: "R1"
            },
            {
                type: operandType.immediate,
                value: "i"
            }
        ]
    },
    {
        opcode: "NOP",
        operands: []
    }
];

function submitAutocomplete(elem, type) {
    let value = elem.value;
    console.log("Submitted autocomplete:", {elem, type});

    //Diferentiate between an existing instruction being modified and a
    //new instruction which needs to have new operands created etc.

    switch(type) {
        case "newInstruction":
            //Create number of operands for instruction
            let ins = defaultIset.find(o => o.opcode == value);
            let ops = ins.operands.map(function(op) {
                return new Operand(op.type, op.value);
            });
            
            //Generate new Instruction object
            let instruction = new Instruction(value, ops);
            program.push(instruction);
            

            //Generate inputs for each operand to be used in view.
            instruction.operands.forEach(operand => {
                drawOperand(elem.parentElement, operand);
            });

            //Generate new input field for next line, add autocomplete to it
            let newInput = document.createElement('input');
            autocomplete(newInput, defaultIset, 'newInstruction');

            //Create new div containing the next line
            let newInstruction = document.createElement('div');
            newInstruction.classList.add('instruction');
            newInstruction.classList.add('autocomplete');
            newInstruction.appendChild(newInput);
            
            document.body.appendChild(newInstruction);
    }
}

function drawInstruction(parent, instruction) {
    
}

function drawOpcodeField() {

}

function allowNumbers(elem) {
    elem.addEventListener('input', function(e) {
        if(!isNaN(e.data)) {
            elem.value += e.data;
        }
    });
}

function drawOperand(parent, operand) {
    //Create element
    let elem = document.createElement('input');
    elem.classList.add("operand");

    //If operand is of type register, add autocomplete functionality.
    if(operand.type == operandType.register) {
        autocomplete(elem, regs, 'register');
    } else {
        //Allow only numbers to be input
        elem.type = 'number';
        //Disallow incrementing when pressing up/down buttons
        elem.addEventListener('keydown', function(event) {
            if ([38, 40].indexOf(event.keyCode) > -1) {
                event.preventDefault();
            }
        });
    }

    //If operand is changed in the future, add this to the instruction
    elem.addEventListener('input', function(e) {
        operand.value = elem.value;
    });

    parent.appendChild(elem);
}