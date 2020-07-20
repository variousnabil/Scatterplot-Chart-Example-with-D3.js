const height = 620;
const width = 750;
const padding = 20;
const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const body = d3.select('body')
    .style('display', 'flex')
    .style('align-items', 'center')
    .style('justify-content', 'center')
    .style('height', '100%')
    .style('width', '100%');

const container = d3.select('body')
    .append('div')
    .attr('class', 'container')
    .style('height', height + (padding * 2) + 'px')
    .style('width', width + (padding * 2) + 'px')
    .style('border', '1px solid black')
    .style('margin', '20px 10px')
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
    let timeData = dataset.map(d => {
        let time = d.Time.split(':');
        return new Date(`2020-01-01T00:${time[0]}:${time[1]}`)
    });

    const yearDomain = [new Date("1992"), new Date("2016")];
    console.log("year domain:", yearDomain);
    // const timeDomain = [d3.timeParse("%M:%S")("40:00"), d3.timeParse("%M:%S")("36:50")];
    const timeDomain = [d3.max(timeData), d3.min(timeData)];
    console.log("time domain:", timeDomain);
    const yearRange = [padding, width - padding];
    const timeRange = [height - padding, padding + 30];
    const xScale = d3.scaleTime().domain(yearDomain).range(yearRange);
    const yScale = d3.scaleTime().domain(timeDomain).range(timeRange);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale).tickFormat(d => d3.timeFormat("%M:%S")(d));
    svg.append('g')
        .attr('transform', `translate(0, ${height - padding * 2})`)
        .attr('id', 'x-axis')
        .call(xAxis);
    svg.append('g')
        .attr('transform', `translate(${padding * 2}, 0)`)
        .attr('id', 'y-axis')
        .call(yAxis);

    svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => xScale(yearData[i]))
        .attr('cy', (d, i) => yScale(timeData[i]) + 0.5)
        .attr('r', 6)
        .attr('class', (d, i) => 'dot dot' + i)
        .attr('data-xvalue', d => d.Year)
        .attr('data-yvalue', (d, i) => timeData[i])
        .style('opacity', '0.7')
        .style('fill', (d, i) => {
            if (d.Doping === '') {
                return 'navy';
            } else {
                return 'orange';
            }
        })
        .attr('stroke', 'black')

    svg.append('text')
        .attr('id', 'title')
        .attr('x', `${(width / 2) + 30}px`)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .style('font-size', '26px')
        .text('Doping in Professional Bicycle Racing');

    const description = svg.append('g')
        .attr('id', 'legend');

    // description 1
    description.append('rect')
        .style('fill', 'orange')
        .attr('height', 16)
        .attr('width', 16)
        .attr('stroke', 'black')
        .style('opacity', '0.7')
        .attr('transform', `translate(${width - padding * 2}, ${height - padding * 20})`);
    description.append('text')
        .text('Riders with doping allegations')
        .style('font-size', 14)
        .attr('transform', `translate(${width - padding * 11}, ${height - (padding * 20 - 12)})`);


    //description 2
    description.append('rect')
        .style('fill', 'navy')
        .attr('height', 16)
        .attr('width', 16)
        .attr('stroke', 'black')
        .style('opacity', '0.7')
        .attr('transform', `translate(${width - padding * 2}, ${height - padding * 19})`);
    description.append('text')
        .text('No doping allegations')
        .style('font-size', 14)
        .attr('transform', `translate(${width - padding * 8.6}, ${height - (padding * 19 - 12)})`);

    // tooltip
    dataset.forEach((item, i) => {
        document.querySelector('.dot' + i).addEventListener('mouseover', e => {
            const name = item.Name;
            const nationality = item.Nationality;
            const year = item.Year;
            const time = item.Time;
            const doping = item.Doping;
            const tooltip = document.querySelector('#tooltip');
            if (doping === '') {
                tooltip.innerHTML = `${name}, ${nationality}
                <br>
                Year: ${year}, Time: ${time}`;
            } else {
                tooltip.innerHTML = `${name}, ${nationality}
                <br>
                Year: ${year}, Time: ${time}
                <br><br>
                ${doping}`;
            }
            tooltip.setAttribute('data-year', e.target.attributes['data-xvalue'].value);
            tooltip.style.opacity = 0.6;
            tooltip.style.left = (e.pageX + 20) + 'px';
            tooltip.style.top = (e.pageY - 30) + 'px';
        });
        document.querySelector('.dot' + i).addEventListener('mouseleave', e => {
            const tooltip = document.querySelector('#tooltip');
            tooltip.style.opacity = 0;
            tooltip.style.left = '0px';
            tooltip.style.top = '0px';
        });
    });
})();
