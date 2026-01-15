// Booking Modal Elements
const bookingModal = document.getElementById('bookingModal');
const bookNowBtn = document.getElementById('bookNowBtn');
const closeModal = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');
const totalPriceSpan = document.getElementById('totalPrice');
const roomTypeSelect = document.getElementById('roomType');

// Room Modal Elements
const roomModal = document.getElementById('roomModal');
const closeRoomModal = document.getElementById('closeRoomModal');
const roomGallery = roomModal.querySelector('.room-gallery');
const roomDescription = roomModal.querySelector('.room-description');

// Facility Modal Elements
const facilityModal = document.getElementById('facilityModal');
const closeFacilityModal = document.getElementById('closeFacilityModal');
const facilityGallery = facilityModal.querySelector('.facility-gallery');
const facilityDescription = facilityModal.querySelector('.facility-description');

// Room data for modal
const roomsData = {
  deluxe: {
    images: ['room1.jpg', 'room1-2.jpg', 'room1-3.jpg'], // Add your images here
    description: 'Spacious and luxurious deluxe room with all modern amenities for your comfort.'
  },
  executive: {
    images: ['room2.jpg', 'room2-1.jpg', 'room2-3.jpg'], // Add your images here
    description: 'Elegant executive suite ideal for business travelers, featuring premium services.'
  }
};

// Facilities Data
const facilitiesData = {
  skybar: {
    images: ['skybar.jpg', 'skybar2.jpg', 'skybar3.jpg'], // Add your images here
    description: 'Enjoy panoramic views and signature cocktails at our Sky Bar. The perfect place to unwind.'
  },
  functionhall: {
    images: ['function.jpg', 'Asuncion Hall.jpg'], // Add your images here
    description: 'Our Function Hall is perfect for weddings, parties, meetings, and conferences of any size.'
  },
  juniorballroom: {
    images: ['juniorballroom1.jpg', 'juniorballroom2.jpg', 'juniorballroom3.jpg'], // Add your images here
    description: 'The Junior Ballroom is a versatile space ideal for dances, plays, and special occasions.'
  }
};

// --- Booking Modal ---

// Open booking modal
bookNowBtn.addEventListener('click', () => {
  bookingModal.style.display = 'block';
});

// Close booking modal
closeModal.onclick = () => {
  bookingModal.style.display = 'none';
};

// Calculate total price based on nights and room type
function calculateTotalPrice() {
  const roomOption = roomTypeSelect.selectedOptions[0];
  if (!roomOption) return 0;

  const pricePerNight = parseFloat(roomOption.dataset.price);
  const checkinDate = new Date(document.getElementById('checkin').value);
  const checkoutDate = new Date(document.getElementById('checkout').value);

  if (isNaN(checkinDate) || isNaN(checkoutDate)) return 0;

  const timeDiff = checkoutDate - checkinDate;
  const days = timeDiff / (1000 * 3600 * 24);

  if (days <= 0) return 0;

  return pricePerNight * days;
}

// Update total price on relevant inputs change
['checkin', 'checkout', 'roomType'].forEach(id => {
  document.getElementById(id).addEventListener('change', () => {
    const total = calculateTotalPrice();
    totalPriceSpan.textContent = total > 0 ? total.toFixed(2) : '0';
  });
});

// Submit booking form (just alert for demo)
bookingForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Booking confirmed! Thank you.');
  bookingModal.style.display = 'none';
  bookingForm.reset();
  totalPriceSpan.textContent = '0';
});

// Close modal on outside click
window.addEventListener('click', (event) => {
  if (event.target === bookingModal) bookingModal.style.display = 'none';
  if (event.target === roomModal) roomModal.style.display = 'none';
  if (event.target === facilityModal) facilityModal.style.display = 'none';
});

// --- Room Modal ---

// Open room modal when room image clicked
document.querySelectorAll('.room-img').forEach(img => {
  img.addEventListener('click', () => {
    const roomKey = img.dataset.room;
    const roomData = roomsData[roomKey];
    if (!roomData) return;

    // Clear previous content
    roomGallery.innerHTML = '';
    roomDescription.textContent = '';

    // Add images with simple slider effect
    roomData.images.forEach(src => {
      const imgEl = document.createElement('img');
      imgEl.src = src;
      imgEl.alt = `${roomKey} image`;
      imgEl.style.width = '100%';
      imgEl.style.borderRadius = '8px';
      imgEl.style.marginBottom = '15px';
      roomGallery.appendChild(imgEl);
    });

    roomDescription.textContent = roomData.description;

    roomModal.style.display = 'block';
  });
});

// Close room modal
closeRoomModal.onclick = () => {
  roomModal.style.display = 'none';
};

// --- Facilities Modal ---

// Add click listeners to facilities
document.querySelectorAll('.facility').forEach(facilityDiv => {
  facilityDiv.querySelector('.facility-link').addEventListener('click', () => {
    const facilityKey = facilityDiv.dataset.facility;
    const data = facilitiesData[facilityKey];
    if (!data) return;

    // Clear previous content
    facilityGallery.innerHTML = '';
    facilityDescription.textContent = '';

    // Add images
    data.images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `${facilityKey} image`;
      img.style.width = '100%';
      img.style.borderRadius = '8px';
      img.style.marginBottom = '15px';
      facilityGallery.appendChild(img);
    });

    // Add description
    facilityDescription.textContent = data.description;

    // Show modal
    facilityModal.style.display = 'block';
  });
});

// Close facility modal
closeFacilityModal.onclick = () => {
  facilityModal.style.display = 'none';
};
