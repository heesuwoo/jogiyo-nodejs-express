//오른쪽 Pos에 메뉴 불러오기 메뉴 title 넘겨받음
function menu(menu_list){

    const pos_position = document.querySelector(".content")

    //- console.log("menu_list.length: ", menu_list.length)
    for(var j = 0; j < menu_list.length; j++){

        var menu_item = document.createElement('div');  //item div생성
        
        var menu_id = 'menu_' + menu_list[j][1] + '@' + menu_list[j][2];  //menu id 동적생성
        menu_item.id = menu_id; //munu id 부여
        menu_item.className = 'item';
        menu_item.style.cursor = "pointer";
        // menu_item.innerText =  `${menu_list[j][0]}`;
        menu_item.innerHTML = `<h4 id = ${menu_id} style = 'font-size: 35px; text-align: center; padding-top: 30%'> ${menu_list[j][0]} </h4>`;
        pos_position.appendChild(menu_item);
        menu_name = menu_list[j];
        
        //메뉴 버튼 클릭 시
        menu_item.onclick = function(menu_name){
            
            const sum_h2 = document.querySelector('#sum')   //총합 나타내는 객체

            var clicked_menu = menu_name.srcElement.innerText;  //클릭한 메뉴 이름 읽음
            var clicked_menu_id = menu_name.srcElement.id;  //클릭한 메뉴의 id값 읽음

            // var clicked_menu_id = menu_name.path[1].id

            console.log("??: ", menu_name.path[1])
            console.log("id: ", clicked_menu_id)
            // console.log("clicked_menu: ", clicked_menu)
            
            var table_name = document.querySelector(".box_border2").id; //좌측 사각형 박스의 id값 가져옴(클릭한 테이블 id 값을 가져옴)(ex. table_1)
            var a = "#list_" + table_name;  //생성해 줄 테이블 리스트의 동적 id 값 만들기(ex. #list_table_1 ; tbody의 id)
            const table_add_menu = document.querySelector(`${a}`)   //클릭한 메뉴를 넣어줄 리스트 객체 가져오기(tbody의 id 가져오기)
            
            var price = clicked_menu_id.split('@')[1];
            sum=0

            if(document.getElementById(`${table_name}_${clicked_menu_id}`)){    //선택한 메뉴의 id(ex. table_1_menu_1)가 목록에 있으면, 메뉴 개수에 +1 해줌

                var count_td = document.getElementById(`${table_name}_${clicked_menu_id}_count`)    //개수가 나타나는 td 객체를 불러온다.
                var menu_price_td = document.getElementById(`${table_name}_price_${clicked_menu_id}`)   //메뉴의 가격 td 객체를 불러온다.
                // console.log("asfd",count_td.innerText);
                var i = count_td.innerText; //개수에 속하는 정수값을 가져온다.
                i++;    //+1을 더해준다.

                count_td.innerText = i; //해당 td 객체에 개수를 수정해서 넣어준다.
                var menu_price = i * price
                menu_price_td.innerHTML = menu_price;
                
                for(var i=0; i<document.querySelector('.table').rows.length-1; i++){
                    var u =  document.querySelector('.table').rows[i+1].childNodes[4].innerText
                    // console.log("u: ", u)
                    sum += parseInt(u);
                }
                
                // console.log(sum)
                sum_h2.innerHTML = `${sum}`
                                

                
            }else{  //선택한 메뉴가 목록에 없을 시, 목록에 추가
                if(table_name != null && clicked_menu_id != null){
                    var td_add = document.createElement('tr')

                    // var i = 1;
                    // console.log(`table_name: ${table_name}  clicked_menu_id: ${clicked_menu_id}`)
                    td_add.innerHTML = `<td id="${table_name}_${clicked_menu_id}">${clicked_menu}</td>
                                        <td id="${table_name}_${clicked_menu_id}_count">1</td>
                                        <td id="${table_name}_price_${clicked_menu_id}">${price}</td>
                                        <td><button class="btn btn-primary btn-lg" onclick = x_menu('${table_name}_${clicked_menu_id}_count')>-</button></td>`
                    table_add_menu.appendChild(td_add);

                    for(var i=0; i<document.querySelector('.table').rows.length-1; i++){
                        var u =  document.querySelector('.table').rows[i+1].childNodes[4].innerText
                        // console.log("u: ", u)
                        sum += parseInt(u);
                    }
                    
                    // console.log(sum)
                    sum_h2.innerHTML = `${sum}`

                }
            }
        }
    }
}

// '-'버튼 클릭시
function x_menu(menu_td_id){    //메뉴 하나 삭제
    
    const sum_h2 = document.querySelector('#sum')   //총합 나타내는 객체
    var sum = 0;
    
    console.log("menu_td_id: ", menu_td_id)
    var count_td = document.getElementById(`${menu_td_id}`)    //개수가 나타나는 td dom을 불러온다.
    console.log("x_menu 함수에서의 개수: ", count_td);
    var i = count_td.innerText;
    i--;
    var id1= count_td.id.split('menu')[0]
    var id2= count_td.id.split('menu')[1].split('_count')[0]
    var id = id1 + 'price_menu' + id2;
    // console.log("id: ", id)

    var menu_price_td = document.getElementById(`${id}`);
    // console.log("menu_price_td: ", menu_price_td)
    var menu_price = count_td.id.split('@')[1]   //메뉴의 가격을 불러온다.
    
    // console.log("######",menu_price_td)
    var price = menu_price.split('_')[0]
    // console.log("@@@@@@@@",menu_price_td2)
    // var price = menu_price_td.textContent;


    if(i == 0){
        const menu_tr = count_td.parentNode;    //메뉴 명
        const menu_table = menu_tr.parentNode;  //메뉴 테이블 리스트

        menu_table.removeChild(menu_tr)
    } else{
        count_td.innerText = i;
        menu_price_td.innerHTML = i*price;
    }

    for(var i=0; i<document.querySelector('.table').rows.length-1; i++){
        var u =  document.querySelector('.table').rows[i+1].childNodes[4].innerText
        console.log("u: ", u)
        sum += parseInt(u);
    }
    
    console.log(sum)
    sum_h2.innerHTML = `${sum}`
}


//테이블 불러오기
function table_draw(table_list){
    
    for(var i = 0; i < table_list.length; i++){
        const container = document.querySelector('#box');
        const containerWidth = container.clientWidth //컨테이너 박스의 x좌표를 가져옴
        const containerHeight = container.clientHeight //컨테이너 박스의 y좌표를 가져옴
        
        var table = document.createElement('div');
        var x_pot = table_list[i].x
        var y_pot = table_list[i].y

        var left = x_pot * containerWidth;
        var top = y_pot * containerHeight;
        
        //- console.log(left , top)
        var t_id = 'table_' + (i+1);
        table.id = t_id;
        table.className = t_id;
        table.style.cursor = "pointer";
        table.style.position = "absolute";
        table.style.left = `${left}px`;
        table.style.top = `${top}px`;
        table.style.width="10%";
        table.style.height="14%";
        table.style.backgroundColor="#E4C7B7";
        table.style.border="3px solid #B7928B";
        table.style.borderRadius = "3px";
        table.innerHTML = `<p style = "font-size: 20px";> ${t_id} </p>`;

        container.appendChild(table);
        
        table.onclick = function(t_id){
            console.log("table number: ", t_id.srcElement);
            var clicked_table = t_id.srcElement;
            
            if(clicked_table == null){

            }

            click(clicked_table);
        };
    }
}

//창문 불러오기
function window_draw(window_list){
    const container = document.querySelector('#box');
    const containerWidth = container.clientWidth //컨테이너 박스의 x좌표를 가져옴
    const containerHeight = container.clientHeight //컨테이너 박스의 y좌표를 가져옴

    
    for(var i = 0; i < window_list.length; i++){
        var window = document.createElement('div');
        var x_pot = window_list[i].x
        var y_pot = window_list[i].y

        var left = x_pot * containerWidth;
        var top = y_pot * containerHeight;
        
        //- console.log(left , top)
        var w_id = 'window_' + (i+1);
        window.id = w_id;
        window.style.position = "absolute";
        window.style.left = `${left}px`;
        window.style.top = `${top}px`;
        window.style.width="7%";
        window.style.height="7%";
        window.style.backgroundColor="#C6E7F8";
        window.style.borderRadius = "3px";
        window.style.border="3px solid #92AABB";
        window.innerHTML = `<p> 창문 </p>`;

        container.appendChild(window);
    }
}

//출입구 불러오기
function exit_draw(exit_list){
    const container = document.querySelector('#box');
    const containerWidth = container.clientWidth //컨테이너 박스의 x좌표를 가져옴
    const containerHeight = container.clientHeight //컨테이너 박스의 y좌표를 가져옴

    
    for(var j = 0; j < exit_list.length; j++){
        var exit = document.createElement('div');
        var x_pot = exit_list[j].x
        var y_pot = exit_list[j].y

        var left = x_pot * containerWidth;
        var top = y_pot * containerHeight;
        
        //- console.log(left , top)
        var w_id = 'exit_' + (j+1);
        exit.id = w_id;
        exit.style.position = "absolute";
        exit.style.left = `${left}px`;
        exit.style.top = `${top}px`;
        exit.style.width="6%";
        exit.style.height="6%";
        exit.style.backgroundColor="#e60000";
        exit.style.borderRadius = "3px";
        exit.style.border="3px solid #7a0000";
        exit.innerHTML = `<p style="color: white;"> 출입문 </p>`;

        container.appendChild(exit);
    }
}

//화장실 불러오기
function toilet_draw(toilet_list){
    const container = document.querySelector('#box');
    const containerWidth = container.clientWidth //컨테이너 박스의 x좌표를 가져옴
    const containerHeight = container.clientHeight //컨테이너 박스의 y좌표를 가져옴

    
    for(var j = 0; j < toilet_list.length; j++){
        var toilet = document.createElement('div');
        var x_pot = toilet_list[j].x
        var y_pot = toilet_list[j].y

        var left = x_pot * containerWidth;
        var top = y_pot * containerHeight;
        
        //- console.log(left , top)
        var w_id = 'toilet_' + (j+1);
        toilet.id = w_id;
        toilet.style.position = "absolute";
        toilet.style.left = `${left}px`;
        toilet.style.top = `${top}px`;
        toilet.style.width="6%";
        toilet.style.height="6%";
        toilet.style.backgroundColor="#24e5ff";
        toilet.style.borderRadius = "3px";
        toilet.style.border="3px solid #0094a8";
        toilet.innerHTML = `<p style="color: white;"> 화장실 </p>`;

        container.appendChild(toilet);
    }
}

// 테이블 클릭시
function click(clicked_table){

    // var table_num = clicked_table.id;
    var table_num = clicked_table.className;
    console.log("table_class: ", clicked_table.className)
    console.log("clicked_table: ", table_num);

    const body_container = document.querySelector('.main_body');
    const container = document.querySelector('#box');

    var list_div = document.createElement('div')
    var t_list = `<table class="table table-striped table_select" style="text-align: center; border: 1px; font-size: xx-large; solid #dddddd">
                  <thead>
                  <tr>
                  <th style="background-color: #aacfd0; text-align: center;">메뉴</th>
                  <th style="background-color: #aacfd0; text-align: center;">개수</th>
                  <th style="background-color: #aacfd0; text-align: center;">가격</th>
                  <th style="background-color: #aacfd0; text-align: center;">취소</th>
                  </tr>
                  </thead>
                  <tbody id = "list_${clicked_table.className}"></tbody></table>
                  <div style = "position: absolute; bottom: 0; left:45%;">
                  <div style = "float: left;"><h1>총합: &ensp; </h1></div>
                  <div style = "float: left;"><h1 id="sum"></h1></div>
                  </div>`;
    list_div.innerHTML = `<h1> ${clicked_table.className} </h1>` + t_list;
    list_div.id = clicked_table.id;
    list_div.className = 'box_border2';
    list_div.style.background = '#e3e3ff';
    list_div.style.position = 'absolute';
    
    var back = document.createElement('button');
    back.className = `btn btn-danger btn-sm`;
    back.innerHTML = `<p style="font-size: 17px;">이전</p>`;
    back.style.position = "absolute";
    back.style.left = '0%';
    back.style.top = '0%';
    back.style.width = '5%';
    back.style.height = '5%';

    list_div.appendChild(back)

    body_container.removeChild(container)
    body_container.appendChild(list_div)

    var notice = document.createElement('p');
    notice.innerHTML = `**좌석 금지를 풀고싶으면 결제 버튼을 눌러주세요!`;
    notice.style.position = "absolute";
    notice.style.backgroundColor = 'yellow';
    notice.style.left = '62%';
    notice.style.top = '0%';
    notice.style.width = '25%';
    notice.style.height = '5%';
    notice.style.fontSize = '20px';
    list_div.appendChild(notice)

    var back_notice = document.createElement('p');
    back_notice.innerHTML = `**메뉴 추가나 삭제 후 반드시 이전버튼을 눌러주세요!`;
    back_notice.style.position = "absolute";
    back_notice.style.color = 'red';
    back_notice.style.backgroundColor = 'yellow';
    // back_notice.style.paddingBottom = '2%';
    back_notice.style.left = '7%';
    back_notice.style.top = '0%';
    back_notice.style.width = '25%';
    back_notice.style.height = '5%';
    back_notice.style.fontSize = '20px';
    list_div.appendChild(back_notice)

    // 예약금지 버튼
    var ban = document.createElement('button');
    ban.className = `btn btn-danger btn-sm`;
    ban.innerHTML = `<p style="font-size: 17px;">좌석 예약 금지</p>`;
    ban.style.position = "absolute";
    ban.style.left = '90%';
    ban.style.top = '0%';
    ban.style.width = '10%';
    ban.style.height = '5%';
    list_div.appendChild(ban)


    // 뒤로가기 버튼 클릭 시
    back.onclick = function(table_num){
        save_table_order();
        body_container.removeChild(list_div)
        body_container.appendChild(container)
    }

    // 예약금지 버튼 클릭 시
    ban.onclick = function(){
        no_reserve();
    }

    const reqBody = {
                cookie : getCookie("id"),
                table_num : table_num,
        }

        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
            const result = JSON.parse(xhr.responseText)

            var order_list = result.order_list;
            // console.log("!!!", order_list)
            order_list_draw(table_num, order_list);
        }

    xhr.open('POST', '/pos_order_sele')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(reqBody))
}

//뒤로가기 버튼 클릭시 - 메뉴 저장
function save_table_order(){

    var table_num = document.querySelector(".box_border2").id   //table_6
    var tbody_table = "#list_" + table_num;
    
    var tbody_len = document.querySelector(tbody_table).rows.length;    //테이블 행 개수
     
    var order_list =[]

    for(i=0; i< tbody_len; i++){
        var save_menu_name = document.querySelector(tbody_table).rows[i].cells[0].innerText
        var save_menu_len = document.querySelector(tbody_table).rows[i].cells[1].innerText
        // var save_menu_price = document.querySelector(tbody_table).rows[i].cells[2].innerText
        // console.log("save_menu_price: ", save_menu_price)

        var save_menu_id = document.querySelector(tbody_table).rows[i].cells[0].id

        order_list.push([save_menu_name, save_menu_len, save_menu_id]);
    }

    // console.log("save_table_orders: ",order_list)

    //router로 전송
    const reqBody = {
        cookie : getCookie("id"),
        table_num : table_num,
        order_list : order_list,
    }
        
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        const result = JSON.parse(xhr.responseText)
        if(result.code != 1){
            alert("메뉴 저장 error");
        }
        movePage('main')
    }
    xhr.open('POST', '/pos_order')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(reqBody))
}

//예약금지 버튼 클릭시
function no_reserve(){

    var table_num = document.querySelector(".box_border2").id   //table_6
    var tbody_table = "#list_" + table_num;
    
    var tbody_len = document.querySelector(tbody_table).rows.length;    //테이블 행 개수
     
    var order_list =[]

    for(i=0; i< tbody_len; i++){
        var save_menu_name = document.querySelector(tbody_table).rows[i].cells[0].innerText
        var save_menu_len = document.querySelector(tbody_table).rows[i].cells[1].innerText

        var save_menu_id = document.querySelector(tbody_table).rows[i].cells[0].id

        order_list.push([save_menu_name, save_menu_len, save_menu_id]);
    }

    // console.log("save_table_orders: ",order_list)

    //router로 전송
    const reqBody = {
        cookie : getCookie("id"),
        table_num : table_num,
        order_list : order_list,
    }
        
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        const result = JSON.parse(xhr.responseText)
        if(result.code != 1){
            alert("예약 금지 error");
        }
        movePage('main')
    }
    xhr.open('POST', '/pos_order_no')
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(reqBody))
}


//테이블 클릭시 리스트 출력
function order_list_draw(table_num, order_list){

    var table_list_name = "#list_" + table_num
    var sum = 0;
    const table_add_menu = document.querySelector(table_list_name)
    const sum_h2 = document.querySelector('#sum')
    if(order_list == undefined){
    }else{
        for(var j=0; j < order_list.length; j++){
            var menu_name = order_list[j].menu_name
            var menu_len = order_list[j].menu_len
            var menu_id = order_list[j].menu_id

            var price = menu_id.split('@')[1]*menu_len            //20000
            var id1 = menu_id.split('menu')[0]
            var id2 = menu_id.split('menu')[1]
            var price_id = id1 + 'price_menu' + id2
            console.log("price_id",price_id)
            console.log("order_list_draw: ",menu_name, menu_len, menu_id)
    
            var td_add = document.createElement('tr')
            td_add.innerHTML = `<td id="${menu_id}">${menu_name}</td>
                                <td id="${menu_id}_count">${menu_len}</td>
                                <td id="${price_id}">${price}</td>
                                <td><button class = "btn btn-primary btn-lg" onclick = x_menu('${menu_id}_count')>-</button></td>`
            table_add_menu.appendChild(td_add);

            sum += price
        }
        sum_h2.innerHTML = sum
    }

    // td_add.innerHTML = `<td id="${table_num}_${clicked_menu_id}">${clicked_menu}</td> <td id="${table_name}_${clicked_menu_id}_count">1</td><td><button class = "btn btn-primary btn-lg" onclick = x_menu('${table_name}_${clicked_menu_id}_count')>-</button></td>`
    // table_add_menu.appendChild(td_add);
}

//결제버튼 클릭시
function pay(){

    const pay_button = document.querySelector('.box_border2').id;
    
    if(pay_button !='box'){

        var table_num = document.querySelector(".box_border2").id   //table_6
        var tbody_table = "#list_" + table_num;

        var tbody_len = document.querySelector(tbody_table).rows.length;    //테이블 행 개수
        
        var order_list =[]

        // for(i=0; i < tbody_len; i++){
        //     var list_menu_name = "#" + table_num + "_menu_" + i;
        //     var list_menu_len = list_menu_name + "_count"
        //     var save_menu_name = document.querySelector(list_menu_name).innerText //한 행의 메뉴 이름 불러옴
        //     var save_menu_len = document.querySelector(list_menu_len).innerText   //한 행의 메뉴 개수 불러옴

        //     var save_menu_id = table_num + "_menu_" + i;

        //     order_list.push([save_menu_name, save_menu_len, save_menu_id]);
        //     // console.log("save_menu_name: ", save_menu_name)
        // }

        for(i=0; i< tbody_len; i++){
            var save_menu_name = document.querySelector(tbody_table).rows[i].cells[0].innerText
            var save_menu_len = document.querySelector(tbody_table).rows[i].cells[1].innerText
    
            var save_menu_id = document.querySelector(tbody_table).rows[i].cells[0].id
    
            order_list.push([save_menu_name, save_menu_len, save_menu_id]);
        }

        const reqBody = {
            cookie : getCookie("id"),
            table_num : pay_button,
            order_list : order_list,
        }
            
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
            const result = JSON.parse(xhr.responseText)
            if(result.code == 1){
                alert("결제 되었습니다.");
                movePage('main')
            }else{
                alert("결제 error");
            }
        }
        xhr.open('POST', '/pay')
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(reqBody))
    }
    
}

//테이블에 메뉴를 보여주고 선택시 메뉴, 가격 나오게
function show(menu){

    for(var i = 0; i < menu.length; i++){
        // console.log("menu: " , menu)

        var table_num = menu[i][0];
        var menu_name = menu[i][1];
        var menu_len = menu[i][2];
        var menu_id = menu[i][3];
        

        const container = document.querySelector(`#${table_num}`);

        var table_menu = document.createElement('div');
        var m_id = 'menu_list_' + i;

        table_menu.className = table_num;
        table_menu.id = m_id;
        
        table_menu.innerHTML = `<p> ${menu_name} : ${menu_len} 개 </p>`;

        container.appendChild(table_menu);

        // var classN = table_num.innerText;

        table_menu.onclick = function(table_num){
            console.log("tn: ", table_num.path[2])
            // console.log("tn: ", table_num.path[2].innerText)
            
            var table_num2 = table_num.path[2]

            click(table_num2);
        };
        
    }
}

//예약석 표시
function show_reserved(reserved){

    order = []
    
    const item1 = document.querySelectorAll('.content')


    console.log(item1); 
    console.log(item1.children); 
    console.log(item1[0].children); 

    for(var i = 0; i < reserved.length; i++){

        var table_num = reserved[i][0]; //테이블 번호
        var menu_name = reserved[i][1]; //메뉴 이름
        var menu_len = reserved[i][2];  //메뉴 개수

        const pos_menu = document.querySelector(`.content`);
        

        for(var j=0; j<pos_menu.childNodes.length-1; j++){
            var child = pos_menu.children[j].innerText

            console.log("child: ", child)

            if(menu_name == child){
                var menu_id = table_num + "_" + pos_menu.children[j].id;
                console.log("menu_id: ", menu_id)
            }
        }

        const container = document.querySelector(`#table_${table_num}`);

        container.style.backgroundColor = "red";
        order.push([menu_name, menu_len, menu_id])
    }
}

//예약 중지 좌석 번호 표시
function show_no_reserved(no_reserved){

    console.log("no_reserve: " , no_reserve)
    
    const item1 = document.querySelectorAll('.content')

    for(var i = 0; i < no_reserved.length; i++){

        var table_num = no_reserved[i][0]; //테이블 번호

        const pos_menu = document.querySelector(`.content`);
        

        const container = document.querySelector(`#table_${table_num}`);

        container.style.backgroundColor = "green";
    }
}