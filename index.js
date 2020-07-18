const height = 700;
const width = 850;
const padding = 50;
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
    .style('height', height + padding + 'px')
    .style('width', width + padding + 'px')
    .style('border', '1px solid black')
    .style('margin', 'auto auto');

const svg = d3.select('.container')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

