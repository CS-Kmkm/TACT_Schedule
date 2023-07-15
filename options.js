// Save button
let saveButton = document.getElementById("save-button");

// Save option
saveButton.addEventListener('click', function() {
  // Term select
  let termSelect = document.querySelector('input[name="term"]:checked');

  let selectedTerm = termSelect.value;
  chrome.storage.sync.set({selectedTerm: selectedTerm}, function() {
    console.log('Value is set to ' + selectedTerm);
  });
});
