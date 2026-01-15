// =========================
// GET ELEMENTS
// =========================
const menuWindow = document.getElementById('menu-window');
const openMenuBtn = document.getElementById('openMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const reservationFormDiv = document.getElementById('reservation-form');
const openResBtn = document.getElementById('openResBtn');
const resForm = document.getElementById('resForm');
const totalField = document.getElementById('total');

// =========================
// OPEN / CLOSE MODAL
// =========================
function openMenuWindow() {
  menuWindow.style.display = 'flex';
  menuWindow.setAttribute('aria-hidden', 'false');
  hideReservationForm();
  menuWindow.focus();
}

function closeMenuWindow() {
  menuWindow.style.display = 'none';
  menuWindow.setAttribute('aria-hidden', 'true');
  clearReservationForm();
}

// =========================
// RESERVATION FORM
// =========================
function openReservationForm() {
  reservationFormDiv.style.display = 'block';
  reservationFormDiv.scrollIntoView({ behavior: 'smooth' });
  calculateTotal();
}

function hideReservationForm() {
  reservationFormDiv.style.display = 'none';
}

// =========================
// RESET FORM
// =========================
function clearReservationForm() {
  resForm.reset();
  hideReservationForm();
  totalField.value = '₱0.00';
}

// =========================
// TOTAL CALCULATION (₱ FIXED)
// =========================
function calculateTotal() {
  const quantity = parseInt(resForm.quantity.value) || 1;
  const foodInputs = resForm.querySelectorAll('input[name="food"]');

  let total = 0;

  foodInputs.forEach(input => {
    if (input.checked) {
      const match = input.value.match(/₱([\d.]+)/);
      if (match) {
        total += parseFloat(match[1]) * quantity;
      }
    }
  });

  totalField.value = `₱${total.toFixed(2)}`;
}

// =========================
// EVENT LISTENERS
// =========================
openMenuBtn.addEventListener('click', openMenuWindow);
closeMenuBtn.addEventListener('click', closeMenuWindow);
openResBtn.addEventListener('click', openReservationForm);

// Close modal when clicking outside
menuWindow.addEventListener('click', (e) => {
  if (e.target === menuWindow) closeMenuWindow();
});

// Live calculation listeners (added ONCE)
resForm.querySelectorAll('input[name="food"]').forEach(input => {
  input.addEventListener('change', calculateTotal);
});

resForm.quantity.addEventListener('input', calculateTotal);

// =========================
// FORM SUBMIT
// =========================
resForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!resForm.checkValidity()) {
    alert('Please fill out all required fields.');
    return;
  }

  const checkedFoods = Array.from(
    resForm.querySelectorAll('input[name="food"]:checked')
  ).map(input => input.value);

  if (checkedFoods.length === 0) {
    alert('Please select at least one food item.');
    return;
  }

  alert(
`Reservation Confirmed!

Name: ${resForm.name.value}
Contact: ${resForm.number.value}
Date: ${resForm.date.value}
Time: ${resForm.time.value}
People: ${resForm.people.value}

Food: ${checkedFoods.join(', ')}
Quantity: ${resForm.quantity.value}
Total: ${totalField.value}`
  );

  clearReservationForm();
  closeMenuWindow();
});
