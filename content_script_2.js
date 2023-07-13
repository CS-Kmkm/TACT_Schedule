const day_of_week = ["月", "火", "水", "木", "金"];
const color = ["#c6c6ff", "#ff9999", "#adffff", "#99ffcc", "#ffc993"];

const background = document.querySelectorAll(".Mrphs-sitesNav__menuitem");
const container = document.querySelectorAll(".link-container");
const target = document.getElementById("topnav");

let projects = 0;
let class_list = [];

/*
function hankaku_conversion(str){
    return Number(str.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    }));
}

function zenkaku_conversion(str){
    return Number(str.replace(/[0-9]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) + 65248);
    }));
}
*/

function class_setting(back, container, i){
    const title = container.title()
    const class_day = day_of_week.indexOf(title.substr(-4, 1));
    const class_period = hankaku_conversion(title.substr(i, 1));
    let class_order = class_day + (class_period - 1)*5 + 5;
    back.style.order = class_order;
    back.style.backgroundColor = color[class_day];
    class_list.push(class_list);
}

function clone_class(back, container, i, target){
    class_setting(back, container, i);
    let clone = back.cloneNode(true);
    target.appendChild(clone);
}

function generate_empty_class(title){
    let empty_class = document.createElement("li");
    empty_class.className = "Mrphs-sitesNav__menuitem";
    if (title == "") {
        return;
    }
    let empty_class_favbtn = '<a class="Mrphs-sitesNav__favbtn fav" href="#" role="switch" aria-checked="true" ></a>';
    empty_class.insertAdjacentHTML("afterbegin", empty_class_favbtn);
    let empty_class_link_container = 
                        '<a class="link-container" href="https://tact.ac.thers.ac.jp:443/portal/site/%7Efda32263-2051-4759-9f78-0101941033eb" title="' + class_title + '">\
                            <span class="Mrphs-sitesNav__menuitem--myworkspace-label">' + title + '</span>\
                        </a>';
    empty_class.insertAdjacentHTML("beforeend", empty_class_link_container);
    let dropdown = '<a class="Mrphs-sitesNav__dropdown" href="#" data-site-id="~fda32263-2051-4759-9f78-0101941033eb" aria-haspopup="true" aria-label="open attached menu"></a>';
    empty_class.insertAdjacentHTML("beforeend", empty_class_dropdown);
}

// 仮
function zenkaku_conversion(str){
    return Number(str.replace(/[０-９]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 65248);
    }));
  }
  
  function day_of_week_conversion(str){
    return day_of_week.indexOf(str);
  }

  //年度, 学期の判定準備
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
month += 1;//getMonthは0スタートだから補正する。
let term = "";
if (month > 0 && month <= 3){
    year -= 1;//年度表示に合わせる
}
if (month >= 4 && month < 10){
    term = "春";
}else{
    term = "秋";
}

let str_reg = year.toString() + "年度" + term + "[１\/]";
chrome.storage.sync.get('selectedTerm', function(data) {
    let selectedTerm = data.selectedTerm || '1';
    if (selectedTerm == 2) {
        str_reg = year.toString() + "年度" + term + "[２\/]";
    }
    for(let i = 0; i < container.length; i++){
        let back = background[i+2];
        let con = container[i];
        let title = con.title;
        let per_num = -3;

        let reg = new RegExp(str_reg);
        if (reg.test(title) == true){
            class_setting(back, con, per_num);
            per_num -= 4;
            while (day_of_week_conversion(title.substr(-4, 1)) == day_of_week_conversion(title.substr((per_num - 1), 1))){
                clone_class(back, con, per_num, target);
            }
            class_setting(back, con, -3);
            continue;
        }else{
        if (title.substr(-2, 1) == "限"){
            back.style.display = "none";
        }else{
            back.style.order = 0;
            projects += 1;
            //back.style.backgroundColor = "#5f9ea0";
        }
        }
    }

  for (let i=0; i < (5 - projects + 1); i++){
    let empty_class = document.createElement("li");
    empty_class.className = "Mrphs-sitesNav__menuitem";
    target.appendChild(empty_class);

    let class_title = "  ";
    
    let empty_class_link_container = 
                        '<a class="link-container" href="https://tact.ac.thers.ac.jp:443/portal/site/%7Efda32263-2051-4759-9f78-0101941033eb" title="' + class_title + '">\
                            <span class="Mrphs-sitesNav__menuitem--myworkspace-label">' + class_title + '</span>\
                        </a>'
    empty_class.insertAdjacentHTML("beforeend", empty_class_link_container);
    
    empty_class.style.order = 4;
  }

  for(let i=0; i<25; i++){
    if (!(class_list.includes(i))){
      let empty_class = document.createElement("li");
      empty_class.className = "Mrphs-sitesNav__menuitem";
      target.appendChild(empty_class);
  
      //fav_btn
      let empty_class_favbtn = '<a class="Mrphs-sitesNav__favbtn fav" href="#" role="switch" aria-checked="true" ></a>'
      empty_class.insertAdjacentHTML("afterbegin", empty_class_favbtn);
  
  
      let class_title = "空きコマ(" +year.toString() + "年度" + term + "期/" + day_of_week[i%5] + (Math.floor(i/5) +1).toString() +"限)";
      
      let empty_class_link_container = 
                          '<a class="link-container" href="https://tact.ac.thers.ac.jp:443/portal/site/%7Efda32263-2051-4759-9f78-0101941033eb" title="' + class_title + '">\
                              <span class="Mrphs-sitesNav__menuitem--myworkspace-label">' + class_title + '</span>\
                          </a>'
      empty_class.insertAdjacentHTML("beforeend", empty_class_link_container);
  
      let empty_class_dropdown = '<a class="Mrphs-sitesNav__dropdown" href="#" data-site-id="~fda32263-2051-4759-9f78-0101941033eb" aria-haspopup="true" aria-label="open attached menu"></a>'
      empty_class.insertAdjacentHTML("beforeend", empty_class_dropdown);
      
      empty_class.style.order = i + 5;
      //empty_class.style.backgroundColor = color[i%5];
    }
  }
  
  let selected = document.querySelectorAll(".is-selected");
  for (let i=0;  i < selected.length; i++){
    selected[i].style.backgroundColor = "#006E4F";
  }
});

