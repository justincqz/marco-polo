
var info = JSON.parse();

var fromloc = []
var toloc =[]
var departtime = []
var arrivetime = []
var cost = []
var airline = []


for (var i = 0; i < info.length; i++) {
	fromloc.push(info[i].fromloc);
	toloc.push(info[i].toloc);
}

