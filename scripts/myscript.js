d3.json("scripts/importance_data.json").then(function(data) {
  const margin = {top: 30, right: 30, bottom: 100, left: 60},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

  const svg = d3.select("#plot")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
    .domain(data.map(d => d.Variable))
    .range([0, width])
    .padding(0.2);
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d["%IncMSE"])])
    .nice()
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  svg.selectAll("bars")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.Variable))
      .attr("y", d => y(d["%IncMSE"]))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d["%IncMSE"]))
      .attr("fill", "#69b3a2");
});
