function parseDateRange(string) {
	var vals = string.split(' - ');
	return moment(vals[0], 'MM DD YYYY').twix(vals[1], 'MM DD YYYY');
}

function getDateRanges() {
	return $('.date-range').map(function (i, inputEl) {
		return parseDateRange($(inputEl).val());
	}).get();
}

$( document ).ready( function(){

		var cppMaxEarning = 54900;
		var cppExemptAmount = 3500;
		var eiMaxEarning = 50800;
		var cppPerc =  0.0495;
		var eiPerc = 0.0192;

		var year = 2016;
		var jan1 = new Date(year, 00, 01);
		var day  = moment(new Date (date('16 weeks',jan1))).format("MMMM Do") ;

		var payPeriods = [4, 2, 2, 1];

		
	

		$("#submitButton").click(function(e){
			e.preventDefault();

			if (!validateDateRanges()){
				return;
			}

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

			var ranges = getDateRanges();

			function payoffDateReducer (acc, range, i, arr) {
				if (acc.payoffDate) {
					return acc;
				} else if (acc.weeksRemaining <= range.length('weeks')) {
					return {
						weeksRemaining: 0,
						payoffDate: range.start().add(acc.weeksRemaining, 'weeks')
					};
				} else {
					return {
						weeksRemaining: acc.weeksRemaining - range.length('weeks'),
						payoffDate: undefined
					};
				}
			}

			var dayCpp = ranges
				.reduce(payoffDateReducer, {weeksRemaining: weeksOfPayCPP, payoffDate: undefined})
				.payoffDate;

			var dayEI = ranges
				.reduce(payoffDateReducer, {weeksRemaining: weeksOfPayEI, payoffDate: undefined})
				.payoffDate;

			$("#results").removeClass("alert alert-danger");

			if(compensation< eiMaxEarning){

					$("#results").html("I'm sorry, it looks like this calculator doesn't think you'll max out your CPP or EI. You need to make at least $" +  eiMaxEarning + " in a year.");

					$("#results").addClass("alert alert-danger");
			} else {

				var response = "Your CPP contribution is $" + Math.round(amountPerPay*cppPerc) + " per pay and your EI contribution is $" + Math.round(amountPerPay*eiPerc) + ". " + 

				"<br/><br/>You should max out your CPP Contributions on your " + nth(Math.ceil(resultCPP))+ " pay. "+
				"<br/>You should max out your EI Contributions on your " + nth(Math.ceil(resultEI))+ " pay. ";

				if (dayCpp && dayEI) {
					response += "<br/><br/>Very very roughly this means " +dayCpp.format("MMMM Do") + " for CPP and " + dayEI.format("MMMM Do")+ " for EI."
				} else {
					response += "<br/><br/>";
					if (!dayCpp && !dayEI) {
						response += "It looks like you might not have enough pay periods to max out CPP nor EI contributions.";
					} else if (!dayCpp) {
						response += "It looks like you might not have enough pay periods to max out CPP contributions. Very very roughly your EI will max out on " + dayEI.format("MMMM Do");
					} else if (!dayEI) {
						response += "It looks like you might not have enough pay periods to max out EI contributions. Very very roughly your EI will max out on " + dayCpp.format("MMMM Do");
					}
				}


				$("#results").html(response);
		}

			
			$("#results").css("visibility","visible");

			ga('send','event', 'submitClick',numPays,"Number of pays per year");


		});

		var seasonGroupTemplate = $('#seasonGroupTemplate').html();

		var dateRangePickerOptions = {
			autoApply: true,
			startDate: moment('01-01-' + year, 'MM DD YYYY'),
			endDate: moment('12-31-' + year, 'MM DD YYYY'),
		};

		function getInvalidateDateRanges () {
			return getDateRanges().filter(function (range, i, array) {
				return array.reduce(function (isOverlapping, otherRange, j) {
					if (i === j) {
						return false;
					}
					return range.overlaps(otherRange);
				}, false);
			});
		};

		function warnInvalidDateRanges () {
			$("#results").addClass("alert alert-danger");
			$("#results").html("Your work periods are overlapping");
			$("#results").css("visibility","visible");
		}

		function validateDateRanges () {
			var isValid = !getInvalidateDateRanges().length;
			if (!isValid) {
				warnInvalidDateRanges();
			}
			return isValid;
		}

		function initDateRange ($input) {
			$input.daterangepicker(dateRangePickerOptions);
			$input.on('change', function (e) {
				validateDateRanges();
			})
		}

		initDateRange($('.date-range'));

		$('.add-season-btn').click(function () {
			if (!validateDateRanges()) {
				return;
			}
			var seasonFragment = $(seasonGroupTemplate);
			initDateRange(seasonFragment.find('.date-range'))
			$('.seasonal-options').append(seasonFragment);
			return false;
		});

		$('.seasonal-options').on('click', '.remove-season-btn', function (e) {
			$(e.target).closest('.seasons-group').remove();
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