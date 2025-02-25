
(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

// Counter Section

// jQuery(document).ready(function($){
//   $('.counter').counterUp({
//     delay: 10,
//     time: 1000
// });
// });
// tilt

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();





/*===== FOCUS =====*/
const inputs = document.querySelectorAll(".form__input")

/*=== Add focus ===*/
function addfocus(){
  let parent = this.parentNode.parentNode
  parent.classList.add("focus")
}

/*=== Remove focus ===*/
function remfocus(){
  let parent = this.parentNode.parentNode
  if(this.value == ""){
      parent.classList.remove("focus")
  }
}

/*=== To call function===*/
inputs.forEach(input=>{
  input.addEventListener("focus",addfocus)
  input.addEventListener("blur",remfocus)
})

function updateTeamFields() {
  const numberOfMembers = document.getElementById('team-members').value;
  const teamMemberDetails = document.getElementById('team-member-details');
  teamMemberDetails.innerHTML = `<input type="hidden" id="team_number" name="team_number" value="${numberOfMembers}">`; // Clear any existing fields

  // Get Leader Information
  const leaderName = document.getElementById('full-name').value;
  const leaderPhone = document.getElementById('phone').value;
  const leaderDept = document.getElementById('dept-name').value;
  const leaderYear = document.getElementById('year').value;

  if (numberOfMembers) {
    for (let i = 0; i < numberOfMembers; i++) {
      if (i === 0) {
        // Pre-fill the fields for Member 1
        teamMemberDetails.innerHTML += `
          <label for="member${i}-name">Member ${i + 1} Name:</label>
          <input type="text" value="${leaderName}" disabled>
          <input type="hidden" id="member${i}-name" name="team_members[${i}][name]" value="${leaderName}">

          <label for="member${i}-department">Member ${i + 1} Department:</label>
          <input type="text" value="${leaderDept}" disabled>
          <input type="hidden" id="member${i}-department" name="team_members[${i}][department]" value="${leaderDept}">

          <label for="member${i}-year">Member ${i + 1} Year:</label>
          <input type="text" value="${leaderYear}" disabled>
          <input type="hidden" id="member${i}-year" name="team_members[${i}][year]" value="${leaderYear}">

          <label for="member${i}-phone">Member ${i + 1} Phone Number:</label>
          <input type="tel" value="${leaderPhone}" disabled>
          <input type="hidden" id="member${i}-phone" name="team_members[${i}][phone]" pattern="\\d{10}" title="Phone number should be 10 digits" value="${leaderPhone}">
        `;
      } else {
        // For other members, just show empty fields
        teamMemberDetails.innerHTML += `
          <label for="member${i}-name">Member ${i + 1} Name:</label>
          <input type="text" id="member${i}-name" name="team_members[${i}][name]" required>

          <label for="member${i}-department">Member ${i + 1} Department:</label>
          <input type="text" id="member${i}-department" name="team_members[${i}][department]" required>

          <label for="member${i}-year">Member ${i + 1} Year:</label>
            <select id="member${i}-year" name="team_members[${i}][year]" required>
              <option value="" disabled selected>Select Year</option>
              <option value="1">1st</option>
              <option value="2">2nd</option>
              <option value="3">3rd</option>
              <option value="4">4th</option>
              <option value="Other">Other</option>
            </select>
          </fieldset>

          

          <label for="member${i}-phone">Member ${i + 1} Phone Number:</label>
          <input type="tel" id="member${i}-phone" name="team_members[${i}][phone]" pattern="\\d{10}" title="Phone number should be 10 digits" maxlength="10" required>
        `;
      }
    }
  }
}



const scriptURL = 'https://script.google.com/macros/s/AKfycbww9h0Y7xCo2X2LDd4iIcgQCvfRek8otZVZGe9XL0Fd5SD8dlKh7HXlrRX6ytxYvFUx/exec'; // Add your Web App URL here
const form = document.forms['google-sheet'];

// Reference to the WhatsApp popup
const whatsappPopup = document.getElementById('whatsapp-popup');
const closePopupButton = document.getElementById('close-popup');

// Close the popup when the close button is clicked
closePopupButton.addEventListener('click', function() {
    whatsappPopup.style.display = 'none'; // Hide the popup
});

form.addEventListener('submit', async e => {
  e.preventDefault();

  // Show the loading spinner
  const loadingSpinner = document.getElementById('loading-spinner');
  loadingSpinner.style.display = 'block';

  const formData = new FormData(form);
  const data = {};

  let teamMembersText = ''; // Initialize a variable to store the concatenated team member details

  formData.forEach((value, key) => {
      if (key.startsWith('team_members')) {
          const match = key.match(/team_members\[(\d+)\]\[(\w+)\]/);
          if (match) {
              const index = match[1];
              const field = match[2];

              if (!data.team_members) {
                  data.team_members = [];
              }

              if (!data.team_members[index]) {
                  data.team_members[index] = {};
              }

              data.team_members[index][field] = value;

              if (field === "name") {
                  teamMembersText += `name:${value}\n`; 
              }
              if (field === "department") {
                  teamMembersText += `department:${value}\n`; 
              }
              if (field === "year") {
                  teamMembersText += `year:${value}\n`; 
              }
              if (field === "phone") {
                  teamMembersText += `phone:${value}\n\n`; 
              }
          }
      } else {
          data[key] = value;
      }
  });

  data.team_members = teamMembersText.trim();

  const ipResponse = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipResponse.json();
  data.ip_address = ipData.ip;

  fetch(scriptURL, {
      method: 'POST',
      body: new URLSearchParams(data),
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
  })
  .then(response => {
      alert("Thanks for Contacting us..! We Will Contact You Soon...");
      
      // Clear the form after successful submission
      form.reset();

      // Hide the loading spinner
      loadingSpinner.style.display = 'none';

      // Show the WhatsApp popup
      whatsappPopup.style.display = 'block'; // Show the popup

  })
  .catch(error => {
      console.error('Error!', error.message);
      
      // Hide the loading spinner in case of an error
      loadingSpinner.style.display = 'none';
      alert("Something went wrong. Please try again!");
  });
});





// Function to open the popup
function openPopup() {
  document.getElementById('popup').style.display = 'flex';
}

// Function to close the popup
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}
