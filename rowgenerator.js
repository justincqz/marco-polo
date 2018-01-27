
var info = JSON.parse();

var names = []
var locs =[]

for (var i = 0; i < info.length; i++) {
	names.push(info[i].name);
	locs.push(info[i].location);
}