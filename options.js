// Save button
let saveButton = document.getElementById("save-button");

// Save option
saveButton.addEventListener('click', function() {
  // Year input
  let yearInput = document.getElementById("year-input");
  let year = yearInput.value;

  // Term select
  let termSelect = document.querySelector('input[name="term"]:checked');
  let term = termSelect.value;

  chrome.storage.sync.set({year: year, term: term}, function() {
    console.log('Year and term are saved.');
  });
});
