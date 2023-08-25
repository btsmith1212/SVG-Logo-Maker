const fs = require('fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");

// main shape constructor
class Svg{
    constructor()
    {
        this.textElement = ''
        this.shapeElement = ''
    }
    render()
    {

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color)
    {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape)
    {
        this.shapeElement = shape.render()

    }
    
}

// inquirer question array
const questions = [
    {
        type: "input",
        name: "text",
        message: "Enter up to 3 letters/numbers:",
    },
    {
        type: "input",
        name: "text-color",
        message: "Enter a text color keyword/hex number:",
    },
    {
        type: "input",
        name: "shape-color",
        message: "Enter a shape color keyword/hex number:",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Choose which shape style you would like:",
        choices: ["Circle", "Square", "Triangle"],
    },
];

// writes data to file
function writeToFile(fileName, data) {
	console.log("Writing [" + data + "] to file [" + fileName + "]")
    fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

async function init() {
    console.log("Starting init");
	var svgString = "";
	var svg_file = "logo.svg";

    // waits for answers
    const answers = await inquirer.prompt(questions);

	// user text
	var user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		// 1-3 chars, valid entry
		user_text = answers.text;
	};
	//user font color
	user_font_color = answers["text-color"];
	//user shape color
	user_shape_color = answers["shape-color"];
	//user shape type
	user_shape_type = answers["pixel-image"];
	
	// user shape
	let user_shape;
	if (user_shape_type === "Square" || user_shape_type === "square") {
		user_shape = new Square();
	}
	else if (user_shape_type === "Circle" || user_shape_type === "circle") {
		user_shape = new Circle();
	}
	else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
		user_shape = new Triangle();
	}
	user_shape.setColor(user_shape_color);

	// constructs shape depending on choices
	var svg = new Svg();
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_shape);
	svgString = svg.render();
	writeToFile(svg_file, svgString); 
}

init()