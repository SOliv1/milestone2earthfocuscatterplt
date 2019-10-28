
    queue()
        .defer(d3.json, "data/countrypopulation.json")
        .await(makeGraphs);
    function makeGraphs(error, countrypopulationData)   {
    var ndx = crossfilter(countrypopulationData);

         populationDim = ndx.dimension(function(d){
            return d.population;
        });
        var tradeColors = d3.scale.ordinal()
            .domain(["Country", "Population"])
            .range(["red", "green"]);

        var country = ndx.dimension(dc.pluck("Population"));
        countryDim = ndx.dimension(function(d) {
       return [d.country, d.population];
        });
       
        var countryGroup = countryDim.group();
        minPopulation = populationDim.bottom(1)[0].population;
        maxPopulation = populationDim.top(1)[0].population;
        
        var area = ndx.dimension(dc.pluck("Population"));
        areaDim = ndx.dimension(function(d) {
       return [d.area, d.population];
        });

        areaDim = ndx.dimension(function(d){
            return [d.area, d.population, d.country];
        });
        var areaGroup = areaDim.group();
        
        var area_chart = dc.scatterPlot("#scatter-plot");

        area_chart
            .width(768)
            .height(480)
            .x(d3.time.scale().domain([minPopulation, maxPopulation]))
            .brushOn(false)
            .symbolSize(8)
            .clipPadding(10)
            .yAxisLabel("Country")
            .title(function (d) {
                return d.key[2] + "Country" + d.key[2].country + "Population" + d.key[2].population +"Area" + d.key[2].area;
            })
            .colorAccessor(function (d) {
                return d.key[2].area;
            })
            .colors(tradeColors)
            .dimension(areaDim)
            .group(areaGroup);

      dc.renderAll();

    }

