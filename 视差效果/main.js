const pageX=document.querySelector("#pageX");
const cards=document.querySelector(".cards");
const images=document.querySelector(".card_img");
let backgrounds=document.querySelector(".card_bg");
let range =40;
//旋转角度
let calcValue=(a,b)=>(a/b*range-range/2).toFixed();
let timeout=void 0;//默认返回undefined
//视差动画函数
function parallax(e) {
    let x=e.x;
    let y=e.y;
    if(timeout){
        window.cancelAnimationFrame(timeout);
    }
  
  //在下次重绘之前调用指定的回调函数更新动画
  timeout=window.requestAnimationFrame(function(){
      let xValue=calcValue(x,pageX.offsetWidth);
      let yValue=calcValue(y,pageX.offsetHeight);
      //设置卡片容器旋转角度
      cards.style.transform="rotateX("+yValue+"deg) rotateY("+xValue+"deg)";
      
      //设置所有图片的位移
      images.forEach(item=>{
          item.style.transform="translateX("+ -xValue+"px) translateY("+yValue+"px)"

  });
  backgrounds.forEach(item=>{
      item.style.transform=xValue*.45+"px"+-yValue*.45+"px";
  })
});
}
window.onload=()=>{
    //监听鼠标在pageX容器移动
    pageX.addEventListener("mousemove",parallax,false);
}
//离开页面前移除监听
window.onbeforeunload=()=>{
    pageX.removeEventListener("mousemove",parallax);
}
     



