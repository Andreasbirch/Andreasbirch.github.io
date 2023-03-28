$(function(){
    autocomplete(document.getElementById('input'), defaultIset, 'instruction');
    
    Array.from(document.getElementsByClassName('operand')).forEach(function(element) {
        autocomplete(element, regs, 'operand')
        element.addEventListener('input', function(e) {
            console.log("E: ", e);
            console.log("src:", e.target);
        });
    });
});

//TODO:
//Få added tab-press til at navigere mellem inputfelter på linje

//Få lavet et object der bygges til.


const ins = {
    opcode: "",
    operands: []
};

const iset = [];

const regs = [
    "R1",
    "R2",
    "R3"
];

const defaultIset = [
    {
        opcode: "ADD",
        operands: [
            'R1',
            'R2',
            'R3'
        ]
    },
    {
        opcode: "LI",
        operands: [
            'R1',
            'i'
        ]
    },
    {
        opcode: "NOP",
        operands: []
    }
];