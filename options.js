const form = document.querySelector('#options-form');

form.addEventListener('submit', event => {
  event.preventDefault();
  
  const season = document.querySelector('input[name="season"]:checked').value;
  chrome.storage.sync.set({ favoriteSeason: season }, () => {
    console.log('Favorite season is set to ' + season);
  });
});
