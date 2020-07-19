const height = 620;
const width = 700;
const padding = 20;
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const body = d3.select('body')
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('justify-content', 'center')
    .style('height', '100vh')
    .style('width', '100vw');

const container = d3.select('body')
    .append('div')
    .attr('class', 'container')
    .style('height', height + (padding * 2) + 'px')
    .style('width', width + (padding * 2) + 'px')
    .style('border', '1px solid black')
    .style('margin', 'auto auto')
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('justify-content', 'center');

// self invoking 
(async () => {

    const dataset = await fetch(url).then(res => res.json());
    console.log(dataset);

    const svg = d3.select('.container')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const title = svg.append('text')
        .attr('id', 'title')
        .attr('x', '360px')
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .style('font-size', '30px')
        .text('Doping in Professional Bicycle Racing');

    let yearData = dataset.map(d => new Date(String(d.Year)));
    let timeData = dataset.map(d => d3.timeParse("%M:%S")(d.Time));
    let yearAndTime = dataset.map((d, i) => [d.Year, d.Time]);

    console.log(yearData);
    console.log(timeData);
    console.log(yearAndTime);

    const yearDomain = [new Date("1992"), new Date("2016")];
    console.log("year domain:", yearDomain);
    const timeDomain = [d3.timeParse("%M:%S")("40:10"), d3.timeParse("%M:%S")("36:50")];
    console.log("time domain:", timeDomain);
    const yearRange = [padding, width - padding];
    const timeRange = [height - padding, padding + 30];
    const xScale = d3.scaleTime().domain(yearDomain).range(yearRange);
    const yScale = d3.scaleTime().domain(timeDomain).range(timeRange);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat(d => d3.timeFormat("%M:%S")(d));
    svg.append('g').attr('transform', `translate(0, ${height - padding * 2})`).call(xAxis);
    svg.append('g').attr('transform', `translate(${padding * 2}, 0)`).call(yAxis);

    const circle = svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xScale(yearData[i]))
        .attr('cy', (d, i) => yScale(timeData[i]))
        .attr('r', 6)
        .style('opacity', '0.5')
        .style('fill', (d, i) => {
            if (d.Doping === '') {
                return 'navy';
            } else {
                return 'red';
            }
        })
        .attr('stroke', 'black')
        .append('title')
        .text(d => d)

})();

