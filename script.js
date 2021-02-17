 require(["esri/Map", "esri/layers/CSVLayer", "esri/views/MapView", "esri/widgets/Legend"], function(
        Map,
        CSVLayer,
        MapView,
        Legend
      ) {
        const url = "https://raw.githubusercontent.com/gbrunner/Advanced_Python_for_GIS_and_RS/master/Week%202/stl_crime_wgs_84.csv";

        // Paste the url into a browser's address bar to download and view the attributes
        // in the CSV file. These attributes include:
        // * mag - magnitude
        // * type - earthquake or other event such as nuclear test
        // * place - location of the event
        // * time - the time of the event

        const template = {
   title: "Crime committed at {ILEADSStreet}"
};

        // The heatmap renderer assigns each pixel in the view with
        // an intensity value. The ratio of that intensity value
        // to the maxPixel intensity is used to assign a color
        // from the continuous color ramp in the colorStops property

        const renderer = {
          type: "heatmap",
          colorStops: [
            { color: "rgba(63, 40, 102, 0)", ratio: 0 },
            { color: "#2EFE2E", ratio: 0.083 },
            { color: "#64FE2E", ratio: 0.166 },
            { color: "#9AFE2E", ratio: 0.249 },
            { color: "#C8FE2E", ratio: 0.332 },
            { color: "#F7FE2E", ratio: 0.415 },
            { color: "#FACC2E", ratio: 0.498 },
            { color: "#FE9A2E", ratio: 0.581 },
            { color: "#FE642E", ratio: 0.664 },
            { color: "#FE2E2E", ratio: 0.747 }
          ],
          maxPixelIntensity: 25,
          minPixelIntensity: 0
        };

        const layer = new CSVLayer({
        url: url,
        title: "St. Louis Crime Heatmap",
        copyright: "St. Louis Police Department",
		latitudeField:"Lat",
        longitudeField:"Lon",
		popupTemplate: template,
		renderer: renderer
});

        const map = new Map({
          basemap: "gray-vector",
          layers: [layer]
        });

        const view = new MapView({
          container: "viewDiv",
          center: [-90.22,38.63],
          zoom: 12,
          map: map
        });

        view.ui.add(
          new Legend({
            view: view
          }),
          "bottom-right"
        );
      });
