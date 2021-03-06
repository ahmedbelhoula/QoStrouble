	/*----------------------------------------------------------
	                          JavaScript du test Ping
	------------------------------------------------------------*/
	
	
/*----------------------------------------------------------
	                          Variables globales du programme
	------------------------------------------------------------*/
var intervale = null;	
var nb = 0;
var nombre = 0;
var nbrRec = 0;
var tmin = 9999999999;
var tmax = 0;
var t = 0;
var first = 0;
var first2 = 0;
var prog = true;
var isFirst = true;
var isFinished = false;
var boucle = false;
var cpt = 0;
var isOk = false;
var n = 0; 
var timeoutID;
var fais = false;
var tous = 0;
var echec = 0;
var fail = false;
var insert = 0;
var startCap = false;

var daysleft = 0;
var hoursleft = 0;
var minutesleft = 0;			
var secondsleft = 0;
var millisecondsleft = 0;

var daysleft2 = 0;
var hoursleft2 = 0;
var minutesleft2 = 0;			
var secondsleft2 = 0;
var millisecondsleft2 = 0;
var duree = 0;
var pro = false;
var begin = true;

/*----------------------------------------------------------
	                          Fonction qui arrete l'exécution de tous les scripts en cours d'exécution
	------------------------------------------------------------*/
function StopScript()
{
clearInterval(intervale);
initialise();
setTimeout(stopCapture, 500);
} 

/*----------------------------------------------------------
	                          Fonction d'export des tableaux aux fichiers excel
	------------------------------------------------------------*/

function exportFunction()
{
			 var tab_text = '<table border="1px" style="font-size:20px" ">';
    var textRange; 
    var j = 0;
    var tab = document.getElementById('resDetail'); // id of table
    var lines = tab.rows.length;
    var html = tab.outerHTML;
  
    if (lines > 0) {
        tab_text = tab_text + '<tr bgcolor="#DFDFDF">' + tab.rows[0].innerHTML + '</tr>';
    }

    // table data lines, loop starting from 1
    for (j = 1 ; j < lines; j++) {     
        tab_text = tab_text + "<tr>" + tab.rows[j].innerHTML + "</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");           
    tab_text = tab_text.replace(/<img[^>]*>/gi,"");                 
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");    
   

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa = txtArea1.document.execCommand("SaveAs", true, "DataTableExport.xls");
    }  
    else 
        sa = window.open('data:application/vnd.ms-excel,' + escape(html));  
    return (sa);

} 
/*----------------------------------------------------------
	                          Fonction qui dessine le graphique du taux de succées
	------------------------------------------------------------*/
function tauxsucces(y1, y2) {
	 chart2 = new CanvasJS.Chart("taux",
	{
exportEnabled: true,
		title:{
			text: "Success rate"
		},
                animationEnabled: false,
		legend:{
			
			fontSize: 20,
			fontFamily: "Helvetica"        
		},
		theme: "theme2",
		data: [
		{        
			type: "pie",       
			indexLabelFontFamily: "Garamond",       
			indexLabelFontSize: 20,
			indexLabel: "{label} {y}%",
			startAngle:-20,      
			showInLegend: true,
			toolTipContent:"{legendText} {y}%",
			dataPoints: [
				{  y: y1, legendText:"Successd", label: "Successd" },
				{  y: y2, legendText:"Fail", label: "Fail" },
				
			]
		}
		]
	});
	chart2.render();
}


/*----------------------------------------------------------
	                          Fonction qui annalyse le résultat envoyé par le script perl ping.js, 
							  détermine le statut du test (succées ou echec), récupére le temps de réponse,
							  et affiche les résultats dans les tableaux et les graphiques
	------------------------------------------------------------*/
function getStatut(id,id2, data, date, heure, nbr)
{
var data1 = data;
var nbTran = 0;
var nbRec = 0;
var temps = 0;
var nbrRec = nbr;
var j =7;
var dernier = -1;
for (var i = 0;i<data.length-11;i++)
{
var transmitted = data1.substring(i, i+11);
var received = data1.substring(i, i+8);
var time = data1.substring(i, i+4);
if (transmitted == "transmitted") nbTran = data1.substring(i-10, i-9); //Récupération du nombre de messages envoyés
if (received == "received") nbRec = data1.substring(i-2, i-1); //Récupération du nombre de messages reçus
if (nbTran == nbRec)
{
if (time == "mdev")
	{ 
	var x = data1.substring(i+j, i+j+1);
        while ((x != "/"))
		{
		temps += x;
                j++;
		var x = data1.substring(i+j, i+j+1);
		}
	}
 var temps2 = temps.toString().substring(1,temps.length); //Temps de réponse
}

}

//Insertion dans le tableau
 if (  $(".scrollit").css("height") == "75px") $(".scrollit").css("height", "125px") ;
               else if (  $(".scrollit").css("height") == "125px") $(".scrollit").css("height", "175px") ;
              else if (  $(".scrollit").css("height") == "175px") $(".scrollit").css("height", "225px") ;
              else if (  $(".scrollit").css("height") == "225px") $(".scrollit").css("height", "300px") ;

if (nbTran == nbRec)
	{
               
		$("#resDetail").append("<tr><td>"+id+"</td><td>Success</td><td>"+temps2+"</td><td>"+(date+" "+heure)+"</td></tr>");
$("#resDetail tr:last").attr('class', 'success');
nbrRec++;
 
	}

else 
	{
 	fail = true;
         tmin = NaN;tmax = NaN; temps2 = NaN;
	$("#resDetail").append("<tr><td>"+(echec+1)+"</td><td>Failed</td><td>"+temps2+"</td><td>"+(date+" "+heure)+"</td></tr>");
      $("#resDetail tr:last").attr('class', 'danger');
	echec++;
	
	}
tous++;
if (temps2!=NaN)
{
t = t + parseFloat(temps2);
if (tmin > parseFloat(temps2)) tmin = parseFloat(temps2);
if (tmax < parseFloat(temps2)) 
{
tmax = parseFloat(temps2);
}
}
$('#resRec tr:last').remove();



if ((fail==true))
{
if (echec<id2) id2=echec;
$("#resRec").append("<tr><td>"+id2+"</td><td>"+(nbrRec*100/id2)+"%</td><td>"+tmin+"</td><td>"+(t/id2).toFixed(3)+"</td><td>"+tmax+"</td></tr>");
       //Affichage dans résultats dans les graphiques en temps réels 
        timme2 = new Date;
        timme.setTime(timme.getTime()+750);
        dataPoints1.push({
					x: timme2.getTime(),
y: y,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					

				});
dataPoints2.push({
					x: timme2.getTime(),
y: tmin,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					
				});

dataPoints3.push({
					x: timme2.getTime(),
y: tmax,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					
				});
			chart.options.data[0].legendText = " Temps moyen : "+ (t/id2).toFixed(3) ;;
			chart.options.data[1].legendText = " Temps min : "+tmin; 
			chart.options.data[2].legendText = " Temps max : "+tmax; 

        chart.render();
tauxsucces((nbrRec*100/id2),100-(nbrRec*100/id2));
chart2.render();


}

else 
{
if ((echec>id2)) id2=echec;
$("#resRec").append("<tr><td>"+id2+"</td><td>"+(nbrRec*100/id2)+"%</td><td>"+tmin+"</td><td>"+(t/id2).toFixed(3)+"</td><td>"+tmax+"</td></tr>");
	//y +=  Math.random() ;	
	y =  (t/id2).toFixed(3) ;
        y = parseFloat(temps2);
        timme2 = new Date;
        timme.setTime(timme.getTime()+750);
        dataPoints1.push({
					x: timme2.getTime(),
					y: y
				});
dataPoints2.push({
					x: timme2.getTime(),
					y: tmin
				});

dataPoints3.push({
					x: timme2.getTime(),
					y: tmax
				});
			 
chart.options.data[0].legendText = " Temps moyen : "+(t/id2).toFixed(3)+ " Temps min : "+ tmin + " Temps max : "+tmax ;
        chart.render();
tauxsucces((nbrRec*100/id2),100-(nbrRec*100/id2));
chart2.render();


}
if ((insert % n ==0)&&(fail==true)) $("#resDetail").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
$('#r1 span').text(tmin.toString());
$('#r2 span').text((t/id2).toFixed(3));
$('#r3 span').text(tmax);
$('#r4 span').text((nbrRec*100/id2));
return nbrRec;

}
/*----------------------------------------------------------
	                          Fonction tarde l'exécution de 700 ms afin que la capture tshark démarre correctement
	------------------------------------------------------------*/
function start0()
{
startCapture();
setTimeout(start, 700);
return false;
}
/*----------------------------------------------------------
	                          Fonction qui lance l'exécution du script client à travers une requete ajax
	------------------------------------------------------------*/
function start()

{

if (pro==true)
{
nombre = $('#lab22').attr('value');
duree = $('#lab32').attr('value');
}
else
{
nombre = $('#lab2').attr('value');
duree = $('#lab3').attr('value');
}
if (nombre==0) nombre=1;
var value = 750;
var lab = $('#lab').attr('value');
var OptionT = $('#OptionT').is(':checked');
var OptionC = $('#OptionC').is(':checked');
var OptionCText = $('#OptionCText').attr('value');
var OptionW = $('#OptionW').is(':checked');
var OptionWText = $('#OptionWText').attr('value');
var OptionS = $('#OptionS').is(':checked');
var OptionSText = $('#OptionSText').attr('value');
var Interface = "eth0";
var OptionD = $('#OptionD').is(':checked');
if ((OptionT == false)&&(OptionC == true)) n= OptionCText;
if ((OptionT == false)&&(OptionC == false)) n= 4 ;
//if (OptionT == true) n = 1;

var ini = false;
if (startCap == false) 
{
startCapture();
}
startCap = true;

if ((intervale == null) && ($('#OptionC').is(':checked')) && (n!=1)) intervale = setInterval(arguments.callee, value); 
if ((intervale == null) && ($('#OptionT').is(':checked')) ) intervale = setInterval(arguments.callee, value); 
if ((intervale == null) && ($('#OptionT').is(':checked') == false) && ($('#OptionC').is(':checked') == false) ) intervale = setInterval(arguments.callee, value); 
if (prog==true)
{
if ((nb==n-1) && ($('#OptionT').is(':checked')==false) ) 
{
clearInterval(intervale);
ini = true;
}
}
else
{

if ((nb==n-1) && ($('#OptionT').is(':checked')==false)  ) 
{
clearInterval(intervale);
ini = true;
}
}
var d = new Date();
var date = d.getDate() + "/" + (d.getMonth()+1)  + "/" +  d.getFullYear() ;
var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

 var request = $.ajax({
        type: "POST",
        url: "perl/ping.pl",
        data :  {"lab": lab, "OptionT": OptionT, "OptionC": OptionC, "OptionCText" : OptionCText,"OptionW": OptionW, "OptionWText" : OptionWText,"OptionS": OptionS, "OptionSText" : OptionSText,"Interface": Interface, "OptionD": OptionD},
		

        // script call was *not* successful
        error: function() { 
            alert("script call was not successful");
        }, 
        success: function(perl_data){
		
            if (perl_data=="") 
		{
			perl_data="ping: unknown host "+lab;
                        StopScript();
		}
	    var node = document.createElement("li");                 // Create a <li> node
            var textnode = document.createTextNode(perl_data);         // Create a text node
            node.appendChild(textnode);                              // Append the text to <li>
            document.getElementById("lis").appendChild(node);
 	    if (perl_data != "ping: unknown host "+lab) nbrRec = getStatut(nb,(nb+cpt*n) ,perl_data, date, time,nbrRec);
            
	    insert++;
            fais = true;
	    if ((ini == true) && (insert==n) &&(nb==n)) initialise();
      
if ((pro==true)) 
{
if ($('#nbr').is(':checked'))
{
  if (nb==n)
		{
			isOk = true;
			cpt++;
		}
		
            if ((isOk == true) && (cpt<nombre))
		{
			isOk = false;
			intervale = null;
			nb = 0;
      if (fail == false) $("#resDetail").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
                           
			timeoutID = setTimeout(start, parseInt(duree)*1000); 
		}
                if ((cpt==nombre)&&(nb==n)) setTimeout(stopCapture, 500);
}


if ($('#periode').is(':checked'))
{
if (nb==n)
		{
			isOk = true;
			cpt++;
		}
if ((isOk == true) )
		{
                        
			isOk = false;
			intervale = null;
			nb = 0;
      			if (fail == false) $("#resDetail").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
			timeoutID = setTimeout(start, parseInt(duree)*1000); 
		}
}


} 
if (pro==false)
{
 	    if (nb==n)
		{
			isOk = true;
			cpt++;
		}
		
            if ((isOk == true) && (cpt<nombre))
		{
			isOk = false;
			intervale = null;
			nb = 0;
      if (fail == false) $("#resDetail").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
			timeoutID = setTimeout(start, parseInt(duree)*1000); 
		}
  if ((cpt==nombre)&&(nb==n)) setTimeout(stopCapture, 500);
}
	
       } });
		


{
nb++;
fais = false;
}

return false;

}



 $(document).ready(function(){
 $("form#loginForm").submit(start0)
});

/*----------------------------------------------------------
	                          Fonction de count down pour programmer un test
	------------------------------------------------------------*/

function cd(){
var fin = false;
if (isFirst==true)
{

      if (first==0)
{
end = new Date();

end.setHours(end.getHours()+hoursleft);
end.setMinutes(end.getMinutes()+minutesleft);
end.setSeconds(end.getSeconds()+secondsleft);
end.setMilliseconds(end.getMilliseconds()+millisecondsleft);
first++;
}


	now = new Date();
	//diff = end - now;
	//diff = new Date(diff);
	//var msec = diff.getMilliseconds();
	//var sec = diff.getSeconds();
	//var min = diff.getMinutes();
	//var  hr = diff.getHours()-1; 

  var day=Math.floor((end-now)/(24*60*60*1000));
  var hr=Math.floor(((end-now)%(24*60*60*1000))/(60*60*1000));
  var min=Math.floor(((end-now)%(24*60*60*1000))/(60*1000))%60;
  var sec=Math.floor(((end-now)%(24*60*60*1000))/1000)%60%60;
  msec = Math.floor(((end-now)%(24*60*60*1000))/1000*1000)%1000;
if (day < 10){
		day = "0" + day;
	}

if (hr < 10){
		hr = "0" + hr;
	}	
if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec = "0" + sec;
	}
	if(msec < 10){
		msec = "00" +msec;
	}
	else if(msec < 100){
		msec = "0" +msec;
	}
	if(now >= end){
                secondsleft = 0;
		millisecondsleft = 0;
		clearTimeout(timerID);
		if (prog == true) 
			{
				boucle = true;
				intervale = null;
				programmer2();
				start0();
                        
				prog = false;
			}
	       document.getElementById("cdtime").innerHTML = "00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;000";	
 		fin = true;
	}
	else{

	document.getElementById("cdtime").innerHTML = day+"&nbsp;"+ ":&nbsp;" + hr+"&nbsp;" + ":&nbsp;" + min +"&nbsp;"+ ":&nbsp;" + sec+"&nbsp;" + ":&nbsp;" + msec;
	}		// you can leave out the + ":" + msec if you want...
			// If you do so, you should also change setTimeout to setTimeout("cd()",1000)
	if (fin ==false)  timerID = setTimeout("cd()", 10); 
}
}


/*----------------------------------------------------------
	                          Fonction cout down pour arreter le test
	------------------------------------------------------------*/


function cd2(){
isFirst = false;
var fin = false;
      if (first2==0)
{
end = new Date();
end.setHours(end.getHours()+hoursleft2);
end.setMinutes(end.getMinutes()+minutesleft2);
end.setSeconds(end.getSeconds()+secondsleft2);
end.setMilliseconds(end.getMilliseconds()+millisecondsleft2);
first2++;
}

	now = new Date();
	//diff = end - now;
	//diff = new Date(diff);
	 var day=Math.floor((end-now)/(24*60*60*1000));
  	var hr=Math.floor(((end-now)%(24*60*60*1000))/(60*60*1000));
  	var min=Math.floor(((end-now)%(24*60*60*1000))/(60*1000))%60;
  	var sec=Math.floor(((end-now)%(24*60*60*1000))/1000)%60%60;
  	msec = Math.floor(((end-now)%(24*60*60*1000))/1000*1000)%1000;
if (day < 10){
		day = "0" + day;
	}

if (hr < 10){
		hr = "0" + hr;
	}	

if (min < 10){
		min = "0" + min;
	}
	if (sec < 10){
		sec = "0" + sec;
	}
	if(msec < 10){
		msec = "00" +msec;
	}
	else if(msec < 100){
		msec = "0" +msec;
	}
	if(now >= end){
                secondsleft2 = 0;
		millisecondsleft2 = 0;
		clearTimeout(timerID);
                isFinished = true;
		StopScript();
		clearTimeout(timeoutID);
                setTimeout(stopCapture, 500);
 		intervale = null;
	        document.getElementById("cdtime3").innerHTML = "00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;000";	
                fin = true;	
	}
	else{

	document.getElementById("cdtime3").innerHTML = day+"&nbsp;"+ ":&nbsp;" + hr+"&nbsp;" + ":&nbsp;" + min +"&nbsp;"+ ":&nbsp;" + sec+"&nbsp;" + ":&nbsp;" + msec;
	}		
	if (fin ==false) timerID = setTimeout("cd2()", 10); 
}

/*----------------------------------------------------------
	                          Fonction pour détecter quand est ce que le test sera démmaré
	------------------------------------------------------------*/
 
function programmer()
{
pro = true;
isFirst = true;
first = 0;
if($('#30s').is(':checked')) 
{
secondsleft = 5;
cd();
}
else if($('#1min').is(':checked')) 
{
minutesleft = 1;	
cd();
}

else if($('#2min').is(':checked')) 
{
minutesleft = 2;	
cd();
}
else if($('#5min').is(':checked')) 
{
minutesleft = 5;	
cd();
}
else if($('#10min').is(':checked')) 
{
minutesleft = 10;	
cd();
}
else if($('#15min').is(':checked')) 
{
minutesleft = 15;	
cd();
}
else if($('#30min').is(':checked')) 
{
minutesleft = 30;	
cd();
}
else if($('#60min').is(':checked')) 
{
minutesleft = 60;	
cd();
}
else if($('#jr').is(':checked')) 
{
var x1="";var x2="";var x3="";var y1="";var y2="";
var x = document.getElementById("datepicker").value;
for (var i=8;i<10;i++) x1 += x.substring(i, i+1);
for (var i=5;i<7;i++) x2 += x.substring(i, i+1);
for (var i=0;i<4;i++) x3 += x.substring(i, i+1);
var y = document.getElementById("rdvT").value;
for (var i=0;i<2;i++) y1 += y.substring(i, i+1);
for (var i=3;i<5;i++) y2 += y.substring(i, i+1);

var glob = parseInt(y2) + (parseInt(y1)*60);
var d1 = new Date(x3+'/'+x2+'/'+x1+' '+y1+':'+y2+':00');

now = new Date();
	//diff = end - now;
	//diff = new Date(diff);
	 var day=Math.floor((d1-now)/(24*60*60*1000));
  	var hr=Math.floor(((d1-now)%(24*60*60*1000))/(60*60*1000));
  	var min=Math.floor(((d1-now)%(24*60*60*1000))/(60*1000))%60;
  	var sec=Math.floor(((d1-now)%(24*60*60*1000))/1000)%60%60;
  	msec = Math.floor(((d1-now)%(24*60*60*1000))/1000*1000)%1000;

minutesleft = (day*24*60)+(hr*60)+(min);
secondsleft = sec;
millisecondsleft = msec;	
cd();
}
else if($('#autre').is(':checked')) 
{
var mm = parseInt($('#dans').attr('value'));

minutesleft = parseInt($('#dans').attr('value'));

cd();
}
}


/*----------------------------------------------------------
	                          Fonction pour détecter quand est ce que le test sera fini
	------------------------------------------------------------*/
function programmer2()
{
isFirst2 = true;
first2 = 0;
if($('#30s2').is(':checked')) 
{
secondsleft2 = 30;
cd2();
}
else if($('#1min2').is(':checked')) 
{
minutesleft2 = 1;	
cd2();
}

else if($('#2min2').is(':checked')) 
{
minutesleft2 = 2;	
cd2();
}
else if($('#5min2').is(':checked')) 
{
minutesleft2 = 5;	
cd2();
}
else if($('#10min2').is(':checked')) 
{
minutesleft2 = 10;	
cd2();
}
else if($('#15min2').is(':checked')) 
{
minutesleft2 = 15;	
cd2();
}
else if($('#30min2').is(':checked')) 
{
minutesleft2 = 30;	
cd2();
}
else if($('#60min2').is(':checked')) 
{
minutesleft2 = 60;	
cd2();
}
else if($('#infini').is(':checked')) 
{
document.getElementById("cdtime3").innerHTML = "Indéfini";
}

else if($('#jr2').is(':checked')) 
{
var x1="";var x2="";var x3="";var y1="";var y2="";
var x = document.getElementById("datepicker2").value;
for (var i=8;i<10;i++) x1 += x.substring(i, i+1);
for (var i=5;i<7;i++) x2 += x.substring(i, i+1);
for (var i=0;i<4;i++) x3 += x.substring(i, i+1);
var y = document.getElementById("rdvT2").value;
for (var i=0;i<2;i++) y1 += y.substring(i, i+1);
for (var i=3;i<5;i++) y2 += y.substring(i, i+1);

var glob = parseInt(y2) + (parseInt(y1)*60);
var d1 = new Date(x3+'/'+x2+'/'+x1+' '+y1+':'+y2+':00');

now = new Date();
	//diff = end - now;
	//diff = new Date(diff);
	 var day=Math.floor((d1-now)/(24*60*60*1000));
  	var hr=Math.floor(((d1-now)%(24*60*60*1000))/(60*60*1000));
  	var min=Math.floor(((d1-now)%(24*60*60*1000))/(60*1000))%60;
  	var sec=Math.floor(((d1-now)%(24*60*60*1000))/1000)%60%60;
  	msec = Math.floor(((d1-now)%(24*60*60*1000))/1000*1000)%1000;

minutesleft2 = (day*24*60)+(hr*60)+(min);
secondsleft2 = sec;
millisecondsleft2 = msec;	
cd2();
}

else if($('#autre2').is(':checked')) 
{
minutesleft2 = parseInt($('#dans2').attr('value'));
cd2();
}
}
/*----------------------------------------------------------
	                          Fonction pour détecter lequel des radio boutons est sélectionné
	------------------------------------------------------------*/
function ifcheck()
{
if($('#30s2').is(':checked') || ($('#1min2').is(':checked')) || ($('#2min2').is(':checked')) || ($('#5min2').is(':checked')) || ($('#10min2').is(':checked')) || ($('#15min2').is(':checked')) || ($('#30min2').is(':checked')) || ($('#60min2').is(':checked'))
|| ($('#infini').is(':checked')) || ($('#jr2').is(':checked')) || ($('#autre2').is(':checked'))) return true;
else return false;
}
/*----------------------------------------------------------
	                          Fonction pour annuler la programmation d'un test
	------------------------------------------------------------*/
function annuler()
{
daysleft = 0;
hoursleft = 0;
minutesleft = 0;			
secondsleft = 0;
millisecondsleft = 0;

daysleft2 = 0;
hoursleft2 = 0;
minutesleft2 = 0;			
secondsleft2 = 0;
millisecondsleft2 = 0;
first2 = 0;

var intervale = null;	
var i = 0;

cd();
document.getElementById("cdtime").innerHTML = "00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;000";
StopScript();
cd2();
document.getElementById("cdtime3").innerHTML = "00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;00&nbsp;:&nbsp;000";
isFinished = false;
	
}

/*----------------------------------------------------------
	                          Fonction démmarer une capture tshark à travers une requete ajax
	------------------------------------------------------------*/

function startCapture()
{
var total;
var nombre2 = nombre ;
if (parseInt(nombre2)==0) nombre2 = 1;
if (pro==false) total = ((750*n)/1000)*nombre2 +(duree)*(nombre2-1);
if (pro == true) total = secondsleft2 + (minutesleft2*60) + (millisecondsleft2/1000);
if ((pro==true) &&($('#infini').is(':checked'))) total = 0;
total = Math.round(total);
var tsharkOk = $('#tsharkOk').is(':checked');

var Interface = "eth0";

var tsharkOfset = $('#tsharkOfset').is(':checked');


var tsharkC = $('#tsharkC').is(':checked');
var tsharkCText = $('#tsharkCText').attr('value');

var tsharkPcap = $('#tsharkPcap').is(':checked');

var tsharkPcapng = $('#tsharkPcapng').is(':checked');

var filter = "icmp"

if (tsharkOk == true)
{
 var request2 = $.ajax({
        type: "POST",
        url: "perl/capture.pl",
	//dataType: "jsonp",
          data :  {"Interface": Interface, "tsharkC": tsharkC, "tsharkCText" : tsharkCText,"tsharkPcap": tsharkPcap, "tsharkPcapng" : tsharkPcapng, "total" : total, "filter" : filter, "tsharkOfset" : tsharkOfset},
		

        // script call was *not* successful
        error: function() { 
            alert("script call was not successful");
        }, 
        success: function(perl_data){
		
  }});
}
return false;

}

/*----------------------------------------------------------
	                          Fonction pour arreter la capture tshark
	------------------------------------------------------------*/

function stopCapture()
{

 var request4 = $.ajax({
        type: "GET",
        url: "perl/kill.pl",
		

        // script call was *not* successful
        error: function() { 
            alert("script call was not successful");
        }, 
        success: function(perl_data){
		
  }});
return false;

}



    var dataPoints1 = [];
    var dataPoints2 = [];
    var dataPoints3 = [];
    var y = 0;
    var y2 = 0;
    var limit = 50000;
    var chart;
    var chart2;
var yValue1 = 640; 
		var yValue2 = 604;

		var timme = new Date;

/*----------------------------------------------------------
	                          Fonction pour afficher les graphique en temps réels
	------------------------------------------------------------*/
		
 window.onload = function graphique() {
    
     chart = new CanvasJS.Chart("tempsChart",{
			zoomEnabled: true,
			exportEnabled: true,
			title: {
				text: "RTT"		
			},
			toolTip: {
				shared: true
				
			},
			legend: {
				verticalAlign: "top",
				horizontalAlign: "center",
                                fontSize: 14,
				fontWeight: "bold",
				fontFamily: "calibri",
				fontColor: "dimGrey"
			},
			axisX: {
				title: "Date"
			},
			axisY:{
				title: "Ms",
                                sufix: 'ms',
				includeZero: false
			}, 
			data: [{ 
				// dataSeries1
				type: "line",
				bevelEnabled: true,
				xValueType: "dateTime",
				showInLegend: true,
				name: "Temps moyen",
				dataPoints: dataPoints1
			}
			
],
          legend:{
            cursor:"pointer",
            itemclick : function(e) {
              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
              }
              else {
                e.dataSeries.visible = true;
              }
              chart.render();
            }
          }
		});

var updateInterval = 3000;
//updateChart(1);	
	

		var updateChart = function (count) {
			count = count || 1;

			// count is number of times loop runs to generate random dataPoints. 

			
				
				// add interval duration to time				
				//timme.setTime(timme.getTime()+ updateInterval);


				
				
				// pushing the new values
				dataPoints1.push({
					x: timme.getTime(),
					//y: yValue1
				});
				dataPoints2.push({
					x: timme.getTime(),
					//y: yValue2
				});


			

			// updating legend text with  updated with y Value 
			chart.options.data[0].legendText = " Average time : 0 "+ " Min time : 0"+ " max time : 0" ;
			

			chart.render();

		};

		// generates first set of dataPoints 
		updateChart(3000);
	
		 
		

if (begin) 
{
tauxsucces(60,40);
begin = false;
}
    
  }
/*----------------------------------------------------------
	                          Fonction pour désactiver les radio boutons
	------------------------------------------------------------*/
function disable2()
{

$("#30s2").attr('disabled', true);
$("#1min2").attr('disabled', true);
$("#2min2").attr('disabled', true);
$("#5min2").attr('disabled', true);
$("#10min2").attr('disabled', true);
$("#15min2").attr('disabled', true);
$("#30min2").attr('disabled', true);
$("#60min2").attr('disabled', true);
$("#infini").attr('disabled', true);
$("#autre2").attr('disabled', true);
$("#jr2").attr('disabled', true);
enable();
}

function enable2()
{

$("#30s2").attr('disabled', false);
$("#1min2").attr('disabled', false);
$("#2min2").attr('disabled', false);
$("#5min2").attr('disabled', false);
$("#10min2").attr('disabled', false);
$("#15min2").attr('disabled', false);
$("#30min2").attr('disabled', false);
$("#60min2").attr('disabled', false);
$("#infini").attr('disabled', false);
$("#autre2").attr('disabled', false);
$("#jr2").attr('disabled', false);
disable();
}

function disable()
{
$("#lab22").attr('disabled', true);
}

function enable()
{
$("#lab22").attr('disabled', false);
disable2();
}
/*----------------------------------------------------------
	                          Fonction pour afficher le bloc de programmation d'un test
	------------------------------------------------------------*/
function showschedDiv()
{
$("#schedDiv").show();

}
/*----------------------------------------------------------
	                          Fonction pour cacher le bloc de programmation d'un test
	------------------------------------------------------------*/
function hideschedDiv()
{
$("#schedDiv").hide();

}





		

