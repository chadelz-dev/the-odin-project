// ensure DOM  is fully loaded before running JS
document.addEventListener('DOMContentLoaded', () => {
  // store Giphy API Key
  const giphyApiKey = 'MEl0mxIamfzlVlbIhAAc4WXvnswOQg46';

  // get DOM elements
  const giphySearchInput = document.getElementById('giphy-search-input');
  const searchBtn = document.getElementById('search-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const giphyResultArea = document.getElementById('giphy-result-area');
  const giphyOutput = document.getElementById('giphy-output');
  let giphyAbortController = new AbortController(); // controller to manage fetch cancellation

  // event listener for the search button
  searchBtn.addEventListener('click', () => {
    const query = giphySearchInput.value.trim();

    if (!query) {
      giphyResultArea.textContent = 'Please enter a search term';
      giphyOutput.src = '#';
      giphyOutput.alt = 'No GIF found';
      return;
    }

    // construct giphy API URL with query and limit to 10 results
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${encodeURIComponent(
      query
    )}&limit=10`;

    // perform fetch request to GIPHY API with CORS and abort signal
    fetch(url, { mode: 'cors', signal: giphyAbortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // detailed HTTP error
        }
        return response.json();
      })
      .then((data) => {
        giphyResultArea.innerHTML = ''; // clear previous search results
        giphyOutput.src = '#'; // clear previous full-size GIF
        giphyOutput.alt = 'No GIF found';

        if (!data.data || !data.data.length) {
          giphyResultArea.textContent = 'No GIFs Found'; // display message if no results
          return;
        }

        // loop through API results to create clickable thumbnail images
        data.data.forEach((gif) => {
          const img = document.createElement('img'); // creates mew image element for each gif result
          img.src = gif.images.fixed_height_small.url; // sets image source to thumbnail URL
          img.alt = gif.title || 'GIF'; // set alt text for accessibility, with fallback
          img.style.cursor = 'pointer';

          // add click event to display full sized GIF, replacing any existing content
          img.addEventListener('click', () => {
            giphyOutput.src = gif.images.original.url; // Replace with new full-size GIF
            giphyOutput.alt = gif.title || 'Selected GIF'; // Update alt text
            giphyResultArea.textContent = 'New GIF selected'; // Update status message

            // highlight selected thumbnail (optional visual feedback)
            document
              .querySelectorAll('#giphy-result-area img')
              .forEach((thumbnail) => {
                thumbnail.style.border = 'none'; // remove border from all thumbnails
              });

            img.style.border = '2px solid red'; // highlight selected thumbnail
          });
          giphyResultArea.appendChild(img); // add thumbnail to result area
        });
      })
      .catch((error) => {
        // handle errors (eg: network error, invalid API key, etc)
        if (error.name === 'AbortError') {
          giphyResultArea.textContent = 'search cancelled';
        } else {
          giphyResultArea.textContent = ` Error: ${error.message}`;
          console.error('Fetch Error', error);
        }
        giphyOutput.src = '#';
        giphyOutput.alt = 'No GIF selected';
      });
  });

  // event listener for cancel button
  cancelBtn.addEventListener('click', () => {
    giphyAbortController.abort(); // abort fetch request
    giphyResultArea.textContent = 'Search cancelled';
    giphyOutput.src = '#';
    giphyOutput.alt = 'No GIF selected';
    giphyAbortController = new AbortController(); // reset controller for next fetch
  });
});
