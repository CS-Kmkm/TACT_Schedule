const day_of_week = ["月", "火", "水", "木", "金"];
const color = ["#c6c6ff", "#ff9999", "#adffff", "#99ffcc", "#ffc993"];

const background = document.querySelectorAll(".Mrphs-sitesNav__menuitem");
const container = document.querySelectorAll(".link-container");
const target = document.getElementById("topnav");
let titles = Array.from(container).map(con => con.title);

const date = new Date();
let year = date.getFullYear();
const month = date.getMonth();
let term, season, quarter;

let projects = 0;
let class_list = [];


//特殊な講義に対する処理
const exception_classes = {"画像処理（2023年度秋2期／火3，4限）":"画像処理(2023年度秋２期/火３限,火４限)"}
titles = titles.map(title => exception_classes[title] || title); 

function hankaku_conversion(str){
    return Number(str.replace(/[０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    }));
}

function class_setting(back, title, period){
    let class_day = day_of_week.indexOf(title.substr(period, 1));
    let class_period = hankaku_conversion(title.substr((period + 1), 1));
    let class_order = class_day + (class_period - 1)*5;
    back.style.order = class_order + 5;
    back.style.backgroundColor = color[class_day];
    class_list.push(class_order);
}

function clone_class(back, title, period){
    let clone = back.cloneNode(true);
    target.appendChild(clone);
    class_setting(back, title, period);
}

function generate_empty_class(title, order){
    const empty_class = document.createElement("li");
    empty_class.className = "Mrphs-sitesNav__menuitem";
    const link_container = 
                        '<a class="link-container" href="https://tact.ac.thers.ac.jp:443/portal/site/%7Efda32263-2051-4759-9f78-0101941033eb" title="' + title + '">\
                            <span class="Mrphs-sitesNav__menuitem--myworkspace-label">' + title + '</span>\
                        </a>';
    empty_class.insertAdjacentHTML("beforeend", link_container);
    target.appendChild(empty_class);

    if (title != ""){
        empty_class.style.order = order + 5;
        const favbtn = '<a class="Mrphs-sitesNav__favbtn fav" href="#" role="switch" aria-checked="true" ></a>';
        empty_class.insertAdjacentHTML("afterbegin", favbtn);
        const dropdown = '<a class="Mrphs-sitesNav__dropdown" href="#" data-site-id="~fda32263-2051-4759-9f78-0101941033eb" aria-haspopup="true" aria-label="open attached menu"></a>';
        empty_class.insertAdjacentHTML("beforeend", dropdown);
    }
}

function getData() {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get(['year', 'term'], function(data) {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
            resolve(data);
            }  
        });
    });
}

//年度, 学期の判定準備
function gen_reg(){
    if (term <=2){
        season = "春";
    }else{
        season = "秋";
    }
    switch(term % 2){
        case 0:
            quarter = "２";
            break;
        case 1:
            quarter = "１";
    }
    
    let str_reg = year.toString() + "年度" + season + "[" + quarter +"\/]";
    return str_reg;
}

function main(){
    let str_reg = gen_reg();

    for(let i = 0; i < container.length; i++){
        let back = background[i+2];
        let title = titles[i];
        let day_index = -4;
    
        let reg = new RegExp(str_reg);
        if (reg.test(title)){
            if (title.substr(0, 4) == "[遠隔]"){
                back.style.order = 1;
                projects += 1;
            }else{                //日n限, 日m限...形式に対応
                class_setting(back, title, day_index);
                day_index -= 4;
                while (day_of_week.includes(title.substr(day_index, 1))){
                    clone_class(back, title, day_index);
                    day_index -= 4;
                }
                class_setting(back, title, -3);
            }
            continue;
        }else{
            if (title.substr(-2, 1) == "限"){
                back.style.display = "none";
            }else{
                back.style.order = 0;
                projects += 1;
            }
        }
    }
    
    for (let i=0; i < (5 - projects + 1); i++){
        generate_empty_class("", 0);
    }
    
    for(let i=0; i<25; i++){
        if (!(class_list.includes(i))){
            let title = "空きコマ(" +year.toString() + "年度" + season + quarter + "期/" + day_of_week[i%5] + (Math.floor(i/5) +1).toString() +"限)";
            generate_empty_class(title, i);
        }
    }
    
    let selected = document.querySelectorAll(".is-selected");
    for (let i=0;  i < selected.length; i++){
        selected[i].style.backgroundColor = "#006E4F";
    }
}

getData()
    .then(function(data) {
        year = data.year || (new Date().getFullYear());
        term = data.term || 1;
        main();
    })
    .catch(function(error) {
        console.error(error);
    });
