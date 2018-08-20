$(document).ready(function() {
	$.getJSON(
		'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
		function(data) {

			const w = 500
			const h = 500

			var dataset = []
			data.forEach((entry) => {
				var timeTesz = entry.Time.split(':')
				var newtime = new Date(Date.UTC(1970, 0, 1, 0, timeTesz[0], timeTesz[1]))
				dataset.push([timeTesz , entry.Year])

			})

			const svg = d3.select('body')
				.append('svg')
				.attr('width', w)
				.attr('height', h)

			svg.selectAll('circle')
				.data(data)
				.enter()
				.append('circle')
				.attr('cx', (d, i) => d.Year )
				.attr('cy', (d, i) => h - console.log(dataset))
				.attr('r', 5)

		}
	)
})
