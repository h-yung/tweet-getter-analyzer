// commented out the following toxicity model temp to avoid version incomp
// import toxicity from '@tensorflow-models/toxicity';

// The minimum prediction confidence.
const threshold = 0.9;

// Load the model. Users optionally pass in a threshold and an array of
// labels to include.

export function checkToxicity(textArray) {
  toxicity.load(threshold).then((model) => {
    const sentences = ["you suck"];

    model.classify(textArray).then((predictions) => {
      console.log(predictions);
      for (const pred of predictions) {
        console.log(pred.label + "? " + pred.results[0].match); //srsly why a single obj array?
      }
    });
  });
}
