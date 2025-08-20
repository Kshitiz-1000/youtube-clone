// 👍 Like / 👎 Dislike buttons
let likeCount = 0;
let dislikeCount = 0;

function likeVideo() {
  likeCount++;
  document.getElementById("like-count").innerText = likeCount;
}

function dislikeVideo() {
  dislikeCount++;
  document.getElementById("dislike-count").innerText = dislikeCount;
}

// 💬 Comments section
function postComment() {
  let commentBox = document.getElementById("comment-box");
  let commentList = document.getElementById("comments");

  if (commentBox && commentBox.value.trim() !== "") {
    // This is a simplified post function. A real app would create the full comment structure.
    let li = document.createElement("li");
    li.innerText = commentBox.value;
    commentList.prepend(li); // Add new comment to the top
    commentBox.value = ""; // clear input
  }
}

// 🔹 Data for all 18 videos
const videoData = [
  { id: 1, title: "Lecture 1: Intro to Programming & Flowcharts", channel: "CodeHelp - by Babbar", thumb: "images/thumb1.jpg" },
  { id: 2, title: "C++ in 100 Seconds", channel: "Fireship", thumb: "images/thumb2.jpg" },
  { id: 3, title: "How To Make Coding Addictive", channel: "bigboxSWE", thumb: "images/thumb3.jpg" },
  { id: 4, title: "5 Simple Steps for Solving Dynamic Programming Problems", channel: "Reducible", thumb: "images/thumb4.jpg" },
  { id: 5, title: "The Vanishing of Flight 370", channel: "LEMMiNO", thumb: "images/thumb5.jpg" },
  { id: 6, title: "HTML Tutorial for Beginners | Complete Html with Notes & Code", channel: "Apna College", thumb: "images/thumb6.jpg" },
  { id: 7, title: "JavaScript in 100 Seconds", channel: "Fireship", thumb: "images/thumb7.jpg" },
  { id: 8, title: "The Coronavirus Explained & What You Should Do", channel: "Kurzgesagt - In a Nutshell", thumb: "images/thumb8.jpg" },
  { id: 9, title: "Good Graphics aren't \"good graphics\"", channel: "Rileo", thumb: "images/thumb9.jpg" },
  { id: 10, title: "The Search For D.B. Copper", channel: "LEMMiNO", thumb: "images/thumb10.jpg" },
  { id: 11, title: "The Largest Star in the Universe - Size Comparison", channel: "Kurzgesagt - In a Nutshell", thumb: "images/thumb11.jpg" },
  { id: 12, title: "The Most Impressive Game Engine", channel: "Major_Trenton", thumb: "images/thumb12.jpg" },
  { id: 13, title: "Sunset timlapse in just 10 seconds", channel: "Gadi Eidelheit", thumb: "images/thumb13.jpg" },
  { id: 14, title: "HTML and CSS for Beginners Part 2: Building your first web page!", channel: "Kevin Powell", thumb: "images/thumb14.jpg" },
  { id: 15, title: "Three Ways to Destroy the Universe", channel: "Kurzgesagt - In a Nutshell", thumb: "images/thumb15.jpg" },
  { id: 16, title: "Why Consoles Are Going Extinct", channel: "Going Indie", thumb: "images/thumb16.jpg" },
  { id: 17, title: "What's The Brightest Thing In the Universe?", channel: "Vsauce", thumb: "images/thumb17.jpg" },
  { id: 18, title: "Totally Wrong Facts Everyone Still Believes", channel: "Chill Dude Explains", thumb: "images/thumb18.jpg" },
];


// 🌙🌞 Theme Toggle and Page Load Logic
document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;
  if (localStorage.getItem("theme") === "light") {
    body.setAttribute("data-theme", "light");
    if (toggle) toggle.checked = true;
  }
  if (toggle) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      } else {
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
      }
    });
  }

  // 🔹 Logic for Video Page
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = parseInt(urlParams.get('vid')); // Make sure it's a number

  if (videoId) {
    const video = videoData.find(v => v.id === videoId);

    if (video) {
      // Set Video Title, Page Title, and Channel Name
      document.querySelector(".video-main-title").innerText = video.title;
      document.title = video.title + " - YouTube";
      document.getElementById("channel-name-placeholder").innerText = video.channel;

      // Populate Recommendations Sidebar
      populateRecommendations(videoId);
    }
  }
});

function populateRecommendations(currentVideoId) {
  const sidebar = document.getElementById("recommendations-sidebar");
  sidebar.innerHTML = ""; // Clear existing recommendations

  // Filter out the current video and create elements for others
  videoData
    .filter(video => video.id !== currentVideoId)
    .forEach(video => {
      const card = document.createElement("div");
      card.className = "rec-video-card";
      card.innerHTML = `
        <a href="video.html?vid=${video.id}">
          <img src="${video.thumb}" alt="${video.title}">
        </a>
        <div class="rec-video-details">
          <a href="video.html?vid=${video.id}">
            <h4>${video.title}</h4>
          </a>
          <p>${video.channel}</p>
        </div>
      `;
      sidebar.appendChild(card);
    });
}