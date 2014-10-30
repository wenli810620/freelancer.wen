<body>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script>

var width = 600,
    height = 400,
    radius = Math.min(width, height) / 2,
    innerRadius = 0.3 * radius;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.width; });

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(function (d) { 
    return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
  });

var outlineArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

var svg1 = d3.select("body").append("svg")
    .attr("width", 1000)
    .attr("height", 450);

var svg = svg1.append("g")
    .attr("transform", "translate(" + 650 + "," + 220+ ")");

d3.csv('/content/skill.csv', function(error, data) {

  data.forEach(function(d) {
    d.id     =  d.id;
    d.order  = +d.order;
    d.color  =  d.color;
    d.weight = +d.weight;
    d.score  = +d.score;
    d.width  = +d.weight;
    d.label  =  d.label;
  });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
  var path = svg.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("d", arc);

  var outerPath = svg.selectAll(".outlineArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  


  // calculate the weighted mean score
  var score = 
    data.reduce(function(a, b) {
      //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
      return a + (b.score * b.weight); 
    }, 0) / 
    data.reduce(function(a, b) { 
      return a + b.weight; 
    }, 0);

  svg.append("svg:text")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text(Math.round(score));
  
 var legend =  svg1.selectAll(".legend")

  legend.data(data)
  .enter()
  .append("rect")
  .attr("y",function(d,i){return 10+i*20})
  .attr("x",100)
  .attr("height",30)
  .attr("width",30)
  .attr("fill",function(d,i){return d.color});

  legend.data(data)
  .enter()
  .append("text")
  .attr("y",function(d,i){return 25+i*20})
  .attr("x",140)
  .text(function(d) {return d.label});
});
</script>
</body>