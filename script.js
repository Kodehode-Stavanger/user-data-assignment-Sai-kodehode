const formInput = document.getElementById("form-input");
const exerciseType = document.getElementById("exercise-type");
const exerciseDuration = document.getElementById("exercise-duration");
const waterIntake = document.getElementById("water-intake");
const bloodSugar = document.getElementById("blood-sugar");
const outputContainer = document.getElementById("output-container");

let records = [];
// Getting records from local storage when reloading the page
const getRecordedItems = localStorage.getItem("records");
if (getRecordedItems) {
  records = JSON.parse(getRecordedItems);
  renderList(records);
}

// When submitting the form
formInput.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formInput);
  records.push({
    // Get only date
    date: new Date().toLocaleDateString("en-UK", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }),
    // to get the selected option from dropdown
    exercisetype: exerciseType.options[exerciseType.selectedIndex].text,
    // other entries into form
    duration: formData.get("exercise-duration-input"),
    waterintake: formData.get("water-intake-input"),
    bloodsugar: formData.get("blood-sugar-input"),
  });
  exerciseType.selectedIndex = 0;
  exerciseDuration.value = "";
  waterIntake.value = "";
  bloodSugar.value = "";
  renderList(records);
});

//Rendering the recorded details
function renderList(recordsArray) {
  while (outputContainer.firstChild) {
    outputContainer.firstChild.remove();
  }
  // Creating heading
  const headingArray = [
    "Date",
    "Type of Workout",
    "Workout Duration(hh:mm)",
    "Water intake(ml)",
    "Blood Sugar Level(mg/dL)",
    "Action",
  ];

  const headingContainer = document.createElement("div");
  headingContainer.classList.add("heading-container");
  headingArray.forEach((heading) => {
    const headingElement = document.createElement("p");
    headingElement.textContent = heading;
    headingContainer.append(headingElement);
  });
  outputContainer.append(headingContainer);

  recordsArray.forEach((record, i) => {
    // Creating container for each record
    const newContainer = document.createElement("div");
    newContainer.classList.add("new-container");
    // Adding date
    const dateElement = document.createElement("p");
    dateElement.textContent = record.date;
    // Adding exerciseType
    const exercisetypeElement = document.createElement("p");
    exercisetypeElement.textContent = record.exercisetype;
    // Adding duration
    const durationElement = document.createElement("p");
    durationElement.textContent = record.duration;
    // Adding waterintake
    const waterIntakeElement = document.createElement("p");
    waterIntakeElement.textContent = record.waterintake;
    // Adding BloodsugarLevel
    const bloodSugarElement = document.createElement("p");
    bloodSugarElement.textContent = record.bloodsugar;
    // Delete button
    const deleteDiv = document.createElement("div");
    deleteDiv.classList.add("delete-class");
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteDiv.append(deleteButton);
    deleteButton.addEventListener("click", () => {
      records.splice(i, 1);
      renderList(records);
    });
    newContainer.append(
      dateElement,
      exercisetypeElement,
      durationElement,
      waterIntakeElement,
      bloodSugarElement,
      deleteDiv
    );
    outputContainer.append(newContainer);
  });
  // calling data from LocalStorage
  saveDateToLocalStorage();
}

// function that perform saving the records into Local Storage
function saveDateToLocalStorage() {
  localStorage.setItem("records", JSON.stringify(records));
}
