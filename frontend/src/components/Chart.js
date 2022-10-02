import { convertFrom30 } from "../utils/displays";
import CanvasJSReact from "../assets/canvasjs.react";
import { useEffect, useState } from "react";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart({ selected, setSelected, earliestDate }) {
  // const [forDisplay, setForDisplay] = useState('');

  //rotates through - but repeats after 4
  const shapes = ["triangle", "cross", "circle", "square"];

  //would like to memoize...may need to change to state
  let forDisplay;
  if (selected) {
    //update the nested arrays in selected:
    forDisplay = selected.map((a) => ({
      ...a,
      tweets: convertFrom30(earliestDate, a.tweets),
    }));
  }

  const removeFromSet = (e) => {
    const user = e.target.id;
    const updated = selected.filter((acct) => !(acct.username === user)); //parenth around expression is necessary
    if (!updated.length) {
      //clunky way of hiding chart from inside chart. Needs to be length prop not array itself
      setSelected("");
    } else {
      setSelected(updated);
    }
  };

  const options = {
    theme: "light2",
    animationEnabled: true,
    axisX: {
      labelFontColor: "black",
      labelFontSize: 15,
      minimum: 0,
      margin: 20,
      suffix: " days",
    },
    axisY: {
      title: "Score",
      titleFontSize: 15,
      titleFontWeight: "bold",
      titleFontColor: "black",
      minimum: 0,
    },
    legend: {
      cursor: "pointer",
      fontSize: 15,
      verticalAlign: "top",
    },
    data: forDisplay.map((acct) => ({
      type: "scatter",
      click: function (e) {
        // console.log(e)
        alert(`${e.dataSeries.name}: ${e.dataPoint.text}`);
      },
      name: acct.username,
      markerType:
        shapes[
          forDisplay.indexOf(acct) < shapes.length
            ? forDisplay.indexOf(acct)
            : forDisplay.indexOf(acct) % shapes.length
        ],
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
      {selected && (
        <>
          <h2>Click username to remove from set</h2>
          <ul className="list__users">
            {selected.map((acct) => (
              <li key={selected.indexOf(acct)}>
                <button
                  type="button"
                  className="ClickableNonButton"
                  id={acct.username}
                  onClick={(e) => removeFromSet(e)}
                >
                  {acct.username}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="button__removeAll"
            onClick={() => setSelected("")}
          >
            Remove all sets
          </button>
          <div className="Chart__wrapper">
            <CanvasJSChart
              options={options}
              containerProps={{
                width: "90%",
                height: "80vh",
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
