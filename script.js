$(function() {

  // Updates all pet information when the page first loads.
  checkAndUpdatePetInfoInHtml();

  // Connect the pet action buttons.
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton);

  // Connect the DevTools demonstration buttons.
  $('.console-demo-button').click(runConsoleDemo);
  $('.error-404-button').click(trigger404Error);
  $('.type-error-button').click(triggerTypeError);
  $('.violation-button').click(triggerViolation);


  /*
    UNIQUE JQUERY METHOD 1: .children()

    .children() selects only the direct children of the selected element.
    Here it selects the buttons directly inside .button-container.
  */
  var numberOfActions =
    $('.button-container').children('button').length;

  $('.action-count').text(numberOfActions);

});


// Pet information object.
var pet_info = {
  name: "Mewtwo",
  weight: 25,
  happiness: 50,
  energy: 50
};


// Pet messages.
var petComments = [
  "Yum! That treat was delicious!",
  "That was fun! Let's play again!",
  "That exercise was tiring, but good for me!",
  "I feel refreshed after my nap!"
];


// Treat increases happiness and weight.
function clickedTreatButton() {
  pet_info.happiness += 5;
  pet_info.weight += 2;
  pet_info.energy += 2;

  updatePetMessage(petComments[0]);
  checkAndUpdatePetInfoInHtml();
}


// Playing increases happiness but should decrease weight and energy.
function clickedPlayButton() {
  pet_info.happiness += 8;
  pet_info.weight -= 1;
  pet_info.energy -= 5;

  updatePetMessage(petComments[1]);
  checkAndUpdatePetInfoInHtml();
}


// Exercise decreases happiness, weight, and energy.
function clickedExerciseButton() {
  pet_info.happiness -= 3;
  pet_info.weight -= 2;
  pet_info.energy -= 8;

  updatePetMessage(petComments[2]);
  checkAndUpdatePetInfoInHtml();
}


// Nap restores happiness and energy.
function clickedNapButton() {
  pet_info.happiness += 2;
  pet_info.energy += 10;

  updatePetMessage(petComments[3]);
  checkAndUpdatePetInfoInHtml();
}


// Checks values and updates the page.
function checkAndUpdatePetInfoInHtml() {
  checkWeightAndHappinessBeforeUpdating();
  updatePetInfoInHtml();
}


// Prevents stats from dropping below zero.
function checkWeightAndHappinessBeforeUpdating() {

  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }

  if (pet_info.energy < 0) {
    pet_info.energy = 0;
  }
}


// Updates the HTML with current pet values.
function updatePetInfoInHtml() {

  /*
    UNIQUE JQUERY METHOD 2: .find()

    .find() searches all descendants inside .dashboard
    for the requested elements.
  */
  var dashboard = $('.dashboard');

  dashboard.find('.name').text(pet_info.name);
  dashboard.find('.weight').text(pet_info.weight);
  dashboard.find('.happiness').text(pet_info.happiness);
  dashboard.find('.energy').text(pet_info.energy);
}


// Displays a message from the pet.
function updatePetMessage(message) {
  $('.dashboard').find('.pet-message').text(message);
}


// ==================================================
// DEVTOOLS ASSIGNMENT
// ==================================================


// Demonstrates the required developer console methods.
function runConsoleDemo() {

  // Info / Log
  console.info("[GIGA PET] Info: Console demo started.");
  console.log("[GIGA PET] Current pet:", pet_info);

  // Warning
  console.warn("[GIGA PET] Warning: Keep an eye on Mewtwo's energy!");

  // Error
  console.error("[GIGA PET] Error demo: This is an intentional console error.");

  // Table
  var petStatsTable = [
    {
      stat: "Weight",
      value: pet_info.weight
    },
    {
      stat: "Happiness",
      value: pet_info.happiness
    },
    {
      stat: "Energy",
      value: pet_info.energy
    }
  ];

  console.table(petStatsTable);

  // Group
  console.group("[GIGA PET] Pet Information Group");
  console.log("Name:", pet_info.name);
  console.log("Weight:", pet_info.weight);
  console.log("Happiness:", pet_info.happiness);
  console.log("Energy:", pet_info.energy);
  console.groupEnd();

  // Custom styled output using %c
  console.log(
    "%cGIGA PET DEBUG MODE",
    "background: #324a5f; color: white; padding: 5px 10px; font-weight: bold;"
  );
}


// Intentionally requests a file that does not exist.
// Run the project through GitHub Pages or another web server
// so Chrome reports the missing request as a 404.
function trigger404Error() {
  fetch("missing-debug-file.json");
}


// Intentionally creates an uncaught TypeError.
function triggerTypeError() {
  var missingPet = undefined;

  // Cannot read a property from undefined.
  console.log(missingPet.name);
}


// Intentionally blocks the click handler for about 3 seconds.
// Chrome should report a [Violation] message.
// Make sure Verbose messages are enabled in the Console.
function triggerViolation() {
  var startTime = performance.now();

  while (performance.now() - startTime < 3000) {
    // Intentionally keeps the browser busy.
  }
}