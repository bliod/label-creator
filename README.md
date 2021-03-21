# label-creator

Made with node.js, ejs, express, canvas.

On the left JSON input, on the right label.png output.
Using Json structure you can create custom label.
Root route renders ejs with example.json and label.html as variables.

/create - route handles creation of ./public/label.png

Images are loaded from /public path.

## Usage

Initialy there is ./example.json loaded in input field.


You can:
* Set the width and height of the element.
* Allow placing an arbitrary number of elements on the canvas.
* Allow for arbitrary placement of elements on the canvas.
* Change text or stroke color.
* Change font.
* Change images scale.

Elements: 
* textElements
* rectangleElements
* imageElements

After creating, browser restarts with initial data, and shows created output.

## Install

npm install or yarn

## Development

npm run dev or yarn dev

## Start

npm run start or yarn start
