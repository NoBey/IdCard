var fs=require('fs');
// fs.writeFileSync('./output.json',JSON.stringify({a:1,b:2}));
var Converter = require("csvtojson").Converter;
var converter = new Converter({});

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (jsonArray) {
   console.log(jsonArray); //here is your result jsonarray
});

//read from file
require("fs").createReadStream("./chinese-id-card-area.csv").pipe(converter);
