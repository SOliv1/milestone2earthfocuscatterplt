
    queue()
        .defer(d3.json, "data/countrypopulation.json")
        .await(makeGraphs);
    function makeGraphs(error, countrypopulationData)   {
    var ndx = crossfilter(countrypopulationData);

    var Population_Dim = ndx.dimension(function(d){
            return d.Population;
        });
        var tradeColors = d3.scale.ordinal()
            .domain(["Country", "Continent"])
            .range(["red", "green"]);

    var specific_Country = ndx.dimension(dc.pluck("Population"));
    var Country_Dim = ndx.dimension(function(d) {
       return [d.Specific_Country, d.Population];
    });
    var specificCountryGroup = specificCountryDim.group();

        var min_Population = Population_dim.bottom(1)[0].Population;
        var max_Population = Population_dim.top(1)[0].Population;

        var Continent_Dim = ndx.dimension(dc.pluck("Population"));
        var tot_Continent = ndx.dimension(function(d){
            return [d.Population, d.Country, d.Continent];

        var Area_dim = ndx.dimension(function(d){
            return [d.Area, d.Population, d.Country, d.Continent];
        });
        var AreaGroup = AreaDim.group();
        var Area_chart = dc.scatterPlot("#scatter-plot");
        Area_chart
            .width(768)
            .height(480)
            .x(d3.time.scale().domain([min_Population, max_Population]))
            .brushOn(false)
            .symbolSize(8)
            .clipPadding(10)
            .yAxisLabel("Country")
            .title(function (d) {
                return d.key[2] + "Country" + d.key[2].Country + "Population" + d.key[2].Population +"Area" + d.key[2].Area;
            })
            .colorAccessor(function (d) {
                return d.key[2].Area;
            })
            .colors(tradeColors)
            .dimension(Area_dim)
            .group(Area_group);

      dc.renderAll();

    })

 