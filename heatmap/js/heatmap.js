$(document).ready(function(){
	
}); 

(function($) {
	$(function(e) {

		var userCheck=function(e){

			$.ajax({

				url:'/checkUser',
				type:'GET',
				async:false,
				success:function(data){

					if(data){

						var element="<button class='analyseButton' style='position: absolute;top: 16%;right: 3.8%;font-size: 2rem;color: #fff;background: #242424;border-style: none;border-radius: 21px;padding: 0.5% 1%'>Analize</button>";
						var dataElements=[];
						$('body').append(element);
					}
				}
			});		
		}

		userCheck();
		
		$('body').on("click",function(e){ 
			
			e.preventDefault();
			var element=$(e.target);
			var idName=$(element).attr("id");
			var leftMouse=parseInt(e.pageX);
			var rightMouse=parseInt(e.pageY);
			if(idName==undefined){

				var className=$(element).attr("class");
				if(className==undefined){

					element=$(element).parent();	
					while($(element).attr("class")==undefined && $(element).attr("id")==undefined){

						element=$(element).parent();
					}	

					if($(element).attr("id")!=undefined){

						idName=$(element).attr("id");
						idName= idName.split(" ")[0];
					}
					else{

						className=$(element).attr("class");
						className= className.split(" ")[0];
					}
				}
				else{

					var className= className.split(" ")[0];
				}
			}
			else{

				var idName= idName.split(" ")[0];
			}

			if(idName){

				var left=(leftMouse - parseInt($('#'+ idName).offset().left)); 		
				var top=(rightMouse - parseInt($('#'+ idName).offset().top)); 
				var obj={

					'Element':("#"+idName),
					'Top':top,
					'Left':left,
					'Count':1
				}		
			}
			else{

				var left=(leftMouse - parseInt($('.'+ className).offset().left)); 		
				var top=(rightMouse - parseInt($('.'+ className).offset().top)); 	
				var obj={

					'Element':("."+className),
					'Top':top,
					'Left':left,
					'Count':1
				}	
			}

			$.ajax({
				url: '/clickElements',
				type: 'GET',
				async:false,
				data: {
					'Element': (obj.Element),
					'Top': (obj.Top),
					'Left': (obj.Left),
					'Count': (obj.Count)
				}
			});
		});

		$('.analyseButton').click(function(e){

			e.preventDefault();
			
			analysisButton();
			createAnalysis();
		})

		var analysisButton = function(){

			var bodyTop=$('body').offset().top;
			var bodyWidth=$('body').width();
			var bodyHeight=$('body').height();
			var newElement="<canvas id='canvas' width="+parseInt(bodyWidth)+" height="+parseInt(bodyHeight)+" style='position:absolute; background-color: rgba(0,0,0,0.5); top:"+bodyTop+"px; width:"+bodyWidth+"px; height:"+bodyHeight+"px'></canvas>"; 
			$('body').append(newElement);

			$('#canvas').click(function(e){

				$('#canvas').remove();
				e.stopPropagation();
			})
		}

		var createAnalysis = function(){

			$.ajax({
				url: '/getElements',
				type: 'GET',
				async:false,
				success:function(data){

					var canvas = $('#canvas');
					for(var i=0;i<data.length;i++){

						var element=data[i]['Element'];
						var top=data[i]['Top'];
						var left=data[i]['Left'];
						var count=parseInt(data[i]['Count']);

						if($(element).length==0){continue;}

						var leftPixels= parseInt($(element).offset().left);
						var topPixels= parseInt($(element).offset().top);
						var totalLeftPixels= parseInt(leftPixels) + parseInt(left);
						var totalTopPixels= parseInt(topPixels) + parseInt(top);

						//canvas insert code						
						var context = canvas[0].getContext('2d');

						context.beginPath();
						context.arc(parseInt(totalLeftPixels), parseInt(totalTopPixels), 8, 0, 2 * Math.PI);
						
						var colorArray=['rgba(21, 21, 61, 1)','rgba(20, 20, 67, 1)','rgba(19, 19, 73, 1)','rgba(19, 19, 79, 1)','rgba(17, 32, 81, 1)','rgba(16, 72, 46, 1)','rgba(16, 48, 75, 1)','rgba(15, 55, 70, 1)','rgba(15, 64, 67, 1)','rgba(14, 83, 56, 1)','rgba(14, 73, 61, 1)','rgba(14, 83, 56, 1)','rgba(13, 92, 49, 1)','rgba(13, 101, 45, 1)','rgba(12, 110, 38, 1)','rgba(12, 119, 32, 1)','rgba(12, 130, 25, 1)','rgba(11, 140, 18, 1)','rgba(11, 151, 11, 1)','rgba(17, 154, 10, 1)','rgba(23, 157, 8, 1)','rgba(29, 160, 10, 1)','rgba(36, 163, 10, 1)','rgba(41, 165, 9, 1)','rgba(48, 168, 9, 1)','rgba(98, 186, 7, 1)','rgba(104, 188, 7, 1)','rgba(175, 209, 5, 1)','rgba(184, 212, 3, 1)','rgba(194, 214, 4, 1)','rgba(202, 216, 4, 1)','rgba(216, 219, 3, 1)','rgba(220, 220, 3, 1)','rgba(223, 205, 3, 1)','rgba(224, 201, 3, 1)','rgba(227, 186, 3, 1)','rgba(229, 169, 2, 1)','rgba(230, 164, 2, 1)','rgba(255, 0, 0, 1)'];
						
						if (count<39){

							var rgba= colorArray[count].toString();
						}
						else{

							var rgba= colorArray[38].toString();
						}

						context.fillStyle = rgba;
						context.fill();
						context.strokeStyle = rgba;
						context.stroke();
					}
				}
			});				
		}

		// var sendData = function() {
		// 	var dataClicks=JSON.stringify(dataElements);
		// 	dataElements = [];
		// 	$.ajax({
		// 		url: '/clickElements',
		// 		type: 'GET',
		// 		data: {
		// 			dataAll: dataClicks
		// 		}
		// 	});
		// }

		// // Send clicks every 30 seconds and on page leave
		// setInterval(sendData, 30000);
		// $(window).unload(sendData);

	})
})(jQuery)