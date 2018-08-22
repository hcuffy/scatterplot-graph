$(document).ready(function() {
	$.getJSON(
		'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
		function(data) {

			const w = 900
			const h = 400
			const padding = 80
			var dataset = []
			var specifier = '%M:%S'

			data.forEach((entry) => {
				var timeTesz = d3.timeParse(specifier)(entry.Time)
				dataset.push([timeTesz , entry.Year])
			})

			var maxYear = d3.max(dataset, d => d[1])
			var minYear = d3.min(dataset, d => d[1])

			var xScale = d3
				.scaleLinear()
				.domain([minYear -2, maxYear + 2])
				.range([0, w])

			var yScale = d3
				.scaleTime()
				.domain(d3.extent(dataset, d => d[0]))
				.range([20 , h ])

			const xAxis = d3.axisBottom(xScale)
			const yAxis = d3.axisLeft(yScale)

			const svg = d3.select('body')
				.append('svg')
				.attr('width', w)
				.attr('height', h)

			svg.selectAll('circle')
				.data(dataset)
				.enter()
				.append('circle')
				.attr('cx', d => xScale(d[1]))
				.attr('cy', d => yScale(new Date (d[0])))
				.attr('r', 7)
				.attr('fill', '#4286f4')

		}
	)
})
