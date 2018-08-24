$(document).ready(function() {
	$.getJSON(
		'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
		function(data) {

			const width = 900
			const height = 400
			const padding = 20
			const specifier = '%M:%S'
			var dataset = []

			var tooltip = d3
				.select('.chart')
				.append('div')
				.attr('id', 'tooltip')

			data.forEach((entry) => {
				var timeTesz = d3.timeParse(specifier)(entry.Time)
				dataset.push([timeTesz, entry.Year, entry.Name, entry.Nationality, entry.Doping])
			})

			const maxYear = d3.max(dataset, d => d[1])
			const minYear = d3.min(dataset, d => d[1])

			var xScale = d3
				.scaleLinear()
				.domain([minYear - 1, maxYear + 2])
				.range([0, width])

			var yScale = d3
				.scaleTime()
				.domain(d3.extent(dataset, d => d[0]))
				.range([20 , height ])

			const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'))
			const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'))

			const svg = d3.select('.chart')
				.append('svg')
				.attr('width', width)
				.attr('height', height)
				.style('padding', padding + 50)

			svg.selectAll('circle')
				.data(dataset)
				.enter()
				.append('circle')
				.attr('class', 'dot')
				.attr('cx', d => xScale(d[1]))
				.attr('cy', d => yScale(new Date (d[0])))
				.attr('r', 7)
				.attr('fill', '#727272')
				.attr('data-xvalue', d => d[1])
				.attr('data-yvalue', d => new Date (d[0]))
				.on('mouseover', d => {
					tooltip
						.transition()
						.style('opacity', 1)
						.style('visibility', 'visible')
					tooltip
						.attr('data-year', d[1])
						.html( d[2] + ' : ' + d[3] )
						.style('left', (d3.event.pageX + 10) + 'px')
						.style('top', (d3.event.pageY + 10) + 'px')
				})

			svg.on('mouseout', d => {
				tooltip.transition().style('visibility', 'hidden')
			})


			svg
				.append('g')
				.attr('transform', 'translate(0,'+ height +')')
				.attr('id', 'x-axis')
				.call(xAxis)

			svg
				.append('g')
				.attr('transform', 'translate('+ padding +')')
				.attr('id', 'y-axis')
				.call(yAxis)

		}
	)
})
