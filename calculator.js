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
window.onload = () => {
    //values
    var num1;
    var num2;
    var operation;
    var display=false;
    var equality=false;
    //defining items
    let buttons=[];
    let rows=[];
    const input=element("input",null,true);
    const inputDiv=element("div");
    attrib(inputDiv,"class","col border");
    attrib(input,"class","screen");
    const clearAll=button("AC","col-3 d-flex align-items-center","clear");
    attrib(clearAll,"id","clearAll");
    const clear=button("C","col-3 d-flex align-items-center","clear");
    attrib(clear,"id","clear");
    let maindev=element("div");
    attrib(maindev,"class","box")
    for(let i =0; i<=9; i++){
        let btn=button(`${i}`,"col-2","calcbtn numbers");
        buttons.push(btn);
    }
    for(let i =1; i<=5; i++){
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
    //appending items
    inputDiv.append(input);
    rows[0].append(inputDiv);
    rows[1].append(buttons[1]);
    rows[1].append(buttons[2]);
    rows[1].append(buttons[3]);
    rows[1].append(clearAll);
    rows[1].append(clear);
    rows[2].append(buttons[4]);
    rows[2].append(buttons[5]);
    rows[2].append(buttons[6]);
    rows[2].append(add);
    rows[2].append(times);
    rows[3].append(buttons[7]);
    rows[3].append(buttons[8]);
    rows[3].append(buttons[9]);
    rows[3].append(minus);
    rows[3].append(divideBy);
    rows[4].append(point);
    rows[4].append(buttons[0]);
    rows[4].append(sign);
    rows[4].append(equal);
    for (row of rows){
        maindev.append(row);
    }
    document.body.append(maindev);
    //listeners
    let numbers=document.getElementsByClassName("numbers");
    let arr=[];
    for(let number of numbers){
        arr.push(number.innerHTML);
    }
    for (let number of numbers){
        number.addEventListener("click",()=>{
            if (display){
                input.setAttribute("value",'');
                display=false;
            }
            if (equality && operation==undefined){
                num1=undefined;
                equality=false;
            }
            interact(input,number.innerHTML);
        });
    }
    document.addEventListener("keydown",()=>{
        let key=event.key;
        let valueOnscreen=input.getAttribute("value");
        if(arr.indexOf(key)>=0){
            if (display){
                input.setAttribute("value",'');
                display=false;
            }
            if (equality && operation==undefined){
                num1=undefined;
                equality=false;
            }
            interact(input,key);
        }
        switch (key){
            case "Backspace":
                    valueOnscreen=valueOnscreen.slice(0,-1);
                    input.setAttribute("value",valueOnscreen);
                break;
            case ".":
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
                break;
            case "+":
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
                            operation="add";
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
                            operation="add"
                            input.setAttribute("value",num1);
                        }
                        break;      
                }
                break;
            case "-":
                switch(valueOnscreen){
                    case null:
                    case "":
                            input.setAttribute("value",'-');
                        break;
                    case "-":
                            input.setAttribute("value",'');
                        break;
                    default:
                        if(operation===undefined){
                            if(valueOnscreen.indexOf('.')){
                                num1=parseFloat(valueOnscreen);
                            }
                            else{
                                num1=parseint(valueOnscreen);
                            }
                            operation="subtract";
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
                            operation="subtract"
                            input.setAttribute("value",num1);
                        }   
                        break;
            
                }
                break;
            case "*":
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
                            operation="multiply";
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
                            operation="multiply"
                            input.setAttribute("value",num1);
                        }
                        break;      
                }
                break;
            case "/":
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
                            operation="divide";
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
                            operation="divide"
                            input.setAttribute("value",num1);
                        }
                        break;      
                }
                break;
            case "Enter":
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
                break;

        }
    });
    clearAll.addEventListener('click',()=>{
        operation=undefined;
        input.setAttribute("value","");
    });
    clear.addEventListener("click",()=>{
        let valueOnscreen=input.getAttribute("value");
        valueOnscreen=valueOnscreen.slice(0,-1);
        input.setAttribute("value",valueOnscreen);
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
                if(operation===undefined){
                    if(valueOnscreen.indexOf('.')){
                        num1=parseFloat(valueOnscreen);
                    }
                    else{
                        num1=parseint(valueOnscreen);
                    }
                    operation="add";
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
                    operation="add"
                    input.setAttribute("value",num1);
                }
                break;      
        }
    })
    minus.addEventListener(
        'click',()=>{
            let valueOnscreen=input.getAttribute("value");
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
                        operation="subtract";
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
                        operation="subtract"
                        input.setAttribute("value",num1);
                    }
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
                    if(operation===undefined){
                        if(valueOnscreen.indexOf('.')){
                            num1=parseFloat(valueOnscreen);
                        }
                        else{
                            num1=parseint(valueOnscreen);
                        }
                        operation="multiply";
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
                        operation="multiply"
                        input.setAttribute("value",num1);
                    }
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
                    if(operation===undefined){
                        if(valueOnscreen.indexOf('.')){
                            num1=parseFloat(valueOnscreen);
                        }
                        else{
                            num1=parseint(valueOnscreen);
                        }
                        operation="divide";
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
                        operation="divide"
                        input.setAttribute("value",num1);
                    }
                    break;      
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