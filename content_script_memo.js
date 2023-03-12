let day_of_week = ["月", "火", "水", "木", "金"];
let excepts = ["ホーム", "（学部）学生支援センター_2b", "【教養教育院】情報学部向け"];
let color = ["#c6c6ff", "#ff9999", "#adffff", "#99ffcc", "#ffc993"];
let background = document.querySelectorAll(".Mrphs-sitesNav__menuitem");
let container = document.querySelectorAll(".link-container");
let class_list = []

function zenkaku_conversion(str){
  return Number(str.replace(/[０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  }));
}

function day_of_week_conversion(str){
  switch(str){
    case "月":
      return 0;
    case "火":
      return 1;
    case "水":
      return 2;
    case "木":
      return 3;
    case "金":
      return 4;

  }
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

for(let i = 0; i < container.length; i++){
  let back = background[i+2];
  let con = container[i];
  let title = con.title;

  let str_reg =  year.toString() + "年度" + term  + "１?" + "期\/";

  let reg = new RegExp(str_reg);
  if (reg.test(title) == true){
    let day_class = day_of_week_conversion(title.substr(-4, 1));
    let period_class = zenkaku_conversion(title.substr(-3, 1));

    let class_order = day_class + (period_class - 1) * 5;
    back.style.order = class_order;
    class_list.push(class_order);
    back.style.backgroundColor = color[day_class];
    //alert(title + class_order);

    continue;
  }else{
    back.style.display = "none";
  }
}

for(let i=0; i<25; i++){
  if (!(class_list.includes(i))){
    //Mrphs-sitesNav__menuitem
    /*let target = document.querySelector(".Mrphs-sitesNav__menu");
    let empty_class = '<li class="Mrphs-sitesNav__menuitem Mrphs-sitesNav__menuitem--myworkspace "></li>'
    target.insertAdjacentHTML("beforeend", empty_class);*/
    
    let empty_class = document.createElement("li");
    empty_class.className = "Mrphs-sitesNav__menuitem";
    let target = document.getElementById("topnav");
    target.appendChild(empty_class);

    //fav_btn
    let empty_class_favbtn = '<a class="Mrphs-sitesNav__favbtn fav" href="#" role="switch" aria-checked="true" ></a>'
    empty_class.insertAdjacentHTML("afterbegin", empty_class_favbtn);


    let class_title = "空きコマ(" +year.toString() + "年度" + term + "/" + day_of_week[i%5] + (Math.floor(i/5) +1).toString() +")";
    
    let empty_class_link_container = 
                        '<a class="link-container" href="https://tact.ac.thers.ac.jp:443/portal/site/%7Efda32263-2051-4759-9f78-0101941033eb" title="' + class_title + '">\
                            <span class="fa fa-home" aria-hidden="true">\
                            </span>\
                            <span class="Mrphs-sitesNav__menuitem--myworkspace-label">' + class_title + '</span>\
                        </a>'
    empty_class.insertAdjacentHTML("beforeend", empty_class_link_container);

    let empty_class_dropdown = '<a class="Mrphs-sitesNav__dropdown" href="#" data-site-id="~fda32263-2051-4759-9f78-0101941033eb" aria-haspopup="true" aria-label="open attached menu"></a>'
    empty_class.insertAdjacentHTML("beforeend", empty_class_dropdown);

    let empty_class_submenu = '<ul class="Mrphs-sitesNav__submenu is-visible" role="menu">\
                                  <li class="Mrphs-sitesNav__submenuitem">\
                                      <a tabindex="-1" class="Mrphs-sitesNav__submenuitem-link" role="menuitem" href="https://tact.ac.thers.ac.jp:443/portal/site/~fda32263-2051-4759-9f78-0101941033eb/page/0eef4128-04b6-4a98-a2d2-74faecc273f7" title="ダッシュボード">  <span class="Mrphs-sitesNav__submenuitem-icon"><span class="toolMenuIcon icon-sakai--sakai-motd"></span></span>  <span class="Mrphs-sitesNav__submenuitem-title">ダッシュボード</span></a>\
                                  </li>\
                                  <li class="Mrphs-sitesNav__submenuitem">\
                                      <a tabindex="-1" class="Mrphs-sitesNav__submenuitem-link" role="menuitem" href="https://tact.ac.thers.ac.jp:443/portal/site/~fda32263-2051-4759-9f78-0101941033eb/page/2a92b88b-523a-4b91-8e56-93d08cbdb51e" title="メンバーシップ">  <span class="Mrphs-sitesNav__submenuitem-icon"><span class="toolMenuIcon icon-sakai--sakai-membership"></span></span>  <span class="Mrphs-sitesNav__submenuitem-title">メンバーシップ</span></a>\
                                  </li>\
                                  <li class="Mrphs-sitesNav__submenuitem">\
                                      <a tabindex="-1" class="Mrphs-sitesNav__submenuitem-link" role="menuitem" href="https://tact.ac.thers.ac.jp:443/portal/site/~fda32263-2051-4759-9f78-0101941033eb/page/485473b6-058f-44e5-9ff3-e44b848c899d" title="カレンダー">  <span class="Mrphs-sitesNav__submenuitem-icon"><span class="toolMenuIcon icon-sakai--sakai-schedule"></span></span>  <span class="Mrphs-sitesNav__submenuitem-title">カレンダー</span></a>\
                                  </li>\
                                  <li class="Mrphs-sitesNav__submenuitem">\
                                      <a tabindex="-1" class="Mrphs-sitesNav__submenuitem-link" role="menuitem" href="https://tact.ac.thers.ac.jp:443/portal/site/~fda32263-2051-4759-9f78-0101941033eb/page/bee8cdde-c59c-4f36-b502-2ba7dbdf7926" title="授業資料（リソース）">  <span class="Mrphs-sitesNav__submenuitem-icon"><span class="toolMenuIcon icon-sakai--sakai-resources"></span></span>  <span class="Mrphs-sitesNav__submenuitem-title">授業資料（リソース）</span></a>\
                                  </li>\
                                  <li class="Mrphs-sitesNav__submenuitem">\
                                      <a tabindex="-1" class="Mrphs-sitesNav__submenuitem-link" role="menuitem" href="https://tact.ac.thers.ac.jp:443/portal/site/~fda32263-2051-4759-9f78-0101941033eb/page/6c38f3b6-c05b-411f-be7e-3178cea5dbb4" title="お知らせ">  <span class="Mrphs-sitesNav__submenuitem-icon"><span class="toolMenuIcon icon-sakai--sakai-announcements"></span></span>  <span class="Mrphs-sitesNav__submenuitem-title">お知らせ</span></a>\
                                  </li>\
                                  <li class="Mrphs-sitesNav__submenuitem">\
                                      <a tabindex="-1" class="Mrphs-sitesNav__submenuitem-link" role="menuitem" href="https://tact.ac.thers.ac.jp:443/portal/site/~fda32263-2051-4759-9f78-0101941033eb/page/c2e926f5-8b4f-489f-87f6-d18ebf715663" title="サイトセットアップ">  <span class="Mrphs-sitesNav__submenuitem-icon"><span class="toolMenuIcon icon-sakai--sakai-sitesetup"></span></span>  <span class="Mrphs-sitesNav__submenuitem-title">サイトセットアップ</span></a>\
                                  </li>\
                                  <li class="Mrphs-sitesNav__submenuitem">\
                                      <a tabindex="-1" class="Mrphs-sitesNav__submenuitem-link" role="menuitem" href="https://tact.ac.thers.ac.jp:443/portal/site/~fda32263-2051-4759-9f78-0101941033eb/page/23c71eae-04af-47e5-bd18-c47fdb37eae0" title="設定">  <span class="Mrphs-sitesNav__submenuitem-icon"><span class="toolMenuIcon icon-sakai--sakai-preferences"></span></span>  <span class="Mrphs-sitesNav__submenuitem-title">設定</span></a>\
                                  </li>\
                                  <li class="Mrphs-sitesNav__submenuitem">\
                                      <a tabindex="-1" class="Mrphs-sitesNav__submenuitem-link" role="menuitem" href="https://tact.ac.thers.ac.jp:443/portal/site/~fda32263-2051-4759-9f78-0101941033eb/page/56770bd7-c389-48ec-be1f-fc3f71679ef1" title="アカウント">  <span class="Mrphs-sitesNav__submenuitem-icon"><span class="toolMenuIcon icon-sakai--sakai-singleuser"></span></span>  <span class="Mrphs-sitesNav__submenuitem-title">アカウント</span></a>\
                                  </li>\
                                  <li class="Mrphs-sitesNav__submenuitem">\
                                      <a tabindex="-1" class="Mrphs-sitesNav__submenuitem-link" role="menuitem" href="https://tact.ac.thers.ac.jp:443/portal/site/~fda32263-2051-4759-9f78-0101941033eb/page/83854335-f1ac-4b1e-8714-093d78249f44" title="授業評価">  <span class="Mrphs-sitesNav__submenuitem-icon"><span class="toolMenuIcon icon-sakai--sakai-export"></span></span>  <span class="Mrphs-sitesNav__submenuitem-title">授業評価</span></a>\
                                  </li>\
                              </ul>'
    //empty_class.insertAdjacentHTML("beforeend", empty_class_submenu);

    empty_class.style.order = i;
    //empty_class.style.backgroundColor = color[i%5];
  }
}

let selected = document.querySelector(".is-selected");
selected.style.backgroundColor = "#006E4F";
