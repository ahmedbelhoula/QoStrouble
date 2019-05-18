/*----------------------------------------------------------
	                          JavaScript du test http download
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
var timeoutID = null;
var timeoutID2 = null;
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
var saut = 0;
var ID=1;
var depart = 0;
var indice = 0;
var chart;
var chart3;
var dataPoints1 = [];
var dataPoints2 = [];
var dataPoints3 = [];
var dataPoints4 = [];
var chart2;
var chart4;
var chart5;
var d;
var stop = false;
var dlfinished = false;
var nbSize = 0;
var tot = 0;
var nbSize2 = 0;
var size2 = 0;
var kill =false;
var y=1;
var succ = true;
var wid2="";
function initialise()
{

}

    $.xhrPool = []; // array of uncompleted requests
    $.xhrPool.abortAll = function() { // our abort function
        $(this).each(function(idx, jqXHR) { 
            jqXHR.abort();
        });
        $.xhrPool.length = 0
    };
     
    $.ajaxSetup({
        beforeSend: function(jqXHR) { // before jQuery send the request we will push it to our array
            $.xhrPool.push(jqXHR);
        },
        complete: function(jqXHR) { // when some of the requests completed it will splice from the array
            var index = $.xhrPool.indexOf(jqXHR);
            if (index > -1) {
                $.xhrPool.splice(index, 1);
            }
        }
    });

/*----------------------------------------------------------
	                          Fonction qui arrete l'exécution de tous les scripts en cours d'exécution
	------------------------------------------------------------*/
function StopScript()
{
clearInterval(intervale);
initialise();
stop = true;
setTimeout(stopCapture, 500);
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
				{  y: y2, legendText:"Failed", label: "Failed" },
				
			]
		}
		]
	});
	chart2.render();
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
  

    // the first headline of the table
    if (lines > 0) {
        tab_text = tab_text + '<tr bgcolor="#DFDFDF">' + tab.rows[0].innerHTML + '</tr>';
    }

    // table data lines, loop starting from 1
    for (j = 1 ; j < lines; j++) {     
        tab_text = tab_text + "<tr>" + tab.rows[j].innerHTML + "</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");             //remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi,"");                 // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");    // reomves input params
    // console.log(tab_text); // aktivate so see the result (press F12 in browser)

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

     // if Internet Explorer
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa = txtArea1.document.execCommand("SaveAs", true, "DataTableExport.xls");
    }  
    else // other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + escape(html));  
    return (sa);

} 
/*----------------------------------------------------------
	                          Fonction qui récupére les différents KPIs
							  et affiche les résultats dans les tableaux et les graphiques
	------------------------------------------------------------*/
function table(perl_data, date, time)
{
var chaine = perl_data;
var lines = perl_data.split("\n"); 

var statu="";
var temps="";
var debit="";
var volume="";
var j=0;
var line;
var succ2 = false
timme2 = new Date();
var ver = (lines[lines.length-4].includes('failed'));
if ((lines[lines.length-3].substring(0,9)=="Connexion") || (lines[lines.length-4].includes('ERREUR')) || (lines[lines.length-4].includes('ERROR')) || ver) succ=false;

else 
{
succ2 = true;

}

var node = document.createElement("ul");                 
var textnode = document.createTextNode(lines[0]);         
node.appendChild(textnode);                              
document.getElementById("lis").appendChild(node);

for (var i=1;i<lines.length-1;i++)
{
 	    var node = document.createElement("LI");                 
            var textnode = document.createTextNode(lines[i]);         
            node.appendChild(textnode);                              
            document.getElementById("lis").appendChild(node);

}
if (succ2==true)
{

if ($('#OptionD').is(':checked')) line = lines[lines.length-7];
else line = lines[lines.length-6];


while ((line.substring(j,j+1)!="=")&& (j<line.length)) j++;
j++;
temps = line.substring(j,line.length-1);

if ($('#OptionD').is(':checked')) line = lines[lines.length-5];
else line = lines[lines.length-4];
j=0;
while ((line.substring(j,j+1)!="(")&& (j<line.length)) j++;
j++;

while ((line.substring(j,j+1)!=")")&& (j<line.length))
{
debit += line.substring(j,j+1);
j++;
}

while ((line.substring(j,j+1)!="[")&& (j<line.length)) j++;
j++;

while ((line.substring(j,j+1)!="]")&& (j<line.length))
{
volume += line.substring(j,j+1);
j++;
}

var temps2="";
j=0;

while ((temps.substring(j,j+1)!=",")&& (j<temps.length))
{
temps2 += temps.substring(j,j+1);
j++;
}
j++;
if (temps.length!=temps2.length) temps2 +=".";
while ((j<temps.length))
{
temps2 += temps.substring(j,j+1);
j++;
}



temps = temps2;

var debit2 = "";
var unit = "";
j = 0;

while ((debit.substring(j,j+1)!=" ")&& (j<debit.length))
{
debit2 += debit.substring(j,j+1);
j++;
}
j++;

while ((j<debit.length))
{
unit += debit.substring(j,j+1);
j++;
}

if(succ==true) debit2 = parseFloat(debit2);

if (unit=="MB/s") debit2 = debit2*1000;

var volume2=" ";
var volume3="";
j=0;
while ((volume.substring(j,j+1)!="/")&& (j<volume.length))
{
volume2 += volume.substring(j,j+1);
j++;
}
if ( volume.substring(j,j+1)=="/") j++;

while ((j<volume.length))
{
volume3 += volume.substring(j,j+1);
j++;
}
volume2 = parseInt(volume2);
volume3 = parseInt(volume3);
if (volume3="") 
{
succ=true;

}
else if (volume2!=volume3) succ=false;
else

{
succ = true;

}
if (  $(".scrollit").css("height") == "75px") $(".scrollit").css("height", "125px") ;
               else if (  $(".scrollit").css("height") == "125px") $(".scrollit").css("height", "175px") ;
              else if (  $(".scrollit").css("height") == "175px") $(".scrollit").css("height", "225px") ;
              else if (  $(".scrollit").css("height") == "225px") $(".scrollit").css("height", "300px") ;

if (volume3=="")
{
succ = true;
nbrRec++;
$("#resDetail").append("<tr><td>"+(cpt+1)+"</td><td>Success</td><td>"+temps+"</td><td>"+debit+"</td><td>"+volume2+"</td><td>"+date+" "+time+"</td></tr>");
$("#resDetail tr:last").attr('class', 'success');
if(succ==true) y = parseFloat((temps)*1000);
timme2 = new Date;
timme.setTime(d.getTime());
dataPoints1.push({
					x: timme2.getTime(),
					y: y
				});
dataPoints4.push({
					x: timme2.getTime(),
					y: debit2
				});
}
else
{
if (volume2==volume3)
{
nbrRec++;
$("#resDetail").append("<tr><td>"+(cpt+1)+"</td><td>Success</td><td>"+temps+"</td><td>"+debit+"</td><td>"+volume2+"</td><td>"+date+" "+time+"</td></tr>");
$("#resDetail tr:last").attr('class', 'success');
if(succ==true) y = parseFloat(temps);
y = y*1000;
timme2 = new Date;
timme.setTime(d.getTime());
dataPoints1.push({
					x: timme2.getTime(),
					y: y
				});
dataPoints4.push({
					x: timme2.getTime(),
					y: debit2
				});
}
else
{
$("#resDetail").append("<tr><td>"+(cpt+1)+"</td><td>Failed</td><td>"+temps+"</td><td>"+debit+"</td><td>"+volume2+"</td><td>"+date+" "+time+"</td></tr>");
$("#resDetail tr:last").attr('class', 'danger');
dataPoints1.push({
					x: timme2.getTime(),
y: y,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					

				});

dataPoints4.push({
					x: timme2.getTime(),
y: y,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					

				});
}
}
}
else
{
$("#resDetail").append("<tr><td>"+(cpt+1)+"</td><td>Impossible</td><td>Nan</td><td>/</td><td>/</td><td>"+date+" "+time+"</td></tr>");
$("#resDetail tr:last").attr('class', 'danger');
dataPoints1.push({
					x: timme2.getTime(),
y: y,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					

				});

dataPoints4.push({
					x: timme2.getTime(),
y: y,
indexLabel: "loss", markerType: "cross", markerColor: "tomato" , markerSize: 12  
					

				});
}
if (succ == false) kill = true;
chart.render();
chart5.render();

tauxsucces((nbrRec*100/(cpt+1)),100-(nbrRec*100/(cpt+1)));
temps = parseFloat(temps);
t+=temps;
if (temps>tmax) tmax=temps;
if (temps<tmin) tmin=temps;
if (tmin!=9999999999) $('#r1 span').text(tmin.toString());
if ((t/(cpt+1))!=NaN) $('#r2 span').text((t/(cpt+1)).toFixed(3));
$('#r3 span').text(tmax);
$('#r4 span').text((nbrRec*100/(cpt+1)));

}
/*----------------------------------------------------------
	                          Fonction pour calculer la progression du test
	------------------------------------------------------------*/

function progress(data)

{
if ((kill==false))
{
var size = "";
var pourcentage = 0;
var tempsRestant = 0;
var debit = 0;
timme2 = new Date;
timme.setTime(d.getTime());
if (data=="") size = 0;

else
{
var j=0;

while (data.substring(j,j+1)!="\t")
{
size+= data.substring(j,j+1);
j++;
}
}
if ((size!=0)&&(size == size2)&&(size!=tot)) nbSize2++;
else size2 = size;
if (nbSize2<10)
{
if((dlfinished==true)&&(cpt==nombre)) size = tot;
if (nbSize==0) debit = 0;
else debit = Math.round((parseInt(size)/(0.5*nbSize))/1024);
pourcentage = Math.round(parseInt(size)*100/tot);
if ((dlfinished==true)&&(cpt==nombre)&&(succ==true)) pourcentage = 100;
if (dlfinished==true) tempsRestant = 0;
else if (size!=0) tempsRestant = Math.round((nbSize*tot*0.5)/size);


if (pourcentage !=0) $(".progress-bar").css("width", (pourcentage*wid2/100)+"px");

if (pourcentage !=0) $('#p1 span').text(pourcentage+"%");
if ((pourcentage !=0)&&(debit!=0)) 
{
dataPoints2.push({
					x: timme2.getTime(),
					y: debit
				});
}
 chart3.render();
if ((pourcentage !=0)&&(debit!=0)) dataPoints3.push({
					x: timme2.getTime(),
					y: debit
				});
chart4.render();
}

else
{
dsfinished = true;
 $.xhrPool.abortAll();
kill = true;
return false;
}
}
nbSize++;
}
/*----------------------------------------------------------
	                          Fonction pour récupérer le débit actuel
	------------------------------------------------------------*/

function getSize()
{


  var request3 = $.ajax({
        type: "GET",
        url: "perl/size.pl",
	//dataType: "jsonp",
       
		

        // script call was *not* successful
        error: function(perl_data) {
succ = false;
            return false;
        }, 
        success: function(perl_data){
progress(perl_data, tot);

},
	complete: function(perl_data)
{
if (dlfinished==false) timeoutID2 = setTimeout(getSize, 500);
}
});

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
wid2="";
var wid = $(".progress").css("width");
var x=0;
while((wid.substring(x,x+1)!="p")&&(x< wid.length)) 
{
wid2+=wid.substring(x,x+1);
x++;
}
wid2=parseFloat(wid2);
 $(".progress-bar").css("width", "0px");

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

startCap = true;

var value = 750;


var lab = $('#lab').attr('value');


var OptionH1 = $('#OptionH1').is(':checked');
var OptionH1Text = $('#OptionH1Text').attr('value');

var OptionH2 = $('#OptionH2').is(':checked');
var OptionH2Text = $('#OptionH2Text').attr('value');

var OptionM5 = $('#OptionM5').is(':checked');

var OptionM100 = $('#OptionM100').is(':checked');

var OptionG1 = $('#OptionG1').is(':checked');

var Optionother = $('#Optionother').is(':checked');
var OptionotherText = $('#OptionotherText').attr('value');

var OptionChemin = $('#OptionChemin').is(':checked');
var OptionCheminText = $('#OptionCheminText').attr('value');
d = new Date();
var date = d.getDate() + "/" + (d.getMonth()+1)  + "/" +  d.getFullYear() ;
var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
if (OptionChemin==true){

var request8 = $.ajax({
        type: "POST",
        url: "perl/sizeOther2.pl",
	data :  {"lab": lab, "OptionCheminText" : OptionCheminText},
       
		

        // script call was *not* successful
        error: function() { 
            return false;
        }, 
        success: function(perl_data){
tot = parseInt(perl_data);

getSize();

nbSize = 0;
dlfinished = false;
dataPoints2 = [];
restartChart();
var request = $.ajax({
        type: "POST",
        url: "perl/httpDl.pl",
        data :  {"lab": lab , "OptionH1": OptionH1, "OptionH1Text" : OptionH1Text , "OptionH2": OptionH2, "OptionH2Text" : OptionH2Text , "OptionM5": OptionM5 , "OptionM100": OptionM100 , "OptionG1": OptionG1 , "Optionother": Optionother, "OptionotherText": OptionotherText, "OptionChemin" : OptionChemin, "OptionCheminText" : OptionCheminText},
		

        // script call was *not* successful
        error: function() { 
            return false;

        }, 
        success: function(perl_data){	

table(perl_data, date, time);
cpt++;

	
       },
complete: function() {

if ((kill == true)||(succ==false))
{
$('#p1 span').text("Failed");

}
else 
{
 $(".progress-bar").css("width", (wid2)+"px");
 $('#p1 span').text("100%");
}
if (cpt == nombre) dlfinished = true;
 if (cpt==nombre) 
{

setTimeout(stopCapture, 500);
}
clearTimeout(timeoutID2);


if (pro==true)
{
if ($('#nbr').is(':checked'))
{		
            if ( (cpt<nombre) && (stop==false))
		{
			 timeoutID = setTimeout(start, parseInt(duree)*1000); 
		}
 if (cpt==nombre) setTimeout(stopCapture, 500);
}


if ($('#periode').is(':checked'))
{
			if ((isFinished==false)  && (stop==false)) timeoutID = setTimeout(start, parseInt(duree)*1000); 
}

}
if (pro==false)
{
if ((cpt<nombre)  && (stop==false))
{
timeoutID = setTimeout(start, parseInt(duree)*1000); 
}
 if (cpt==nombre) setTimeout(stopCapture, 500);
}
} 

 });

},
	
});


}
else
{
if ($('#OptionM5').is(':checked')) tot = 5*(1048576);
else if ($('#OptionM100').is(':checked')) tot = 100*1048576;
else if ($('#OptionG1').is(':checked')) tot = 1024*1048576;
else if ($('#Optionother').is(':checked')) tot = parseInt($('#OptionotherText').attr('value'))*1048576;

getSize();
nbSize = 0;
dlfinished = false;
dataPoints2 = [];
restartChart();
var request = $.ajax({
        type: "POST",
        url: "perl/httpDl.pl",
        data :  {"lab": lab , "OptionH1": OptionH1, "OptionH1Text" : OptionH1Text , "OptionH2": OptionH2, "OptionH2Text" : OptionH2Text , "OptionM5": OptionM5 , "OptionM100": OptionM100 , "OptionG1": OptionG1 , "Optionother": Optionother, "OptionotherText": OptionotherText, "OptionChemin" : OptionChemin, "OptionCheminText" : OptionCheminText},
		

        // script call was *not* successful
        error: function() { 
            return false;

        }, 
        success: function(perl_data){	

table(perl_data, date, time);
cpt++;

	
       },
complete: function() {
if (cpt == nombre) dlfinished = true;
 if (cpt==nombre) setTimeout(stopCapture, 500);
clearTimeout(timeoutID2);
if ((kill == true)||(succ==false))
{
 $('#p1 span').text("Failed");

}
else 
{
$(".progress-bar").css("width", (wid2)+"px");
 $('#p1 span').text("100%");
}

if (pro==true)
{
if ($('#nbr').is(':checked'))
{		
            if ( (cpt<nombre) && (stop==false))
		{
			 timeoutID = setTimeout(start, parseInt(duree)*1000); 
		}
 if (cpt==nombre) setTimeout(stopCapture, 500);
}


if ($('#periode').is(':checked'))
{
			if ((isFinished==false)  && (stop==false)) timeoutID = setTimeout(start, parseInt(duree)*1000); 
}

}
if (pro==false)
{
if ((cpt<nombre)  && (stop==false))
{
timeoutID = setTimeout(start, parseInt(duree)*1000); 
}
 if (cpt==nombre) setTimeout(stopCapture, 500);
}
} 

 });


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
				start();
                        
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
var filter = "port 80"
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
		
  },
      complete: function() { 
           
        }, 
});
}

return false;

}
/*----------------------------------------------------------
	                          Fonction pour arreter la capture tshark
	------------------------------------------------------------*/
function stopCapture()
{
 var request4 = $.ajax({
        type: "POST",
        url: "perl/kill.pl",
		

        // script call was *not* successful
        error: function() { 
            alert("script call was not successful");
        }, 
        success: function(perl_data){
		
  }});

return false;

}


  
var yValue1 = 640; 
		var yValue2 = 604;

		var timme = new Date;
		/*----------------------------------------------------------
	                          Fonction pour rénitialiser le premier graphique 
	------------------------------------------------------------*/

function restartChart()
{
chart3 = new CanvasJS.Chart("debit1",{
			zoomEnabled: true,
			exportEnabled: true,
			title: {
				text: "Current throughput"		
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
				title: "Kb/s",
                                sufix: 'ms',
				includeZero: false
			}, 
			data: [{ 
				// dataSeries1
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "",
				dataPoints: dataPoints2
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
              
            }
          }
		});

 function updateChart(chart, count) {
			count = count || 1;

			// count is number of times loop runs to generate random dataPoints. 

			
				
				// add interval duration to time				
				//timme.setTime(timme.getTime()+ updateInterval);


				
				
				// pushing the new values
				
dataPoints2.push({
					x: timme.getTime(),
					//y: yValue1
				});
				


			

			// updating legend text with  updated with y Value 
			
			

			chart.render();

		}


updateChart(chart3, 3000);
}
		/*----------------------------------------------------------
	                          Fonction pour afficher les graphique en temps réels
	------------------------------------------------------------*/
 window.onload = function graphique() {
    
     chart = new CanvasJS.Chart("tempsChart",{
			zoomEnabled: true,
			exportEnabled: true,
			title: {
				text: "Download time"		
			},
			toolTip: {
				shared: true
				
			},
			legend: {
				verticalAlign: "top",
				horizontalAlign: "center",
                                fontSize: 10,
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
				xValueType: "dateTime",
				showInLegend: true,
				name: "",
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

chart5 = new CanvasJS.Chart("debit3",{
			zoomEnabled: true,
			exportEnabled: true,
			title: {
				text: "Average throughput"		
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
				title: "Kb/s",
                                sufix: 'ms',
				includeZero: false
			}, 
			data: [{ 
				// dataSeries1
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "",
				dataPoints: dataPoints4
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
              
            }
          }
		});



var updateInterval = 3000;
//updateChart(1);	
	

		  function updateChart(chart, count) {
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
					//y: yValue1
				});
dataPoints3.push({
					x: timme.getTime(),
					//y: yValue1
				});
dataPoints4.push({
					x: timme.getTime(),
					//y: yValue1
				});
				


			

			// updating legend text with  updated with y Value 
			
			

			chart.render();

		}

		// generates first set of dataPoints 
		updateChart(chart, 3000);
updateChart(chart5, 3000);
	
		 
		

if (begin) 
{
tauxsucces(60,40);

begin = false;
restartChart();
}


chart4 = new CanvasJS.Chart("debit2",{
			zoomEnabled: true,
			exportEnabled: true,
			title: {
				text: "Global throughput"		
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
				title: "Kb/s",
                                sufix: 'ms',
				includeZero: false
			}, 
			data: [{ 
				// dataSeries1
				type: "line",
				xValueType: "dateTime",
				showInLegend: true,
				name: "",
				dataPoints: dataPoints3
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
              
            }
          }
		});




updateChart(chart4, 3000);
    
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





