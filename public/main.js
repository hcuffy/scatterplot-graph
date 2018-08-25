$(document).ready(function() {
	$.getJSON(
		'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json',
		function(data) {

			const width = 900
			const height = 400
			const padding = 20
			const specifier = '%M:%S'
			var dataset = []
    	var formatTime = d3.timeFormat(specifier)

			var tooltip = d3
				.select('body')
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
			const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat(specifier))

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
				.attr('fill', d => {
				  let circleColor =  d[4].length ? '#d64f4f' : '#378718'
					 return circleColor
				})
				.attr('data-xvalue', d => d[1])
				.attr('data-yvalue', d => new Date (d[0]))
				.on('mouseover', d => {
					tooltip
						.transition()
						.style('opacity', 1)
						.style('visibility', 'visible')
					tooltip
						.attr('data-year', d[1])
						.html( d[2] + ' : ' + d[3] + '<br>' + 'Year: ' + d[1] + ' Time: ' + formatTime(d[0]) + '<br>' + d[4])
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

			var legend =	svg
				.selectAll('.legend')
				.data(['' ,'Doping'])
				.enter()
				.append('g')
		    .attr('class', 'legend')
		    .attr('id', 'legend')
		    .attr('transform', (d , i) => {
		      return 'translate(0,' + ((height/2) + i * 25)+ ')'
		    })

		  legend
			  .append('rect')
		    .attr('x', width - 50)
		    .attr('width', 20)
		    .attr('height', 20)
		    .style('fill',  d => {
				  let circleColor =  d.length ? '#d64f4f' : '#378718'
					return circleColor
				})

		  legend
			  .append('text')
		    .attr('x', width - 55)
		    .attr('y', 15)
		    .text((d) => {
					let legendText =  d.length ? 'Cyclist who doped' : 'Cyclist who did not dope'
					return legendText

				})
		}
	)
})
