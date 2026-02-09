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
  // Airline logos using placeholder service (実際にはAmadeus APIから取得)
  const airlines = [
    { 
      name: '全日空 (ANA)', 
      code: 'NH', 
      logo: 'https://via.placeholder.com/80x40/003366/FFFFFF?text=ANA',
      color: '#003366'
    },
    { 
      name: '日本航空 (JAL)', 
      code: 'JL', 
      logo: 'https://via.placeholder.com/80x40/DC143C/FFFFFF?text=JAL',
      color: '#DC143C'
    },
    { 
      name: 'ユナイテッド航空', 
      code: 'UA', 
      logo: 'https://via.placeholder.com/80x40/004B87/FFFFFF?text=UA',
      color: '#004B87'
    },
    { 
      name: 'デルタ航空', 
      code: 'DL', 
      logo: 'https://via.placeholder.com/80x40/862633/FFFFFF?text=DL',
      color: '#862633'
    },
    { 
      name: 'アメリカン航空', 
      code: 'AA', 
      logo: 'https://via.placeholder.com/80x40/0078D2/FFFFFF?text=AA',
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
          {/* Flight Info */}
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

            {/* Outbound Flight */}
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

            {/* Return Flight */}
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

          {/* Price and Button */}
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

        {/* Additional Info */}
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

// Select flight
function selectFlight(flightNumber, price) {
  alert(`フライト ${flightNumber} を選択しました\n料金: ¥${price.toLocaleString()}\n\n※ Amadeus API統合後、予約処理が実装されます`);
}

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
