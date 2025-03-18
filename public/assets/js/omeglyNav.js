let countryID;
const navbarRight = document.querySelector(".css-s5xdrg");
const modalWrap = document.querySelector(".overlay");
const divWrap = document.querySelector(".wrapper");
const token = localStorage.getItem("token");
let modalIsOpen = false;
let editProfileModalIsOpen = false;

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const getCountryFromIP = async (ip) => {
  const url = `/location/${ip}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.country_name;
};

const getIP = async () => {
  const response = await fetch("https://api.ipify.org?format=json");
  const data = await response.json();
  return data.ip;
};

const showCountry = async () => {
  const ip = await getIP();
  const country = await getCountryFromIP(ip);
  countryID = country;
};

const profileButton = document.createElement("button");
profileButton.classList.add("css-1lx2cov", "eklcrjq6");
profileButton.innerHTML = `
    <img class="eklcrjq5 e1kwc9060 css-12ppu4d e1j9vfoi1" src="http://localhost:5500/assets/images/profile/imgProfile@3x.png" alt="profile image" />
  `;

const loginButton = document.createElement("button");
loginButton.classList.add("css-1rnor4n", "ec0z5mr4");
loginButton.setAttribute("data-testid", "Header-Right-login");
loginButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" class="css-u9l1g6 eklcrjq3">
        <path d="M13.417.833H7.583A3.343 3.343 0 0 0 4.25 4.167v11.666c0 1.834 1.5 3.334 3.333 3.334h5.834c1.833 0 3.333-1.5 3.333-3.334V4.168c0-1.833-1.5-3.334-3.333-3.334ZM15.083 15c0 .5-.333.834-.833.834h-7.5c-.5 0-.833-.334-.833-.834V5c0-.5.333-.833.833-.833h7.5c.5 0 .833.333.833.833v10Z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" class="css-u9l1g6 eklcrjq2">
        <path fill-rule="evenodd" d="M11.928 10.805h2.92l.436-3.26h-3.356v-2.08c0-.944.272-1.587 1.68-1.587h1.795V.961c-.31-.04-1.376-.128-2.616-.128-2.588 0-4.36 1.519-4.36 4.308v2.404H5.5v3.259h2.927v8.362h3.5v-8.363Z" clip-rule="evenodd"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" class="css-u9l1g6 eklcrjq0">
        <path d="m3.68 8.084-1.927 1.5A5.926 5.926 0 0 1 1.167 7c0-.93.21-1.807.586-2.585l1.927 1.5c-.11.341-.17.706-.17 1.085 0 .38.06.744.17 1.084Z"></path>
        <path d="M1.752 9.583c.932 1.93 2.88 3.25 5.144 3.25 2.865 0 5.47-2.12 5.47-5.833 0-.345-.053-.716-.131-1.06H6.896v2.253H9.97c-.286 1.432-1.484 2.254-3.073 2.254-1.504 0-2.774-.99-3.217-2.368L1.752 9.583ZM3.68 5.916c.445-1.375 1.714-2.363 3.216-2.363.808 0 1.537.292 2.11.769l1.666-1.697c-1.015-.902-2.317-1.458-3.776-1.458-2.264 0-4.21 1.32-5.143 3.248l1.927 1.5Z"></path>
        <path d="M10.631 11.38c1.052-.995 1.735-2.479 1.735-4.38 0-.345-.052-.716-.13-1.06H6.897v2.253H9.97c-.154.768-.57 1.361-1.168 1.745l1.83 1.442Z"></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 20" class="css-u9l1g6 eklcrjq1">
        <path d="M15.458 9.75a4.2 4.2 0 0 1 1.984-3.496 4.317 4.317 0 0 0-3.36-1.817c-1.414-.148-2.785.846-3.505.846-.734 0-1.844-.83-3.038-.806a4.512 4.512 0 0 0-3.766 2.296c-1.628 2.82-.414 6.962 1.146 9.241.78 1.116 1.693 2.362 2.886 2.318 1.168-.048 1.604-.745 3.014-.745 1.396 0 1.805.745 3.023.717 1.253-.02 2.042-1.12 2.795-2.247a9.227 9.227 0 0 0 1.279-2.604 4.062 4.062 0 0 1-2.458-3.703ZM13.158 2.939A4.102 4.102 0 0 0 14.097 0a4.174 4.174 0 0 0-2.701 1.397 3.939 3.939 0 0 0-.963 2.83 3.492 3.492 0 0 0 2.725-1.288Z"></path>
      </svg>
      <div class="css-5tdlz3 ec0z5mr5">|</div>
      Log in
    `;

if (token) {
  showCountry();
  loginButton.remove();
  navbarRight.appendChild(profileButton);
  const name = localStorage.getItem("name");
  const gender = localStorage.getItem("gender");

  // Tambahkan event listener untuk logout
  profileButton.addEventListener("click", () => {
    if (modalIsOpen) {
      document.querySelector(".ModalBack").remove();
      modalIsOpen = false;
    } else {
      // Tampilkan modal
      const modal = document.createElement("div");
      modal.classList.add("ModalBack", "undefined", "css-1ykmrgs", "ejhj0cg1");
      modal.setAttribute("role", "button");
      modal.setAttribute("tabindex", "0");
      modal.innerHTML = `
      <div role="button" tabindex="0" class="css-1wnowod ejhj0cg0">
        <div class="css-ftu0ti e10zsgn012">
          <div class="css-i358y3 e10zsgn013">
            <div class="css-10ctojh ecjwe8u19">
              <div class="css-lfqgbi ecjwe8u14">
                <img class="ecjwe8u18 e1kwc9060 css-r0mqrf e1j9vfoi1" src="http://localhost:5500/assets/images/profile/imgProfile@3x.png" alt="profile image" />
                <div width="10" class="css-s6qup9 e8gdg6k0"></div>
                <div class="css-3z2sxu ecjwe8u13">
                  <div class="css-1s24z4b ecjwe8u3">
                    <p class="css-1u48c0q ecjwe8u11">${name}</p>
                  </div>
                  <div class="css-s5xdrg ecjwe8u12">
                    <div class="css-s5xdrg ecjwe8u10">
                      <img class="ecjwe8u9 css-r7qj1m e1j9vfoi1" src="${uriFlag(countryID)}" alt="http://localhost:5500/assets/svg/1f1ee-1f1e9.svg" />
                      <div width="4" class="css-1jtl2mg e8gdg6k0"></div>
                      <span class="css-8ljgdx ecjwe8u8">${countryID}</span>
                    </div>
                    <div class="css-jlg4pg ecjwe8u2"></div>
                    <div class="css-1fdwpy7 ecjwe8u1">
                      <img src="${gender == "male" ? "http://localhost:5500/assets/images/icons/icGenderMALE.svg" : "http://localhost:5500/assets/images/icons/icGenderFEMALE.svg"}" alt="gender" class="css-1suksrg ecjwe8u0" />
                      <div width="4" class="css-1jtl2mg e8gdg6k0"></div>
                      ${capitalizeFirstLetter(gender)}
                    </div>
                  </div>
                </div>
              </div>
              <div class="css-101m303 ecjwe8u7"></div>
              <div class="css-1j9s6ik ecjwe8u6">
                <button class="css-18487hx ecjwe8u5" onclick="displayEditProfileModal()">
                  <img src="http://localhost:5500/assets/images/icons/icPersonWhite.svg" alt="logout" class="css-0 ecjwe8u17" />
                  <div width="10" class="css-s6qup9 e8gdg6k0"></div>
                  <p class="css-nt5f22 ecjwe8u16">Edit Profile</p>
                </button>
                <button class="css-18487hx ecjwe8u5">
                  <img src="http://localhost:5500/assets/images/icons/icMoreWhite.svg" alt="logout" class="css-0 ecjwe8u17" />
                  <div width="10" class="css-s6qup9 e8gdg6k0"></div>
                  <p class="css-nt5f22 ecjwe8u16">More</p>
                </button>
                <a target="_blank" rel="noopener noreferrer" class="css-1o05yxp ecjwe8u4">
                  <button class="css-18487hx ecjwe8u5">
                    <img src="http://localhost:5500/assets/images/icons/icEditWhite.svg" alt="logout" class="css-0 ecjwe8u17" />
                    <div width="10" class="css-s6qup9 e8gdg6k0"></div>
                    <p class="css-nt5f22 ecjwe8u16">Contact us</p>
                  </button>
                </a>
                <button class="css-18487hx ecjwe8u5" id="logoutButton" onclick="logout()">
                  <img src="http://localhost:5500/assets/images/icons/icExitWhite.svg" alt="logout" class="css-0 ecjwe8u17" />
                  <div width="10" class="css-s6qup9 e8gdg6k0"></div>
                  <p class="css-nt5f22 ecjwe8u16">Log out</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
      document.body.appendChild(modal);
      modalIsOpen = true;
      modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target === modal) {
          document.querySelector(".ModalBack").remove();
          modalIsOpen = false;
        }
      });
    }
  });
} else {
  profileButton.remove();
  navbarRight.appendChild(loginButton);

  modalWrap.addEventListener("click", (event) => {
    if (event.target === divWrap) {
      document.getElementById("authPopup").style.display = "none";
    }
  });

  loginButton.addEventListener("click", () => {
    startVideoChat();
  });
}

function displayEditProfileModal() {
  document.querySelector(".ModalBack").remove();
  modalIsOpen = false;

  if (editProfileModalIsOpen) {
    document.querySelector(".edit-profile-modal").remove();
    editProfileModalIsOpen = false;
  } else {
    // Tampilkan modal edit profile
    const modal = document.createElement("div");
    modal.classList.add(
      "ModalBack",
      "undefined",
      "css-eeecr3",
      "ejhj0cg1",
      "edit-profile-modal"
    ); // Tambahkan class "edit-profile-modal"
    modal.setAttribute("role", "button");
    modal.setAttribute("tabindex", "0");
    modal.innerHTML = `
      <div role="button" tabindex="0" class="css-1wnowod ejhj0cg0">
        <div class="e18x3yiw22 css-1i0jph3 e10zsgn012">
          <div class="css-1ik4fir e10zsgn013">
            <button data-testid="close-modal" class="css-1k6gpg2 e10zsgn09">
              <img src="assets/images/icons/icCloseGray.svg" alt="close" class="css-1xdhyk6 e10zsgn011">
            </button>
            <div class="css-196i6eb esno28e1">
              <p class="css-1o6fney e10zsgn04">Edit Profile</p>
              <div class="css-17tw2bj esno28e0"></div>
            </div>
            <div class="e18x3yiw23 css-1nnpwx e10zsgn08" data-scroll-id="modal-scroll-root">
              <div class="css-n65pqx e10zsgn01"></div>
              <div class="css-1fgdcyd e18x3yiw18">
                <div class="css-1s6whzq e18x3yiw24" style="position: relative; height: 157px;">
                  <div class="GridItem" style="z-index: 0; position: absolute; width: 118.667px; opacity: 1; height: 157px; box-sizing: border-box; transform: translate3d(0px, 0px, 0px) scale(1);">
                    <div class="css-50lz65 e18x3yiw4" style="background-image: url(&quot;http://localhost:5500/assets/images/profile/imgProfile.png&quot;);">
                      <div class="css-47lhhw e18x3yiw3">Main</div>
                      <label for="profile-image-edit-main-file" class="css-8s60sr e18x3yiw0">
                        <img src="assets/images/icons/icEdit.svg" alt="Edit First Profile Card" class="css-157xhr7 e18x3yiw13">
                        <input hidden="" type="file" id="profile-image-edit-main-file" accept="image/*">
                      </label>
                    </div>
                  </div>
                  <div class="GridItem" style="z-index: 0; position: absolute; width: 118.667px; opacity: 1; height: 157px; box-sizing: border-box; transform: translate3d(118.667px, 0px, 0px) scale(1);">
                    <label for="profile-image-add-file" class="css-bisi8v eush73j1">
                      <input hidden="" type="file" id="profile-image-add-file" accept="image/*">
                      <div class="css-j6nnlz eush73j0"></div>
                    </label>
                  </div>
                </div>
                <div class="css-w3uc3c e18x3yiw19">Never share inappropriate content that violates our policies or personal information (phone number, account number, address, etc.) on your profile. All uploaded contents will be reviewed by AI.</div>
              </div>
              <div class="css-1fgdcyd e18x3yiw18">
                <div class="css-1vxi7z9 e18x3yiw20">About me</div>
                <div class="css-1e5d2aw e3oxj6x2">
                  <textarea placeholder="Write something about yourself!" maxlength="250" class="css-lzr98p e3oxj6x1"></textarea>
                  <div class="css-1h6b455 e3oxj6x0">250</div>
                </div>
              </div>
              <div class="css-1fgdcyd e18x3yiw18">
                <div class="css-1vxi7z9 e18x3yiw20">My info</div>
                <div class="css-12i9rv4 e18x3yiw6">
                  <img src="assets/images/icons/icEditProfileNickname.svg" alt="Your Nickname" class="css-x11jo2 e18x3yiw11">
                  <div width="8" class="css-18bvjnd e8gdg6k0"></div>
                  <input placeholder="Nickname" disabled="" class="css-fcdl7u e18x3yiw5" value="Danz">
                </div>
                <div class="css-12i9rv4 e18x3yiw6">
                  <img src="assets/images/icons/icEditProfileLanguages.svg" alt="Your Languages" class="css-x11jo2 e18x3yiw11">
                  <div width="8" class="css-18bvjnd e8gdg6k0"></div>
                  <input placeholder="Language" disabled="" class="css-fcdl7u e18x3yiw5" value="English">
                </div>
              </div>
              <div class="css-16spcqe e10zsgn00"></div>
            </div>
            <div class="e18x3yiw21 css-1exjj3x e5imoqc1">
              <div class="css-1xyp9uz e5imoqc0"></div>
              <button class="css-ixi64s ediz7n90" color="primary">Complete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    editProfileModalIsOpen = true;
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        document.querySelector(".edit-profile-modal").remove();
        editProfileModalIsOpen = false;
      }
    });
  }
}
