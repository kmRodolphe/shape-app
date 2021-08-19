interface property {
    id? : string,
    className? : string,
    src? : string,
    nodeValue? : string,
    type? : string,
    name? : string,
    value? : string,
    htmlFor? : string,
    width?: string,
    height?: string,
    innerHTML?: string,
    onclick?: undefined,
    children: any[]
};

type htmlTag = "root" | "html" | "head" | "body" 
    | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" 
    | "div" | "br" | "hr" | "ul" | "ol" | "li" | "img" 
    | "span" | "b" | "i" | "button" | "TEXT_ELEMENT"
    | "input" | "label" | "svg"

interface element {
    type : htmlTag,
    props : property
};


const creElem  = (type : htmlTag) => (att : object | null) =>  (...children : (element | string | number)[]) : element  => {
    return {
        type,

        props : {
            ...att,
            children : children.map(child => typeof child === "object"
                ? child
                : creTxtElem(child)),
        },
    }
};

const creTxtElem = (text : string | number) : element => {
    return {
        type: "TEXT_ELEMENT",
        props: {
            nodeValue: typeof text === "string"? text : text.toString(),
            children: []
        }
    };
};



const creNode = (tag : htmlTag) => document.createElement(tag);
const creTxtNode = (txt : string) => document.createTextNode(txt);


// cre pré-currifiés
const creDiv = creElem("div");
const creH1 = creElem("h1");
const creH2 = creElem("h2");
const creH3 = creElem("h3");
const creH4 = creElem("h4");
const creH5 = creElem("h5");
const creH6 = creElem("h6");
const creP = creElem("p");
const creButton = creElem("button");
const creBr = creElem("br")(null)();

const getContId = (contClass : string) => (node : HTMLElement) : string | number | void => {
    const parentElem = node.parentElement;
    if (parentElem == null) {
        console.log("Could not find container")
        return
    } else {
        if (parentElem.className == contClass) {
            return parentElem.id
        } else {
            return getContId(contClass)(parentElem)
        }
    };
};

// add attributes or children
const updAtt = (att : object) => (elem : element) : element => {
    return {
        ...elem,
        props: {
            ...elem.props,
            ...att
        }
    }   
} 

const addClass = ( cl : string) => (elem : element) : element => {
    return {
        ...elem,
        props: {
            ...elem.props,
            className : elem.props.className + " " + cl 
        }
    }
}

const addChild = ( child : element | string | number) => (elem : element) : element => {
    typeof child == "string" || typeof child == "number"
        ? elem.props.children.push(creTxtElem(child))
        : elem.props.children.push(child)
    return elem
}

const addChildren = ( child : (element | string | number)[]) => (elem : element) : element => {
    child.map((ch : string | number | element)  => {
        typeof ch == "string" || typeof ch == "number"
            ? elem.props.children.push(creTxtElem(ch))
            : elem.props.children.push(ch);
    })
    return elem
}




const render = (elem : element) => (container : HTMLElement) => {
    
    if (elem.type !== "TEXT_ELEMENT") {
        const dom = creNode(elem.type);
        
        const isProperty = (key : string) => key !== "children"; 
        Object.keys(elem.props)
            .filter(isProperty)
            .forEach(att => {
                dom[att] = elem.props[att];
            });  
            
        const children = elem.props.children.forEach(child =>
            render(child)(dom)
            );   
                
        container.appendChild(dom);
    } else {
        const dom = creTxtNode(elem.props["nodeValue"]);
        container.appendChild(dom);
    }
}

class Component {
    id: string | number;
    content : element;

    constructor() {
        this.id = "";
        this.content = creDiv(null)();
    }

    draw(context : HTMLElement) {
        render(this.content)(context);
    }
}

