/// <reference path="coconut.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var Controller = /** @class */ (function (_super) {
    __extends(Controller, _super);
    function Controller(id, data) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.shape = data.shape;
        _this.color = data.color;
        _this.nbItem = data.nbItem;
        _this.decreaseNB = function () {
            var qtyBox = document.getElementById("qtySelect" + _this.id);
            var currValue = Number(qtyBox.innerHTML);
            var setValue = Math.max(0, currValue - 1);
            qtyBox.innerHTML = setValue.toString();
            _this.updateArray();
        };
        _this.increaseNB = function () {
            var qtyBox = document.getElementById("qtySelect" + _this.id);
            var currValue = Number(qtyBox.innerHTML);
            var setValue = Math.min(10, currValue + 1);
            qtyBox.innerHTML = setValue.toString();
            _this.updateArray();
        };
        _this.updateArray = function () {
            var shapeChoices = Array.from(document.getElementsByName("shape-choice" + _this.id));
            var selectedShape = shapeChoices.find(function (choice) { return choice.checked; }).value;
            var colorChoices = Array.from(document.getElementsByName("color-choice" + _this.id));
            var selectedColor = colorChoices.find(function (choice) { return choice.checked; }).value;
            var nbItem = Number(document.getElementById("qtySelect" + _this.id).innerHTML);
            myData[_this.id] = {
                shape: selectedShape,
                color: selectedColor,
                nbItem: nbItem
            };
            drawCanvas();
        };
        _this.content = creDiv({ className: "controller", id: _this.id })(creDiv({ className: "shape-form" })(creDiv({ className: "choice" })(creElem("input")({
            type: "radio",
            id: "square" + _this.id,
            name: "shape-choice" + _this.id,
            value: "square",
            onchange: _this.updateArray
        })(), creElem("label")({
            htmlFor: "square" + _this.id,
            innerHTML: '<svg><rect width="20" height="20" fill="black" stroke="transparent" stroke-width="2" /></svg>'
        })()), creDiv({ className: "choice" })(creElem("input")({
            type: "radio",
            id: "circle" + _this.id,
            name: "shape-choice" + _this.id,
            value: "circle",
            onchange: _this.updateArray
        })(), creElem("label")({
            htmlFor: "circle" + _this.id,
            innerHTML: '<svg><circle cx="10" cy="10" r="10" stroke="transparent" stroke-width="1" fill="black" /></svg>'
        })()), creDiv({ className: "choice" })(creElem("input")({
            type: "radio",
            id: "triangle" + _this.id,
            name: "shape-choice" + _this.id,
            value: "triangle",
            onchange: _this.updateArray
        })(), creElem("label")({
            htmlFor: "triangle" + _this.id,
            innerHTML: '<svg><polygon points="10,0 0,20 20,20" fill="black" stroke="transparent" stroke=width="2"/></svg>'
        })())), creDiv({ className: "shape-form" })(creDiv({ className: "choice" })(creElem("input")({
            type: "radio",
            id: "red" + _this.id,
            name: "color-choice" + _this.id,
            value: "red",
            onchange: _this.updateArray
        })(), creElem("label")({
            htmlFor: "red" + _this.id,
            innerHTML: '<svg><rect width="20" height="20" fill="red" stroke="transparent" /></svg>'
        })()), creDiv({ className: "choice" })(creElem("input")({
            type: "radio",
            id: "blue" + _this.id,
            name: "color-choice" + _this.id,
            value: "blue",
            onchange: _this.updateArray
        })(), creElem("label")({
            htmlFor: "blue" + _this.id,
            innerHTML: '<svg><rect width="20" height="20" fill="blue" stroke="transparent" /></svg>'
        })()), creDiv({ className: "choice" })(creElem("input")({
            type: "radio",
            id: "green" + _this.id,
            name: "color-choice" + _this.id,
            value: "green",
            onchange: _this.updateArray
        })(), creElem("label")({
            htmlFor: "green" + _this.id,
            innerHTML: '<svg><rect width="20" height="20" fill="green" stroke="transparent" /></svg>'
        })())), creDiv({ className: "qty-form" })(creButton({ className: "minus-btn", onclick: _this.decreaseNB })(creElem("img")({
            src: "https://img.icons8.com/ios/50/000000/minus.png"
        })()), creElem("span")({ id: "qtySelect" + _this.id })(data.nbItem), creButton({ className: "plus-btn", onclick: _this.increaseNB })(creElem("img")({
            src: "https://img.icons8.com/pastel-glyph/64/000000/plus--v1.png"
        })())));
        return _this;
    }
    return Controller;
}(Component));
var Shape = /** @class */ (function (_super) {
    __extends(Shape, _super);
    function Shape(id, data) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.shape = data.shape;
        _this.color = data.color;
        if (data.shape == "circle") {
            _this.svg = "<svg><circle cx=\"25\" cy=\"25\" r=\"25\" stroke=\"transparent\" stroke-width=\"1\" fill=\"" + _this.color + "\" /></svg>";
        }
        else if (data.shape == "square") {
            _this.svg = "<svg><rect width=\"50\" height=\"50\" fill=\"" + _this.color + "\" stroke=\"transparent\" stroke-width=\"2\" /></svg>";
        }
        else {
            _this.svg = "<svg><polygon points=\"25,0 0,50 50,50\" fill=\"" + _this.color + "\" stroke=\"transparent\" stroke=width=\"2\"/></svg>";
        }
        _this.content = creDiv({
            className: "drawn-shape",
            id: _this.id,
            innerHTML: _this.svg
        })();
        return _this;
    }
    return Shape;
}(Component));
var myData = [];
var drawControllers = function () { return __awaiter(_this, void 0, void 0, function () {
    var response, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch("/api")];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                myData = data[0].data;
                myData.forEach(function (n, i) {
                    var id = i;
                    var controller = new Controller(i, n);
                    controller.draw(document.getElementById("contwrapper"));
                    var shapeChoice = document.getElementById("" + n.shape + i);
                    shapeChoice.checked = true;
                    var colorChoice = document.getElementById("" + n.color + i);
                    colorChoice.checked = true;
                    drawCanvas();
                });
                return [2 /*return*/];
        }
    });
}); };
var drawCanvas = function () {
    var i = 100;
    var canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
    myData.forEach(function (cont) {
        for (var j = 0; j < cont.nbItem; j++) {
            var shape = new Shape(i, {
                shape: cont.shape,
                color: cont.color
            });
            shape.draw(canvas);
            i++;
        }
    });
};
drawControllers();
var saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
    var dataToSave, options, response, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dataToSave = { data: myData };
                options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dataToSave)
                };
                return [4 /*yield*/, fetch("/api", options)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                json = _a.sent();
                console.log(json);
                return [2 /*return*/];
        }
    });
}); });
