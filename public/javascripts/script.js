document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronGenerator JS imported successfully!");
  },
  false
);


Handlebars.registerHelper("divideMyThings", function(thing1, thing2, thing3) {
    return thing1 / thing2 / thing3;
  });

