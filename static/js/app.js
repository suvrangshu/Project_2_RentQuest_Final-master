function buildMetadata(sample) {

 //Define the element to select
	var cell = d3.select("#sample-metadata");
	let url = `/metadata/${sample}`;
//Clearing the html under the cell.
	cell.html('');

//Iterate the Json and post the value	
d3.json(url).then((item) => {
     Object.entries(item).forEach(([key, value]) => {
       cell.append('ul').html(`<li>${key}: ${value}</li><br>`);
	   
     });
	 
});
	

	
}

function buildcitytable(sample) {
	
 //Define the element to select
	var selector = d3.select("tbody");
	let url = `/citytable/${sample}`;
//Clearing the html under the cell.
	selector.html('');

//Iterate the Json and post the value	
d3.json(url).then((sampleNames) => {
	console.log(sampleNames)
  selector
  .selectAll("tr")
  .data(sampleNames)
  .enter()
  .append("tr")
  .classed("item",true)
  .html(function(d) {
	  //console.log(d.name)
	 return `<td><a href=${d.url}>${d.name}</a></td><td>${d.price}</td><td>${d.bed}</td><td>${d.region}</td><td>${d.City}</td>`;
    //return `<a href="http://example.com"><td>${d.name}</td></a><td>${d.price}</td><td>${d.bed}</td><td>${d.region}</td><td>${d.City}</td>`;
  });
});
}

function buildregiontable(sample) {
	
 //Define the element to select
	var selector = d3.select("tbody");
	let url = `/regiontable/${sample}`;
//Clearing the html under the cell.
	selector.html('');

//Iterate the Json and post the value	
d3.json(url).then((sampleNames) => {
	console.log(sampleNames)
  selector
  .selectAll("tr")
  .data(sampleNames)
  .enter()
  .append("tr")
  .classed("item",true)
  .html(function(d) {
	  //console.log(d.name)
	 return `<td><a href=${d.url}>${d.name}</a></td><td>${d.price}</td><td>${d.bed}</td><td>${d.region}</td><td>${d.City}</td>`;
    //return `<a href="http://example.com"><td>${d.name}</td></a><td>${d.price}</td><td>${d.bed}</td><td>${d.region}</td><td>${d.City}</td>`;
  });
});
}

function buildRegiondata(sample) {

 //Define the element to select
	var cell = d3.select("#sample-metadata");
	let url = `/regiondata/${sample}`;
//Clearing the html under the cell.
	cell.html('');

//Iterate the Json and post the value	
d3.json(url).then((item) => {
     Object.entries(item).forEach(([key, value]) => {
		 cell.append('ul').html(`<li>${key}: ${value}</li><br>`);
       //cell.append('text').html(`${key}: ${value}<br>`);
	   
     });
	 
});
		
}

function buildCharts() {

		//Pie Chart
		console.log("Iam inside")
        var url = `/regioncount`;
		//console.log(url);
        d3.json(url).then(function(data){
	var layout = {
				title: "Top 10 City with more rentals",
				};
		console.log("I am function")
		var d = [{labels:data["labels"],values:data["values"],type: "pie"}]
		console.log(d)
		Plotly.newPlot("pie", d, layout);
        });

		//Bubble Chart
		
		url = `/cityavgprice`;
		d3.json(url).then(function(data){
	//		var trace1 = {x:data["labels"],y:data["values"],  mode: 'markers', text:data["labels"],hoverinfo:"text",marker: { color: data["labels"],size: data["values"]} }
		//	var layout = {
			//	title: 'Marker Size',
				//};
			var trace1 = {x:data["labels"],y:data["values"], type:"bar"}
			
			//var data = [trace1];
			var layout = {
				title: "Top 10 expensive city to rent"
			};
            Plotly.newPlot("bubble", [trace1],layout);//
			
        });
}


function buildregionbar(sample){
		url = `/cityavgpricebyregion/${sample}`;
		
		d3.json(url).then(function(data){
	//		var trace1 = {x:data["labels"],y:data["values"],  mode: 'markers', text:data["labels"],hoverinfo:"text",marker: { color: data["labels"],size: data["values"]} }
		//	var layout = {
			//	title: 'Marker Size',
				//};
			var trace1 = {x:data["labels"],y:data["values"], type:"bar"}
			
			//var data = [trace1];
			var layout = {
				title: "Top 10 City by Average Price"
			};
            Plotly.newPlot("barbyregion", [trace1],layout);//
			
        });

}

function buildCityPie(sample) {

		//Pie Chart
		
        var url = `/citypricebins/${sample}`;
		//console.log(url);
        d3.json(url).then(function(data){
			console.log(data)
	var layout = {
				title: "Price bins For City",
				};
		
		var d = [{labels:data["labels"],values:data["values"],type: "pie"}]
		console.log(d)
		Plotly.newPlot("citypie", d, layout);
        });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
	selector.html('');
  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
	
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
	 
	buildcitytable(firstSample);
	buildCityPie(firstSample);

	});
	selector1 = d3.select("#selRegion");
	selector1.html('');
  // Use the list of sample names to populate the select options
  d3.json("/region").then((sampleRegion) => {
	console.log(sampleRegion)
    sampleRegion.forEach((sample) => {
      selector1
        .append("option")
        .text(sample)
        .property("value", sample);
		
    });
	const firstRegion = sampleRegion[0];
	buildRegiondata(firstRegion);
	buildregionbar(firstRegion)
  });
    // Use the first sample from the list to build the initial plots
    
    buildCharts();
    //buildMetadata(firstSample);
  
}

function optionChanged(newSample) {
	
  buildMetadata(newSample);
  buildcitytable(newSample);
  buildCityPie(newSample);
}

function optionRegionChanged(newSample) {
	
	//buildCharts();
  // Fetch new data each time a new sample is selected
  //buildCharts(newSample);
  buildRegiondata(newSample);
  buildregiontable(newSample);
  buildregionbar(newSample)
}



// Initialize the dashboard
init();
