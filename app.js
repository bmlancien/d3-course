async function draw() {
    const dataset = await d3.json('data.json')
    const xAccessor = (d) => d.currently.humidity;
    const yAccessor = (d) => d.currently.apparentTemperature;

    let dimensions = {
        width: 800,
        height: 800,
        margin: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
        }
    }

    // Save container dimensions
    dimensions.ctrWidth= dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.ctrHeight= dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)

    const ctr = svg.append('g')
        .attr(
            'transform',
            `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)

    // Scales
    // Map input value (domain) to output value (range)
    const xScale = d3.scaleLinear()
        // extent() has an optional second argument for accessor function
        // apply the xAccessor function to each data point in dataset
        // to find the minimum and maximum humidity values
        .domain(d3.extent(dataset, xAccessor))
        // here we can use 0 because we have margins
        .range([0, dimensions.ctrWidth])

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([0, dimensions.ctrHeight])

    ctr.selectAll('circle')
        .data(dataset)
        .join('circle')
        // The scale expects a number, not an object
        // Passing the humidity value extracted from the data point d into the scale function
        // which then maps this humidity value to a corresponding position on the x-axis
        // Or in other words:
        // for each data point d, use the xAccessor function to retrieve the x-value
        // and then use the xScale function to map this value on the x-axis
        .attr('cx', d => xScale(xAccessor(d)))
        .attr('cy', d => yScale(yAccessor(d)))
        .attr('r', 5)
        .attr('fill', 'red')
}

draw()