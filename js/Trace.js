/*----------------------------------------------------------
	                          JavaScript du test Trace route
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
function initialise()
{

}

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
	                         Définition des variables utilisées par les graphiques
	------------------------------------------------------------*/

 var nodes = null;
    var edges = null;
    var network = null;

    var DIR = 'img/';
    var EDGE_LENGTH_MAIN = 150;
    var EDGE_LENGTH_SUB = 50;
 nodes = [];
edges = [];
    // Called when the Visualization API is loaded.
    function draw() {
      // Create a data table with nodes.
     

      // Create a data table with links.
      

     $("#tempsChart").css("height", "800px");
      // create a network
      var container = document.getElementById('tempsChart');
      
      var data = {
        nodes: nodes,
        edges: edges
      };
      var options = {};
      network = new vis.Network(container, data, options);
    }

 var dataPoints = [];
var dataPoints2 = [];
var dataPoints3 = [];
/*----------------------------------------------------------
	                          Fonction pour le dessin du graphique des temps de réponses
	------------------------------------------------------------*/
function graphique() {


$("#tempsChart2").css("height", "450px");

     chart = new CanvasJS.Chart("tempsChart2",
    {
      title:{
        text: "Time response",
        fontFamily: "arial black"
       

      },
     animationEnabled: true,
      
      axisY:{
      
        gridColor: "#B6B1A8",
        tickColor: "#B6B1A8",
	title : "Time"
        

      },
      axisX: {
        labelAngle: 90,
	interval : 2,
        title : "IP"
      },
      data: [
      {        
       type: "stackedColumn",       
       showInLegend:true,
      color: "#004B8D ",
       name:"Jump 1",
       dataPoints: dataPoints
     },
     {        
       type: "stackedColumn",       
       showInLegend:true,
       name:"Jump 2",
       color: "#0074D9 ",
       dataPoints: dataPoints2
     },
     {        
       type: "stackedColumn",       
       showInLegend:true,
       name:"Jump 3",
      color: "#4192D9 ",
       dataPoints: dataPoints3
       
  
     }
   
     ]
   });

chart.render();
}

var x = 1;
/*----------------------------------------------------------
	                          Fonction pour extraire une ligne et l'affichée dans le tableur des résultats
							  et aux graphiques
	------------------------------------------------------------*/
function addline(line)
{
var line2 = line;
var id = 0;
var nom1 = " ";
var adresse1 = " ";

var nom2 = " ";
var adresse2 = " ";

var nom3 = " ";
var adresse3 = " ";

var t1 = 0;
var t2 = 0;
var t3 = 0;
var j = 0;
if (line2.substring(0,1) == " ") j=1;
else j = 0;
for (var i = j;i<line2.length-1;i++)
{
if (line2.substring(i,i+1)!=" ")  id += line2.substring(i,i+1);
else 
{
j = i+2;
break;
}
}
id = id.toString().substring(1,id.length);



if (!$('#OptionN').is(':checked'))
{
for (var i = j;i<line2.length-1;i++)
{
if (line2.substring(i,i+1)!=" ")  nom1 += line2.substring(i,i+1);
else 
{
j = i+1;
break;
}
}
nom1 = nom1.toString().substring(0,nom1.length);
}



for (var i = j;i<line2.length-1;i++)
{
if (line2.substring(i,i+1)!=" ")  adresse1 += line2.substring(i,i+1);
else 
{
j = i+2;
break;
}
}


if (!$('#OptionN').is(':checked')) adresse1 = adresse1.toString().substring(2,adresse1.length-1);
else adresse1 = adresse1.toString().substring(1,adresse1.length);


for (var i = j;i<line2.length-1;i++)
{
if (line2.substring(i,i+1)!=" ")  t1 += line2.substring(i,i+1);
else 
{
j = i+4;
break;
}
}

t1 = t1.toString().substring(1,t1.length);


if (!$('#OptionN').is(':checked'))
{
if (line2.substring(j,j+1)!=" ")
{
for (var i = j;i<line2.length-1;i++)
{
if (line2.substring(i,i+1)!=" ")  nom2 += line2.substring(i,i+1);
else 
{
j = i+1;
break;
}
}
nom2 = nom2.toString().substring(1,nom2.length);
}
}


for (var i = j;i<line2.length-1;i++)
{
if (line2.substring(i,i+1)!=" ")  adresse2 += line2.substring(i,i+1);
else 
{
j = i+1;
break;
}
}

if (!$('#OptionN').is(':checked')) adresse2 = adresse2.toString().substring(2,adresse2.length-1);
else adresse2 = adresse2.toString().substring(1,adresse2.length);
j++;
for (var i = j;i<line2.length-1;i++)
	{
	if (line2.substring(i,i+1)!=" ")  t2 += line2.substring(i,i+1);
	else 
	{
	j = i+4;
	break;
	}
	}
	if ((t2.toString().substring(1,2))==".") t2 = t2.toString().substring(0,t2.length);
         else t2 = t2.toString().substring(1,t2.length); 



if (!$('#OptionN').is(':checked'))
{
if (line2.substring(j,j+1)!=" ")
{
for (var i = j;i<line2.length-1;i++)
{
if (line2.substring(i,i+1)!=" ")  nom3 += line2.substring(i,i+1);
else 
{
j = i+1;
break;
}
}
nom3 = nom3.toString().substring(1,nom3.length);
}
}


for (var i = j;i<line2.length-1;i++)
{
if (line2.substring(i,i+1)!=" ")  adresse3 += line2.substring(i,i+1);
else 
{
j = i+1;
break;
}
}

if (!$('#OptionN').is(':checked')) adresse3 = adresse3.toString().substring(2,adresse3.length-1);
else adresse3 = adresse3.toString().substring(1,adresse3.length);

j++;


	for (var i = j;i<line2.length-1;i++)
	{
	if (line2.substring(i,i+1)!=" ")  t3 += line2.substring(i,i+1);
	else 
	{
	j = i+2;
	break;
	}
	}
	if ((t3.toString().substring(1,2))==".") t3 = t3.toString().substring(0,t3.length);
         else t3 = t3.toString().substring(1,t3.length); 
	


if (  $(".scrollit").css("height") == "75px") $(".scrollit").css("height", "125px") ;
               else if (  $(".scrollit").css("height") == "125px") $(".scrollit").css("height", "175px") ;
              else if (  $(".scrollit").css("height") == "175px") $(".scrollit").css("height", "225px") ;
              else if (  $(".scrollit").css("height") == "225px") $(".scrollit").css("height", "300px") ;


$("#resDetail").append("<tr><td>"+id+"</td><td>"+nom1+"</td><td>"+adresse1+"</td><td>"+nom2+"</td><td>"+adresse2+"</td><td>"+nom3+"</td><td>"+adresse3+"</td><td>"+t1+"</td><td>"+t2+"</td><td>"+t3+"</td></tr>");
 $("#resDetail tr:last").attr('class', 'success');

ID2 = ID;
if (depart==0) depart = 1;

if (parseInt(ID)==1) 
{
nodes.push({id: ID, label: 'Source : ' + adresse1, image: DIR + 'com.png', shape: 'image'});
ID++;
}

else if (parseInt(id)==saut-1) 
{
nodes.push({id: ID, label: 'Destination : ' + adresse1, image: DIR + 'com.png', shape: 'image'});
ID++;
}
else 
{
nodes.push({id: ID, label: adresse1, image: DIR + 'rout.jpg', shape: 'image'});
ID++;
if ((adresse2 != " ")&& (adresse2 != adresse1)) 
{
nodes.push({id: ID, label: adresse2, image: DIR + 'rout.jpg', shape: 'image'});
ID++;
}
if ((adresse3 != " ") && (adresse3 != adresse1) && (adresse3 != adresse2)) 
{
nodes.push({id: ID, label: adresse3, image: DIR + 'rout.jpg', shape: 'image'});
ID++;
}
}

if (ID2!=1)
{

edges.push({from: depart, to: ID2, length: EDGE_LENGTH_MAIN, label: t1+'ms', arrows:{to:{scaleFactor:2}}, color:{color:'black'}});
if ((adresse2 != " ")&& (adresse2 != adresse1)) 
{
edges.push({from: depart, to: ID2+1, length: EDGE_LENGTH_MAIN, label: t1+'ms', arrows:{to:{scaleFactor:2}}, color:{color:'green'}});
one = true;
}
if ((adresse3 != " ") && (adresse3 != adresse1) && (adresse3 != adresse2)) 

{

if (adresse2 != " ") edges.push({from: depart, to: ID2+2, length: EDGE_LENGTH_MAIN, label: t1+'ms', arrows:{to:{scaleFactor:2}}, color:{color:'blue'}});
else edges.push({from: depart, to: ID2+1, length: EDGE_LENGTH_MAIN, label: t1+'ms', arrows:{to:{scaleFactor:2}}, color:{color:'blue'}});
two = true;
}
}

depart = ID2;


if (t1!="")
{
 dataPoints.push({
				x:x,
 visible: false,
				   label: adresse1.toString(),
showInLegend:true,
					y: parseFloat(t1)
				});
}
if (t2!="")
{
if ((adresse2 == " ")|| (adresse2 == adresse1) || (adresse2 == ""))
{
dataPoints2.push({
				x:x,  visible: false,
				  label: adresse1.toString(),
				  showInLegend:true,
					y: parseFloat(t2)
				});
}
}
if (t3!="")
{
if ((adresse3 == " ") || (adresse3 == "") || (adresse3 == adresse1)) 
{

dataPoints3.push({
				  x:x,  visible: false,
				   label: adresse1.toString(),
showInLegend:true,
					y: parseFloat(t3)
				});
}
}

x++;
if (t2!="")
{
if (((adresse2 != " "))&& (adresse2 != adresse1) && (adresse2!="")) 
{
dataPoints2.push({
				 x:x,  visible: false,
				   label: adresse2.toString(),
					y: parseFloat(t2)
				});
x++;
}
}
if (t3!="")
{
if (((adresse3!=" ")) && (adresse3 != adresse1) && (adresse3!=""))
{
if (adresse3 == adresse2 )
{
x--;
dataPoints3.push({
					x:x,  visible: false,
				   label: adresse3.toString(),
					y: parseFloat(t3)
				});
x++;
}
else 
{

dataPoints3.push({
				   x:x,  visible: false,
				   label: adresse3.toString(),
					y: parseFloat(t3)
				});
}
x++;
}
}


 //chart.render();
}
/*----------------------------------------------------------
	                          Fonction pour découper les résultats retournés par le script 
	------------------------------------------------------------*/
function table(perl_data)
{

var chaine = perl_data;
var lines = perl_data.split("\n");  
var node = document.createElement("ul");                 
var textnode = document.createTextNode(lines[0]);         
node.appendChild(textnode);                              
document.getElementById("lis").appendChild(node);

saut = lines.length-1;

for (var i=1;i<lines.length-1;i++)
{
 	    var node = document.createElement("LI");                 
            var textnode = document.createTextNode(lines[i]);         
            node.appendChild(textnode);                              
            document.getElementById("lis").appendChild(node);
addline(lines[i]);
}

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


if (startCap == false) 
{
startCapture();
}
startCap = true;

var OptionN = $('#OptionN').is(':checked');

var OptionW = $('#OptionW').is(':checked');
var OptionWText = $('#OptionWText').attr('value');

var OptionP = $('#OptionP').is(':checked');
var OptionPText = $('#OptionPText').attr('value');

var OptionM = $('#OptionM').is(':checked');
var OptionMText = $('#OptionMText').attr('value');

var OptionF = $('#OptionF').is(':checked');

var OptionI = $('#OptionI').is(':checked');

var OptionT = $('#OptionT').is(':checked');

var OptionU = $('#OptionU').is(':checked');

var Interface = "eth0";

 var request = $.ajax({
        type: "POST",
        url: "perl/trace.pl",
        data :  {"lab": lab, "OptionN": OptionN, "OptionW": OptionW, "OptionWText" : OptionWText,"OptionP": OptionP, "OptionPText" : OptionPText,"OptionM": OptionM, "OptionMText" : OptionMText,"Interface": Interface, "OptionF": OptionF, "OptionI": OptionI, "OptionT": OptionT, "OptionU": OptionU},
		

        // script call was *not* successful
        error: function() { 
            alert("script call was not successful");
        }, 
        success: function(perl_data){
	   
            table(perl_data);
draw();
graphique();
cpt++;
if (pro==true)
{

if ($('#nbr').is(':checked'))
{
			
		
		
            if ( (cpt<nombre))
		{
			$("#resDetail").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
nodes = [];
edges = [];
saut = 0;
ID=1;
depart = 0;
indice = 0;
dataPoints = [];dataPoints2 = [];dataPoints3 = [];

			 timeoutID = setTimeout(start, parseInt(duree)*1000); 
		}
 if (cpt==nombre) setTimeout(stopCapture, 500);
}


if ($('#periode').is(':checked'))
{
$("#resDetail").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
nodes = [];
edges = [];
saut = 0;
ID=1;
depart = 0;
indice = 0;
dataPoints = [];dataPoints2 = [];dataPoints3 = [];

			if (isFinished==false) timeoutID = setTimeout(start, parseInt(duree)*1000); 
}

}
if (pro==false)
{
if (cpt<nombre)
{
$("#resDetail").append("<tr><td></td><td></td><td></td><td></td><td></td></tr>");
nodes = [];
edges = [];
saut = 0;
ID=1;
depart = 0;
indice = 0;
dataPoints = [];dataPoints2 = [];dataPoints3 = [];

			timeoutID = setTimeout(start, parseInt(duree)*1000); 
}
 if (cpt==nombre) setTimeout(stopCapture, 500);
}
	
       } });
		
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

var filter;
if ($('#OptionT').is(':checked')) filter = " tcp";
else if ($('#OptionU').is(':checked')) filter = " udp";
else filter = " icmp";

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





