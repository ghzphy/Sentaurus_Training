var currents = [];
var details = [];
var hideTitleToggle = "noshow";

function ShowAppNotes () {
	
	var jApp = 0;
	var jTot = 0;
	currents = [];
	
	var toc = '';
	var current = '';
	var GSstart = '0';
	
	for (var i=0 ; i < APN.length ; i++) {
		if (!APN[i]) continue;
		var GS = 0;
		var A = APN[i];
		var next = A.appArea;
		if ( next.slice(0,14) == "GettingStarted" ) {
			next = next.replace("GettingStarted/","")
			GS = 1;
		}

		if ( current != next ) {
			if ( current != '' ) {
			toc += '<div class="tcard"><div class="title"><button type="button" onclick="hideID(\'' + current + '\')">&plusmn;</button>&nbsp;'
			+ '<b>' + current + '</b> &nbsp; [' + jApp + ']</div>'
			+ '<div id="' + current +'" class="' + hideTitleToggle + '"><ol>'
			+ tocloc
			+ '</ol></div>&nbsp';
			}
			if ( GS == 1 && GSstart == 0 ) {
				toc += "<h3>GettingStarted</h3>";
				GSstart = 1;
			}
			current = next;
			currents.push(current);
			jApp = 0
			var tocloc = '';
		}
		jTot++;
		jApp++;

		var tmp = A.archive.split("/");
		var Aindex = tmp[1] + '/' + A.name;
		tocloc += '<li><div class="ctitle"><b>' + A.title + '</b></a>';
		tocloc += '<tt><br/>Directory&nbsp;&nbsp;&nbsp;&nbsp;:</tt> <a href="../../' +  A.archive + '/' + A.name + '">' + A.archive + '/' + A.name + '</a>';
		if ( GS == 0 ) {
			tocloc += '<tt><br/>Documentation:</tt> <a href="../../' +  A.archive + '/' + A.name + '/' + A.pdf + '">' + A.pdf + '</a>' + '<tt><br/>Dimension &nbsp;&nbsp;&nbsp;:</tt> ' + A.dim ;
		} else {
			tocloc += '<tt><br/>Documentation:</tt> <a href="../../' +  A.archive + '/' + A.name + '/' + A.pdf + '">' + A.pdf + '</a>';
		}
		if ( A.note ) {
			tocloc += '<font color="red"><br/>&nbsp;' + A.note + '</font>'
		}
		tocloc += '</li>'

	}
	toc += '<div class="tcard"><div class="title"><button type="button" onclick="hideID(\'' + current + '\')">&plusmn;</button>&nbsp;'
	+ '<b>' + current + '</b> &nbsp; [' + jApp + ']</div>'
	+ '<div id="' + current +'" class="' + hideTitleToggle + '"><ol>'
	+ tocloc
	+ '</ol></div>&nbsp';

	toc += '</ol></div></div>';
	document.getElementById("TOC").innerHTML = toc;
}

function sortAPN () {
	var selected = 'appArea';
	APN.sort(function (a, b) {
		var nameA=a[selected].toLowerCase(), nameB=b[selected].toLowerCase();
//			alert(nameA + " - " + nameB);
		if ( nameA.slice(0,14) == "gettingstarted" ) {
			nameA = nameA.replace("gettingstarted","zzz")
			// alert(nameA);
		}
		if ( nameB.slice(0,14) == "gettingstarted" ) {
			nameB = nameB.replace("gettingstarted","zzz")
			// alert(nameB);
		}
		if (nameA < nameB) return -1
		if (nameA > nameB) return  1
		return 0
	})
	ShowAppNotes(selected);
};

function hideID (id) {
	if ( document.getElementById(id).className == "show" ) {
		document.getElementById(id).className = "noshow";
	} else {
		document.getElementById(id).className = "show";
	};
};

function firstView () {
	ShowAppNotes();
	sortAPN();
};
window.onload = firstView;
