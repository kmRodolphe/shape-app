var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
;
;
var creElem = function (type) { return function (att) { return function () {
    var children = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        children[_i] = arguments[_i];
    }
    return {
        type: type,
        props: __assign(__assign({}, att), { children: children.map(function (child) { return typeof child === "object"
                ? child
                : creTxtElem(child); }) })
    };
}; }; };
var creTxtElem = function (text) {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: typeof text === "string" ? text : text.toString(),
            children: []
        }
    };
};
var creNode = function (tag) { return document.createElement(tag); };
var creTxtNode = function (txt) { return document.createTextNode(txt); };
// cre pré-currifiés
var creDiv = creElem("div");
var creH1 = creElem("h1");
var creH2 = creElem("h2");
var creH3 = creElem("h3");
var creH4 = creElem("h4");
var creH5 = creElem("h5");
var creH6 = creElem("h6");
var creP = creElem("p");
var creButton = creElem("button");
var creBr = creElem("br")(null)();
var getContId = function (contClass) { return function (node) {
    var parentElem = node.parentElement;
    if (parentElem == null) {
        console.log("Could not find container");
        return;
    }
    else {
        if (parentElem.className == contClass) {
            return parentElem.id;
        }
        else {
            return getContId(contClass)(parentElem);
        }
    }
    ;
}; };
// add attributes or children
var updAtt = function (att) { return function (elem) {
    return __assign(__assign({}, elem), { props: __assign(__assign({}, elem.props), att) });
}; };
var addClass = function (cl) { return function (elem) {
    return __assign(__assign({}, elem), { props: __assign(__assign({}, elem.props), { className: elem.props.className + " " + cl }) });
}; };
var addChild = function (child) { return function (elem) {
    typeof child == "string" || typeof child == "number"
        ? elem.props.children.push(creTxtElem(child))
        : elem.props.children.push(child);
    return elem;
}; };
var addChildren = function (child) { return function (elem) {
    child.map(function (ch) {
        typeof ch == "string" || typeof ch == "number"
            ? elem.props.children.push(creTxtElem(ch))
            : elem.props.children.push(ch);
    });
    return elem;
}; };
var render = function (elem) { return function (container) {
    if (elem.type !== "TEXT_ELEMENT") {
        var dom_1 = creNode(elem.type);
        var isProperty = function (key) { return key !== "children"; };
        Object.keys(elem.props)
            .filter(isProperty)
            .forEach(function (att) {
            dom_1[att] = elem.props[att];
        });
        var children = elem.props.children.forEach(function (child) {
            return render(child)(dom_1);
        });
        container.appendChild(dom_1);
    }
    else {
        var dom = creTxtNode(elem.props["nodeValue"]);
        container.appendChild(dom);
    }
}; };
var Component = /** @class */ (function () {
    function Component() {
        this.id = "";
        this.content = creDiv(null)();
    }
    Component.prototype.draw = function (context) {
        render(this.content)(context);
    };
    return Component;
}());
