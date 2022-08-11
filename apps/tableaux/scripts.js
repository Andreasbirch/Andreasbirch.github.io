function interpretInput(input) {
    parenthesise(input);


    output = input.replaceAll("!","¬");
    output = input.replaceAll("&", "∧");
    output = input.replaceAll("|", "∨");
    output = input.replaceAll("<>", "↔");
    output = input.replaceAll("->", "→");

    $('#interpretation').text(output);
}

function preset(input) {
    $('#input').val(input);
    interpretInput(input);
}


function parenthesise(input) {
    input = input.replaceAll(" ", "");

    const initialStatement = new Statement(input);

    precedence(input, initialStatement);
    console.log("Recursion over, result: ");
    console.log(initialStatement);


    // console.log("Parenthesised: " + input);
}

function precedence(input, statement) {
    //Goes through symbol precedence list. Might have to check up on equality of & and | if such exists.
    var symbol = symbols.find(s => input.includes(s));

    if(input.length == 1 || (input.length == 2 && symbol == "!")) {
        return statement;
    } else {
        substrings = input.split(symbol);
        // console.log(substrings[0] + "  -  " + substrings[1]);
        statement.children.push(substrings);
        substrings.slice(0,-1).forEach(substring => {
            var subStatement = new Statement(substring);
            subStatement = precedence(substring, subStatement);
            statement.children.push(subStatement);
        });
    }
}

class Statement {
    constructor(value) {
        this.value = value;
        this.children = [];
    }
}

const symbols = ["<>", "->", "|", "&", "!"];
