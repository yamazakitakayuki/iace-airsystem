// Passenger counter state
let passengers = {
  adults: 1,
  children: 0,
  infants: 0
};

// Multi-city flight counter
let multiCityFlightCount = 2;

// Master data for autocomplete (dummy data - will be replaced with Amadeus API)
const airportMaster = [
  // 日本
  { code: 'NRT', city: '東京', airport: '成田国際空港', country: '日本', label: '東京 成田 (NRT)', searchText: '東京 tokyo narita nrt 成田' },
  { code: 'HND', city: '東京', airport: '羽田空港', country: '日本', label: '東京 羽田 (HND)', searchText: '東京 tokyo haneda hnd 羽田' },
  { code: 'KIX', city: '大阪', airport: '関西国際空港', country: '日本', label: '大阪 関西 (KIX)', searchText: '大阪 osaka kansai kix 関西' },
  { code: 'ITM', city: '大阪', airport: '大阪国際空港（伊丹）', country: '日本', label: '大阪 伊丹 (ITM)', searchText: '大阪 osaka itami itm 伊丹' },
  { code: 'NGO', city: '名古屋', airport: '中部国際空港', country: '日本', label: '名古屋 (NGO)', searchText: '名古屋 nagoya ngo 中部' },
  { code: 'CTS', city: '札幌', airport: '新千歳空港', country: '日本', label: '札幌 (CTS)', searchText: '札幌 sapporo cts 新千歳' },
  { code: 'FUK', city: '福岡', airport: '福岡空港', country: '日本', label: '福岡 (FUK)', searchText: '福岡 fukuoka fuk' },
  { code: 'OKA', city: '那覇', airport: '那覇空港', country: '日本', label: '那覇 沖縄 (OKA)', searchText: '那覇 naha okinawa oka 沖縄' },
  
  // アメリカ
  { code: 'JFK', city: 'ニューヨーク', airport: 'ジョン・F・ケネディ国際空港', country: 'アメリカ', label: 'ニューヨーク JFK (JFK)', searchText: 'ニューヨーク new york jfk kennedy' },
  { code: 'EWR', city: 'ニューヨーク', airport: 'ニューアーク・リバティー国際空港', country: 'アメリカ', label: 'ニューヨーク ニューアーク (EWR)', searchText: 'ニューヨーク new york newark ewr' },
  { code: 'LAX', city: 'ロサンゼルス', airport: 'ロサンゼルス国際空港', country: 'アメリカ', label: 'ロサンゼルス (LAX)', searchText: 'ロサンゼルス los angeles lax' },
  { code: 'SFO', city: 'サンフランシスコ', airport: 'サンフランシスコ国際空港', country: 'アメリカ', label: 'サンフランシスコ (SFO)', searchText: 'サンフランシスコ san francisco sfo' },
  { code: 'ORD', city: 'シカゴ', airport: "オヘア国際空港", country: 'アメリカ', label: 'シカゴ (ORD)', searchText: 'シカゴ chicago ord ohare' },
  { code: 'SEA', city: 'シアトル', airport: 'シアトル・タコマ国際空港', country: 'アメリカ', label: 'シアトル (SEA)', searchText: 'シアトル seattle sea' },
  { code: 'LAS', city: 'ラスベガス', airport: 'マッカラン国際空港', country: 'アメリカ', label: 'ラスベガス (LAS)', searchText: 'ラスベガス las vegas las' },
  { code: 'HNL', city: 'ホノルル', airport: 'ダニエル・K・イノウエ国際空港', country: 'アメリカ', label: 'ホノルル ハワイ (HNL)', searchText: 'ホノルル honolulu hawaii hnl ハワイ' },
  
  // ヨーロッパ
  { code: 'LHR', city: 'ロンドン', airport: 'ヒースロー空港', country: 'イギリス', label: 'ロンドン (LHR)', searchText: 'ロンドン london lhr heathrow' },
  { code: 'CDG', city: 'パリ', airport: 'シャルル・ド・ゴール空港', country: 'フランス', label: 'パリ (CDG)', searchText: 'パリ paris cdg charles de gaulle' },
  { code: 'FRA', city: 'フランクフルト', airport: 'フランクフルト空港', country: 'ドイツ', label: 'フランクフルト (FRA)', searchText: 'フランクフルト frankfurt fra' },
  { code: 'AMS', city: 'アムステルダム', airport: 'スキポール空港', country: 'オランダ', label: 'アムステルダム (AMS)', searchText: 'アムステルダム amsterdam ams schiphol' },
  { code: 'FCO', city: 'ローマ', airport: 'フィウミチーノ空港', country: 'イタリア', label: 'ローマ (FCO)', searchText: 'ローマ roma rome fco' },
  { code: 'MAD', city: 'マドリード', airport: 'マドリード・バラハス空港', country: 'スペイン', label: 'マドリード (MAD)', searchText: 'マドリード madrid mad' },
  
  // アジア
  { code: 'ICN', city: 'ソウル', airport: '仁川国際空港', country: '韓国', label: 'ソウル (ICN)', searchText: 'ソウル seoul icn incheon 仁川' },
  { code: 'PEK', city: '北京', airport: '北京首都国際空港', country: '中国', label: '北京 (PEK)', searchText: '北京 beijing pek' },
  { code: 'PVG', city: '上海', airport: '上海浦東国際空港', country: '中国', label: '上海 (PVG)', searchText: '上海 shanghai pvg' },
  { code: 'HKG', city: '香港', airport: '香港国際空港', country: '香港', label: '香港 (HKG)', searchText: '香港 hong kong hkg' },
  { code: 'TPE', city: '台北', airport: '桃園国際空港', country: '台湾', label: '台北 (TPE)', searchText: '台北 taipei tpe' },
  { code: 'SIN', city: 'シンガポール', airport: 'チャンギ国際空港', country: 'シンガポール', label: 'シンガポール (SIN)', searchText: 'シンガポール singapore sin changi' },
  { code: 'BKK', city: 'バンコク', airport: 'スワンナプーム国際空港', country: 'タイ', label: 'バンコク (BKK)', searchText: 'バンコク bangkok bkk' },
  { code: 'SYD', city: 'シドニー', airport: 'シドニー空港', country: 'オーストラリア', label: 'シドニー (SYD)', searchText: 'シドニー sydney syd' },
];

const airlineMaster = [
  { code: 'NH', name: '全日空', nameEn: 'ANA', country: '日本', label: 'ANA 全日空 (NH)', searchText: 'ana nh 全日空 all nippon airways' },
  { code: 'JL', name: '日本航空', nameEn: 'JAL', country: '日本', label: 'JAL 日本航空 (JL)', searchText: 'jal jl 日本航空 japan airlines' },
  { code: 'UA', name: 'ユナイテッド航空', nameEn: 'United Airlines', country: 'アメリカ', label: 'ユナイテッド航空 (UA)', searchText: 'ua united airlines ユナイテッド' },
  { code: 'DL', name: 'デルタ航空', nameEn: 'Delta Air Lines', country: 'アメリカ', label: 'デルタ航空 (DL)', searchText: 'dl delta air lines デルタ' },
  { code: 'AA', name: 'アメリカン航空', nameEn: 'American Airlines', country: 'アメリカ', label: 'アメリカン航空 (AA)', searchText: 'aa american airlines アメリカン' },
  { code: 'BA', name: 'ブリティッシュ・エアウェイズ', nameEn: 'British Airways', country: 'イギリス', label: 'ブリティッシュ・エアウェイズ (BA)', searchText: 'ba british airways ブリティッシュ' },
  { code: 'AF', name: 'エールフランス', nameEn: 'Air France', country: 'フランス', label: 'エールフランス (AF)', searchText: 'af air france エールフランス' },
  { code: 'LH', name: 'ルフトハンザ・ドイツ航空', nameEn: 'Lufthansa', country: 'ドイツ', label: 'ルフトハンザ (LH)', searchText: 'lh lufthansa ルフトハンザ' },
  { code: 'SQ', name: 'シンガポール航空', nameEn: 'Singapore Airlines', country: 'シンガポール', label: 'シンガポール航空 (SQ)', searchText: 'sq singapore airlines シンガポール' },
  { code: 'TG', name: 'タイ国際航空', nameEn: 'Thai Airways', country: 'タイ', label: 'タイ国際航空 (TG)', searchText: 'tg thai airways タイ' },
  { code: 'KE', name: '大韓航空', nameEn: 'Korean Air', country: '韓国', label: '大韓航空 (KE)', searchText: 'ke korean air 大韓航空' },
  { code: 'CZ', name: '中国南方航空', nameEn: 'China Southern Airlines', country: '中国', label: '中国南方航空 (CZ)', searchText: 'cz china southern 中国南方航空' },
];

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

  // Set default dates for multi-city flights
  const multiCityDates = document.querySelectorAll('.multi-city-date');
  multiCityDates.forEach((dateInput, index) => {
    const flightDate = new Date(today);
    flightDate.setDate(today.getDate() + 7 + (index * 3));
    dateInput.value = flightDate.toISOString().split('T')[0];
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

  // Trip type change handler
  const tripTypeRadios = document.querySelectorAll('input[name="tripType"]');
  tripTypeRadios.forEach(radio => {
    radio.addEventListener('change', handleTripTypeChange);
  });

  // Cabin class change handler
  document.getElementById('cabinClass').addEventListener('change', updatePassengerDisplay);
  
  // Initialize autocomplete for location and airline fields
  initializeAutocomplete('fromLocation', airportMaster);
  initializeAutocomplete('toLocation', airportMaster);
  initializeAutocomplete('preferredAirline', airlineMaster, true);
  
  // Initialize autocomplete for multi-city fields
  initializeAutocomplete('multiCityFrom1', airportMaster);
  initializeAutocomplete('multiCityTo1', airportMaster);
  initializeAutocomplete('multiCityFrom2', airportMaster);
  initializeAutocomplete('multiCityTo2', airportMaster);
});

// Initialize autocomplete functionality
function initializeAutocomplete(inputId, masterData, isAirline = false) {
  const input = document.getElementById(inputId);
  if (!input) return;
  
  // Create suggestion container
  const suggestionsId = `${inputId}-suggestions`;
  let suggestionsDiv = document.getElementById(suggestionsId);
  
  if (!suggestionsDiv) {
    suggestionsDiv = document.createElement('div');
    suggestionsDiv.id = suggestionsId;
    suggestionsDiv.className = 'absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto hidden';
    input.parentElement.appendChild(suggestionsDiv);
  }
  
  // Input event handler
  input.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    
    if (query.length < 1) {
      suggestionsDiv.classList.add('hidden');
      return;
    }
    
    // Filter master data
    const filtered = masterData.filter(item => 
      item.searchText.toLowerCase().includes(query)
    ).slice(0, 10); // Limit to 10 results
    
    if (filtered.length === 0) {
      suggestionsDiv.classList.add('hidden');
      return;
    }
    
    // Generate suggestions HTML
    suggestionsDiv.innerHTML = filtered.map(item => `
      <div class="suggestion-item px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0" data-code="${item.code}" data-label="${item.label}">
        <div class="font-medium text-gray-800">${item.label}</div>
        ${isAirline ? `<div class="text-xs text-gray-500">${item.nameEn}</div>` : `<div class="text-xs text-gray-500">${item.airport}</div>`}
      </div>
    `).join('');
    
    suggestionsDiv.classList.remove('hidden');
    
    // Add click handlers to suggestions
    suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', function() {
        input.value = this.dataset.label;
        input.dataset.code = this.dataset.code;
        suggestionsDiv.classList.add('hidden');
      });
    });
  });
  
  // Close suggestions when clicking outside
  document.addEventListener('click', function(e) {
    if (e.target !== input && !suggestionsDiv.contains(e.target)) {
      suggestionsDiv.classList.add('hidden');
    }
  });
  
  // Handle keyboard navigation
  input.addEventListener('keydown', function(e) {
    const items = suggestionsDiv.querySelectorAll('.suggestion-item');
    if (items.length === 0) return;
    
    let currentIndex = Array.from(items).findIndex(item => item.classList.contains('selected'));
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (currentIndex < items.length - 1) {
        if (currentIndex >= 0) items[currentIndex].classList.remove('selected');
        currentIndex++;
        items[currentIndex].classList.add('selected');
        items[currentIndex].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (currentIndex > 0) {
        items[currentIndex].classList.remove('selected');
        currentIndex--;
        items[currentIndex].classList.add('selected');
        items[currentIndex].scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentIndex >= 0) {
        items[currentIndex].click();
      }
    } else if (e.key === 'Escape') {
      suggestionsDiv.classList.add('hidden');
    }
  });
}

// Initialize autocomplete for multi-city fields
function initializeMultiCityAutocomplete() {
  document.querySelectorAll('.multi-city-from, .multi-city-to').forEach((input, index) => {
    const uniqueId = `multi-city-${index}-${Date.now()}`;
    input.id = uniqueId;
    initializeAutocomplete(uniqueId, airportMaster);
  });
}

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

// Handle trip type change
function handleTripTypeChange() {
  const tripType = document.querySelector('input[name="tripType"]:checked').value;
  const singleTripFields = document.getElementById('singleTripFields');
  const multiCityFields = document.getElementById('multiCityFields');
  const returnDateField = document.getElementById('returnDateField');
  
  if (tripType === 'multicity') {
    // Show multi-city fields
    singleTripFields.classList.add('hidden');
    multiCityFields.classList.remove('hidden');
  } else {
    // Show single/round trip fields
    singleTripFields.classList.remove('hidden');
    multiCityFields.classList.add('hidden');
    
    // Handle return date visibility for oneway
    if (tripType === 'oneway') {
      returnDateField.style.display = 'none';
    } else {
      returnDateField.style.display = 'block';
    }
  }
}

// Add multi-city flight
function addMultiCityFlight() {
  multiCityFlightCount++;
  const container = document.getElementById('multiCityFlightsContainer');
  
  const today = new Date();
  const flightDate = new Date(today);
  flightDate.setDate(today.getDate() + 7 + (multiCityFlightCount - 1) * 3);
  
  const flightHTML = `
    <div class="multi-city-flight mb-4 p-4 border border-gray-200 rounded-lg" data-flight-index="${multiCityFlightCount}">
      <div class="flex justify-between items-center mb-3">
        <h4 class="font-semibold text-gray-800">フライト ${multiCityFlightCount}</h4>
        <button 
          type="button" 
          onclick="removeMultiCityFlight(this)"
          class="text-red-600 hover:text-red-800 transition"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-2">出発地</label>
          <div class="relative">
            <i class="fas fa-plane-departure absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              class="multi-city-from w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="出発地"
            />
          </div>
        </div>
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-2">目的地</label>
          <div class="relative">
            <i class="fas fa-plane-arrival absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              class="multi-city-to w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="目的地"
            />
          </div>
        </div>
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-2">出発日</label>
          <div class="relative">
            <i class="fas fa-calendar-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              type="date" 
              class="multi-city-date w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value="${flightDate.toISOString().split('T')[0]}"
            />
          </div>
        </div>
      </div>
    </div>
  `;
  
  container.insertAdjacentHTML('beforeend', flightHTML);
  
  // Initialize autocomplete for the newly added fields
  const newFlight = container.lastElementChild;
  const fromInput = newFlight.querySelector('.multi-city-from');
  const toInput = newFlight.querySelector('.multi-city-to');
  
  // Give unique IDs
  const uniqueId = `multi-city-flight-${multiCityFlightCount}`;
  fromInput.id = `${uniqueId}-from`;
  toInput.id = `${uniqueId}-to`;
  
  // Initialize autocomplete
  initializeAutocomplete(fromInput.id, airportMaster);
  initializeAutocomplete(toInput.id, airportMaster);
}

// Remove multi-city flight
function removeMultiCityFlight(button) {
  const flightDiv = button.closest('.multi-city-flight');
  const flightIndex = parseInt(flightDiv.dataset.flightIndex);
  
  // Don't allow removal if only 2 flights remain
  const totalFlights = document.querySelectorAll('.multi-city-flight').length;
  if (totalFlights <= 2) {
    alert('最低2つのフライトが必要です。');
    return;
  }
  
  flightDiv.remove();
  
  // Renumber remaining flights
  document.querySelectorAll('.multi-city-flight').forEach((flight, index) => {
    flight.dataset.flightIndex = index + 1;
    const title = flight.querySelector('h4');
    title.textContent = `フライト ${index + 1}`;
  });
  
  multiCityFlightCount = document.querySelectorAll('.multi-city-flight').length;
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
  
  // Show authentication selection page
  showAuthSelectionPage();
}

// Show booking page
function showBookingPage() {
  console.log('showBookingPage called');
  console.log('bookingState:', bookingState);
  
  // Get elements
  const mainContent = document.getElementById('mainContent');
  const mainFooter = document.getElementById('mainFooter');
  const bookingPage = document.getElementById('bookingPage');
  
  console.log('mainContent element:', mainContent);
  console.log('mainFooter element:', mainFooter);
  console.log('bookingPage element:', bookingPage);
  
  if (!bookingPage) {
    console.error('bookingPage element not found!');
    alert('予約ページが見つかりません。ページを再読み込みしてください。');
    return;
  }
  
  // Hide main content (search form and results)
  if (mainContent) {
    mainContent.classList.add('hidden');
    console.log('mainContent hidden');
  }
  
  // Hide main footer
  if (mainFooter) {
    mainFooter.classList.add('hidden');
    console.log('mainFooter hidden');
  }
  
  // Show booking page
  bookingPage.classList.remove('hidden');
  console.log('bookingPage visible');
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Generate flight summary
  try {
    generateFlightSummary();
    console.log('Flight summary generated');
  } catch (error) {
    console.error('Error generating flight summary:', error);
  }
  
  // Generate seat maps
  try {
    generateSeatMap('outbound');
    generateSeatMap('return');
    console.log('Seat maps generated');
  } catch (error) {
    console.error('Error generating seat maps:', error);
  }
  
  // Generate passenger forms
  try {
    generatePassengerForms();
    console.log('Passenger forms generated');
  } catch (error) {
    console.error('Error generating passenger forms:', error);
  }
  
  // Update total passengers count
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;
  const totalPassengersCountEl = document.getElementById('totalPassengersCount');
  const requiredSeatsEl = document.getElementById('requiredSeats');
  
  if (totalPassengersCountEl) totalPassengersCountEl.textContent = totalPassengers;
  if (requiredSeatsEl) requiredSeatsEl.textContent = totalPassengers;
  
  // Update final total price (multiply by number of passengers)
  updateFinalTotalPrice();
  
  console.log('showBookingPage completed');
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
  const btn = document.getElementById('proceedConfirmationBtn');
  if (!btn) return;
  
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
  // Show main content
  const mainContent = document.getElementById('mainContent');
  if (mainContent) {
    mainContent.classList.remove('hidden');
  }
  
  // Show main footer
  const mainFooter = document.getElementById('mainFooter');
  if (mainFooter) {
    mainFooter.classList.remove('hidden');
  }
  
  // Hide booking page
  document.getElementById('bookingPage').classList.add('hidden');
  
  // Reset booking state
  bookingState.selectedSeats = { outbound: [], return: [] };
  
  // Scroll to results
  const searchResults = document.getElementById('searchResults');
  if (searchResults && !searchResults.classList.contains('hidden')) {
    searchResults.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Proceed to confirmation page
function proceedToConfirmation() {
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
  
  // Store data for confirmation
  bookingState.passengers = passengerData;
  bookingState.contact = contactData;
  bookingState.totalPrice = parseInt(document.getElementById('finalTotalPrice').textContent.replace(/[¥,]/g, ''));
  
  // Hide booking page
  document.getElementById('bookingPage').classList.add('hidden');
  
  // Show confirmation page
  const confirmationPage = document.getElementById('confirmationPage');
  confirmationPage.classList.remove('hidden');
  
  // Generate confirmation summary
  generateConfirmationSummary();
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Generate confirmation summary
function generateConfirmationSummary() {
  // Flight summary
  const flightSummary = document.getElementById('confirmationFlightSummary');
  flightSummary.innerHTML = `
    <div class="border-l-4 border-blue-600 pl-4">
      <div class="flex items-center justify-between mb-2">
        <div class="font-semibold text-gray-800">往路便</div>
        <div class="text-blue-600 font-bold">${bookingState.flight.flightNumber}</div>
      </div>
      <div class="text-gray-600 text-sm mb-1">
        ${bookingState.flight.route.fromCity} (${bookingState.flight.route.from}) → 
        ${bookingState.flight.route.toCity} (${bookingState.flight.route.to})
      </div>
      <div class="text-gray-600 text-sm mb-2">座席クラス: ${bookingState.seatClasses.outbound.name}</div>
      <div class="text-gray-600 text-sm">選択座席: ${bookingState.selectedSeats.outbound.join(', ')}</div>
    </div>
    <div class="border-l-4 border-blue-600 pl-4 mt-4">
      <div class="flex items-center justify-between mb-2">
        <div class="font-semibold text-gray-800">復路便</div>
        <div class="text-blue-600 font-bold">${bookingState.flight.flightNumber}</div>
      </div>
      <div class="text-gray-600 text-sm mb-1">
        ${bookingState.flight.route.toCity} (${bookingState.flight.route.to}) → 
        ${bookingState.flight.route.fromCity} (${bookingState.flight.route.from})
      </div>
      <div class="text-gray-600 text-sm mb-2">座席クラス: ${bookingState.seatClasses.return.name}</div>
      <div class="text-gray-600 text-sm">選択座席: ${bookingState.selectedSeats.return.join(', ')}</div>
    </div>
  `;
  
  // Passenger summary
  const passengerSummary = document.getElementById('confirmationPassengerSummary');
  passengerSummary.innerHTML = bookingState.passengers.map((p, index) => `
    <div class="border-l-4 border-green-600 pl-4 mb-3">
      <div class="font-semibold text-gray-800 mb-1">乗客 ${index + 1}</div>
      <div class="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>氏名: ${p.lastName} ${p.firstName}</div>
        <div>性別: ${p.gender === 'male' ? '男性' : p.gender === 'female' ? '女性' : 'その他'}</div>
        <div>生年月日: ${p.dob}</div>
        <div>パスポート: ${p.passport}</div>
        <div>国籍: ${p.nationality}</div>
      </div>
    </div>
  `).join('');
  
  // Contact summary
  const contactSummary = document.getElementById('confirmationContactSummary');
  contactSummary.innerHTML = `
    <div class="text-sm text-gray-700">
      <div class="mb-2"><strong>メールアドレス:</strong> ${bookingState.contact.email}</div>
      <div class="mb-2"><strong>電話番号:</strong> ${bookingState.contact.phone}</div>
      ${bookingState.contact.emergencyName ? `<div class="mb-2"><strong>緊急連絡先:</strong> ${bookingState.contact.emergencyName} (${bookingState.contact.emergencyPhone})</div>` : ''}
    </div>
  `;
  
  // Update price
  document.getElementById('confirmationTotalPrice').textContent = `¥${bookingState.totalPrice.toLocaleString()}`;
  document.getElementById('confirmationPassengersCount').textContent = bookingState.passengers.length;
}

// Back to booking page
function backToBooking() {
  document.getElementById('confirmationPage').classList.add('hidden');
  document.getElementById('bookingPage').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Proceed to payment
function proceedToPayment() {
  // Hide confirmation page
  document.getElementById('confirmationPage').classList.add('hidden');
  
  // Show payment page
  const paymentPage = document.getElementById('paymentPage');
  paymentPage.classList.remove('hidden');
  
  // Calculate price breakdown
  const flightPrice = Math.floor(bookingState.totalPrice * 0.85);
  const seatUpgrade = Math.floor(bookingState.totalPrice * 0.05);
  const taxes = bookingState.totalPrice - flightPrice - seatUpgrade;
  
  // Update payment page
  document.getElementById('paymentFlightPrice').textContent = `¥${flightPrice.toLocaleString()}`;
  document.getElementById('paymentSeatUpgrade').textContent = `¥${seatUpgrade.toLocaleString()}`;
  document.getElementById('paymentTaxes').textContent = `¥${taxes.toLocaleString()}`;
  document.getElementById('paymentTotalPrice').textContent = `¥${bookingState.totalPrice.toLocaleString()}`;
  document.getElementById('paymentButtonText').textContent = `¥${bookingState.totalPrice.toLocaleString()} を支払う`;
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Back to confirmation page
function backToConfirmation() {
  document.getElementById('paymentPage').classList.add('hidden');
  document.getElementById('confirmationPage').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Complete booking
function completeBooking() {
  // Validate payment form
  const form = document.getElementById('paymentForm');
  if (!form.checkValidity()) {
    alert('すべての必須項目を入力してください。');
    form.reportValidity();
    return;
  }
  
  // Show loading
  const btn = event.target;
  const originalText = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>処理中...';
  btn.disabled = true;
  
  // Simulate payment processing
  setTimeout(() => {
    // Generate booking reference
    const reference = 'FL' + Math.random().toString(36).substring(2, 10).toUpperCase();
    bookingState.bookingReference = reference;
    
    // Hide payment page
    document.getElementById('paymentPage').classList.add('hidden');
    
    // Show complete page
    const completePage = document.getElementById('completePage');
    completePage.classList.remove('hidden');
    
    // Update complete page
    document.getElementById('bookingReference').textContent = reference;
    
    // Generate flight summary for complete page
    const flightSummary = document.getElementById('completeFlightSummary');
    flightSummary.innerHTML = `
      <div class="border-l-4 border-blue-600 pl-4">
        <div class="flex items-center justify-between mb-2">
          <div class="font-semibold text-gray-800">往路便</div>
          <div class="text-blue-600 font-bold">${bookingState.flight.flightNumber}</div>
        </div>
        <div class="text-gray-600 text-sm mb-1">
          ${bookingState.flight.route.fromCity} (${bookingState.flight.route.from}) → 
          ${bookingState.flight.route.toCity} (${bookingState.flight.route.to})
        </div>
        <div class="text-gray-600 text-sm mb-2">座席: ${bookingState.selectedSeats.outbound.join(', ')}</div>
      </div>
      <div class="border-l-4 border-blue-600 pl-4 mt-4">
        <div class="flex items-center justify-between mb-2">
          <div class="font-semibold text-gray-800">復路便</div>
          <div class="text-blue-600 font-bold">${bookingState.flight.flightNumber}</div>
        </div>
        <div class="text-gray-600 text-sm mb-1">
          ${bookingState.flight.route.toCity} (${bookingState.flight.route.to}) → 
          ${bookingState.flight.route.fromCity} (${bookingState.flight.route.from})
        </div>
        <div class="text-gray-600 text-sm mb-2">座席: ${bookingState.selectedSeats.return.join(', ')}</div>
      </div>
      <div class="mt-4 pt-4 border-t border-gray-200">
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-800">お支払い金額</span>
          <span class="text-2xl font-bold text-blue-600">¥${bookingState.totalPrice.toLocaleString()}</span>
        </div>
      </div>
    `;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('Booking completed:', bookingState);
  }, 2000);
}

// Download ticket (dummy)
function downloadTicket() {
  alert(
    `予約確認書\n\n` +
    `予約番号: ${bookingState.bookingReference}\n` +
    `フライト: ${bookingState.flight.flightNumber}\n` +
    `乗客数: ${bookingState.passengers.length}名\n` +
    `合計金額: ¥${bookingState.totalPrice.toLocaleString()}\n\n` +
    `※ 実際の実装では、PDFファイルがダウンロードされます。`
  );
}

// Return to search
function returnToSearch() {
  // Hide complete page
  document.getElementById('completePage').classList.add('hidden');
  
  // Show main content and footer
  const mainContent = document.getElementById('mainContent');
  const mainFooter = document.getElementById('mainFooter');
  if (mainContent) mainContent.classList.remove('hidden');
  if (mainFooter) mainFooter.classList.remove('hidden');
  
  // Reset booking state
  bookingState.flight = null;
  bookingState.seatClasses = { outbound: null, return: null };
  bookingState.selectedSeats = { outbound: [], return: [] };
  bookingState.passengers = [];
  bookingState.contact = null;
  bookingState.totalPrice = 0;
  bookingState.bookingReference = null;
  
  // Clear search results
  const searchResults = document.getElementById('searchResults');
  if (searchResults) searchResults.classList.add('hidden');
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

// ============================================
// Authentication & Registration Functions
// ============================================

// User session state
let userSession = {
  isAuthenticated: false,
  isGuest: false,
  email: null,
  userId: null
};

// User profile data (mock)
let userProfile = {
  email: 'user@example.com',
  lastName: '山田',
  firstName: '太郎',
  phone: '090-1234-5678',
  dob: '1990-01-01',
  gender: 'male',
  passport: 'AB1234567',
  nationality: '日本'
};

// Mock booking data
let mockBookings = [
  {
    id: 'BK2026021001',
    status: 'confirmed',
    statusText: '予約確認済み',
    bookingDate: '2026-02-08',
    flight: {
      outbound: {
        flightNumber: 'AA101',
        airline: 'American Airlines',
        airlineCode: 'AA',
        from: '東京 (NRT)',
        to: 'ニューヨーク (JFK)',
        date: '2026-03-15',
        departureTime: '10:00',
        arrivalTime: '08:30',
        duration: '13時間30分',
        seatClass: 'ビジネス',
        seat: '5A'
      },
      return: {
        flightNumber: 'AA102',
        airline: 'American Airlines',
        airlineCode: 'AA',
        from: 'ニューヨーク (JFK)',
        to: '東京 (NRT)',
        date: '2026-03-22',
        departureTime: '14:00',
        arrivalTime: '17:30+1',
        duration: '14時間30分',
        seatClass: 'ビジネス',
        seat: '5B'
      }
    },
    passengers: [
      {
        lastName: '山田',
        firstName: '太郎',
        gender: '男性',
        dob: '1990-01-01',
        passport: 'AB1234567',
        nationality: '日本'
      }
    ],
    contact: {
      email: 'user@example.com',
      phone: '090-1234-5678'
    },
    pricing: {
      basePrice: 280000,
      seatUpgrade: 60000,
      taxFees: 15000,
      total: 355000
    }
  },
  {
    id: 'BK2026020502',
    status: 'confirmed',
    statusText: '予約確認済み',
    bookingDate: '2026-02-03',
    flight: {
      outbound: {
        flightNumber: 'NH009',
        airline: 'ANA',
        airlineCode: 'NH',
        from: '東京 (HND)',
        to: 'ロサンゼルス (LAX)',
        date: '2026-04-10',
        departureTime: '17:00',
        arrivalTime: '10:30',
        duration: '10時間30分',
        seatClass: 'プレミアムエコノミー',
        seat: '15C'
      },
      return: {
        flightNumber: 'NH010',
        airline: 'ANA',
        airlineCode: 'NH',
        from: 'ロサンゼルス (LAX)',
        to: '東京 (HND)',
        date: '2026-04-20',
        departureTime: '11:00',
        arrivalTime: '14:30+1',
        duration: '12時間30分',
        seatClass: 'プレミアムエコノミー',
        seat: '15D'
      }
    },
    passengers: [
      {
        lastName: '山田',
        firstName: '太郎',
        gender: '男性',
        dob: '1990-01-01',
        passport: 'AB1234567',
        nationality: '日本'
      }
    ],
    contact: {
      email: 'user@example.com',
      phone: '090-1234-5678'
    },
    pricing: {
      basePrice: 150000,
      seatUpgrade: 30000,
      taxFees: 12000,
      total: 192000
    }
  },
  {
    id: 'BK2026012003',
    status: 'completed',
    statusText: '利用済み',
    bookingDate: '2025-12-15',
    flight: {
      outbound: {
        flightNumber: 'JL002',
        airline: 'JAL',
        airlineCode: 'JL',
        from: '大阪 (KIX)',
        to: 'サンフランシスコ (SFO)',
        date: '2026-01-15',
        departureTime: '16:30',
        arrivalTime: '09:30',
        duration: '10時間',
        seatClass: 'エコノミー',
        seat: '28A'
      },
      return: {
        flightNumber: 'JL003',
        airline: 'JAL',
        airlineCode: 'JL',
        from: 'サンフランシスコ (SFO)',
        to: '大阪 (KIX)',
        date: '2026-01-25',
        departureTime: '12:00',
        arrivalTime: '15:00+1',
        duration: '11時間',
        seatClass: 'エコノミー',
        seat: '28B'
      }
    },
    passengers: [
      {
        lastName: '山田',
        firstName: '太郎',
        gender: '男性',
        dob: '1990-01-01',
        passport: 'AB1234567',
        nationality: '日本'
      }
    ],
    contact: {
      email: 'user@example.com',
      phone: '090-1234-5678'
    },
    pricing: {
      basePrice: 85000,
      seatUpgrade: 0,
      taxFees: 8000,
      total: 93000
    }
  }
];

let currentBookingDetail = null;

// OTP storage (in production, this would be server-side)
let otpStorage = {
  code: null,
  email: null,
  expiresAt: null
};

// Show authentication selection page
function showAuthSelectionPage() {
  console.log('Showing authentication selection page');
  
  const mainContent = document.getElementById('mainContent');
  const mainFooter = document.getElementById('mainFooter');
  const authSelectionPage = document.getElementById('authSelectionPage');
  
  if (mainContent) mainContent.classList.add('hidden');
  if (mainFooter) mainFooter.classList.add('hidden');
  if (authSelectionPage) {
    authSelectionPage.classList.remove('hidden');
    window.scrollTo(0, 0);
  }
}

// Show registration page
function showRegistrationPage() {
  console.log('Showing registration page');
  
  const authSelectionPage = document.getElementById('authSelectionPage');
  const registrationPage = document.getElementById('registrationPage');
  
  if (authSelectionPage) authSelectionPage.classList.add('hidden');
  if (registrationPage) {
    registrationPage.classList.remove('hidden');
    
    // Reset form
    document.getElementById('registrationEmail').value = '';
    document.getElementById('verificationCode').value = '';
    document.getElementById('emailStep').classList.remove('hidden');
    document.getElementById('otpStep').classList.add('hidden');
    
    window.scrollTo(0, 0);
  }
}

// Show login page
function showLoginPage() {
  console.log('Showing login page');
  
  const authSelectionPage = document.getElementById('authSelectionPage');
  const loginPage = document.getElementById('loginPage');
  
  if (authSelectionPage) authSelectionPage.classList.add('hidden');
  if (loginPage) {
    loginPage.classList.remove('hidden');
    
    // Reset form
    document.getElementById('loginEmail').value = '';
    document.getElementById('loginVerificationCode').value = '';
    document.getElementById('loginEmailStep').classList.remove('hidden');
    document.getElementById('loginOtpStep').classList.add('hidden');
    
    window.scrollTo(0, 0);
  }
}

// Show booking page as guest
function showBookingPageAsGuest() {
  console.log('Proceeding as guest');
  
  userSession.isGuest = true;
  userSession.isAuthenticated = false;
  
  const authSelectionPage = document.getElementById('authSelectionPage');
  if (authSelectionPage) authSelectionPage.classList.add('hidden');
  
  showBookingPage();
}

// Back to authentication selection
function backToAuthSelection() {
  console.log('Back to auth selection');
  
  const registrationPage = document.getElementById('registrationPage');
  const loginPage = document.getElementById('loginPage');
  const authSelectionPage = document.getElementById('authSelectionPage');
  
  if (registrationPage) registrationPage.classList.add('hidden');
  if (loginPage) loginPage.classList.add('hidden');
  if (authSelectionPage) {
    authSelectionPage.classList.remove('hidden');
    window.scrollTo(0, 0);
  }
}

// Back to flight results from auth selection
function backToFlightResults() {
  console.log('Back to flight results');
  
  const authSelectionPage = document.getElementById('authSelectionPage');
  const mainContent = document.getElementById('mainContent');
  const mainFooter = document.getElementById('mainFooter');
  
  if (authSelectionPage) authSelectionPage.classList.add('hidden');
  if (mainContent) mainContent.classList.remove('hidden');
  if (mainFooter) mainFooter.classList.remove('hidden');
  
  // Scroll to search results
  const searchResults = document.getElementById('searchResults');
  if (searchResults && !searchResults.classList.contains('hidden')) {
    searchResults.scrollIntoView({ behavior: 'smooth' });
  }
}

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send verification code for registration
async function sendVerificationCode() {
  const emailInput = document.getElementById('registrationEmail');
  const email = emailInput.value.trim();
  
  // Validate email
  if (!email) {
    alert('メールアドレスを入力してください。');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('有効なメールアドレスを入力してください。');
    return;
  }
  
  // Generate OTP
  const otp = generateOTP();
  
  // Store OTP (expires in 10 minutes)
  otpStorage.code = otp;
  otpStorage.email = email;
  otpStorage.expiresAt = Date.now() + 10 * 60 * 1000;
  
  console.log('Generated OTP:', otp, 'for email:', email);
  
  // Mock email sending
  try {
    const result = await sendEmailMock(email, otp, 'registration');
    
    if (result.success) {
      // Show OTP step
      document.getElementById('emailStep').classList.add('hidden');
      document.getElementById('otpStep').classList.remove('hidden');
      document.getElementById('sentToEmail').textContent = email;
      
      // Show success message
      alert(`確認コードを送信しました。\n\n【モック表示】\nメール: ${email}\n確認コード: ${otp}\n\n実際の運用では、このコードはメールで送信されます。`);
    }
  } catch (error) {
    console.error('Error sending verification code:', error);
    alert('確認コードの送信に失敗しました。もう一度お試しください。');
  }
}

// Verify OTP for registration
function verifyCode() {
  const codeInput = document.getElementById('verificationCode');
  const code = codeInput.value.trim();
  
  // Validate input
  if (!code || code.length !== 6) {
    alert('6桁の確認コードを入力してください。');
    return;
  }
  
  // Check if OTP expired
  if (Date.now() > otpStorage.expiresAt) {
    alert('確認コードの有効期限が切れました。新しいコードを送信してください。');
    return;
  }
  
  // Verify OTP
  if (code === otpStorage.code) {
    console.log('OTP verified successfully for:', otpStorage.email);
    
    // Set user session
    userSession.isAuthenticated = true;
    userSession.isGuest = false;
    userSession.email = otpStorage.email;
    userSession.userId = 'user_' + Date.now(); // Mock user ID
    
    // Update profile with email
    userProfile.email = otpStorage.email;
    
    // Update header
    updateHeaderAuth();
    
    // Clear OTP
    otpStorage = { code: null, email: null, expiresAt: null };
    
    // Show success and proceed to booking
    alert('会員登録が完了しました！\n予約を続けます。');
    
    const registrationPage = document.getElementById('registrationPage');
    if (registrationPage) registrationPage.classList.add('hidden');
    
    showBookingPage();
  } else {
    alert('確認コードが正しくありません。もう一度お試しください。');
  }
}

// Resend verification code
function resendVerificationCode() {
  if (otpStorage.email) {
    sendVerificationCode();
  }
}

// Sign in with Google (Mock implementation)
async function signInWithGoogle() {
  console.log('Sign in with Google initiated');
  
  // Show loading message
  const loadingMessage = 'Googleアカウントでサインインしています...';
  
  // Mock Google OAuth flow
  // In production, this would use Google Sign-In SDK or OAuth2
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock Google user data
    const mockGoogleUser = {
      email: 'user@gmail.com',
      name: 'Google User',
      givenName: 'User',
      familyName: 'Google',
      picture: 'https://via.placeholder.com/96',
      sub: 'google_' + Date.now() // Google user ID
    };
    
    console.log('Google Sign-in successful:', mockGoogleUser);
    
    // Set user session
    userSession.isAuthenticated = true;
    userSession.isGuest = false;
    userSession.email = mockGoogleUser.email;
    userSession.userId = mockGoogleUser.sub;
    userSession.name = mockGoogleUser.name;
    userSession.provider = 'google';
    
    // Update user profile
    userProfile.email = mockGoogleUser.email;
    userProfile.lastName = mockGoogleUser.familyName;
    userProfile.firstName = mockGoogleUser.givenName;
    
    // Store in sessionStorage
    sessionStorage.setItem('userSession', JSON.stringify(userSession));
    sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // Show success message
    alert(`Googleアカウントでサインインしました。\n\n【モック表示】\nメール: ${mockGoogleUser.email}\n名前: ${mockGoogleUser.name}\n\n実際の運用では、Google OAuth2を使用します。`);
    
    // Close auth pages and show booking page
    const registrationPage = document.getElementById('registrationPage');
    const loginPage = document.getElementById('loginPage');
    const authSelectionPage = document.getElementById('authSelectionPage');
    
    if (registrationPage) registrationPage.classList.add('hidden');
    if (loginPage) loginPage.classList.add('hidden');
    if (authSelectionPage) authSelectionPage.classList.add('hidden');
    
    showBookingPage();
    
  } catch (error) {
    console.error('Error signing in with Google:', error);
    alert('Googleサインインに失敗しました。もう一度お試しください。');
  }
}

// Send login code
async function sendLoginCode() {
  const emailInput = document.getElementById('loginEmail');
  const email = emailInput.value.trim();
  
  // Validate email
  if (!email) {
    alert('メールアドレスを入力してください。');
    return;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('有効なメールアドレスを入力してください。');
    return;
  }
  
  // Check if user exists (mock check)
  // In production, this would be a backend API call
  console.log('Checking if user exists:', email);
  
  // Generate OTP
  const otp = generateOTP();
  
  // Store OTP
  otpStorage.code = otp;
  otpStorage.email = email;
  otpStorage.expiresAt = Date.now() + 10 * 60 * 1000;
  
  console.log('Generated login OTP:', otp, 'for email:', email);
  
  // Mock email sending
  try {
    const result = await sendEmailMock(email, otp, 'login');
    
    if (result.success) {
      // Show OTP step
      document.getElementById('loginEmailStep').classList.add('hidden');
      document.getElementById('loginOtpStep').classList.remove('hidden');
      document.getElementById('loginSentToEmail').textContent = email;
      
      // Show success message
      alert(`確認コードを送信しました。\n\n【モック表示】\nメール: ${email}\n確認コード: ${otp}\n\n実際の運用では、このコードはメールで送信されます。`);
    }
  } catch (error) {
    console.error('Error sending login code:', error);
    alert('確認コードの送信に失敗しました。もう一度お試しください。');
  }
}

// Verify login code
function verifyLoginCode() {
  const codeInput = document.getElementById('loginVerificationCode');
  const code = codeInput.value.trim();
  
  // Validate input
  if (!code || code.length !== 6) {
    alert('6桁の確認コードを入力してください。');
    return;
  }
  
  // Check if OTP expired
  if (Date.now() > otpStorage.expiresAt) {
    alert('確認コードの有効期限が切れました。新しいコードを送信してください。');
    return;
  }
  
  // Verify OTP
  if (code === otpStorage.code) {
    console.log('Login successful for:', otpStorage.email);
    
    // Set user session
    userSession.isAuthenticated = true;
    userSession.isGuest = false;
    userSession.email = otpStorage.email;
    userSession.userId = 'user_' + Date.now(); // Mock user ID
    
    // Update header
    updateHeaderAuth();
    
    // Clear OTP
    otpStorage = { code: null, email: null, expiresAt: null };
    
    // Show success and proceed to booking
    alert('ログインしました！\n予約を続けます。');
    
    const loginPage = document.getElementById('loginPage');
    if (loginPage) loginPage.classList.add('hidden');
    
    showBookingPage();
  } else {
    alert('確認コードが正しくありません。もう一度お試しください。');
  }
}

// Resend login code
function resendLoginCode() {
  if (otpStorage.email) {
    sendLoginCode();
  }
}

// Mock email sending function
async function sendEmailMock(email, otp, type) {
  console.log('=== MOCK EMAIL SENT ===');
  console.log('To:', email);
  console.log('Type:', type === 'registration' ? '会員登録' : 'ログイン');
  console.log('OTP Code:', otp);
  console.log('Sent at:', new Date().toLocaleString('ja-JP'));
  console.log('Expires at:', new Date(Date.now() + 10 * 60 * 1000).toLocaleString('ja-JP'));
  console.log('=======================');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock email content
  const emailContent = `
    件名: ${type === 'registration' ? '[FlightSearch] 会員登録の確認コード' : '[FlightSearch] ログイン確認コード'}
    
    ${email} 様
    
    FlightSearch をご利用いただき、ありがとうございます。
    
    以下の確認コードを入力して、${type === 'registration' ? '会員登録' : 'ログイン'}を完了してください。
    
    確認コード: ${otp}
    
    このコードは10分間有効です。
    
    このメールに心当たりがない場合は、無視してください。
    
    FlightSearch サポートチーム
  `;
  
  console.log('Email content:', emailContent);
  
  return {
    success: true,
    messageId: 'mock_' + Date.now()
  };
}

// ============================================
// My Page Functions
// ============================================

// Show My Page
function showMyPage() {
  console.log('Showing My Page');
  
  // Check if user is authenticated
  if (!userSession.isAuthenticated) {
    alert('マイページを利用するにはログインが必要です。');
    showLoginPage();
    return;
  }
  
  const mainContent = document.getElementById('mainContent');
  const mainFooter = document.getElementById('mainFooter');
  const myPage = document.getElementById('myPage');
  
  if (mainContent) mainContent.classList.add('hidden');
  if (mainFooter) mainFooter.classList.add('hidden');
  if (myPage) {
    myPage.classList.remove('hidden');
    
    // Update user email display
    const myPageUserEmail = document.getElementById('myPageUserEmail');
    if (myPageUserEmail) {
      myPageUserEmail.textContent = `ログイン中: ${userSession.email}`;
    }
    
    // Load bookings
    loadBookingsList();
    
    // Load profile
    loadUserProfile();
    
    // Show bookings tab by default
    switchMyPageTab('bookings');
    
    window.scrollTo(0, 0);
  }
}

// Show Home Page
function showHomePage() {
  console.log('Showing Home Page');
  
  const mainContent = document.getElementById('mainContent');
  const mainFooter = document.getElementById('mainFooter');
  const myPage = document.getElementById('myPage');
  
  if (myPage) myPage.classList.add('hidden');
  if (mainContent) mainContent.classList.remove('hidden');
  if (mainFooter) mainFooter.classList.remove('hidden');
  
  window.scrollTo(0, 0);
}

// Back to Home from My Page
function backToHome() {
  showHomePage();
}

// Handle Logout
function handleLogout() {
  if (confirm('ログアウトしてもよろしいですか？')) {
    userSession = {
      isAuthenticated: false,
      isGuest: false,
      email: null,
      userId: null
    };
    
    // Update header
    updateHeaderAuth();
    
    alert('ログアウトしました。');
    showHomePage();
  }
}

// Update header authentication state
function updateHeaderAuth() {
  const myPageLink = document.getElementById('myPageLink');
  const logoutLink = document.getElementById('logoutLink');
  
  if (userSession.isAuthenticated) {
    if (myPageLink) myPageLink.classList.remove('hidden');
    if (logoutLink) logoutLink.classList.remove('hidden');
  } else {
    if (myPageLink) myPageLink.classList.add('hidden');
    if (logoutLink) logoutLink.classList.add('hidden');
  }
}

// Switch My Page Tab
function switchMyPageTab(tab) {
  console.log('Switching to tab:', tab);
  
  // Update tab buttons
  const tabBookings = document.getElementById('tabBookings');
  const tabProfile = document.getElementById('tabProfile');
  
  if (tab === 'bookings') {
    if (tabBookings) {
      tabBookings.classList.add('active');
      tabProfile.classList.remove('active');
    }
  } else if (tab === 'profile') {
    if (tabProfile) {
      tabProfile.classList.add('active');
      tabBookings.classList.remove('active');
    }
  }
  
  // Update tab content
  const bookingsTab = document.getElementById('bookingsTab');
  const profileTab = document.getElementById('profileTab');
  
  if (tab === 'bookings') {
    if (bookingsTab) bookingsTab.classList.remove('hidden');
    if (profileTab) profileTab.classList.add('hidden');
  } else if (tab === 'profile') {
    if (bookingsTab) bookingsTab.classList.add('hidden');
    if (profileTab) profileTab.classList.remove('hidden');
  }
}

// Load Bookings List
function loadBookingsList() {
  console.log('Loading bookings list');
  
  const bookingsList = document.getElementById('bookingsList');
  if (!bookingsList) return;
  
  if (mockBookings.length === 0) {
    bookingsList.innerHTML = `
      <div class="text-center py-12 text-gray-500">
        <i class="fas fa-inbox text-6xl mb-4"></i>
        <p class="text-lg">予約履歴がありません</p>
      </div>
    `;
    return;
  }
  
  bookingsList.innerHTML = mockBookings.map(booking => {
    const statusClass = booking.status === 'confirmed' ? 'status-confirmed' : 
                       booking.status === 'cancelled' ? 'status-cancelled' : 
                       'status-completed';
    
    return `
      <div class="booking-card p-6 rounded-xl cursor-pointer" onclick="showBookingDetail('${booking.id}')">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h4 class="text-lg font-bold text-gray-800 mb-1">
              予約番号: ${booking.id}
            </h4>
            <p class="text-sm text-gray-500">予約日: ${booking.bookingDate}</p>
          </div>
          <span class="status-badge ${statusClass}">
            ${booking.statusText}
          </span>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p class="text-sm text-gray-600 mb-1">
              <i class="fas fa-plane-departure text-blue-600 mr-2"></i>
              往路
            </p>
            <p class="font-semibold">${booking.flight.outbound.from} → ${booking.flight.outbound.to}</p>
            <p class="text-sm text-gray-600">${booking.flight.outbound.date} ${booking.flight.outbound.departureTime}</p>
            <p class="text-sm text-gray-600">${booking.flight.outbound.flightNumber} - ${booking.flight.outbound.seatClass}</p>
          </div>
          <div>
            <p class="text-sm text-gray-600 mb-1">
              <i class="fas fa-plane-arrival text-blue-600 mr-2"></i>
              復路
            </p>
            <p class="font-semibold">${booking.flight.return.from} → ${booking.flight.return.to}</p>
            <p class="text-sm text-gray-600">${booking.flight.return.date} ${booking.flight.return.departureTime}</p>
            <p class="text-sm text-gray-600">${booking.flight.return.flightNumber} - ${booking.flight.return.seatClass}</p>
          </div>
        </div>
        
        <div class="flex justify-between items-center pt-4 border-t border-gray-200">
          <p class="text-sm text-gray-600">
            乗客数: ${booking.passengers.length}名
          </p>
          <p class="text-xl font-bold text-blue-600">
            ¥${booking.pricing.total.toLocaleString()}
          </p>
        </div>
      </div>
    `;
  }).join('');
}

// Show Booking Detail
function showBookingDetail(bookingId) {
  console.log('Showing booking detail:', bookingId);
  
  const booking = mockBookings.find(b => b.id === bookingId);
  if (!booking) {
    alert('予約情報が見つかりません。');
    return;
  }
  
  currentBookingDetail = booking;
  
  const modal = document.getElementById('bookingDetailModal');
  const content = document.getElementById('bookingDetailContent');
  const cancelBtn = document.getElementById('cancelBookingBtn');
  
  if (!modal || !content) return;
  
  // Hide cancel button if booking is cancelled or completed
  if (cancelBtn) {
    if (booking.status === 'cancelled' || booking.status === 'completed') {
      cancelBtn.classList.add('hidden');
    } else {
      cancelBtn.classList.remove('hidden');
    }
  }
  
  const statusClass = booking.status === 'confirmed' ? 'status-confirmed' : 
                     booking.status === 'cancelled' ? 'status-cancelled' : 
                     'status-completed';
  
  content.innerHTML = `
    <div class="space-y-6">
      <!-- Status -->
      <div class="flex justify-between items-center">
        <div>
          <h4 class="text-xl font-bold text-gray-800">予約番号: ${booking.id}</h4>
          <p class="text-sm text-gray-500">予約日: ${booking.bookingDate}</p>
        </div>
        <span class="status-badge ${statusClass}">
          ${booking.statusText}
        </span>
      </div>
      
      <!-- Flight Information -->
      <div class="bg-blue-50 p-4 rounded-lg">
        <h5 class="font-bold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-plane text-blue-600 mr-2"></i>
          フライト情報
        </h5>
        
        <div class="space-y-4">
          <!-- Outbound -->
          <div class="bg-white p-4 rounded-lg">
            <p class="text-sm text-gray-600 mb-2">
              <i class="fas fa-plane-departure text-blue-600 mr-2"></i>
              往路
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="font-semibold text-lg">${booking.flight.outbound.from} → ${booking.flight.outbound.to}</p>
                <p class="text-sm text-gray-600">${booking.flight.outbound.date}</p>
                <p class="text-sm text-gray-600">${booking.flight.outbound.departureTime} - ${booking.flight.outbound.arrivalTime}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">便名: ${booking.flight.outbound.flightNumber}</p>
                <p class="text-sm text-gray-600">航空会社: ${booking.flight.outbound.airline}</p>
                <p class="text-sm text-gray-600">座席クラス: ${booking.flight.outbound.seatClass}</p>
                <p class="text-sm text-gray-600">座席番号: ${booking.flight.outbound.seat}</p>
                <p class="text-sm text-gray-600">所要時間: ${booking.flight.outbound.duration}</p>
              </div>
            </div>
          </div>
          
          <!-- Return -->
          <div class="bg-white p-4 rounded-lg">
            <p class="text-sm text-gray-600 mb-2">
              <i class="fas fa-plane-arrival text-blue-600 mr-2"></i>
              復路
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p class="font-semibold text-lg">${booking.flight.return.from} → ${booking.flight.return.to}</p>
                <p class="text-sm text-gray-600">${booking.flight.return.date}</p>
                <p class="text-sm text-gray-600">${booking.flight.return.departureTime} - ${booking.flight.return.arrivalTime}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">便名: ${booking.flight.return.flightNumber}</p>
                <p class="text-sm text-gray-600">航空会社: ${booking.flight.return.airline}</p>
                <p class="text-sm text-gray-600">座席クラス: ${booking.flight.return.seatClass}</p>
                <p class="text-sm text-gray-600">座席番号: ${booking.flight.return.seat}</p>
                <p class="text-sm text-gray-600">所要時間: ${booking.flight.return.duration}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Passenger Information -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h5 class="font-bold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-users text-blue-600 mr-2"></i>
          乗客情報
        </h5>
        ${booking.passengers.map((passenger, index) => `
          <div class="bg-white p-4 rounded-lg mb-2">
            <p class="font-semibold mb-2">乗客 ${index + 1}</p>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <p class="text-gray-600">氏名: ${passenger.lastName} ${passenger.firstName}</p>
              <p class="text-gray-600">性別: ${passenger.gender}</p>
              <p class="text-gray-600">生年月日: ${passenger.dob}</p>
              <p class="text-gray-600">国籍: ${passenger.nationality}</p>
              <p class="text-gray-600">パスポート番号: ${passenger.passport}</p>
            </div>
          </div>
        `).join('')}
      </div>
      
      <!-- Contact Information -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h5 class="font-bold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-envelope text-blue-600 mr-2"></i>
          連絡先情報
        </h5>
        <div class="bg-white p-4 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p class="text-gray-600">メールアドレス: ${booking.contact.email}</p>
            <p class="text-gray-600">電話番号: ${booking.contact.phone}</p>
          </div>
        </div>
      </div>
      
      <!-- Pricing -->
      <div class="bg-blue-50 p-4 rounded-lg">
        <h5 class="font-bold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-credit-card text-blue-600 mr-2"></i>
          料金詳細
        </h5>
        <div class="bg-white p-4 rounded-lg space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">基本料金:</span>
            <span class="font-semibold">¥${booking.pricing.basePrice.toLocaleString()}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">座席アップグレード:</span>
            <span class="font-semibold">¥${booking.pricing.seatUpgrade.toLocaleString()}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">税金・手数料:</span>
            <span class="font-semibold">¥${booking.pricing.taxFees.toLocaleString()}</span>
          </div>
          <div class="border-t border-gray-200 pt-2 flex justify-between">
            <span class="font-bold text-lg">合計:</span>
            <span class="font-bold text-xl text-blue-600">¥${booking.pricing.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  `;
  
  modal.classList.remove('hidden');
}

// Close Booking Detail Modal
function closeBookingDetailModal() {
  const modal = document.getElementById('bookingDetailModal');
  if (modal) modal.classList.add('hidden');
  currentBookingDetail = null;
}

// Show Cancel Confirmation
function showCancelConfirmation() {
  const modal = document.getElementById('cancelConfirmModal');
  if (modal) modal.classList.remove('hidden');
}

// Close Cancel Confirmation
function closeCancelConfirmation() {
  const modal = document.getElementById('cancelConfirmModal');
  if (modal) modal.classList.add('hidden');
}

// Confirm Cancel Booking
function confirmCancelBooking() {
  if (!currentBookingDetail) return;
  
  console.log('Cancelling booking:', currentBookingDetail.id);
  
  // Update booking status
  const booking = mockBookings.find(b => b.id === currentBookingDetail.id);
  if (booking) {
    booking.status = 'cancelled';
    booking.statusText = 'キャンセル済み';
  }
  
  // Close modals
  closeCancelConfirmation();
  closeBookingDetailModal();
  
  // Reload bookings list
  loadBookingsList();
  
  alert('予約をキャンセルしました。\nキャンセル確認メールを送信しました。');
}

// Load User Profile
function loadUserProfile() {
  console.log('Loading user profile');
  
  document.getElementById('profileEmail').value = userProfile.email;
  document.getElementById('profileLastName').value = userProfile.lastName;
  document.getElementById('profileFirstName').value = userProfile.firstName;
  document.getElementById('profilePhone').value = userProfile.phone;
  document.getElementById('profileDob').value = userProfile.dob;
  document.getElementById('profileGender').value = userProfile.gender;
  document.getElementById('profilePassport').value = userProfile.passport;
  document.getElementById('profileNationality').value = userProfile.nationality;
}

// Cancel Profile Edit
function cancelProfileEdit() {
  if (confirm('変更を破棄してもよろしいですか？')) {
    loadUserProfile();
  }
}

// Handle Profile Form Submit
document.addEventListener('DOMContentLoaded', function() {
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate required fields
      const lastName = document.getElementById('profileLastName').value.trim();
      const firstName = document.getElementById('profileFirstName').value.trim();
      const phone = document.getElementById('profilePhone').value.trim();
      const dob = document.getElementById('profileDob').value;
      const gender = document.getElementById('profileGender').value;
      
      if (!lastName || !firstName || !phone || !dob || !gender) {
        alert('必須項目を入力してください。');
        return;
      }
      
      // Update user profile
      userProfile.lastName = lastName;
      userProfile.firstName = firstName;
      userProfile.phone = phone;
      userProfile.dob = dob;
      userProfile.gender = gender;
      userProfile.passport = document.getElementById('profilePassport').value.trim();
      userProfile.nationality = document.getElementById('profileNationality').value.trim();
      
      console.log('Profile updated:', userProfile);
      
      alert('会員情報を更新しました。');
    });
  }
});
