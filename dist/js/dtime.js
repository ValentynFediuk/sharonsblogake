function dtime_me(e,t){var a=new Date,e=(a.setDate(a.getDate()+e+1),""),n=(a.getDate()<10&&(e="0"),e+=a.getDate(),"");a.getMonth()+1<10&&(n="0"),n+=a.getMonth()+1,!0===t?document.write(e+"/"+n+"/"+a.getFullYear()):document.write(n+"/"+e+"/"+a.getFullYear())}function dtime_mt(e){var t=new Date;t.setDate(t.getDate()+e+1),document.write(t.getDate()+",  "+months_localized.en[t.getMonth()]+" "+t.getFullYear())}months_localized={en:["January","February","March","April","May","June","July","August","September","October","November","December"]},days_localized={en:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]};