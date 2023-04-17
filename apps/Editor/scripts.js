$(function(){
    autocomplete(document.getElementById('input'), defaultIset, 'instruction');
    
    
    updateRegisterAutocomplete();

});

function updateRegisterAutocomplete() {
    Array.from(document.getElementsByClassName('register')).forEach(function(element) {
        autocomplete(element, regs, 'register')
        element.addEventListener('input', function(e) {
            console.log("E: ", e);
            console.log("src:", e.target);
        });
    });
}

//TODO:
//Få added tab-press til at navigere mellem inputfelter på linje

//Få lavet et objekt der bygges til.
const operandType = {
    register: "register",
    immediate: "immediate"
};

class Instruction {
    constructor(opcode, operands) {
        this.opcode = opcode;
        this.operands = operands;
    }
    get opcode() {
        return this.opcode;
    }
    get operands() {
        return this.operands;
    }
};

class Operand {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }

    get type(){
        return this.type;
    }

    get value() {
        return this.value;
    }

    set value(val) {
        this.value = val;
    }
};

const program = [];

const iset = [];

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

function fillOperands(elem) {
    let opcode = elem.value;
    let instruction = defaultIset.find(o => o.opcode == opcode);
    let parent = elem.parentElement.parentElement;
    console.log(parent.childNodes);
    let operandList = parent.childNodes[3].childNodes[1];
    console.log("Operands: ", operandList);
    //Create child nodes
    let newSpan = document.createElement('span');
    newElem.classList.classList.add('autocomplete');
    let operandListElement = document.createElement('span');
    operandListElement.classList.add('operand-list');

    instruction.operands.forEach((operand, idx) => {
        let newElem = document.createElement('input');
        newElem.classList.add(operand.type);
        newElem.setAttribute('id', idx);
        operandListElement.appendChild(newElem);
    });
    newSpan.appendChild(operandListElement);
    
    updateRegisterAutocomplete();
    addNewInstruction();
}

function addNewInstruction() {
    let newElem = document.createElement('')
    document.appendChild
}