var margin = 50;
var width = 400 - 2 * margin;
var height = 300 - 2 * margin;
var padding = 0.1;
var delta = 1000;

var svg = d3.select("body").append("svg")
    .attr("width", width*2 + 3*margin)      
    .attr("height", height*2 + 3*margin);

//start of the chart
var chart1 = svg.append('g').attr('transform', `translate(${margin}, ${margin})`);
var chart2 = svg.append('g').attr('transform', `translate(${margin*2+width}, ${margin})`);
var chart3 = svg.append('g').attr('transform', `translate(${margin}, ${margin*2+height})`);
var chart4 = svg.append('g').attr('transform', `translate(${margin*2+width}, ${margin*2+height})`);

chart1.attr("class","chart");	
chart2.attr("class","chart");	
chart3.attr("class","chart");	
chart4.attr("class","chart");

//scale
var yScale1 = d3.scaleLinear().range([height,0]);
var yScale2 = d3.scaleLinear().range([height,0]);
var yScale3 = d3.scaleLinear().range([height,0]);
var yScale4 = d3.scaleLinear().range([height,0]);

var xScale = d3.scaleBand().rangeRound([10,width]).padding(padding);	
	
function updateXScaleDomain(data) {
    xScale.domain(data.map((s) => s.id)); 
}

function updateYScaleDomain(values){
    yScale1.domain([0, d3.max(values, function(d) { return d.a; })]);
    yScale2.domain([0, d3.max(values, function(d) { return d.b; })]); 
    yScale3.domain([0, d3.max(values, function(d) { return d.c; })]); 
    yScale4.domain([0, d3.max(values, function(d) { return d.d; })]); 
}

function background(){
	svg.selectAll(".chart").append("rect")
	    .attr("x", 0)
	    .attr("y", 0)
	    .attr("width", width)
	    .attr("height", height)
	    .attr("fill", "white")
	    .attr("opacity", 0.01)
	    .attr("class","background");
}

function drawAxes(){

	//x
	chart1.append("g").attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale).tickValues([]));
	chart2.append("g").attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale).tickValues([]));
	chart3.append("g").attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale).tickValues([]));
	chart4.append("g").attr('transform', `translate(0, ${height})`).call(d3.axisBottom(xScale).tickValues([]));	
	
	//y
	chart1.append("g").call(d3.axisLeft(yScale1));
	chart2.append("g").call(d3.axisLeft(yScale2));
	chart3.append("g").call(d3.axisLeft(yScale3));
	chart4.append("g").call(d3.axisLeft(yScale4));
}

function writeLabels(){

	//labels
	svg.append("text")
       	.attr("x", margin + 20)
       	.attr("y", margin - 5)
       	.attr("font-size","12px")
       	.style("text-anchor", "end")
       	.text("Value A");
       svg.append("text")
       	.attr("x", margin*2+width + 20)
       	.attr("y", margin - 5)
       	.attr("font-size","12px")
       	.style("text-anchor", "end")
       	.text("Value B");
       svg.append("text")
       	.attr("x", margin + 20)
       	.attr("y", margin*2+height -5)
       	.attr("font-size","12px")
       	.style("text-anchor", "end")
       	.text("Value C");
       svg.append("text")
       	.attr("x", margin*2+width + 20)
       	.attr("y", margin*2+height - 5)
       	.attr("font-size","12px")
       	.style("text-anchor", "end")
       	.text("Value D");
}

function updateDrawing(values){

	var bars1 = chart1.selectAll(".bar").data(values,function(d){return d.a})
	bars1.exit().remove();
	bars1.enter().append("rect")
		.attr("class","bar")
		.attr("x", function(d) { return xScale(d.id); })
        	.attr("y", function(d) { return yScale1(d.a); })
        	.attr("width", xScale.bandwidth())
        	.attr("height", function(d) { return height - yScale1(d.a); });
	bars1.transition().duration(delta)
        	.attr("x", function(d) { return xScale(d.id); })
        	.attr("y", function(d) { return yScale1(d.a); });      

	var bars2 = chart2.selectAll(".bar").data(values,function(d){return d.b})
	bars2.exit().remove();
	bars2.enter().append("rect")
		.attr("class","bar")
		.attr("x", function(d) { return xScale(d.id); })
        	.attr("y", function(d) { return yScale2(d.b); })
        	.attr("width", xScale.bandwidth())
        	.attr("height", function(d) { return height - yScale2(d.b); });
	bars2.transition().duration(delta)
        	.attr("x", function(d) { return xScale(d.id); })
        	.attr("y", function(d) { return yScale2(d.b); });
        	
	var bars3 = chart3.selectAll(".bar").data(values,function(d){return d.c})
	bars3.exit().remove();
	bars3.enter().append("rect")
		.attr("class","bar")
		.attr("x", function(d) { return xScale(d.id); })
        	.attr("y", function(d) { return yScale3(d.c); })
        	.attr("width", xScale.bandwidth())
        	.attr("height", function(d) { return height - yScale3(d.c); });
	bars3.transition().duration(delta)
        	.attr("x", function(d) { return xScale(d.id); })
        	.attr("y", function(d) { return yScale3(d.c); });

	var bars4 = chart4.selectAll(".bar").data(values,function(d){return d.d})
	bars4.exit().remove();
	bars4.enter().append("rect")
		.attr("class","bar")
		.attr("x", function(d) { return xScale(d.id); })
        	.attr("y", function(d) { return yScale4(d.d); })
        	.attr("width", xScale.bandwidth())
        	.attr("height", function(d) { return height - yScale4(d.d); });
	bars4.transition().duration(delta)
        	.attr("x", function(d) { return xScale(d.id); })
        	.attr("y", function(d) { return yScale4(d.d); });
       
	var bars = svg.selectAll(".bar").attr("fill", "rgb(70,110,185)");
}

function updateAll(data){
	updateXScaleDomain(data);
	updateDrawing(data);
}

d3.json("data/dataset.json")
	.then(function(data) {

		updateYScaleDomain(data);
		updateXScaleDomain(data);
		background();
		drawAxes();
		writeLabels();
		updateDrawing(data);
		
		var charts = svg.selectAll(".chart")
			.on("mouseover", function(d){
				d3.select(this).attr("opacity",0.6);	
				})
			.on("mouseout", function(d){
				d3.select(this).attr("opacity",1);
				})
			
		chart1.on("click", function(d){	
			data.sort( function (a,b) { return d3.ascending(a.a,b.a)});
			updateAll(data);
			})
		chart2.on("click", function(d){		
			data.sort( function (a,b) { return d3.ascending(a.b,b.b)})
			updateAll(data);
			})
		chart3.on("click", function(d){		
			data.sort( function (a,b) { return d3.ascending(a.c,b.c)})
			updateAll(data);
			})
		chart4.on("click", function(d){		
			data.sort( function (a,b) { return d3.ascending(a.d,b.d)})
			updateAll(data);
			})
			
	})
	.catch(function(error) {
		console.log(error); // Some error handling here
  	});

    	

    

