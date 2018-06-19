export default (d) => {

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