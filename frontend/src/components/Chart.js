import { convertFrom30 } from "../utils/displays";
import CanvasJSReact from "../assets/canvasjs.react";
import { useEffect, useState } from "react";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart({ selected, earliestDate }) {
  // const [forDisplay, setForDisplay] = useState('');

  //this is not working
  const toggleDataSeries = (e) => {
    if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
  };

  let forDisplay;
  if (selected) {
    console.log("running");
    //update the nested arrays in selected:
    forDisplay = selected.map((a) => ({
      ...a,
      tweets: convertFrom30(earliestDate, a.tweets),
    }));
  }

  const options = {
    theme: "light2",
    animationEnabled: true,
    title: { text: "Comparative Sentiment over 30 Days" },
    axisX: {
      title: "Last 30 Days",
      suffix: "Days",
    },
    axisY: {
      title: "Score",
    },
    legend: {
      cursor: "pointer",
      itemclick: toggleDataSeries, //check this
    },
    data: forDisplay.map((acct) => ({
      type: "scatter",
      click: function (e) {
        alert(`${e.dataSeries.name}: ${e.dataPoint.text}`);
      },
      name: acct.username,
      markerType: "triangle",
      showInLegend: true,
      toolTipContent:
        '<span className="Tooltip" style="color:#4F81BC; ">{name} | Click for tweet</span><br>Day: {x}<br>Score: {y}%',
      //an array
      dataPoints: acct.tweets.map((tweet) => ({
        x: tweet.daysElapsed,
        y: tweet.score,
        text: tweet.text,
      })),
      //notice the daysElapsed key exists only within the local var array "forDisplay"
    })),
  };

  return (
    <>
      <CanvasJSChart
        options={options}
        containerProps={{ width: "90%", height: "80vh" }}
      />
    </>
  );
}
