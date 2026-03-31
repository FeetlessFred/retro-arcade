const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ROW = 20, COL = 12, SQ = 20;
const COLOR = ["#000", "#f00","#0f0","#00f","#ff0","#f0f","#0ff","#fff"];
let board = Array.from({length: ROW},()=>Array(COL).fill(0));

function drawSquare(x,y,color){ ctx.fillStyle=color; ctx.fillRect(x*SQ,y*SQ,SQ,SQ); ctx.strokeStyle="#222"; ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);}
function drawBoard(){ for(let r=0;r<ROW;r++) for(let c=0;c<COL;c++) drawSquare(c,r,COLOR[board[r][c]]); }

const pieces = [
    [ [1,1,1,1] ],
    [ [2,2],[2,2] ],
    [ [0,3,0],[3,3,3] ],
    [ [4,0,0],[4,4,4] ],
    [ [0,0,5],[5,5,5] ],
    [ [6,6,0],[0,6,6] ],
    [ [0,7,7],[7,7,0] ]
];

function randomPiece(){ const p=pieces[Math.floor(Math.random()*pieces.length)]; return {shape:p,x:Math.floor(COL/2)-1,y:0}; }

let p = randomPiece();

function collide(board,p){ for(let r=0;r<p.shape.length;r++) for(let c=0;c<p.shape[r].length;c++) if(p.shape[r][c] && (board[r+p.y] && board[r+p.y][c+p.x])!==0) return true; return false; }

function merge(board,p){ for(let r=0;r<p.shape.length;r++) for(let c=0;c<p.shape[r].length;c++) if(p.shape[r][c]) board[r+p.y][c+p.x]=p.shape[r][c]; }

function move(dir){ p.x+=dir; if(collide(board,p)) p.x-=dir; }
function rotate(){ let s=p.shape; p.shape=s[0].map((_,i)=>s.map(row=>row[i]).reverse()); if(collide(board,p)) p.shape=s; }
function drop(){ p.y++; if(collide(board,p)){ p.y--; merge(board,p); p=randomPiece(); if(collide(board,p)) board=Array.from({length:ROW},()=>Array(COL).fill(0)); } }

document.addEventListener("keydown",e=>{ if(e.key==="ArrowLeft") move(-1); else if(e.key==="ArrowRight") move(1); else if(e.key==="ArrowDown") drop(); else if(e.key==="ArrowUp") rotate(); });

function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); drawBoard(); for(let r=0;r<p.shape.length;r++) for(let c=0;c<p.shape[r].length;c++) if(p.shape[r][c]) drawSquare(c+p.x,r+p.y,COLOR[p.shape[r][c]]); requestAnimationFrame(draw); }

setInterval(drop,500);
draw();
