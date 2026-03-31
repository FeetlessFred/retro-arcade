const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

const tile=16, ROWS=14, COLS=14;
const map=[
1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,0,0,0,1,0,0,0,1,0,0,0,0,1,
1,0,1,0,1,0,1,0,1,0,1,0,0,1,
1,0,1,0,0,0,1,0,0,0,1,0,0,1,
1,0,1,1,1,1,1,1,1,0,1,1,0,1,
1,0,0,0,0,0,0,0,0,0,0,0,0,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1
];

let pac={x:tile*1,y:tile*1,dx:0,dy:0};

function drawMap(){
  for(let r=0;r<7;r++){
    for(let c=0;c<14;c++){
      let val=map[r*14+c];
      if(val===1){ ctx.fillStyle="blue"; ctx.fillRect(c*tile,r*tile,tile,tile);}
      else if(val===0){ ctx.fillStyle="black"; ctx.fillRect(c*tile,r*tile,tile,tile);}
    }
  }
}

function drawPac(){ ctx.fillStyle="yellow"; ctx.beginPath(); ctx.arc(pac.x+tile/2,pac.y+tile/2,tile/2,0,Math.PI*2); ctx.fill(); }

document.addEventListener("keydown",e=>{
  if(e.key==="ArrowUp"){pac.dx=0;pac.dy=-tile;}
  else if(e.key==="ArrowDown"){pac.dx=0;pac.dy=tile;}
  else if(e.key==="ArrowLeft"){pac.dx=-tile;pac.dy=0;}
  else if(e.key==="ArrowRight"){pac.dx=tile;pac.dy=0;}
});

function update(){
  let nextX=pac.x+pac.dx;
  let nextY=pac.y+pac.dy;
  let c=Math.floor(nextX/tile), r=Math.floor(nextY/tile);
  if(map[r*14+c]!==1){ pac.x=nextX; pac.y=nextY; }
}

function loop(){ ctx.clearRect(0,0,canvas.width,canvas.height); drawMap(); drawPac(); update(); requestAnimationFrame(loop); }

loop();
