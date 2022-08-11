function interpretInput(input) {
    // parenthesise(input);
    var parsedObj = parse(input);
    console.log(parsedObj);
    resizeRecursion(parsedObj);
    console.log(parsedObj);
    parsedObjToDivs(parsedObj);
    console.log(treeStr);
    
    output = input.replaceAll("!","¬");
    output = input.replaceAll("&", "∧");
    output = input.replaceAll("|", "∨");
    output = input.replaceAll("<>", "↔");
    output = input.replaceAll("->", "→");

    // $('#interpretation').text(output);
    $('#display').append(treeStr);
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

function parseRecursion(input, parent) {
    if(input.length <= 1 || (input.length <= 2 && input.includes("!"))){
        parent.children.push(null);
    } else {
        var currSym = symbols.find(s => input.includes(s));
        input.split(currSym).forEach(function (substr) {
            const chld = {
                value: substr,
                width: 5,
                children: []
            };
            parseRecursion(substr, chld);
            parent.children.push(chld);
        });
    }
}

function parse() {
    var input = "p->q&!r";
    const baseSentence = {
        value: input,
        width: input.length,
        children: []
    }
    parseRecursion(input, baseSentence);
    return baseSentence;
}

function resizeRecursion(parent) {
    var childWidth = 0;
    parent.children.forEach(function (child) {
        if(child == null){

        } else {
            resizeRecursion(child);
            childWidth += child.width;
        }
    });
    if(childWidth > parent.width){
        parent.width = childWidth;
    }
}

var treeStr = "";


function parsedObjToDivs(parent) {
    treeStr = treeStr.concat(`<div style="width:${parent.width * 10}px; float: left; text-align: center;"><p>${parent.value}</p>`);
    dfs(parent);
    treeStr = treeStr.concat("</div>");
}

function dfs(parent) {
    parent.children.forEach(function (child) {
        if(child == null){

        } else {
            treeStr = treeStr.concat(`<div style="width:${child.width * 10}px; float: left; text-align: center;"><p>${child.value}</p>`);
            dfs(child);
            treeStr = treeStr.concat("</div>");
        }
    });
}

const symbols = ["<>", "->", "|", "&", "!"];
