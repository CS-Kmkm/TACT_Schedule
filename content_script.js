const day_of_week = ["月", "火", "水", "木", "金"];
let projects = 0;
const color = ["#c6c6ff", "#ff9999", "#adffff", "#99ffcc", "#ffc993"];
const background = document.querySelectorAll(".Mrphs-sitesNav__menuitem");
const container = document.querySelectorAll(".link-container");
const target = document.getElementById("topnav");
let class_list = []

function zenkaku_conversion(str){
  return Number(str.replace(/[０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  }));
}

function test_back(back){
  back.style.backgroundColor = "#006E4F";
}

function gen_reg(date){
  let year = date.getFullYear();
  let month = date.getMonth();
  let term = "";
  
  if (month >= 0 && month <= 2) {
      year -= 1; // 年度表示に合わせる
  }
  
  if (month >= 3 && month < 9) {
      term = "春";
  } else {
      term = "秋";
  }
  const str_reg = year.toString() + "年度" + term + "[１\/]";
  return str_reg;
}
//年度, 学期の判定準備
function main(){
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

let str_reg = 
chrome.storage.sync.get('selectedTerm', function(data) {
  let selectedTerm = data.selectedTerm || '1';
  if (selectedTerm == 2) {
    str_reg = year.toString() + "年度" + term + "[２\/]";
  }
  for(let i = 0; i < container.length; i++){
    let back = background[i+2];
    let con = container[i];
    let title = con.title;

    let reg = new RegExp(str_reg);
    if (reg.test(title) == true){
      let day_class = day_of_week.indexOf(title.substr(-4, 1));
      let period_class = zenkaku_conversion(title.substr(-3, 1));
      let class_order = day_class + (period_class - 1) * 5;
      back.style.backgroundColor = color[day_class];
      
      if (day_of_week.indexOf(title.substr(-4, 1)) == day_of_week.indexOf(title.substr(-8, 1))){
        period_class = zenkaku_conversion(title.substr(-7, 1));
        class_order = day_class + (period_class - 1) * 5;
        back.style.order = class_order + 5;
        let clone_class = back.cloneNode(true);
        class_list.push(class_order);
        target.appendChild(clone_class);
      }

      if (day_of_week.indexOf(title.substr(-4, 1)) == day_of_week.indexOf(title.substr(-12, 1))){
        period_class = zenkaku_conversion(title.substr(-11, 1));
        class_order = day_class + (period_class - 1) * 5;
        back.style.order = class_order + 5;
        let clone_class = back.cloneNode(true);
        class_list.push(class_order);
        target.appendChild(clone_class);
      }

      period_class = zenkaku_conversion(title.substr(-3, 1));
      class_order = day_class + (period_class - 1) * 5;
      class_list.push(class_order);
      back.style.order = class_order + 5;
      //alert(title + class_order);
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
    test_back(selected[i]);
  }
});
}
main ();

