/**
 * @jest-environment jsdom
 */
const {
    sum,
    subtract,
    multiply,
    divide,
    element,
    attrib,
    interact}=require("./calculator.js");
test(
    "sum existence",()=>{
        expect(sum()).toBeDefined();
    }
);
let a=5;
let b=6;
test(
    "adding two numbers",()=>{
        expect(sum(a,b)).toBe(a+b);
    }
);
test(
    "subtract existence",()=>{
        expect(subtract()).toBeDefined();
    }
);
test(
    "subtracting two numbers",()=>{
        expect(subtract(a,b)).toBe(a-b);
    }
);
test(
    "multiplication existence",()=>{
        expect(multiply()).toBeDefined();
    }
);
test(
    "multiplying two numbers",()=>{
        expect(multiply(a,b)).toBe(a*b);
    }
);
test(
    "Division existence",()=>{
        expect(divide()).toBeDefined();
    }
);
test(
    "dividing two numbers",()=>{
        expect(divide(a,b)).toBe(a/b);
    }
);
let c=0;
test(
    "dividing by Zero",()=>{
        expect(divide(a,c)).toBe("undefined");
    }
);
test(
    "element existence",()=>{
        expect(element()).toBeDefined();
    }
);
test(
    "element validation",()=>{
        let testing={
            self:()=>{
                let type="img";
                expect(element(type).outerHTML).toBe(`<${type}>`);
            },
            normal:()=>{
                let type="div";
                expect(element(type,"hello").outerHTML).toBe(`<${type}>hello</${type}>`);
            }
        }
        testing.self();
        testing.normal();
    }
);
test(
    "element attribute adder",()=>{
        const elm=element("div","hello");
        const attribute="class";
        const value="box";
        const expectation="<div class=\"box\">hello</div>"
        attrib(elm,attribute,value);
        expect(elm.outerHTML).toBe(expectation);
    }
);
test(
    "screen getting values correctly",
    ()=>{
        let screen=element("input");
        attrib(screen,"class","screen");
        screen=interact(screen,"5");
        expect(interact(screen,"5").outerHTML).toBe("<input class=\"screen\" value=\"55\">");
    }
)
