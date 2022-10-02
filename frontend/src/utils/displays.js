const DAY_IN_MS = 86400000;

//get 30 days ago in MS
function getThirtyDaysPriorInMS(refDate) {
  //from Chart, pass refDate: Date
  return refDate.getTime() - 30 * DAY_IN_MS;
  //this is considered "zero days"
}

//convert ISO strings to ms
//convert difference with 30days (start point) to days
//assumes array with key "created_at" ISO string
export function convertFrom30(refDate, arr) {
  const zeroDaysInMS = getThirtyDaysPriorInMS(refDate);
  return arr.map((item) => ({
    ...item,
    daysElapsed: Math.round(
      (new Date(item.created_at).getTime() - zeroDaysInMS) / DAY_IN_MS
    ),
  }));
}

//each object in CanvasJS has the following shape:
const chartObjPoint = {
  x: 451,
  y: 148,
  dataPoint: { x: 27, y: 0.944423232132398, text: "Here tweet" }, //the text is added custom
  dataSeries: {
    type: "scatter",
    name: "First",
    markerType: "triangle" /**etc */,
  },
  dataPointIndex: 10,
  dataSeriesIndex: 0,
  chart: {
    predefinedThemes: "etc",
    theme: "light2",
    _defaultsKey: "Chart",
    //...
  },
};
