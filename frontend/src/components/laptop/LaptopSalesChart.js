import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const LaptopSalesChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    // Fetch data from the backend
    fetch('http://localhost:3000/api/laptop-sales')
      .then(response => response.json())
      .then(data => createChart(data));
  }, []);

  const createChart = (data) => {
    const svg = d3.select(chartRef.current);
    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    svg.attr("width", width).attr("height", height);

    // X Scale
    const x = d3.scaleBand()
                .domain(data.map(d => d.name))
                .range([margin.left, width - margin.right])
                .padding(0.1);

    // Y Scale
    const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.sales)])
                .nice()
                .range([height - margin.bottom, margin.top]);

    // X Axis
    svg.append("g")
       .attr("transform", `translate(0,${height - margin.bottom})`)
       .call(d3.axisBottom(x));

    // Y Axis
    svg.append("g")
       .attr("transform", `translate(${margin.left},0)`)
       .call(d3.axisLeft(y));

    // Bars
    svg.selectAll(".bar")
       .data(data)
       .enter()
       .append("rect")
       .attr("class", "bar")
       .attr("x", d => x(d.name))
       .attr("y", d => y(d.sales))
       .attr("width", x.bandwidth())
       .attr("height", d => y(0) - y(d.sales))
       .attr("fill", "steelblue");
  };

  return <svg ref={chartRef}></svg>;
};

export default LaptopSalesChart;
