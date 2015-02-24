/*
 * Just a helper file to print all mixpanel lib filenames
 * in a way one can copy paste them into the plugin.xml file
 */


var path = require('path'),
  fs = require('fs'),
  mixpanelFiles = [],
  headers = [],
  sources = [],
  libs = [],
  others = [],
  i;

function getAllMixpanelFiles(base, extra) {
  var files = fs.readdirSync(base);
  for (var i = 0; i < files.length; i++) {
    if (fs.statSync(path.join(base, files[i])).isDirectory()) {
      getAllMixpanelFiles(path.join(base, files[i]));
    } else {
      mixpanelFiles.push({dir: base, file: files[i], path: path.join(base, files[i])})
    }
  }
}

getAllMixpanelFiles('Mixpanel');

for (i = 0; i < mixpanelFiles.length; i++) {
  var file = mixpanelFiles[i],
    ext = path.extname(file.file);


  switch (ext) {
    case '.h':
      headers.push(file);
      break;
    case '.m':
      sources.push(file);
      break;
    case '.a':
      libs.push(file);
      break;
    default:
      others.push(file);
      break;
  }
}

for (i = 0; i < headers.length; i++) {
  console.log('<header-file src="src/ios/' + headers[i].path + '" target-dir="'+ headers[i].dir+'"/>');
}
for (i = 0; i < sources.length; i++) {
  console.log('<source-file src="src/ios/' + sources[i].path + '" target-dir="'+ sources[i].dir+'"/>');
}
for (i = 0; i < libs.length; i++) {
  console.log('<source-file src="src/ios/' + libs[i].path + '" target-dir="'+ libs[i].dir+'"/>');
}
for (i = 0; i < others.length; i++) {
  console.log('<source-file src="src/ios/' + others[i].path + '" target-dir="'+ others[i].dir+'"/>');
}
