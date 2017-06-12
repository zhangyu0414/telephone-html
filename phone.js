/*******************网易轮播***************************/
	(function(){
		var w_run=document.getElementById('w_run');
		console.log(w_run);
		var run_main=document.getElementById('run_main');
		var imgs=run_main.children;
		var run_ctrl=document.getElementById('run_ctrl');
		for(var i=0;i<imgs.length;i++){
			var span=document.createElement('span');
			span.innerHTML=imgs.length-i;
			run_ctrl.insertBefore(span,run_ctrl.children[1]);
			span.className='run-ctrl-con';
		}
		var spans=run_ctrl.children;
		var jieliu=true;
		/*spans[1].setAttribute('class','run-ctrl-con rutton');*///新方法；
		spans[1].className='run-ctrl-con rutton';
		var scrollWidth=w_run.clientWidth;
		var iNow=0;
		for(var i=1;i<imgs.length;i++){
			imgs[i].style.left=scrollWidth+'px';
		}	
		for(var k in spans){
			spans[k].onclick=function(){
				if(this.className=='run-ctrl-prev'){
						if(jieliu==true){
							jieliu=false;
							animate(imgs[iNow],{left:scrollWidth});
							--iNow<0?iNow=imgs.length-1:iNow;
							imgs[iNow].style.left=-scrollWidth+'px';
							animate(imgs[iNow],{left:0},function(){
								jieliu=true;
							});
							setSquare();
						}
				}
				else if(this.className=='run-ctrl-next'){
						if(jieliu==true){
							jieliu=false;
							/*animate(imgs[iNow],{left:-scrollWidth});
							++iNow>imgs.length-1?iNow=0:iNow;
							imgs[iNow].style.left=scrollWidth+'px';
							animate(imgs[iNow],{left:0})
							setSquare()*/
							auto();
						}
				}
				else{
					var that=this.innerHTML-1;
					if(that>iNow){
						//if(jieliu==true){
							//jieliu=false;
							animate(imgs[iNow],{left:-scrollWidth-8});
							console.log(iNow)
							imgs[that].style.left=scrollWidth+'px';
							animate(imgs[that],{left:-8},function(){jieliu=true});
						//}
					}
					else if(that<iNow){
						//if(jieliu==true){
							//jieliu=false;
							animate(imgs[iNow],{left:scrollWidth});
							console.log(iNow)
							imgs[that].style.left=-scrollWidth+'px';
							animate(imgs[that],{left:0},function(){jieliu=true})
						//}
					}
					else{
						animate(imgs[that],{left:0})	
					}
					iNow=that;
					setSquare();
				}
			}
			
		}
		function setSquare(){
				for(var i=1;i<spans.length-1;i++){
					spans[i].className='run-ctrl-con';
				}
				spans[iNow+1].className='run-ctrl-con rutton';
		}
		var timer=null;
		timer=setInterval(auto,2000)
		function auto(){
			animate(imgs[iNow],{left:-scrollWidth-8});
			++iNow>imgs.length-1?iNow=0:iNow;
			imgs[iNow].style.left=scrollWidth+'px';
			animate(imgs[iNow],{left:-8},function(){
				jieliu=true;
			})
			setSquare()			
		}
		w_run.onmouseenter=function(){
			clearInterval(timer);
		}
		w_run.onmouseleave = function(){
			clearInterval(timer);
			timer=setInterval(auto,2000);
		}
	})();






		function animate(obj,json,fn) {  // 给谁    json
			clearInterval(obj.timer);
			obj.timer = setInterval(function() {
				var flag = true;  // 用来判断是否停止定时器   一定写到遍历的外面
				for(var attr in json){   // attr  属性     json[attr]  值
					//开始遍历 json
					// 计算步长    用 target 位置 减去当前的位置  除以 10 
					// console.log(attr);
					var current = 0;
					if(attr == "opacity")
					{
						current = Math.round(parseInt(getStyle(obj,attr)*100)) || 0;
						//console.log(current);
					}
					else
					{
						current = parseInt(getStyle(obj,attr)); // 数值
					}
					// console.log(current);
					// 目标位置就是  属性值
					var step = ( json[attr] - current) / 10;  // 步长  用目标位置 - 现在的位置 / 10
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
					//判断透明度
					if(attr == "opacity")  // 判断用户有没有输入 opacity
					{
						if("opacity" in obj.style)  // 判断 我们浏览器是否支持opacity
						{
							// obj.style.opacity
							obj.style.opacity = (current + step) /100;
						}
						else
						{  // obj.style.filter = alpha(opacity = 30)
							obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

						}
					}
					else if(attr == "zIndex")
					{
						obj.style.zIndex = json[attr];
					}
					else
					{
						obj.style[attr] = current  + step + "px" ;
					}

					if(current != json[attr])  // 只要其中一个不满足条件 就不应该停止定时器  这句一定遍历里面
					{
						flag =  false;
					}
				}
				if(flag)  // 用于判断定时器的条件
				{
					clearInterval(obj.timer);
					//alert("ok了");
					if(fn)   // 很简单   当定时器停止了。 动画就结束了  如果有回调，就应该执行回调
					{
						fn(); // 函数名 +  （）  调用函数  执行函数
					}
				}
			},10)
		}
		function getStyle(obj,attr) {  //  谁的      那个属性
			if(obj.currentStyle)  // ie 等
			{
				return obj.currentStyle[attr];  // 返回传递过来的某个属性
			}
			else
			{
				return window.getComputedStyle(obj,null)[attr];  // w3c 浏览器
			}
		}
	/**********************网易轮播结束**********************/
	/*************图片轮播**********************/
	(function(){
		var box=document.getElementById('box');
		var arrow=document.getElementById('arrow');
		var slide=document.getElementById('slide');
		var lis=slide.children[0].children;
		var as=arrow.children;
		//console.log(lis);
		var json=[
			{
				width:265,
				top:20,
				left:-300,
				opacity:0,
				z:0
			},
			{
				width:265,
				top:20,
				left:0,
				opacity:100,
				z:1
			},
			{
				width:265,
				top:20,
				left:300,
				opacity:100,
				z:2
			},
			{
				width:265,
				top:20,
				left:600,
				opacity:100,
				z:3
			},
			{
				width:265,
				top:20,
				left:900,
				opacity:100,
				z:4
			},
			{
				width:265,
				top:20,
				left:1200,
				opacity:100,
				z:3
			},
			{
				width:265,
				top:20,
				left:1500,
				opacity:100,
				z:2
			},
			{
				width:265,
				top:20,
				left:1900,
				opacity:0,
				z:1
			}
		]
		
		var jieliu=true;
		change();
		for(var k in as){
			as[k].onclick=function(){
				if(this.className=='prev')
				{
					if(jieliu == true){
						change(false);
						jieliu=false;
					}
				}
				else
				{
					if(jieliu == true)
					{
						change(true);
						jieliu=false;
					}
				}
			}
		}
		function change(flag){
			if(flag){
				json.unshift(json.pop());
			}
			else{
				json.push(json.shift());
			}
		
			for(var i=0;i<json.length;i++){
				animate(lis[i],{
					width:json[i].width,
					top:json[i].top,
					left:json[i].left,
					opacity:json[i].opacity,
					zIndex:json[i].z
				},function(){jieliu=true;})
			}
		}
		
		//var time=null;
		//time=setInterval(auto,2000);
		//function auto(){
			///*clearInterval(timer);*/
			//change(true);
		//}

		//box.onmouseenter=function(){
			//clearInterval(time);
			///*for(var i=0;i<lis.length;i++){
				//animate(lis[i],{
					//width:300,
					////top:parseInt(Math.random()*(200-50)+50),
					////left:parseInt(Math.random()*(700-50)+50),
					//top:parseInt(Math.random()>0.5?50:250),
					//left:parseInt(Math.random()>0.5?100:680),
					//opacity:100,
					//z:i
				//})
			//}*/
		//}
		//box.onmouseleave=function(){
			//clearInterval(time);
			//time=setInterval(auto,2000)
		//}
	})();
	/*************图片轮播结束****************/
(function(){
	var heightHoop=$('#head').height();	
	$(window).scroll(function(){
		var doc=$(document).scrollTop();
		console.log(doc);
		if(doc>=heightHoop){
			$('#head').css({
				'position':'fixed',
				'top':'0px',
				'width':'1905px',
				'z-index':'100',
				'height':'0px',
				'transition':'all 0.5s ease-in-out'
			}).animate({
				'height':'72px',
			},100);
			$('#top').css({
				'margin-top':'72px'
			});
		}if(doc==0){
			$('#head').css({
				'position':'relative',
				'top':'0px',
				'width':'1905px',
				'z-index':'100',
				'height':'72px'
			});
			$('#top').css({
				'margin-top':'0px'
			});
		}
	});
})();


function add(i){
	 var bg_3D_move = $(i), //背景3D层
        canMoveHeroImage = true,
        win = { width: window.innerWidth, height:window.innerHeight };
    //节流函数
    function throttle(fn, delay) {
        var allowSample = true;
        return function(e) {
            if (allowSample) {
                allowSample = false;
                setTimeout(function() { allowSample = true; }, delay);
                fn(e);
            }
        };
    }
    //伪3D函数
    window.addEventListener('mousemove', throttle(function(ev) {
        if( !canMoveHeroImage ) return false;
        var xVal = -1/(win.height/2)*ev.clientY + 1,
            yVal = 1/(win.width/2)*ev.clientX - 1,
            transX = 20/(win.width)*ev.clientX - 10,
            transY = 20/(win.height)*ev.clientY - 10,
            transZ = 100/(win.height)*ev.clientY - 50;

        bg_3D_move[0].style.transform = 'perspective(1000px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)';
    }, 100));
		/*******结束****/
}
function add1(i){
	 var bg_3D_move = $("#phone_show>div>.te>li:nth-child("+i+")>a>.bg-move"), //背景3D层
        canMoveHeroImage = true,
        win = { width:1700, height:1800};
    //节流函数
    function throttle(fn, delay) {
        var allowSample = true;
        return function(e) {
            if (allowSample) {
                allowSample = false;
                setTimeout(function() { allowSample = true; }, delay);
                fn(e);
            }
        };
    }
    //伪3D函数
    document.querySelectorAll('#phone_show>div>.te>li')[i-1].addEventListener('mousemove', throttle(function(ev) {
		
        if( !canMoveHeroImage ) return false;
        var xVal = -1/(win.height/2)*ev.clientY + 1,
            yVal = 1/(win.width/2)*ev.clientX - 1,
            transX = 20/(win.width)*ev.clientX - 10,
            transY = 20/(win.height)*ev.clientY - 10,
            transZ = 100/(win.height)*ev.clientY - 50;

        bg_3D_move[0].style.transform = 'perspective(1000px) translate3d(' + transX + 'px,' + transY + 'px,' + transZ + 'px) rotate3d(' + xVal + ',' + yVal + ',0,2deg)';
    }, 100));
		/*******结束****/
}
add('#plus_photo>a>.bg-move');
add("#phone_show>.te>li>a>.bg-move");
add1(1);
add1(2);
add1(3);
add1(4);
dostarts();
/*document.getElementById('startsStart').onclick = function(e){
    e.preventDefault();
    document.getElementById('startsbox').style.display='block';
}*/
/*document.getElementById('startsOver').onclick = function(e){
    e.preventDefault();
    document.getElementById('startsbox').style.display='none';
}*/
function dostarts(){
    var canvas = document.getElementById('starts');
    var ctx = canvas.getContext('2d');
    //定义星星
    function produtStart(x,y){
        if(!x&&!y){
            var x = Math.random()*canvas.width;
            var y = Math.random()*canvas.height;
        }
        var directionX = Math.random()>0.4?1:(-1),directionY = Math.random()>0.4?1:(-1);
        var addX = parseFloat(Math.random()*0.3+0.01).toFixed(2);
        var addY = parseFloat(Math.random()*0.3+0.01).toFixed(2);
        var rad = parseFloat(Math.random()*3+0.5).toFixed(2);
        var color = rgb();//'rgb(255,255,255)'
        var start = {
            'x':x,
            'y':y,
            'directionX':directionX,
            'directionY':directionY,
            'addX':addX,
            'addY':addY,
            'rad':rad,
            'color':color
        };
        return start;
    }
    //定义星星群
    var slen = 99;//parseInt(Math.random()*50+80);
    var starts = new Array(slen);
    for(var i=0;i<slen;i++){
        var start =  produtStart();
        starts[i] = start;
    }
    //更新画布
    function update(){
        ctx.beginPath();
		img=new Image();
		img.src='images/img_75f5025a_stars_bg.png';
		var ptrn=ctx.createPattern(img,'repeat');
        ctx.fillStyle =ptrn
        //ctx.fillStyle = 'rgba(000,000,000,0.41)';
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.closePath();
        ctx.fill();//背景图

        for(var i=0;i<starts.length;i++){
            var s =starts[i];
            ctx.fillStyle = s.color;

            ctx.beginPath();
            if(s.x>=canvas.width+ s.rad*3){
                s.directionX = -1;
            }else if(s.x<=(-10)){
                s.directionX = 1;
            }
            if(s.y>=canvas.height+ s.rad*3){
                s.directionY = -1;
            }else if(s.y<=(-10)){
                s.directionY = 1;
            }
            s.x += s.addX* s.directionX;
            s.y += s.addY* s.directionY ;
            ctx.arc(s.x,s.y, s.rad,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();//绘制星星
        }//绘制星星
        //绘制连线
        for(var i=0;i<starts.length;i++){
            for (var j=0;j<starts.length;j++) {
                var rad = Math.sqrt(Math.pow((starts[j].x - starts[i].x), 2)+Math.pow((starts[i].y - starts[j].y), 2));
                if (rad <= 120
                    &&(Math.abs((starts[i].x - starts[j].x))<120)
                    &&(Math.abs((starts[i].y - starts[j].y))<120)) {
                    ctx.beginPath();
                    var liwidth = rad / 850;
                    if(rad>=50){liwidth = 4 / rad;}
                    if(rad>=70){liwidth = 3 / rad;}
                    if(rad>=90){liwidth = 0.1 / rad;}
                    ctx.lineWidth = liwidth;
                    var o = 50 / rad ;
                    ctx.strokeStyle = 'rgba(255,255,255,' + o + ')';//rgb();
                    ctx.moveTo(starts[j].x, starts[j].y);
                    ctx.lineTo(starts[i].x, starts[i].y);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }
    //调用定时器，星星动起来
    var timer = setInterval(update,20);

    //鼠标点击添加星星事件
    canvas.onclick = function(e){
        start = produtStart(e.offsetX, e.offsetY);
        starts[starts.length] = start;
    }
    function rgb(){
        var r =250 //parseInt(Math.random()*185+70);
        var g =250 //parseInt(Math.random()*185+70);
        var b =250 //parseInt(Math.random()*185+70);
        //var a = Math.random();
        return  `rgb(${r},${g},${b})`;
    }
}
