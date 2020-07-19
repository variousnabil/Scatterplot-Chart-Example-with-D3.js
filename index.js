const height = 700;
const width = 850;
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

    let yearData = dataset.map(d => d.Year);
    let timeData = dataset.map(d => d3.timeParse("%M:%S")(d.Time));

    console.log(yearData)
    console.log(timeData)

    const yearDomain = d3.extent(dataset, d => d.Year);
    console.log("year domain:", yearDomain);
    const timeDomain = d3.extent(dataset, d => d3.timeParse("%M:%S")(d.Time));
    console.log("time domain:", timeDomain);
    const yearRange = [padding, width - padding];
    const timeRange = [height - padding, padding];
    const xScale = d3.scaleLinear().domain(yearDomain).range(yearRange);
    const yScale = d3.scaleTime().domain(timeDomain).range(timeRange);

    console.log(xScale(1994));
    console.log(yScale('36:50'));
    console.log(d3.timeParse("%M:%S")(dataset[0].Time));

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append('g').attr('transform', `translate(0, ${height - padding * 2})`).call(xAxis);
    svg.append('g').attr('transform', `translate(${padding * 2}, 0)`).call(yAxis);
})();

