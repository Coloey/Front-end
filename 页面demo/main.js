//clock
const hours=document.querySelector('.hours');
const minutes=document.querySelector('.minutes');
const seconds=document.querySelector('.seconds');
//play button
const play=document.querySelector('.play');
const pause=document.querySelector('.pause');
const playBtn=document.querySelector('.circle_btn');
const wave1=document.querySelector('.circle_back-1');
const wave2=document.querySelector('.circle_back-2');
//rate slider
const container=document.querySelector('.slider_box');
const btn=document.querySelector('.slider_btn');
const color=document.querySelector('.slider_color');
const tooltip=document.querySelector('.slider_tooltip');
clock=()=>{
    let today=new Date();
    let h=today.getHours()%12+today.getMinutes()/59;
    let m=today.getMinutes();
    let s=today.getSeconds();
    h*=30;//12*30=360
    m*=6;
    s*=6;

    rotation(hours,h);
    rotation(minutes,m);
    rotation(seconds,s);
//call every second
    setTimeout(clock,500);
}
rotation=(target,val)=>{
    target.style.transform=`rotate(${val}deg)`;
}
window.onload=clock();

dragElement=(target,btn)=>{
    target.addEventListener("mousedown",e=>{
        onMouseMove(e);
        window.addEventListener('mousemove',onMouseMove);
        window.addEventListener('mouseup',onMouseUp);

    })
    onMouseMove=e=>{
        e.preventDefault();
        // 返回元素的大小及其相对于视口的位置
        let targetRect=target.getBoundingClientRect();
        let x=e.pageX-targetRect.left+10;
        if(x>targetRect.width){x=targetRect.width;}
        if(x<0){x=0;}
        btn.x=x-10;
        btn.style.left=btn.x+'px';//按钮左边距离点击处差10
        //get the position of the button inside
        let percentPosition=(btn.x+10)/targetRect.width*100;//计算点击处百分比要加回10
        color.style.width=percentPosition+'%';
        tooltip.style.left=btn.x-5+'px';
        tooltip.style.opacity=1;
        tooltip.textContent=Math.round(percentPosition)+'%';
    
    
    }
    onMouseUp=e=>{
        window.removeEventListener('mousemove',onMouseMove);//离开时要先移除mousemove事件
        tooltip.style.opacity=0;
        btn.addEventListener('mouseover',function(){
            tooltip.style.opacity=1;
        })
        btn.addEventListener('mouseout',function () {
            tooltip.style.opacity=0;
          })
    }
}

dragElement(container,btn);
//play button
playBtn.addEventListener('click',function(e){
    e.preventDefault();
    pause.classList.toggle('visibility');
    play.classList.toggle('visibility');
    playBtn.classList.toggle('shadow');
    wave1.classList.toggle('paused');
    wave2.classList.toggle('paused');
})