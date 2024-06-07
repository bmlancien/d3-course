async function draw() {
    const dataset = await d3.json('data.json')

    let dimensions = {
        width: 800,
        height: 800,
        // add margins
        // using 50 we don't have to worry about shaped that are smaller than 50 px
        margin: {
            top: 50,
            bottom: 50,
            left: 50,
            right: 50
        }
    }

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)

        // add group
        // we can then apply properties the group
        // which will affect all children
        // But g doesn't accept x and y attributes
    const ctr = svg.append('g')
        // We can use transform instead of x and y
        // Works like CSS
        // Could also be used as "style"
        .attr(
            'transform',
            `translate(${dimensions.margin.left}, ${dimensions.margin.top})`)

    ctr.append('circle')
        .attr('r', 15)
}

draw()