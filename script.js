var arr_of_obj = new Set();
var value_id;
var title_flag = false;
var subtask = new Map;

function addBtn() {
    document.getElementById("mainDiv").style.display = "flex";
    document.getElementById("noItem").style.display = "none";
};

function addList() {
    var card_title = document.getElementById("modal-input-box").value;
    createObj(card_title);
    closeList();
}

function closeList() {
    document.getElementById("mainDiv").style.display = "none";
}

function createObj(title){
    document.getElementById('addPopUpCard').style.display = 'none'
    var card_obj = {
      title: title,
      id: Date.now(),
      subtask
    };
    
    arr_of_obj.add(card_obj);
    createCard(card_obj.id);
};


function addItemList() {
    var markItem = document.querySelector(".this-list-element").cloneNode(true);
    var card_item = document.getElementById('modal-input-box-card').value;
    console.log(value_id);

    markItem.innerText =  card_item; 
    markItem.style.display = "block";
    markItem.setAttribute('id',`${Date.now()}`);
    markItem.setAttribute('style',"margin-left: 10px;");

    var doneButton = document.createElement('button');
    doneButton.setAttribute('id',`checkDone-${Date.now()}`);
    doneButton.setAttribute('class','markDoneClass');
    doneButton.setAttribute('value',`${Date.now()}`);
    doneButton.setAttribute('onclick','completedTask(this.value)');
    doneButton.innerText = ' Mark Done';
    doneButton.setAttribute('style','font-size:15 px;cursor:pointer; height:18px; border-radius:10px;')

    markItem.appendChild(doneButton);
    markItem.setAttribute('onClick',"completedTask(this.value)");

    for(obj of arr_of_obj){
        for(prop in obj){
            if(obj.id == value_id){
                obj.subtask.set(`${card_item}`,`${Date.now()}`);
                break;
            }
        }
    }

    document.getElementById(`${value_id}`).getElementsByClassName('add-list-after-this')[0].appendChild(markItem).appendChild(doneButton);
    closeItemList();
}

function closeItemList(){
    document.getElementById('mainDivContainer').style.display = "none";
}

function addSubtask(val) {
    document.getElementById("mainDivContainer").style.display = "flex";
    value_id = val;
};

function deleteCard(val){
    var delete_div = document.getElementById(`${val}`);
    for(obj of arr_of_obj){
        for(prop in obj){
        if (obj.id == val)
        arr_of_obj.delete(obj);
        break;
        }
    }

    delete_div.parentNode.removeChild(delete_div);

    if(arr_of_obj.size == 0){
        document.getElementById('addPopUpCard') 
    }
    
};

function createCard(){
    var firstCard = document.querySelector('.cardContainer').cloneNode(true);
    display(firstCard);
};

function completedTask(value){
    document.getElementById(`${value}`).style.textDecoration = 'line-through';
    document.getElementById(`${value}`).style.color = '#112D4E';
    document.getElementById(`checkDone-${value}`).remove();
}

function display(card){
    document.getElementById('addPopUpCard').style.display = 'none'

    arr_of_obj.forEach(element => {
        card.id = element.id;
        card.querySelector(".cardHeader").innerHTML = element.title;
        card.querySelector(".cardHeader").setAttribute('value',`${element.id}`);
        card.setAttribute("value",`${element.id}`);
        card.setAttribute("justify-content","center");
        card.setAttribute("display" , "flex")
        card.setAttribute("min-height","300px");
        card.querySelector(".deleteButtonCard").setAttribute("value",`${element.id}`);
        card.querySelector(".deleteButtonCard").setAttribute("onClick","deleteCard(this.value)");
        card.querySelector(".addButtonCard").setAttribute("value",`${element.id}`);
        card.querySelector(".addButtonCard").setAttribute("onClick","addSubtask(this.value)");    
    });
    
    if(title_flag)
    card.style.display = 'none';
    else
    card.style.display = "block";
    document.getElementById("mainContainer").appendChild(card);
}

function navBaarFunc(val){
    var card_header;
    for(let ele of arr_of_obj){
        for(let id in ele){
            if(ele[id] == val){
                card_header = ele.title;
                break;
            };
        };
    };

    document.querySelector("#ToDo").style.display = 'none';
    document.querySelector("#addButtonText").style.display = 'none';

    for(let ele of arr_of_obj){
            if(ele.id == val){
                document.getElementById(`${ele.id}`).style.display = 'block';
            }
            else {
                document.getElementById(`${ele.id}`).style.display = 'none';
            }
    };

    document.getElementById('cardHead').innerText = `${card_header}`;
    document.getElementById('cardHead').style.display = 'flex'
    document.getElementById('backButton').style.display = 'block'
    title_flag = true;
};

function displayAll(){
    title_flag = false;
    document.querySelector("#ToDo").style.display = 'block';
    document.querySelector("#addButtonText").style.display = 'inline-block';
    document.getElementById('backButton').style.display = 'none';  

    for(let ele of arr_of_obj){
        document.getElementById(`${ele.id}`).style.display = 'block';
    };

    document.getElementById('cardHead').innerText = ``;
    document.getElementById('cardHead').style.display = 'none';
}
