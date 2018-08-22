$(document).ready(function() {
	$.getJSON(
		'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
		function(data) {

			const width = 900
			const height = 400
			const padding = 20
			const specifier = '%M:%S'
			var dataset = []

			data.forEach((entry) => {
				var timeTesz = d3.timeParse(specifier)(entry.Time)
				dataset.push([timeTesz , entry.Year])
			})

			const maxYear = d3.max(dataset, d => d[1])
			const minYear = d3.min(dataset, d => d[1])

			var xScale = d3
				.scaleLinear()
				.domain([minYear - 2, maxYear + 2])
				.range([0, width])

			var yScale = d3
				.scaleTime()
				.domain(d3.extent(dataset, d => d[0]))
				.range([20 , height ])

			const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'))
			const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'))

			const svg = d3.select('body')
				.append('svg')
				.attr('width', width)
				.attr('height', height)
				.style('padding', padding)

			svg.selectAll('circle')
				.data(dataset)
				.enter()
				.append('circle')
				.attr('cx', d => xScale(d[1]))
				.attr('cy', d => yScale(new Date (d[0])))
				.attr('r', 7)
				.attr('fill', '#4286f4')

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
