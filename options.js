// Save button
let saveButton = document.getElementById("save-button");

// Save option
saveButton.addEventListener('click', function() {
  // Option select
  let optionSelect = document.querySelector('input[name="option"]:checked');

  let selectedOption = optionSelect.value;
  chrome.storage.sync.set({selectedOption: selectedOption}, function() {
    console.log('Value is set to ' + selectedOption);
  });
});
