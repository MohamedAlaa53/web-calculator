function sum(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    if (b===0) return "undefined";
    return a/b;
}
function element(type,text=null,readonly=false){
    let elm=document.createElement(type);
    if (text){
        elm.innerHTML=text;
    }
    if (readonly){
        elm.readOnly=true;
    }
    return elm;
}
function attrib(elm,attribute,value){
    return elm.setAttribute(attribute,value);
}
function interact(elm,value){
    let screen=elm;
    let gottenValue=elm.getAttribute("value");
    if (gottenValue===null){
        gottenValue=""
    }
    screen.setAttribute("value",gottenValue+value);
    return screen;
}
function button(value,colclass="col-2",btnclass){
    let column= element("div");
    let btn= element("button",value);
    attrib(btn,"class",btnclass);
    column.append(btn);
    attrib(column,"class",colclass);
    return column;
}
function op(a,b,operation){
    let result;
    switch(operation){
        case "add":
            result=sum(a,b);
        break;
        case "subtract":
            result=subtract(a,b);
        break;
        case "multiply":
            result=multiply(a,b);
        break;
        case "divide":
            result=divide(a,b);
        break;
    }
    return result;
}
function switchOp(operationSign){
    let operation;
    switch(operationSign){
        case "+":
            operation="add";
        break;
        case "-":
            operation="subtract";
        break;
        case "*":
            operation="multiply";
        break;
        case "/":
            operation="divide";
        break;
    }
    return operation;
}
function arith(operationSign,input,operation,num1,num2){
    let valueOnscreen=input.getAttribute("value");
    let display;
            switch(valueOnscreen){
                case null: 
                case "":
                break;
                default:
                    if(operation===undefined){
                        if(valueOnscreen.indexOf('.')){
                            num1=parseFloat(valueOnscreen);
                        }
                        else{
                            num1=parseint(valueOnscreen);
                        }
                        operation=switchOp(operationSign);
                        input.setAttribute("value","");
                    }
                    else{
                        display=true;
                        if(valueOnscreen.indexOf('.')){
                            num2=parseFloat(valueOnscreen);
                        }
                        else{
                            num2=parseint(valueOnscreen);
                        }
                        num1=op(num1,num2,operation);
                        num2=undefined;
                        operation=switchOp(operationSign);
                        input.setAttribute("value",num1);
                    }
                break;
            }
        return {
            operation:operation,
            num1:num1,
            display:display
        }
     }
window.onload = () => {
    //letiables
    let num1;
    let num2;
    let operation;
    let display=false;
    let equality=false;
    let characters=23;//screen characters
    // body background
    let lightBackground="hsla(175, 82%, 90%,0.6)";
    let darkBackground="hsla(224, 38%, 60%,1)";

    //restroring previous mode
    if(localStorage.getItem("mode")=="dark"){
        btnMode="Light mode";
    }
    else{
        btnMode="Dark mode";
    }

    //setting default body background
    let body=document.getElementsByTagName("body")[0];
    let bg= btnMode=="Dark mode"? lightBackground :darkBackground;
    body.setAttribute("style",`background-color: ${bg};`);

    //defining items
    let buttons=[];
    let rows=[];
    const input=element("input",null,true);
    const inputDiv=element("div");
    attrib(inputDiv,"class","col border");
    attrib(input,"class","screen");
    attrib(input,"type","text")
    const clearAll=button("AC","col-3 d-flex align-items-center","clear");
    attrib(clearAll,"id","clearAll");
    const clear=button("C","col-3 d-flex align-items-center","clear");
    attrib(clear,"id","clear");
    let maindev=element("div");
    attrib(maindev,"class","lightmode_box")
    for(let i =0; i<=9; i++){
        let btn=button(`${i}`,"col-2","calcbtn numbers");
        buttons.push(btn);
    }
    for(let i =1; i<=6; i++){
        let row= element("div");
        attrib(row,"class","row");
        rows.push(row);
    }
    const add=button("+","col-3","calcbtn");
    const minus=button("-","col-3","calcbtn")
    const times=button("x","col-3","calcbtn");
    const divideBy=button("÷","col-3","calcbtn");
    const point=button('.',"col-2","calcbtn");
    const sign=button('+<br>-<br>',"col-2","calcbtn");
    const equal=button("=","col-6","equalbtn");
    const mode=button(btnMode,"col-12","modebtn");

    //appending items
    inputDiv.append(input);
    rows[0].append(inputDiv);
    rows[1].append(mode);
    rows[2].append(buttons[1]);
    rows[2].append(buttons[2]);
    rows[2].append(buttons[3]);
    rows[2].append(clearAll);
    rows[2].append(clear);
    rows[3].append(buttons[4]);
    rows[3].append(buttons[5]);
    rows[3].append(buttons[6]);
    rows[3].append(add);
    rows[3].append(times);
    rows[4].append(buttons[7]);
    rows[4].append(buttons[8]);
    rows[4].append(buttons[9]);
    rows[4].append(minus);
    rows[4].append(divideBy);
    rows[5].append(point);
    rows[5].append(buttons[0]);
    rows[5].append(sign);
    rows[5].append(equal);
    for (row of rows){
        maindev.append(row);
    }
    document.body.append(maindev);

    //setting previous mode
    let btns=document.getElementsByTagName("button");
    if (btnMode=="Light mode"){
        maindev.setAttribute("class","darkmode_box");
        for(btn of btns){
            btn.classList.add("darkbtn");
        }
    }

    //listeners
    let numbers=document.getElementsByClassName("numbers");
    let arr={};
    for(let number of numbers){
        arr[number.innerHTML]=number;
    }
    for (let number of Object.values(numbers)){
        number.addEventListener("click",()=>{
            let valueOnscreen=input.getAttribute("value");
            try{
                if(valueOnscreen.length<=characters){
                    if (display){
                        input.setAttribute("value",'');
                        display=false;
                    }
                    if (equality && operation==undefined){
                        num1=undefined;
                        equality=false;
                    }
                    if (valueOnscreen==="Infinity" || valueOnscreen==="undefined" || valueOnscreen==="NaN"){
                        num1=undefined;
                    }
                    interact(input,number.innerHTML);
                }
            }  
            catch{
                if (display){
                    input.setAttribute("value",'');
                    display=false;
                }
                if (equality && operation==undefined){
                    num1=undefined;
                    equality=false;
                }
                if (valueOnscreen==="Infinity" || valueOnscreen==="undefined" || valueOnscreen==="NaN"){
                    num1=undefined;
                }
                interact(input,number.innerHTML);
            }
                
        });
    }
    document.addEventListener("keydown",()=>{
        let key=event.key;
        let valueOnscreen=input.getAttribute("value");
        if(Object.keys(arr).indexOf(key)>=0){
            try{
                if(valueOnscreen.length<=characters){
                    if (display){
                        input.setAttribute("value",'');
                        display=false;
                    }
                    if (equality && operation==undefined){
                        num1=undefined;
                        equality=false;
                    }
                    if (valueOnscreen==="Infinity" || valueOnscreen==="undefined" || valueOnscreen==="NaN"){
                        num1=undefined;
                    }
                    arr[key].click()
                }
            }  
            catch{
                if (display){
                    input.setAttribute("value",'');
                    display=false;
                }
                if (equality && operation==undefined){
                    num1=undefined;
                    equality=false;
                }
                if (valueOnscreen==="Infinity" || valueOnscreen==="undefined" || valueOnscreen==="NaN"){
                    num1=undefined;
                }
                arr[key].click()
            }
        }
        switch (key){
            case "Backspace":
                    clear.click();
                break;
            case ".":
                point.click();
                break;
            case "+":
                add.click();
                break;
            case "-":
                minus.click();
                break;
            case "*":
                times.click()
                break;
            case "/":
                divideBy.click()
                break;
            case "Enter":
                equal.click()
                break;

        }
    });
    clearAll.addEventListener('click',()=>{
        operation=undefined;
        input.setAttribute("value","");
    });
    clear.addEventListener("click",()=>{
        let valueOnscreen=input.getAttribute("value");
        if (valueOnscreen==="undefined" ||valueOnscreen==="Infinity" ||valueOnscreen==="NaN"){
            input.setAttribute("value","");
        }
        else{
            valueOnscreen=valueOnscreen.slice(0,-1);
            input.setAttribute("value",valueOnscreen);
        }
    })
    point.addEventListener('click',()=>{
        let valueOnscreen=input.getAttribute("value");
        switch(valueOnscreen){
            case null: 
            case "":
                break;
            default:
                    if (valueOnscreen.indexOf('.')===-1){
                        interact(input,'.');
                    }
                    break;
        }
    })
    sign.addEventListener('click',()=>{
        let valueOnscreen=input.getAttribute("value");
        switch(valueOnscreen){
            case null: 
            case "":
                break;
            default:
                valueOnscreen*=-1;
                input.setAttribute("value",valueOnscreen);
                break;      
        }
    })
    add.addEventListener('click',()=>{
        let valueOnscreen=input.getAttribute("value");
        switch(valueOnscreen){
            case null: 
            case "":
                break;
            default:
                let calc=arith("+",input,operation,num1,num2);
                operation=calc.operation;
                num1=calc.num1;
                display=calc.display;
                break;      
        }
    })
    minus.addEventListener(
        'click',()=>{
            let valueOnscreen=input.getAttribute("value");
            switch(valueOnscreen){
                case null:
                case "":
                        input.setAttribute("value",'-');
                    break;
                case "-":
                        input.setAttribute("value",'');
                    break;
                default:
                    let calc=arith("-",input,operation,num1,num2);
                    operation=calc.operation;
                    num1=calc.num1;
                    display=calc.display;
                    break;      
            }   
        }
    )
    times.addEventListener(
        'click',()=>{
            let valueOnscreen=input.getAttribute("value");
            switch(valueOnscreen){
                case null: 
                case "":
                    break;
                default:
                    let calc=arith("*",input,operation,num1,num2);
                    operation=calc.operation;
                    num1=calc.num1;
                    display=calc.display;
                    break;      
            }   
        }
    )
    divideBy.addEventListener(
        'click',()=>{
            let valueOnscreen=input.getAttribute("value");
            switch(valueOnscreen){
                case null: 
                case "":
                    break;
                default:
                    let calc=arith("/",input,operation,num1,num2);
                    operation=calc.operation;
                    num1=calc.num1;
                    display=calc.display;
            }   
        }
    )
    equal.addEventListener(
        'click',()=>{
            let valueOnscreen=input.getAttribute("value");
            switch(valueOnscreen){
                case null: 
                case "":
                    break;
                default:
                    if (num1==undefined){
                        display=true;
                        if(valueOnscreen.indexOf('.')){
                            num1=parseFloat(valueOnscreen);
                        }
                        else{
                            num1=parseint(valueOnscreen);
                        }
                    }
                    else if(num1 && display){
                        input.setAttribute("value",num1);
                    }
                    else if(num1===0 && display){
                        input.setAttribute("value",num1);
                    }
                    else{
                        display=true;
                        if(valueOnscreen.indexOf('.')){
                            num2=parseFloat(valueOnscreen);
                        }
                        else{
                            num2=parseint(valueOnscreen);
                        }
                        num1=op(num1,num2,operation);
                        num2=undefined;
                    }
                    equality=true
                    input.setAttribute("value",num1);
                    operation=undefined;
                    break;
            }
        }
    )
    mode.addEventListener("click",()=>{
        let modeBtn=document.getElementsByClassName("modebtn")[0];
        let body=document.getElementsByTagName("body")[0];
        let btns=document.getElementsByTagName("button");
        switch(modeBtn.innerHTML){
            case "Dark mode":
                body.setAttribute("style",`background-color: ${darkBackground};`)
                modeBtn.innerHTML="Light mode";
                maindev.setAttribute("class","darkmode_box");
                for(btn of btns){
                    btn.classList.add("darkbtn");
                }
                localStorage.setItem("mode","dark");
                break;
            case "Light mode":
                body.setAttribute("style",`background-color: ${lightBackground};`)
                modeBtn.innerHTML="Dark mode";
                maindev.setAttribute("class","lightmode_box");
                for(btn of btns){
                    btn.classList.remove("darkbtn")
                }
                localStorage.setItem("mode","light")
                break;
                
        }
    })
    };



module.exports={
    sum
    ,subtract
    ,multiply
    ,divide
    ,element
    ,attrib
    ,interact
};