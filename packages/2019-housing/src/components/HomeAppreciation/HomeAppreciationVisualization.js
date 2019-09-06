import React from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { extent, scaleOrdinal } from "d3";

import {
  BaseMap,
  ChartContainer,
  civicFormat,
  HorizontalBarChart,
  LineChart,
  MapOverlay,
  MapTooltip
} from "@hackoregon/component-library";

const HomeAppreciationVisualization = ({ data }) => {
  if (
    !data ||
    !isLoaded(data.annualHomeAppreciation) ||
    !isLoaded(data.homeownershipByRace) ||
    !isLoaded(data.homeInflationData)
  ) {
    return <div>Data Loading...</div>;
  }

  const dataSeriesLabels = [
    { category: "adj_appreciation_med", label: "adj_appreciation_med" },
    { category: "adj_appreciation_25th", label: "adj_appreciation_25th" },
    { category: "adj_appreciation_75th", label: "adj_appreciation_75th" }
  ];

  const lineChartData = data.annualHomeAppreciation.value.results.flatMap(
    yearData => [
      {
        series: "raw_appreciation_med",
        value: yearData.raw_appreciation_med,
        sale_year: yearData.sale_year
      },
      {
        series: "adj_appreciation_25th",
        value: yearData.adj_appreciation_25th,
        sale_year: yearData.sale_year
      },
      {
        series: "adj_appreciation_75th",
        value: yearData.adj_appreciation_75th,
        sale_year: yearData.sale_year
      }
    ]
  );

  const barChartData = data.homeownershipByRace.value.results.filter(
    el => el.race === "black" || el.race === "white"
  );

  const polygonFieldName = "appreciation_estimates";
  const homeInflationFeatures = data.homeInflationData.value.results.features;
  const findDataMinMax = extent(homeInflationFeatures, f =>
    parseFloat(f.properties[polygonFieldName])
  );
  const colorScale = scaleOrdinal()
    .domain(findDataMinMax)
    .range([
      // "Ocean"
      [255, 255, 217],
      [237, 248, 177],
      [199, 233, 180],
      [127, 205, 187],
      [65, 182, 196],
      [29, 145, 192],
      [34, 94, 168],
      [37, 52, 148],
      [8, 29, 88]
    ]);

  return (
    <span>
      <strong style={{ color: "crimson" }}>
        BarChart Visualization TODO:
        <ul>
          <li>...why are the labels RGB values??</li>
        </ul>
      </strong>
      <HorizontalBarChart
        data={barChartData}
        dataValue="home_ownership_rate"
        dataLabel="race"
        title="Home Ownership By Race In Multhomah County (1990)"
        subtitle="Subtitle"
        xLabel="Home Ownership Rate"
        yLabel="Race"
        dataValueFormatter={x => civicFormat.percentage(x)}
      />
      <strong style={{ color: "crimson" }}>
        LineChart Visualization TODO:
        <ul>
          <li>
            Make the confidence interval lines dashed & all lines the same color
          </li>
        </ul>
      </strong>
      <LineChart
        data={lineChartData}
        dataSeriesLabel={dataSeriesLabels}
        dataKey="sale_year"
        dataValue="value"
        dataSeries="series"
        title="Per-House Appreciation For Houses Last Sold Between 1987 and 1993"
        subtitle="Median inflation adjusted appreciation ($) with 25th and 75th percentile ranges"
        xLabel="Sale Year"
        yLabel="Appreciation ($)"
        xNumberFormatter={x => civicFormat.year(x)}
        yNumberFormatter={y => civicFormat.dollars(y)}
      />
      <strong style={{ color: "crimson" }}>
        Map Visualization TODO:
        <ul>
          <li>Figure out what is wrong with this map... </li>
        </ul>
      </strong>
      <ChartContainer
        title="Per-House Appreciation For Houses Last Sold Between 1987 and 1993"
        subtitle="Median inflation adjusted sale price ($) for sold between 1987-1993 and again 2015-2016"
      >
        <BaseMap initialZoom={9.9} updateViewport>
          <MapOverlay
            data={homeInflationFeatures}
            getFillColor={f => colorScale(f.properties[polygonFieldName])}
          >
            <MapTooltip
              primaryName={polygonFieldName}
              primaryField={polygonFieldName}
            />
          </MapOverlay>
        </BaseMap>
      </ChartContainer>
    </span>
  );
};

HomeAppreciationVisualization.propTypes = {
  data: PropTypes.shape({ annualHomeAppreciation: resourceShape })
};

export default HomeAppreciationVisualization;