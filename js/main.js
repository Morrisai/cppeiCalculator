$( document ).ready( function(){

		var cppMaxEarning = 52500;
		var cppExemptAmount = 3500;
		var eiMaxEarning = 48600;
		var cppPerc =  0.0495;
		var eiPerc = 0.0192;

		var jan1 = new Date(2014, 00, 01);
		var day  = moment(new Date (date('16 weeks',jan1))).format("MMMM Do") ;

		var payPeriods = [4, 2, 2, 1];

		
	

		$("#submitButton").click(function(e){
			e.preventDefault();

			var ytd =  parseInt($("#ytdInput").val().replace(/,/g, ''));


			var compensation = parseInt($("#compensationInput").val().replace(/,/g, ''));

			//console.log(compensation);
			if(isNaN(compensation)){
				var dayOfYear = moment().dayOfYear();

				compensation = 365/dayOfYear * ytd;

				
			}
			compensation = isNaN(compensation) ? 0 : compensation;
		
			var numPays = parseInt($("#numPaysSelect").val());

			var amountPerPay= compensation / numPays;
			var resultCPP =   (cppMaxEarning-cppExemptAmount) / amountPerPay;
			var resultEI =  eiMaxEarning / amountPerPay;

			var weeksOfPayCPP = Math.round(resultCPP*payPeriods[$("#numPaysSelect")[0].selectedIndex]);
			var weeksOfPayEI = Math.round(resultEI*payPeriods[$("#numPaysSelect")[0].selectedIndex]);

			

			var dayCpp  = moment(new Date (date( weeksOfPayCPP+' weeks',jan1))).format("MMMM Do") ;

			var dayEI  = moment(new Date (date( weeksOfPayEI+' weeks',jan1))).format("MMMM Do") ;

			$("#results").removeClass("alert alert-danger");

			if(compensation< eiMaxEarning){

					$("#results").html("I'm sorry, it looks like this calculator doesn't think you'll max out your CPP or EI. You need to make at least $" +  eiMaxEarning + " in a year.");

					$("#results").addClass("alert alert-danger");
			} else {


			$("#results").html("Your CPP contribution is $" +Math.round(amountPerPay*cppPerc) + " per pay and your EI contribution is $" + Math.round(amountPerPay*eiPerc) +". "+ 

				"<br/><br/>You should max out your CPP Contributions on your " + nth(Math.ceil(resultCPP))+ " pay. "+
				"<br/>You should max out your EI Contributions on your " + nth(Math.ceil(resultEI))+ " pay. "+

				"<br/><br/>Roughly this means " +dayCpp + " for CPP and " + dayEI+ " for EI."


				);
		}

			$(window).scrollTop($('#results').offset().top);
			$("#results").css("visibility","visible");

			ga('send','event', 'submitClick',numPays,"Number of pay periods per year");


		});
		
		

		function nth(d) {

			var suffix;

		  if(d>3 && d<21) suffix= 'th'; // thanks kennebec

		  switch (d % 10) {
		        case 1:  suffix= "st" 
		        break;
		        case 2:  suffix = "nd"
		         break;
		        case 3:  suffix= "rd"
		         break;
		        default: suffix= "th"
		         break;
		    }
		  if(d>10 && d<14){
		  	suffix = suffix= "th"; 
		  }
		   
		    return d+suffix;
		} 

} )