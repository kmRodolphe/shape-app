/// <reference path="coconut.ts"/>

type shape = "square" | "circle" | "triangle";
type color = "red" | "green" | "blue";

interface controllerData {
    shape: shape;
    color: color;
    nbItem: number;
}

interface shapeData {
    shape: shape;
    color: color;
}

class Controller extends Component {
    shape: string;
    color: string;
    nbItem: number;
    decreaseNB: () => void;
    increaseNB: () => void;
    updateArray: () => void;

    constructor(id: number, data: controllerData) {
        super();
        this.id = id;
        this.shape = data.shape;
        this.color = data.color;
        this.nbItem = data.nbItem;
        this.decreaseNB = () => {
            const qtyBox = document.getElementById(`qtySelect${this.id}`);
            const currValue = Number(qtyBox.innerHTML);
            const setValue = Math.max(0, currValue - 1);
            qtyBox.innerHTML = setValue.toString();
            this.updateArray();
        };
        this.increaseNB = () => {
            const qtyBox = document.getElementById(`qtySelect${this.id}`);
            const currValue = Number(qtyBox.innerHTML);
            const setValue = Math.min(10, currValue + 1);
            qtyBox.innerHTML = setValue.toString();
            this.updateArray();
        };
        this.updateArray = () => {
            const shapeChoices = Array.from(
                document.getElementsByName(`shape-choice${this.id}`)
            ) as HTMLInputElement[];
            const selectedShape = shapeChoices.find(
                (choice: HTMLInputElement) => choice.checked
            ).value;
            const colorChoices = Array.from(
                document.getElementsByName(`color-choice${this.id}`)
            ) as HTMLInputElement[];
            const selectedColor = colorChoices.find(
                (choice: HTMLInputElement) => choice.checked
            ).value;
            const nbItem: number = Number(
                document.getElementById(`qtySelect${this.id}`).innerHTML
            );
            myData[this.id] = {
                shape: selectedShape,
                color: selectedColor,
                nbItem: nbItem,
            };
            drawCanvas();
        };
        this.content = creDiv({ className: "controller", id: this.id })(
            creDiv({ className: "shape-form" })(
                creDiv({ className: "choice" })(
                    creElem("input")({
                        type: "radio",
                        id: `square${this.id}`,
                        name: `shape-choice${this.id}`,
                        value: "square",
                        onchange: this.updateArray,
                    })(),
                    creElem("label")({
                        htmlFor: `square${this.id}`,
                        innerHTML:
                            '<svg><rect width="20" height="20" fill="black" stroke="transparent" stroke-width="2" /></svg>',
                    })()
                ),
                creDiv({ className: "choice" })(
                    creElem("input")({
                        type: "radio",
                        id: `circle${this.id}`,
                        name: `shape-choice${this.id}`,
                        value: "circle",
                        onchange: this.updateArray,
                    })(),
                    creElem("label")({
                        htmlFor: `circle${this.id}`,
                        innerHTML:
                            '<svg><circle cx="10" cy="10" r="10" stroke="transparent" stroke-width="1" fill="black" /></svg>',
                    })()
                ),
                creDiv({ className: "choice" })(
                    creElem("input")({
                        type: "radio",
                        id: `triangle${this.id}`,
                        name: `shape-choice${this.id}`,
                        value: "triangle",
                        onchange: this.updateArray,
                    })(),
                    creElem("label")({
                        htmlFor: `triangle${this.id}`,
                        innerHTML:
                            '<svg><polygon points="10,0 0,20 20,20" fill="black" stroke="transparent" stroke=width="2"/></svg>',
                    })()
                )
            ),
            creDiv({ className: "shape-form" })(
                creDiv({ className: "choice" })(
                    creElem("input")({
                        type: "radio",
                        id: `red${this.id}`,
                        name: `color-choice${this.id}`,
                        value: "red",
                        onchange: this.updateArray,
                    })(),
                    creElem("label")({
                        htmlFor: `red${this.id}`,
                        innerHTML:
                            '<svg><rect width="20" height="20" fill="red" stroke="transparent" /></svg>',
                    })()
                ),
                creDiv({ className: "choice" })(
                    creElem("input")({
                        type: "radio",
                        id: `blue${this.id}`,
                        name: `color-choice${this.id}`,
                        value: "blue",
                        onchange: this.updateArray,
                    })(),
                    creElem("label")({
                        htmlFor: `blue${this.id}`,
                        innerHTML:
                            '<svg><rect width="20" height="20" fill="blue" stroke="transparent" /></svg>',
                    })()
                ),
                creDiv({ className: "choice" })(
                    creElem("input")({
                        type: "radio",
                        id: `green${this.id}`,
                        name: `color-choice${this.id}`,
                        value: "green",
                        onchange: this.updateArray,
                    })(),
                    creElem("label")({
                        htmlFor: `green${this.id}`,
                        innerHTML:
                            '<svg><rect width="20" height="20" fill="green" stroke="transparent" /></svg>',
                    })()
                )
            ),
            creDiv({ className: "qty-form" })(
                creButton({ className: "minus-btn", onclick: this.decreaseNB })(
                    creElem("img")({
                        src: "https://img.icons8.com/ios/50/000000/minus.png",
                    })()
                ),
                creElem("span")({ id: `qtySelect${this.id}` })(data.nbItem),
                creButton({ className: "plus-btn", onclick: this.increaseNB })(
                    creElem("img")({
                        src: "https://img.icons8.com/pastel-glyph/64/000000/plus--v1.png",
                    })()
                )
            )
        );
    }
}

class Shape extends Component {
    shape: shape;
    color: color;
    svg: string;

    constructor(id: number, data: shapeData) {
        super();
        this.id = id;
        this.shape = data.shape;
        this.color = data.color;
        if (data.shape == "circle") {
            this.svg = `<svg><circle cx="25" cy="25" r="25" stroke="transparent" stroke-width="1" fill="${this.color}" /></svg>`;
        } else if (data.shape == "square") {
            this.svg = `<svg><rect width="50" height="50" fill="${this.color}" stroke="transparent" stroke-width="2" /></svg>`;
        } else {
            this.svg = `<svg><polygon points="25,0 0,50 50,50" fill="${this.color}" stroke="transparent" stroke=width="2"/></svg>`;
        }

        this.content = creDiv({
            className: "drawn-shape",
            id: this.id,
            innerHTML: this.svg,
        })();
    }
}

let myData: controllerData[] = [];

const drawControllers = async () => {
    const response = await fetch("/api");
    const data = await response.json();
    myData = data[0].data;
    myData.forEach((n, i) => {
        const id = i;
        const controller = new Controller(i, n);
        controller.draw(document.getElementById("contwrapper"));
        const shapeChoice = document.getElementById(
            `${n.shape}${i}`
        ) as HTMLInputElement;
        shapeChoice.checked = true;
        const colorChoice = document.getElementById(
            `${n.color}${i}`
        ) as HTMLInputElement;
        colorChoice.checked = true;
        drawCanvas();
    });
};

const drawCanvas = () => {
    let i = 100;
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
    myData.forEach((cont: controllerData) => {
        for (let j: number = 0; j < cont.nbItem; j++) {
            const shape = new Shape(i, {
                shape: cont.shape,
                color: cont.color,
            });
            shape.draw(canvas);
            i++;
        }
    });
};

drawControllers();

const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", async () => {
    const dataToSave = { data: myData };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
    };
    const response = await fetch("/api", options);
    const json = await response.json();
    console.log(json);
});
