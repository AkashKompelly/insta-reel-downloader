// Selecting elements from the DOM
inputUrl = document.querySelector("#url"); // Input field
downloadBtn = document.querySelector("#downloadBtn"); // Download button
let video = document.querySelector("#resultVideo"); // Video tag for displaying result
let spinner = document.querySelector("#spinner"); // Loading spinner
let resultDiv = document.querySelector("#resultDiv"); // Container for result section

// When user clicks the download button
downloadBtn.addEventListener("click", async () => {
  resultDiv.style.display = "none"; // Hide result initially
  
  if(!inputUrl.value.includes("https://www.instagram.com/reel/")){
    alert("Please enter valid link!");
    return;
  }


  // Extract Reel ID from input URL
  const vidoID = inputUrl.value.split("/reel/")[1].split("/")[0];


  // Fetch downloadable link using API
  resultlink = await fectchData(vidoID);

  // Set the video source and show the result
  video.src = resultlink;
  resultDiv.style.display = "flex";
});

// Function to fetch the Instagram reel download link from RapidAPI
async function fectchData(vidoid) {
  const url = `https://instagram-social-api.p.rapidapi.com/v1/post_info?code_or_id_or_url=${vidoid}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "Replace with your API key", // Replace with your API key
      "x-rapidapi-host": "instagram-social-api.p.rapidapi.com",
    },
  };

  try {
    // Show loading spinner
    spinner.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `;

    // Make API request
    const response = await fetch(url, options);
    const result = await response.json();

    // Extract and return video URL
    const resultLink = result.data.video_versions[0].url;

    // Hide spinner
    spinner.style.display = "none";

    return resultLink;
  } catch (error) {
    console.error(error);
    spinner.style.display = "none";
    alert("Please enter valid link");
  }
}
