
const trans = [0,11,10,9,8,7,1,2,3,4,5,6];
const check = [3,0,0,0,0,0,2,1,1,1,1,1];

let chips = [0,4,4,4,4,4,0,4,4,4,4,4];
let turn = 0;

function setChip(){
  chipAreas = document.getElementsByClassName('chipArea');

  for(let i = 0; i < chips.length; i++){
    chipAreas[i].innerHTML = "";
    for(let j = 0; j < chips[trans[i]]; j++){
      let div = document.createElement('div');
      div.className = 'chip';
      chipAreas[i].appendChild(div);
    }
  }
}

function init(){
  chipAreas = document.getElementsByClassName('chipArea');
  
  for(let i = 0; i < chips.length; i++){
    for(let j = 0; j < chips[trans[i]]; j++){
      let div = document.createElement('div');
      div.className = 'chip';
      chipAreas[i].appendChild(div);
    }

    // クリック時の処理
    chipAreas[i].addEventListener("click", ()=>{
      if(turn==check[trans[i]] && chips[trans[i]]>0){
        let p = trans[i];

        // チップの移動
        while(chips[trans[i]]>0){
          p=(p+1)%chips.length;
          chips[trans[i]]--;
          chips[p]++;
        }

        // 横取り
        if(turn==check[p] && chips[p]==1){
          chips[chips.length/2 * ((turn+1)%2)] += chips[chips.length-p];
          chips[chips.length/2 * ((turn+1)%2)] += chips[p];
          chips[p] = 0;
          chips[chips.length-p] = 0;
        }

        // チップの反映
        setChip();

        // ターン終了処理（＆ぴったりゴールの分岐）
        if(check[p]!=2+turn){
          turn = (turn + 1) % 2;
          document.getElementById("playerId").innerHTML="Player" + (turn + 1);
        }
      }
    });

    // 選択可能なエリアはhoverで色が変わる
    chipAreas[i].addEventListener('mouseenter', ()=>{
      if(turn==check[trans[i]] && chips[trans[i]]>0){
        chipAreas[i].style.backgroundColor = "green";
      }else if(check[trans[i]] < 2){
        chipAreas[i].style.backgroundColor = "skyblue";
      }
    });
    chipAreas[i].addEventListener('mouseleave', ()=>{
      if(check[trans[i]] < 2){
        chipAreas[i].style.backgroundColor = "skyblue";
      }
    });
  }
}

window.onload = init;