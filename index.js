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

    let yearData = dataset.map(d => new Date(String(d.Year)));
    let timeData = dataset.map(d => d.Time);

    console.log(yearData);
    console.log(timeData);

    const yearDomain = d3.extent(yearData);
    console.log("year domain:", yearDomain);
    const timeDomain = d3.extent(timeData);
    console.log("time domain:", timeDomain);
    const yearRange = [padding, width - padding];
    const timeRange = [height - padding, padding];
    const xScale = d3.scaleTime().domain(yearDomain).range(yearRange);
    const yScale = d3.scaleTime().domain(timeDomain).range(timeRange);

    console.log(new Date('1992'));

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append('g').attr('transform', `translate(0, ${height - padding * 2})`).call(xAxis);
    svg.append('g').attr('transform', `translate(${padding * 2}, 0)`).call(yAxis);

})();

