// Passenger counter state
let passengers = {
  adults: 1,
  children: 0,
  infants: 0
};

// Initialize date inputs with default values
document.addEventListener('DOMContentLoaded', function() {
  // Set default dates (today + 7 days for departure, today + 14 days for return)
  const today = new Date();
  const departureDate = new Date(today);
  departureDate.setDate(today.getDate() + 7);
  
  const returnDate = new Date(today);
  returnDate.setDate(today.getDate() + 14);
  
  document.getElementById('departureDate').value = departureDate.toISOString().split('T')[0];
  document.getElementById('returnDate').value = returnDate.toISOString().split('T')[0];

  // Trip type change handler
  document.querySelectorAll('input[name="tripType"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const returnDateField = document.getElementById('returnDateField');
      if (this.value === 'oneway') {
        returnDateField.style.display = 'none';
      } else {
        returnDateField.style.display = 'block';
      }
    });
  });

  // Passenger button click handler
  document.getElementById('passengerButton').addEventListener('click', function(e) {
    e.stopPropagation();
    const dropdown = document.getElementById('passengerDropdown');
    dropdown.classList.toggle('hidden');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('passengerDropdown');
    const button = document.getElementById('passengerButton');
    if (!dropdown.contains(e.target) && !button.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  // Cabin class change handler
  document.getElementById('cabinClass').addEventListener('change', updatePassengerDisplay);
});

// Update passenger count
function updatePassenger(type, delta) {
  const currentCount = passengers[type];
  const newCount = Math.max(0, currentCount + delta);
  
  // Validation rules
  if (type === 'adults' && newCount < 1) return; // At least 1 adult required
  if (type === 'infants' && newCount > passengers.adults) {
    alert('幼児の数は大人の数を超えることはできません');
    return;
  }
  
  passengers[type] = newCount;
  document.getElementById(`${type}Count`).textContent = newCount;
  updatePassengerDisplay();
}

// Update passenger display text
function updatePassengerDisplay() {
  const total = passengers.adults + passengers.children + passengers.infants;
  const cabinClass = document.getElementById('cabinClass').value;
  const cabinClassText = {
    economy: 'エコノミー',
    premium_economy: 'プレミアムエコノミー',
    business: 'ビジネス',
    first: 'ファースト'
  };
  
  document.getElementById('passengerDisplay').textContent = 
    `${total} 名, ${cabinClassText[cabinClass]}`;
}

// Close passenger dropdown
function closePassengerDropdown() {
  document.getElementById('passengerDropdown').classList.add('hidden');
}

// Search flights
async function searchFlights() {
  const fromLocation = document.getElementById('fromLocation').value;
  const toLocation = document.getElementById('toLocation').value;
  const departureDate = document.getElementById('departureDate').value;
  const returnDate = document.getElementById('returnDate').value;
  const tripType = document.querySelector('input[name="tripType"]:checked').value;
  const directFlights = document.getElementById('directFlights').checked;
  const cabinClass = document.getElementById('cabinClass').value;

  // Validation
  if (!fromLocation || !toLocation) {
    alert('出発地と目的地を入力してください');
    return;
  }
  if (!departureDate) {
    alert('出発日を選択してください');
    return;
  }
  if (tripType === 'roundtrip' && !returnDate) {
    alert('帰国日を選択してください');
    return;
  }

  // Update route info
  document.getElementById('routeInfo').textContent = `${fromLocation} → ${toLocation}`;

  // Show results section
  document.getElementById('searchResults').classList.remove('hidden');

  // Scroll to results
  document.getElementById('searchResults').scrollIntoView({ behavior: 'smooth' });

  // Generate sample flight data
  generateSampleFlights(fromLocation, toLocation, departureDate, returnDate);
}

// Generate sample flight cards
function generateSampleFlights(from, to, depDate, retDate) {
  // Airline logos - Using logo URLs from various CDNs (実際にはAmadeus APIから取得)
  // Fallback: If logo fails to load, airline code will be displayed
  const airlines = [
    { 
      name: '全日空 (ANA)', 
      code: 'NH', 
      logo: 'https://www.gstatic.com/flights/airline_logos/70px/NH.png',
      color: '#003366'
    },
    { 
      name: '日本航空 (JAL)', 
      code: 'JL', 
      logo: 'https://www.gstatic.com/flights/airline_logos/70px/JL.png',
      color: '#DC143C'
    },
    { 
      name: 'ユナイテッド航空', 
      code: 'UA', 
      logo: 'https://www.gstatic.com/flights/airline_logos/70px/UA.png',
      color: '#004B87'
    },
    { 
      name: 'デルタ航空', 
      code: 'DL', 
      logo: 'https://www.gstatic.com/flights/airline_logos/70px/DL.png',
      color: '#862633'
    },
    { 
      name: 'アメリカン航空', 
      code: 'AA', 
      logo: 'https://www.gstatic.com/flights/airline_logos/70px/AA.png',
      color: '#0078D2'
    }
  ];

  const stops = [
    { type: 'direct', label: '直行便', duration: '13時間00分' },
    { type: '1-stop', label: '1回経由', duration: '16時間30分', via: 'サンフランシスコ' },
    { type: '1-stop', label: '1回経由', duration: '15時間45分', via: 'ロサンゼルス' },
    { type: '2-stop', label: '2回経由', duration: '19時間20分', via: 'シアトル, シカゴ' }
  ];

  const flightCards = document.getElementById('flightCards');
  flightCards.innerHTML = '';

  // Generate 8 sample flights
  for (let i = 0; i < 8; i++) {
    const airline = airlines[i % airlines.length];
    const stop = stops[i % stops.length];
    const basePrice = 80000 + (i * 15000) + Math.floor(Math.random() * 20000);
    const departureTime = `${8 + (i * 2) % 12}:${['00', '15', '30', '45'][i % 4]}`;
    const arrivalTime = `${(parseInt(departureTime.split(':')[0]) + parseInt(stop.duration.split('時間')[0])) % 24}:${departureTime.split(':')[1]}`;

    const card = `
      <div class="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <!-- Flight Info -->
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-4">
              <div class="w-20 h-10 bg-white border border-gray-200 rounded flex items-center justify-center overflow-hidden">
                <img src="${airline.logo}" alt="${airline.name}" class="w-full h-full object-contain" />
              </div>
              <div>
                <div class="font-semibold text-gray-800">${airline.name}</div>
                <div class="text-sm text-gray-500">${airline.code}${100 + i}</div>
              </div>
            </div>

            <!-- Outbound Flight -->
            <div class="flex items-center space-x-6 mb-3">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-800">${departureTime}</div>
                <div class="text-sm text-gray-600">TYO</div>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-center space-x-2 mb-1">
                  <div class="h-px bg-gray-300 flex-1"></div>
                  <span class="text-xs text-gray-500">${stop.duration}</span>
                  <div class="h-px bg-gray-300 flex-1"></div>
                </div>
                <div class="text-center text-xs text-gray-500">${stop.label}</div>
                ${stop.via ? `<div class="text-center text-xs text-gray-400">${stop.via}</div>` : ''}
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-800">${arrivalTime}</div>
                <div class="text-sm text-gray-600">JFK</div>
              </div>
            </div>

            <!-- Return Flight -->
            <div class="flex items-center space-x-6">
              <div class="text-center">
                <div class="text-xl font-bold text-gray-800">${arrivalTime}</div>
                <div class="text-xs text-gray-600">JFK</div>
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-center space-x-2 mb-1">
                  <div class="h-px bg-gray-300 flex-1"></div>
                  <span class="text-xs text-gray-500">${stop.duration}</span>
                  <div class="h-px bg-gray-300 flex-1"></div>
                </div>
                <div class="text-center text-xs text-gray-500">${stop.label}</div>
              </div>
              <div class="text-center">
                <div class="text-xl font-bold text-gray-800">${departureTime}</div>
                <div class="text-xs text-gray-600">TYO</div>
              </div>
            </div>
          </div>

          <!-- Price and Button -->
          <div class="md:text-right md:ml-6 w-full md:w-auto">
            <div class="mb-3">
              <div class="text-3xl font-bold text-blue-600">¥${basePrice.toLocaleString()}</div>
              <div class="text-sm text-gray-500">往復 / 1人あたり</div>
            </div>
            <button 
              onclick="selectFlight('${airline.code}${100 + i}', ${basePrice})"
              class="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              選択する
            </button>
            <div class="mt-2 flex items-center justify-center md:justify-end space-x-2 text-sm text-gray-600">
              <i class="fas fa-suitcase"></i>
              <span>手荷物込み</span>
            </div>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex flex-wrap gap-4 text-sm text-gray-600">
            <span><i class="fas fa-plane mr-1 text-blue-500"></i> ${stop.type === 'direct' ? '直行便' : stop.label}</span>
            <span><i class="fas fa-clock mr-1 text-blue-500"></i> ${stop.duration}</span>
            <span><i class="fas fa-check-circle mr-1 text-green-500"></i> 座席あり</span>
          </div>
        </div>
      </div>
    `;

    flightCards.innerHTML += card;
  }
}

// Global variables for modal
let currentFlightData = null;
let selectedSeatClasses = {
  outbound: null,
  return: null
};

// Seat class data (will be fetched from Amadeus API later)
const seatClassData = {
  economy: {
    name: 'エコノミー',
    icon: 'fa-chair',
    amenities: ['標準座席', '機内食付き', '受託手荷物 1個'],
    cancellation: 'キャンセル料: 50%',
    priceMultiplier: 1.0,
    seatsAvailable: 12
  },
  premium_economy: {
    name: 'プレミアムエコノミー',
    icon: 'fa-couch',
    amenities: ['広々とした座席', '優先搭乗', '機内食付き', '受託手荷物 2個'],
    cancellation: 'キャンセル料: 30%',
    priceMultiplier: 1.5,
    seatsAvailable: 7
  },
  business: {
    name: 'ビジネス',
    icon: 'fa-briefcase',
    amenities: ['フルフラットシート', 'ラウンジ利用', 'プレミアム機内食', '受託手荷物 3個'],
    cancellation: 'キャンセル料: 20%',
    priceMultiplier: 3.0,
    seatsAvailable: 5
  },
  first: {
    name: 'ファースト',
    icon: 'fa-crown',
    amenities: ['プライベートスイート', 'ラウンジ利用', 'シェフ監修機内食', '受託手荷物 無制限'],
    cancellation: 'キャンセル無料',
    priceMultiplier: 5.0,
    seatsAvailable: 3
  }
};

// Select flight - open modal
function selectFlight(flightNumber, price) {
  currentFlightData = {
    flightNumber: flightNumber,
    basePrice: price,
    route: {
      from: 'TYO',
      to: 'JFK',
      fromCity: '東京',
      toCity: 'ニューヨーク'
    }
  };

  // Reset selections
  selectedSeatClasses.outbound = null;
  selectedSeatClasses.return = null;

  // Open modal
  openSeatClassModal();
}

// Open seat class modal
function openSeatClassModal() {
  const modal = document.getElementById('seatClassModal');
  const modalRouteInfo = document.getElementById('modalRouteInfo');
  const modalFlightInfo = document.getElementById('modalFlightInfo');
  
  // Update modal header
  modalRouteInfo.textContent = `${currentFlightData.route.fromCity} → ${currentFlightData.route.toCity}`;
  modalFlightInfo.innerHTML = `
    <div class="flex items-center space-x-4">
      <span><i class="fas fa-plane mr-1"></i> ${currentFlightData.flightNumber}</span>
      <span><i class="fas fa-yen-sign mr-1"></i> 基本料金: ¥${currentFlightData.basePrice.toLocaleString()}</span>
    </div>
  `;
  
  // Generate seat class options
  generateSeatClassOptions('outbound');
  generateSeatClassOptions('return');
  
  // Show modal
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  
  // Update total price
  updateTotalPrice();
  
  // Focus on first seat class option for accessibility
  setTimeout(() => {
    const firstOption = modal.querySelector('.seat-class-option');
    if (firstOption) firstOption.focus();
  }, 100);
}

// Close seat class modal
function closeSeatClassModal() {
  const modal = document.getElementById('seatClassModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  
  // Reset selections
  selectedSeatClasses.outbound = null;
  selectedSeatClasses.return = null;
  currentFlightData = null;
}

// Generate seat class options
function generateSeatClassOptions(direction) {
  const container = direction === 'outbound' 
    ? document.getElementById('outboundSeatClasses')
    : document.getElementById('returnSeatClasses');
  
  container.innerHTML = '';
  
  Object.keys(seatClassData).forEach(classKey => {
    const classInfo = seatClassData[classKey];
    const price = Math.round(currentFlightData.basePrice * classInfo.priceMultiplier);
    const isSelected = selectedSeatClasses[direction] === classKey;
    
    const optionHtml = `
      <div 
        class="seat-class-option border-2 rounded-lg p-4 cursor-pointer transition hover:shadow-lg ${
          isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-400'
        }"
        onclick="selectSeatClass('${direction}', '${classKey}')"
        role="button"
        tabindex="0"
        aria-pressed="${isSelected}"
        onkeypress="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectSeatClass('${direction}', '${classKey}'); }"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <i class="fas ${classInfo.icon} text-2xl ${isSelected ? 'text-blue-600' : 'text-gray-600'}"></i>
              <div>
                <h4 class="text-lg font-bold text-gray-800">${classInfo.name}</h4>
                <p class="text-sm text-gray-500">残り${classInfo.seatsAvailable}席</p>
              </div>
            </div>
            
            <!-- Amenities -->
            <div class="mb-3">
              <div class="flex flex-wrap gap-2">
                ${classInfo.amenities.map(amenity => `
                  <span class="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs text-gray-700">
                    <i class="fas fa-check text-green-500 mr-1"></i>
                    ${amenity}
                  </span>
                `).join('')}
              </div>
            </div>
            
            <!-- Cancellation Policy -->
            <div class="text-sm text-gray-600">
              <i class="fas fa-info-circle mr-1"></i>
              ${classInfo.cancellation}
            </div>
          </div>
          
          <!-- Price and Selection -->
          <div class="ml-4 text-right">
            <div class="text-2xl font-bold text-blue-600">¥${price.toLocaleString()}</div>
            <div class="text-xs text-gray-500 mt-1">片道 / 1名</div>
            <div class="mt-3">
              ${isSelected 
                ? '<i class="fas fa-check-circle text-blue-600 text-2xl"></i>'
                : '<i class="far fa-circle text-gray-400 text-2xl"></i>'
              }
            </div>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML += optionHtml;
  });
}

// Select seat class
function selectSeatClass(direction, classKey) {
  selectedSeatClasses[direction] = classKey;
  
  // Regenerate options to show selection
  generateSeatClassOptions(direction);
  
  // Update total price
  updateTotalPrice();
  
  // Enable/disable confirm button
  updateConfirmButton();
}

// Update total price
function updateTotalPrice() {
  const totalPriceElement = document.getElementById('modalTotalPrice');
  
  let totalPrice = 0;
  
  if (selectedSeatClasses.outbound) {
    const outboundClass = seatClassData[selectedSeatClasses.outbound];
    totalPrice += currentFlightData.basePrice * outboundClass.priceMultiplier;
  }
  
  if (selectedSeatClasses.return) {
    const returnClass = seatClassData[selectedSeatClasses.return];
    totalPrice += currentFlightData.basePrice * returnClass.priceMultiplier;
  }
  
  totalPriceElement.textContent = totalPrice > 0 
    ? `¥${Math.round(totalPrice).toLocaleString()}`
    : '¥0';
}

// Update confirm button state
function updateConfirmButton() {
  const confirmBtn = document.getElementById('confirmSelectionBtn');
  const bothSelected = selectedSeatClasses.outbound && selectedSeatClasses.return;
  
  confirmBtn.disabled = !bothSelected;
  
  if (bothSelected) {
    confirmBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    confirmBtn.classList.add('hover:from-blue-700', 'hover:to-indigo-700');
  } else {
    confirmBtn.classList.add('opacity-50', 'cursor-not-allowed');
    confirmBtn.classList.remove('hover:from-blue-700', 'hover:to-indigo-700');
  }
}

// Global booking state
let bookingState = {
  flight: null,
  seatClasses: null,
  selectedSeats: {
    outbound: [],
    return: []
  },
  passengers: [],
  totalPrice: 0
};

// Confirm seat class selection and proceed to booking page
function confirmSeatClassSelection() {
  if (!selectedSeatClasses.outbound || !selectedSeatClasses.return) {
    alert('往路と復路の両方の座席クラスを選択してください。');
    return;
  }
  
  // Calculate total price
  const outboundPrice = currentFlightData.basePrice * seatClassData[selectedSeatClasses.outbound].priceMultiplier;
  const returnPrice = currentFlightData.basePrice * seatClassData[selectedSeatClasses.return].priceMultiplier;
  const totalPrice = Math.round(outboundPrice + returnPrice);
  
  // Prepare booking data
  bookingState.flight = currentFlightData;
  bookingState.seatClasses = {
    outbound: {
      class: selectedSeatClasses.outbound,
      className: seatClassData[selectedSeatClasses.outbound].name,
      price: Math.round(outboundPrice)
    },
    return: {
      class: selectedSeatClasses.return,
      className: seatClassData[selectedSeatClasses.return].name,
      price: Math.round(returnPrice)
    }
  };
  bookingState.totalPrice = totalPrice;
  
  // Close modal
  closeSeatClassModal();
  
  // Show booking page
  showBookingPage();
}

// Show booking page
function showBookingPage() {
  // Hide search results
  document.getElementById('searchResults').classList.add('hidden');
  
  // Show booking page
  document.getElementById('bookingPage').classList.remove('hidden');
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Generate flight summary
  generateFlightSummary();
  
  // Generate seat maps
  generateSeatMap('outbound');
  generateSeatMap('return');
  
  // Generate passenger forms
  generatePassengerForms();
  
  // Update total passengers count
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;
  document.getElementById('totalPassengersCount').textContent = totalPassengers;
  document.getElementById('requiredSeats').textContent = totalPassengers;
  
  // Update final total price (multiply by number of passengers)
  updateFinalTotalPrice();
}

// Generate flight summary
function generateFlightSummary() {
  const summaryContainer = document.getElementById('flightSummary');
  
  const summary = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Outbound Flight -->
      <div class="border border-gray-200 rounded-lg p-4">
        <h4 class="font-bold text-gray-800 mb-3 flex items-center">
          <i class="fas fa-plane-departure text-blue-600 mr-2"></i>
          往路便
        </h4>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">便名:</span>
            <span class="font-semibold">${bookingState.flight.flightNumber}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">区間:</span>
            <span class="font-semibold">${bookingState.flight.route.fromCity} (${bookingState.flight.route.from}) → ${bookingState.flight.route.toCity} (${bookingState.flight.route.to})</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">座席クラス:</span>
            <span class="font-semibold">${bookingState.seatClasses.outbound.className}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">料金:</span>
            <span class="font-semibold text-blue-600">¥${bookingState.seatClasses.outbound.price.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <!-- Return Flight -->
      <div class="border border-gray-200 rounded-lg p-4">
        <h4 class="font-bold text-gray-800 mb-3 flex items-center">
          <i class="fas fa-plane-arrival text-blue-600 mr-2"></i>
          復路便
        </h4>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">便名:</span>
            <span class="font-semibold">${bookingState.flight.flightNumber}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">区間:</span>
            <span class="font-semibold">${bookingState.flight.route.toCity} (${bookingState.flight.route.to}) → ${bookingState.flight.route.fromCity} (${bookingState.flight.route.from})</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">座席クラス:</span>
            <span class="font-semibold">${bookingState.seatClasses.return.className}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">料金:</span>
            <span class="font-semibold text-blue-600">¥${bookingState.seatClasses.return.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  summaryContainer.innerHTML = summary;
}

// Generate seat map
function generateSeatMap(direction) {
  const container = direction === 'outbound' 
    ? document.getElementById('outboundSeatMap')
    : document.getElementById('returnSeatMap');
  
  // Seat configuration based on class
  const selectedClass = direction === 'outbound' 
    ? bookingState.seatClasses.outbound.class 
    : bookingState.seatClasses.return.class;
  
  let seatConfig;
  if (selectedClass === 'economy') {
    seatConfig = { rows: [18, 38], columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'], aisles: [3, 7] };
  } else if (selectedClass === 'premium_economy') {
    seatConfig = { rows: [10, 17], columns: ['A', 'B', 'C', 'D', 'E', 'F'], aisles: [3] };
  } else if (selectedClass === 'business') {
    seatConfig = { rows: [5, 9], columns: ['A', 'B', 'D', 'E'], aisles: [2] };
  } else { // first
    seatConfig = { rows: [1, 4], columns: ['A', 'B'], aisles: [] };
  }
  
  let mapHtml = '<div class="od-aircraftmap-cabin">';
  
  // Generate rows
  for (let row = seatConfig.rows[0]; row <= seatConfig.rows[1]; row++) {
    mapHtml += `<div class="seat-row flex items-center justify-center mb-2" data-row="${row}">`;
    mapHtml += `<div class="row-number w-8 text-center text-sm font-bold text-gray-600">${row}</div>`;
    mapHtml += `<div class="seats flex items-center space-x-1">`;
    
    seatConfig.columns.forEach((col, index) => {
      // Add aisle space
      if (seatConfig.aisles.includes(index)) {
        mapHtml += `<div class="aisle w-8"></div>`;
      }
      
      // Random seat status
      const rand = Math.random();
      let status = 'available';
      let statusClass = 'bg-green-500 hover:bg-green-600';
      let statusIcon = '空';
      let price = 0;
      let isPrime = false;
      
      if (rand > 0.7) {
        status = 'unavailable';
        statusClass = 'bg-gray-400 cursor-not-allowed';
        statusIcon = '×';
      } else if (rand > 0.6) {
        status = 'available';
        statusClass = 'bg-yellow-500 hover:bg-yellow-600';
        statusIcon = '特';
        price = 21009;
        isPrime = true;
      }
      
      const seatId = `${direction}-${row}${col}`;
      
      mapHtml += `
        <div 
          class="seat w-10 h-10 rounded flex items-center justify-center text-white text-xs font-bold cursor-pointer transition ${statusClass}"
          data-seat-id="${seatId}"
          data-direction="${direction}"
          data-row="${row}"
          data-column="${col}"
          data-status="${status}"
          data-price="${price}"
          data-prime-price="${isPrime ? price : 0}"
          onclick="toggleSeat('${seatId}')"
          title="座席 ${row}${col}"
        >
          ${statusIcon}
        </div>
      `;
    });
    
    mapHtml += `</div></div>`;
  }
  
  mapHtml += '</div>';
  
  container.innerHTML = mapHtml;
}

// Toggle seat selection
function toggleSeat(seatId) {
  const seatElement = document.querySelector(`[data-seat-id="${seatId}"]`);
  const status = seatElement.dataset.status;
  const direction = seatElement.dataset.direction;
  
  if (status === 'unavailable') {
    return; // Cannot select unavailable seats
  }
  
  const currentSelected = bookingState.selectedSeats[direction];
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;
  
  if (status === 'available') {
    // Check if we can select more seats
    const totalSelectedCount = bookingState.selectedSeats.outbound.length + bookingState.selectedSeats.return.length;
    if (totalSelectedCount >= totalPassengers * 2) {
      alert(`既に必要な座席数（${totalPassengers * 2}席）を選択しています。`);
      return;
    }
    
    // Select seat
    seatElement.dataset.status = 'selected';
    seatElement.classList.remove('bg-green-500', 'hover:bg-green-600', 'bg-yellow-500', 'hover:bg-yellow-600');
    seatElement.classList.add('bg-blue-600');
    seatElement.innerHTML = '選';
    
    // Add to selected seats
    currentSelected.push({
      seatId: seatId,
      row: seatElement.dataset.row,
      column: seatElement.dataset.column,
      price: parseInt(seatElement.dataset.price) || 0
    });
    
  } else if (status === 'selected') {
    // Deselect seat
    const isPrime = parseInt(seatElement.dataset.primePrice) > 0;
    seatElement.dataset.status = 'available';
    seatElement.classList.remove('bg-blue-600');
    
    if (isPrime) {
      seatElement.classList.add('bg-yellow-500', 'hover:bg-yellow-600');
      seatElement.innerHTML = '特';
    } else {
      seatElement.classList.add('bg-green-500', 'hover:bg-green-600');
      seatElement.innerHTML = '空';
    }
    
    // Remove from selected seats
    const index = currentSelected.findIndex(s => s.seatId === seatId);
    if (index > -1) {
      currentSelected.splice(index, 1);
    }
  }
  
  // Update UI
  updateSelectedSeatsDisplay();
  updateProceedButton();
}

// Update selected seats display
function updateSelectedSeatsDisplay() {
  const totalSelected = bookingState.selectedSeats.outbound.length + bookingState.selectedSeats.return.length;
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;
  const required = totalPassengers * 2; // Outbound + Return
  
  document.getElementById('selectedSeatsCount').textContent = totalSelected;
  
  // Update summary
  const summaryContainer = document.getElementById('selectedSeatsSummary');
  
  if (totalSelected === 0) {
    summaryContainer.innerHTML = '座席を選択してください';
  } else {
    let summaryHtml = '<div class="grid grid-cols-1 md:grid-cols-2 gap-4">';
    
    // Outbound seats
    summaryHtml += '<div><strong>往路:</strong> ';
    if (bookingState.selectedSeats.outbound.length > 0) {
      summaryHtml += bookingState.selectedSeats.outbound.map(s => `${s.row}${s.column}`).join(', ');
    } else {
      summaryHtml += '未選択';
    }
    summaryHtml += '</div>';
    
    // Return seats
    summaryHtml += '<div><strong>復路:</strong> ';
    if (bookingState.selectedSeats.return.length > 0) {
      summaryHtml += bookingState.selectedSeats.return.map(s => `${s.row}${s.column}`).join(', ');
    } else {
      summaryHtml += '未選択';
    }
    summaryHtml += '</div>';
    
    summaryHtml += '</div>';
    summaryContainer.innerHTML = summaryHtml;
  }
}

// Generate passenger forms
function generatePassengerForms() {
  const container = document.getElementById('passengerFormsContainer');
  let formsHtml = '';
  
  let passengerIndex = 1;
  
  // Adults
  for (let i = 0; i < passengers.adults; i++) {
    formsHtml += generatePassengerForm(passengerIndex, '大人', 'adult');
    passengerIndex++;
  }
  
  // Children
  for (let i = 0; i < passengers.children; i++) {
    formsHtml += generatePassengerForm(passengerIndex, '子供', 'child');
    passengerIndex++;
  }
  
  // Infants
  for (let i = 0; i < passengers.infants; i++) {
    formsHtml += generatePassengerForm(passengerIndex, '幼児', 'infant');
    passengerIndex++;
  }
  
  container.innerHTML = formsHtml;
}

// Generate single passenger form
function generatePassengerForm(index, type, category) {
  return `
    <div class="mb-6 pb-6 border-b border-gray-200">
      <h4 class="text-lg font-bold text-gray-800 mb-4">乗客 ${index} (${type})</h4>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            姓 <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="passenger${index}LastName"
            data-passenger="${index}"
            data-category="${category}"
            required
            placeholder="山田"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            名 <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="passenger${index}FirstName"
            data-passenger="${index}"
            data-category="${category}"
            required
            placeholder="太郎"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            性別 <span class="text-red-500">*</span>
          </label>
          <select 
            id="passenger${index}Gender"
            data-passenger="${index}"
            data-category="${category}"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">選択してください</option>
            <option value="male">男性</option>
            <option value="female">女性</option>
            <option value="other">その他</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            生年月日 <span class="text-red-500">*</span>
          </label>
          <input 
            type="date" 
            id="passenger${index}DOB"
            data-passenger="${index}"
            data-category="${category}"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            パスポート番号 <span class="text-red-500">*</span>
          </label>
          <input 
            type="text" 
            id="passenger${index}Passport"
            data-passenger="${index}"
            data-category="${category}"
            required
            placeholder="TK1234567"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            国籍 <span class="text-red-500">*</span>
          </label>
          <select 
            id="passenger${index}Nationality"
            data-passenger="${index}"
            data-category="${category}"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">選択してください</option>
            <option value="JP">日本</option>
            <option value="US">アメリカ</option>
            <option value="UK">イギリス</option>
            <option value="CN">中国</option>
            <option value="KR">韓国</option>
            <option value="other">その他</option>
          </select>
        </div>
      </div>
    </div>
  `;
}

// Update final total price
function updateFinalTotalPrice() {
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;
  const baseTotal = bookingState.totalPrice * totalPassengers;
  
  // Add seat upgrade charges
  let seatUpgradeTotal = 0;
  bookingState.selectedSeats.outbound.forEach(seat => {
    seatUpgradeTotal += seat.price;
  });
  bookingState.selectedSeats.return.forEach(seat => {
    seatUpgradeTotal += seat.price;
  });
  
  const finalTotal = baseTotal + seatUpgradeTotal;
  document.getElementById('finalTotalPrice').textContent = `¥${finalTotal.toLocaleString()}`;
}

// Update proceed button
function updateProceedButton() {
  const btn = document.getElementById('proceedPaymentBtn');
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;
  const requiredSeats = totalPassengers * 2; // Outbound + Return
  const selectedSeats = bookingState.selectedSeats.outbound.length + bookingState.selectedSeats.return.length;
  
  if (selectedSeats === requiredSeats) {
    btn.disabled = false;
    btn.classList.remove('opacity-50', 'cursor-not-allowed');
  } else {
    btn.disabled = true;
    btn.classList.add('opacity-50', 'cursor-not-allowed');
  }
  
  // Update final total price
  updateFinalTotalPrice();
}

// Back to search
function backToSearch() {
  // Show search results
  document.getElementById('searchResults').classList.remove('hidden');
  
  // Hide booking page
  document.getElementById('bookingPage').classList.add('hidden');
  
  // Reset booking state
  bookingState.selectedSeats = { outbound: [], return: [] };
  
  // Scroll to results
  document.getElementById('searchResults').scrollIntoView({ behavior: 'smooth' });
}

// Proceed to payment
function proceedToPayment() {
  // Validate form
  const form = document.getElementById('customerInfoForm');
  if (!form.checkValidity()) {
    alert('すべての必須項目を入力してください。');
    form.reportValidity();
    return;
  }
  
  // Check terms agreement
  const agreeTerms = document.getElementById('agreeTerms').checked;
  if (!agreeTerms) {
    alert('利用規約およびプライバシーポリシーに同意してください。');
    return;
  }
  
  // Collect passenger data
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;
  const passengerData = [];
  
  for (let i = 1; i <= totalPassengers; i++) {
    passengerData.push({
      index: i,
      lastName: document.getElementById(`passenger${i}LastName`).value,
      firstName: document.getElementById(`passenger${i}FirstName`).value,
      gender: document.getElementById(`passenger${i}Gender`).value,
      dob: document.getElementById(`passenger${i}DOB`).value,
      passport: document.getElementById(`passenger${i}Passport`).value,
      nationality: document.getElementById(`passenger${i}Nationality`).value,
      category: document.getElementById(`passenger${i}LastName`).dataset.category
    });
  }
  
  // Collect contact data
  const contactData = {
    email: document.getElementById('contactEmail').value,
    phone: document.getElementById('contactPhone').value,
    emergencyName: document.getElementById('emergencyName').value,
    emergencyPhone: document.getElementById('emergencyPhone').value
  };
  
  // Prepare final booking data
  const finalBookingData = {
    flight: bookingState.flight,
    seatClasses: bookingState.seatClasses,
    selectedSeats: bookingState.selectedSeats,
    passengers: passengerData,
    contact: contactData,
    totalPrice: parseInt(document.getElementById('finalTotalPrice').textContent.replace(/[¥,]/g, ''))
  };
  
  console.log('Final booking data:', finalBookingData);
  
  // Show confirmation (will be replaced with actual payment flow)
  alert(
    `予約が確定しました！\n\n` +
    `フライト: ${finalBookingData.flight.flightNumber}\n` +
    `乗客数: ${totalPassengers}名\n` +
    `合計金額: ¥${finalBookingData.totalPrice.toLocaleString()}\n\n` +
    `※ Amadeus API統合後、実際の決済処理が実装されます`
  );
}

// Keyboard accessibility for modal
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('seatClassModal');
  if (!modal.classList.contains('hidden')) {
    // Close modal on Escape key
    if (e.key === 'Escape') {
      closeSeatClassModal();
    }
  }
});

// Sort change handler
document.addEventListener('DOMContentLoaded', function() {
  const sortSelect = document.getElementById('sortBy');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      console.log('Sort by:', this.value);
      // TODO: Implement sorting logic
    });
  }
});
