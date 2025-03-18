const liveData = [
  {
    hostId: "ucb0y48zVCyAM",
    tabType: "for_you",
    imageUrl:
      "https://d1unckwzkxcoc9.cloudfront.net/public/a3d12231-2c02-470a-9c57-1535fbe412dd.jpeg?w=1000&q=75",
    liveTitle: "Live AHMAD",
    userName: "AHMAD",
    userImageUrl:
      "https://d1unckwzkxcoc9.cloudfront.net/public/a3d12231-2c02-470a-9c57-1535fbe412dd.jpeg?w=1000&q=75",
    country: "ID",
    viewers: 5,
    flagUrl: "/assets/svg/1f1ee-1f1e9.svg",
  },
  {
    hostId: "ugPCkNHQmFlsx",
    tabType: "for_you",
    imageUrl:
      "https://d1r5ivqqxduzsf.cloudfront.net/live-room/2024-08-16/41603893-f6e0-4a22-9f80-3d9c77e24946jpg",
    liveTitle: "Azey❤️'s Live",
    userName: "Azey❤️",
    userImageUrl:
      "https://d1unckwzkxcoc9.cloudfront.net/public/df497789-8191-469d-85ae-87a62f4380f1.jpeg?w=1000&q=75",
    country: "PH",
    viewers: 4,
    flagUrl: "/assets/svg/1f1ee-1f1e9.svg",
  },
  {
    hostId: "upN6qhF2HphGI",
    tabType: "for_you",
    imageUrl:
      "https://d1r5ivqqxduzsf.cloudfront.net/live-room/2024-09-19/4350ecee-731a-454f-b69e-ecbbb0fb39ebjpg",
    liveTitle: "🔥🫶🏽06🫶🏽🔥",
    userName: "OktayBey",
    userImageUrl:
      "https://d1unckwzkxcoc9.cloudfront.net/public/bc3828ca-7012-4725-8d92-d2c914ba41ae.jpeg?w=1000&q=75",
    country: "TR",
    viewers: 3,
    flagUrl: "/assets/svg/1f1ee-1f1e9.svg",
  },
  {
    hostId: "uC1rTRwS1XbwQ",
    tabType: "for_you",
    imageUrl: "/assets/images/live/omegly-card-placeholder.png",
    liveTitle: "Kadir35 Canlı Yayını",
    userName: "Kadir35",
    userImageUrl: "/assets/images/live/omegly-card-placeholder.png",
    country: "TR",
    viewers: 3,
    flagUrl: "/assets/svg/1f1ee-1f1e9.svg",
  },
  {
    hostId: "u7rwmUh5xbeyK",
    tabType: "for_you",
    imageUrl: "/assets/images/live/omegly-card-placeholder.png",
    liveTitle: "😜",
    userName: "กลับมาแล้วนะ",
    userImageUrl: "/assets/images/live/omegly-card-placeholder.png",
    country: "TH",
    viewers: 2,
    flagUrl: "/assets/svg/1f1ee-1f1e9.svg",
  },
  {
    hostId: "ubajDTOVJkFI3",
    tabType: "for_you",
    imageUrl:
      "https://d1unckwzkxcoc9.cloudfront.net/public/fcd78684-4c44-45b0-8c91-a3ce35b64084.jpeg?w=1000&q=75",
    liveTitle: "Pappu Poddar's Live",
    userName: "Pappu Poddar",
    userImageUrl:
      "https://d1unckwzkxcoc9.cloudfront.net/public/fcd78684-4c44-45b0-8c91-a3ce35b64084.jpeg?w=1000&q=75",
    country: "IN",
    viewers: 1,
    flagUrl: "/assets/svg/1f1ee-1f1e9.svg",
  },
];

const trendingList = document.querySelector(".css-nrprqo");
const liveList = document.querySelector(".css-11ktg9");

function renderTrendingList(data) {
  trendingList.innerHTML = ""; // Clear existing content
  data.forEach((live) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="/live/watch/?hostId=${live.hostId}&tabType=${live.tabType}">
        <div class="css-1y9q05k e1k3goks0">
          <img src="${live.imageUrl}" class="css-jtscj4 e1k3goks1" />
          <div class="css-ygx2yi e1k3goks2">
            <span class="css-tu4d8v e1k3goks3">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="css-wrj12a e1k3goks4">
                <use href="assets/svg//icons.1230a5c1.svg#studio_beauty_wrinkles_fill" />
              </svg>
              <data value="${live.viewers}">${live.viewers}</data>
            </span>
          </div>
          <div class="css-14npcgw e1k3goks5">
            <h3 class="css-1lm2i8 e1k3goks6">${live.liveTitle}</h3>
            <div class="css-1mydqqe e1k3goks7">
              <div width="24" height="24" class="e1k3goks8 css-6068ks e12zsk290">
                <img src="${live.userImageUrl}" class="css-9jowez e12zsk291" />
              </div>
              <div class="css-ewnnfc e1k3goks9">
                <p class="css-1omuqb5 e1k3goks11">${live.userName}</p>
                <div class="css-1row1k7 e1k3goks10">
                  <div class="css-70qvj9 e106510d0">
                    <img loading="lazy" alt="flag ${live.country}" class="e106510d2 css-6nlbk5" src="${codeFlag(live.country)}" height="20" width="35" />
                    <p class="css-2vz4z4 e106510d1">${live.country}</p>
                  </div>
                  <button type="button" aria-label="Report" class="css-0 e1k3goks12">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="css-v7ragd e1k3goks13">
                      <use href="assets/svg//icons.1230a5c1.svg#shield_report_fill" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    `;
    trendingList.appendChild(li);
  });
}

function renderLiveList(data) {
  liveList.innerHTML = ""; // Clear existing content
  data.forEach((live) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <a href="/live/watch/?hostId=${live.hostId}">
        <div class="css-1y9q05k e1k3goks0">
          <img src="${live.imageUrl ? live.imageUrl : "/assets/images/live/omegly-card-placeholder.png"}" class="css-jtscj4 e1k3goks1" />
          <div class="css-ygx2yi e1k3goks2">
            <span class="css-tu4d8v e1k3goks3">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="css-wrj12a e1k3goks4">
                <use href="assets/svg//icons.1230a5c1.svg#studio_beauty_wrinkles_fill" />
              </svg>
              <data value="${live.viewers}">${live.viewers}</data>
            </span>
          </div>
          <div class="css-14npcgw e1k3goks5">
            <h3 class="css-1lm2i8 e1k3goks6">${live.liveTitle}</h3>
            <div class="css-1mydqqe e1k3goks7">
              <div width="24" height="24" class="e1k3goks8 css-6068ks e12zsk290">
                <img src="${live.userImageUrl ? live.userImageUrl : "/assets/images/profile/imgProfile@3x.png"}" class="css-9jowez e12zsk291" />
              </div>
              <div class="css-ewnnfc e1k3goks9">
                <p class="css-1omuqb5 e1k3goks11">${live.userName}</p>
                <div class="css-1row1k7 e1k3goks10">
                  <div class="css-70qvj9 e106510d0">
                    <img loading="lazy" alt="flag ${live.country}" class="e106510d2 css-6nlbk5" src="${uriFlag(live.country)}" height="20" width="35" />
                    <p class="css-2vz4z4 e106510d1">${countryCode(live.country).toUpperCase()}</p>
                  </div>
                  <button type="button" aria-label="Report" class="css-0 e1k3goks12">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="css-v7ragd e1k3goks13">
                      <use href="assets/svg//icons.1230a5c1.svg#shield_report_fill" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    `;
    liveList.appendChild(li);
  });
}

// Panggil fungsi untuk menampilkan live list
renderTrendingList(liveData);
renderLiveList(liveData);

// Simulasi data dari API (ganti dengan fetch API yang sebenarnya)
// fetch('https://api.example.com/lives')
//   .then(response => response.json())
//   .then(data => renderLiveList(data));
fetch("/api/lives")
  .then((response) => response.json())
  .then((lives) => {
    // Render live list
    renderLiveList(lives);
    // console.log(lives);
  })
  .catch((error) => {
    console.error("Gagal mengambil data lives:", error);
  });
