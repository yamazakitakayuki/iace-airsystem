import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header class="bg-blue-600 text-white shadow-lg flex-shrink-0">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <i class="fas fa-plane text-3xl"></i>
              <h1 class="text-2xl font-bold">FlightSearch</h1>
            </div>
            <nav class="hidden md:flex space-x-6">
              <a href="/" onclick="showHomePage(); return false;" class="hover:text-blue-200 transition">ホーム</a>
              <a href="#" onclick="showMyPage(); return false;" class="hover:text-blue-200 transition" id="myPageLink">
                <i class="fas fa-user mr-1"></i>
                マイページ
              </a>
              <a href="#" onclick="handleLogout(); return false;" class="hover:text-blue-200 transition hidden" id="logoutLink">
                <i class="fas fa-sign-out-alt mr-1"></i>
                ログアウト
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="mainContent" class="flex-grow">
        <div class="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div class="text-center mb-8">
            <h2 class="text-4xl font-bold text-gray-800 mb-2">お得な航空券を検索</h2>
            <p class="text-gray-600">世界中のフライトを比較して、最安値を見つけましょう</p>
          </div>

          {/* Search Form */}
          <div class="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-8">
          {/* Trip Type Selection */}
          <div class="flex flex-wrap gap-4 mb-6">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="tripType" value="roundtrip" checked class="w-4 h-4 text-blue-600" onchange="handleTripTypeChange()" />
              <span class="text-gray-700 font-medium">往復</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="tripType" value="oneway" class="w-4 h-4 text-blue-600" onchange="handleTripTypeChange()" />
              <span class="text-gray-700 font-medium">片道</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="tripType" value="multicity" class="w-4 h-4 text-blue-600" onchange="handleTripTypeChange()" />
              <span class="text-gray-700 font-medium">複数都市</span>
            </label>
          </div>

          {/* Single/Round Trip Search Fields */}
          <div id="singleTripFields">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {/* From */}
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">出発地</label>
                <div class="relative">
                  <i class="fas fa-plane-departure absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="fromLocation"
                    placeholder="東京 (TYO)" 
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* To */}
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">目的地</label>
                <div class="relative">
                  <i class="fas fa-plane-arrival absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="text" 
                    id="toLocation"
                    placeholder="ニューヨーク (JFK)" 
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Departure Date */}
              <div class="relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">出発日</label>
                <div class="relative">
                  <i class="fas fa-calendar-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="date" 
                    id="departureDate"
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Return Date */}
              <div class="relative" id="returnDateField">
                <label class="block text-sm font-medium text-gray-700 mb-2">帰国日</label>
                <div class="relative">
                  <i class="fas fa-calendar-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input 
                    type="date" 
                    id="returnDate"
                    class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Multi-City Search Fields */}
          <div id="multiCityFields" class="hidden">
            <div id="multiCityFlightsContainer">
              {/* Flight 1 */}
              <div class="multi-city-flight mb-4 p-4 border border-gray-200 rounded-lg" data-flight-index="1">
                <div class="flex justify-between items-center mb-3">
                  <h4 class="font-semibold text-gray-800">フライト 1</h4>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 mb-2">出発地</label>
                    <div class="relative">
                      <i class="fas fa-plane-departure absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input 
                        type="text" 
                        id="multiCityFrom1"
                        class="multi-city-from w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="東京 (TYO)"
                      />
                    </div>
                  </div>
                  <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 mb-2">目的地</label>
                    <div class="relative">
                      <i class="fas fa-plane-arrival absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input 
                        type="text" 
                        id="multiCityTo1"
                        class="multi-city-to w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ニューヨーク (JFK)"
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
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Flight 2 */}
              <div class="multi-city-flight mb-4 p-4 border border-gray-200 rounded-lg" data-flight-index="2">
                <div class="flex justify-between items-center mb-3">
                  <h4 class="font-semibold text-gray-800">フライト 2</h4>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 mb-2">出発地</label>
                    <div class="relative">
                      <i class="fas fa-plane-departure absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input 
                        type="text" 
                        id="multiCityFrom2"
                        class="multi-city-from w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ニューヨーク (JFK)"
                      />
                    </div>
                  </div>
                  <div class="relative">
                    <label class="block text-sm font-medium text-gray-700 mb-2">目的地</label>
                    <div class="relative">
                      <i class="fas fa-plane-arrival absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input 
                        type="text" 
                        id="multiCityTo2"
                        class="multi-city-to w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="ロサンゼルス (LAX)"
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
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Flight Button */}
            <button 
              type="button"
              onclick="addMultiCityFlight()"
              class="w-full md:w-auto px-6 py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition font-medium"
            >
              <i class="fas fa-plus mr-2"></i>
              フライトを追加
            </button>
          </div>

          {/* Passengers, Class, and Airline */}
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 mt-6">
            {/* Passengers */}
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-2">乗客</label>
              <button 
                type="button" 
                id="passengerButton"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <span class="flex items-center">
                  <i class="fas fa-user mr-2 text-gray-400"></i>
                  <span id="passengerDisplay">1 名, エコノミー</span>
                </span>
                <i class="fas fa-chevron-down text-gray-400"></i>
              </button>
              
              {/* Passenger Dropdown */}
              <div id="passengerDropdown" class="hidden absolute z-10 mt-2 w-full md:w-96 bg-white border border-gray-200 rounded-lg shadow-xl p-4">
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium text-gray-700">大人</div>
                      <div class="text-sm text-gray-500">12歳以上</div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <button type="button" class="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100" onclick="updatePassenger('adults', -1)">-</button>
                      <span id="adultsCount" class="w-8 text-center font-medium">1</span>
                      <button type="button" class="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100" onclick="updatePassenger('adults', 1)">+</button>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium text-gray-700">子供</div>
                      <div class="text-sm text-gray-500">2-11歳</div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <button type="button" class="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100" onclick="updatePassenger('children', -1)">-</button>
                      <span id="childrenCount" class="w-8 text-center font-medium">0</span>
                      <button type="button" class="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100" onclick="updatePassenger('children', 1)">+</button>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium text-gray-700">幼児</div>
                      <div class="text-sm text-gray-500">2歳未満</div>
                    </div>
                    <div class="flex items-center space-x-3">
                      <button type="button" class="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100" onclick="updatePassenger('infants', -1)">-</button>
                      <span id="infantsCount" class="w-8 text-center font-medium">0</span>
                      <button type="button" class="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100" onclick="updatePassenger('infants', 1)">+</button>
                    </div>
                  </div>

                  <hr class="my-4" />

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">座席クラス</label>
                    <select id="cabinClass" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="economy">エコノミー</option>
                      <option value="premium_economy">プレミアムエコノミー</option>
                      <option value="business">ビジネス</option>
                      <option value="first">ファースト</option>
                    </select>
                  </div>

                  <button type="button" class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" onclick="closePassengerDropdown()">完了</button>
                </div>
              </div>
            </div>

            {/* Airline Selection */}
            <div class="relative">
              <label class="block text-sm font-medium text-gray-700 mb-2">航空会社</label>
              <div class="relative">
                <i class="fas fa-plane absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input 
                  type="text" 
                  id="preferredAirline"
                  placeholder="すべて" 
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Direct Flights Only */}
            <div class="flex items-end">
              <label class="flex items-center space-x-2 cursor-pointer pb-3">
                <input type="checkbox" id="directFlights" class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" />
                <span class="text-gray-700">直行便のみ</span>
              </label>
            </div>

            {/* Search Button */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 opacity-0">検索</label>
              <button 
                type="button" 
                onclick="searchFlights()"
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl"
              >
                <i class="fas fa-search mr-2"></i>
                フライトを検索
              </button>
            </div>
          </div>
        </div>

        {/* Search Results Section */}
        <div id="searchResults" class="hidden">
          {/* Results Header */}
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">検索結果</h3>
                <p class="text-gray-600" id="routeInfo">東京 (TYO) → ニューヨーク (JFK)</p>
              </div>
              <div class="flex items-center space-x-4">
                <select id="sortBy" class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="best">おすすめ順</option>
                  <option value="price">最安値順</option>
                  <option value="duration">最短時間順</option>
                  <option value="departure">出発時間順</option>
                </select>
              </div>
            </div>
          </div>

          {/* Filters and Results */}
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div class="lg:col-span-1">
              <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h4 class="text-lg font-bold text-gray-800 mb-4">フィルター</h4>

                {/* Price Range */}
                <div class="mb-6">
                  <h5 class="font-semibold text-gray-700 mb-3">価格帯</h5>
                  <div class="space-y-2">
                    <input type="range" min="0" max="500000" step="10000" class="w-full" id="priceRange" />
                    <div class="flex justify-between text-sm text-gray-600">
                      <span>¥0</span>
                      <span id="maxPrice">¥500,000+</span>
                    </div>
                  </div>
                </div>

                {/* Stops */}
                <div class="mb-6">
                  <h5 class="font-semibold text-gray-700 mb-3">経由回数</h5>
                  <div class="space-y-2">
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked />
                      <span class="text-gray-700">直行便</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked />
                      <span class="text-gray-700">1回経由</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked />
                      <span class="text-gray-700">2回以上経由</span>
                    </label>
                  </div>
                </div>

                {/* Departure Time */}
                <div class="mb-6">
                  <h5 class="font-semibold text-gray-700 mb-3">出発時間帯</h5>
                  <div class="grid grid-cols-2 gap-2">
                    <button type="button" class="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-500">
                      <i class="fas fa-sun text-yellow-500"></i> 朝
                    </button>
                    <button type="button" class="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-500">
                      <i class="fas fa-cloud-sun text-orange-500"></i> 昼
                    </button>
                    <button type="button" class="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-500">
                      <i class="fas fa-cloud-moon text-indigo-500"></i> 夕
                    </button>
                    <button type="button" class="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-blue-50 hover:border-blue-500">
                      <i class="fas fa-moon text-blue-900"></i> 夜
                    </button>
                  </div>
                </div>

                {/* Airlines */}
                <div class="mb-6">
                  <h5 class="font-semibold text-gray-700 mb-3">航空会社</h5>
                  <div class="space-y-2 max-h-48 overflow-y-auto">
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked />
                      <span class="text-gray-700 text-sm">全日空 (ANA)</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked />
                      <span class="text-gray-700 text-sm">日本航空 (JAL)</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked />
                      <span class="text-gray-700 text-sm">ユナイテッド航空</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked />
                      <span class="text-gray-700 text-sm">デルタ航空</span>
                    </label>
                    <label class="flex items-center space-x-2">
                      <input type="checkbox" class="w-4 h-4 text-blue-600 rounded" checked />
                      <span class="text-gray-700 text-sm">アメリカン航空</span>
                    </label>
                  </div>
                </div>

                <button type="button" class="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200">
                  フィルターをリセット
                </button>
              </div>
            </div>

            {/* Flight Results */}
            <div class="lg:col-span-3" id="flightList">
              {/* Sample Flight Cards - These will be populated by JavaScript */}
              <div class="space-y-4" id="flightCards">
                {/* Flight cards will be inserted here by JavaScript */}
              </div>
            </div>
          </div>
        </div>
        </div>
      </main>

      {/* Footer for main page */}
      <footer id="mainFooter" class="bg-gray-800 text-white flex-shrink-0 mt-auto">
        <div class="container mx-auto px-4 py-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 class="font-bold text-lg mb-4">FlightSearch</h5>
              <p class="text-gray-400">お得な航空券を簡単検索</p>
            </div>
            <div>
              <h5 class="font-bold text-lg mb-4">リンク</h5>
              <ul class="space-y-2 text-gray-400">
                <li><a href="#" class="hover:text-white">利用規約</a></li>
                <li><a href="#" class="hover:text-white">プライバシーポリシー</a></li>
                <li><a href="#" class="hover:text-white">お問い合わせ</a></li>
              </ul>
            </div>
            <div>
              <h5 class="font-bold text-lg mb-4">フォロー</h5>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook text-2xl"></i></a>
                <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-2xl"></i></a>
                <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-2xl"></i></a>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 FlightSearch. All rights reserved.</p>
            <p class="mt-2 text-sm">
              <a href="https://3001-ixum760vzlh6kn5x9qt8b-dfc00ec5.sandbox.novita.ai" target="_blank" class="text-blue-400 hover:text-blue-300">
                <i class="fas fa-user-shield mr-1"></i>
                管理画面（モック）
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Seat Class Selection Modal */}
      <div id="seatClassModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div class="flex items-center justify-center min-h-screen p-4">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative">
            {/* Modal Header */}
            <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-t-2xl">
              <div class="flex items-center justify-between">
                <h2 id="modalTitle" class="text-2xl font-bold">
                  <span id="modalRouteInfo">東京 → ニューヨーク</span>
                </h2>
                <button 
                  onclick="closeSeatClassModal()" 
                  class="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
                  aria-label="モーダルを閉じる"
                >
                  <i class="fas fa-times text-2xl"></i>
                </button>
              </div>
              <div id="modalFlightInfo" class="mt-2 text-sm opacity-90">
                フライト情報を読み込み中...
              </div>
            </div>

            {/* Modal Body */}
            <div class="p-6 max-h-[70vh] overflow-y-auto">
              {/* Outbound Flight Section */}
              <div class="mb-8">
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <i class="fas fa-plane-departure text-blue-600 mr-2"></i>
                  往路便
                </h3>
                <div id="outboundSeatClasses" class="space-y-3">
                  {/* Seat class options will be inserted here */}
                </div>
              </div>

              {/* Return Flight Section */}
              <div class="mb-6">
                <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <i class="fas fa-plane-arrival text-blue-600 mr-2"></i>
                  復路便
                </h3>
                <div id="returnSeatClasses" class="space-y-3">
                  {/* Seat class options will be inserted here */}
                </div>
              </div>

              {/* Total Price Summary */}
              <div class="bg-blue-50 rounded-lg p-4 mt-6">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-sm text-gray-600">合計金額（1名あたり）</div>
                    <div class="text-xs text-gray-500 mt-1">往復 • 税・手数料込み</div>
                  </div>
                  <div class="text-3xl font-bold text-blue-600" id="modalTotalPrice">¥0</div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div class="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-2xl">
              <div class="flex space-x-4">
                <button 
                  onclick="closeSeatClassModal()" 
                  class="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  キャンセル
                </button>
                <button 
                  onclick="confirmSeatClassSelection()" 
                  class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl"
                  disabled
                  id="confirmSelectionBtn"
                >
                  予約を続ける
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Selection Page */}
      <div id="authSelectionPage" class="hidden fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto z-40">
        <div class="min-h-screen flex items-center justify-center p-4">
          <div class="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
            <h2 class="text-3xl font-bold text-gray-800 mb-2 text-center">
              <i class="fas fa-user-circle text-blue-600 mr-2"></i>
              予約を続ける
            </h2>
            <p class="text-gray-600 text-center mb-8">
              予約を続けるには、会員登録またはログインが必要です
            </p>

            <div class="space-y-4">
              {/* New Registration Button */}
              <button
                onclick="showRegistrationPage()"
                class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group"
              >
                <i class="fas fa-user-plus mr-3 text-xl group-hover:scale-110 transition-transform"></i>
                <span class="text-lg font-semibold">新規登録</span>
              </button>

              {/* Login Button */}
              <button
                onclick="showLoginPage()"
                class="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 px-6 rounded-xl hover:bg-blue-50 transition-all duration-200 flex items-center justify-center group"
              >
                <i class="fas fa-sign-in-alt mr-3 text-xl group-hover:scale-110 transition-transform"></i>
                <span class="text-lg font-semibold">ログイン</span>
              </button>

              {/* Guest Booking Button */}
              <button
                onclick="showBookingPageAsGuest()"
                class="w-full bg-gray-100 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 flex items-center justify-center group"
              >
                <i class="fas fa-user mr-3 text-xl group-hover:scale-110 transition-transform"></i>
                <span class="text-lg font-semibold">ゲストとして予約</span>
              </button>
            </div>

            <div class="mt-6 text-center">
              <button
                onclick="backToFlightResults()"
                class="text-gray-600 hover:text-gray-800 transition"
              >
                <i class="fas fa-arrow-left mr-2"></i>
                戻る
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Page */}
      <div id="registrationPage" class="hidden fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto z-40">
        <div class="min-h-screen flex items-center justify-center p-4">
          <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
              <i class="fas fa-user-plus text-blue-600 mr-2"></i>
              新規会員登録
            </h2>

            {/* Email Input Step */}
            <div id="emailStep">
              <p class="text-gray-600 mb-6 text-center">
                Googleアカウントで登録、または<br/>
                メールアドレスを入力してください。
              </p>
              
              <div class="space-y-4">
                {/* Google Sign-in Button */}
                <button
                  onclick="signInWithGoogle()"
                  class="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-3 font-medium"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Sign in with Google</span>
                </button>

                {/* Divider */}
                <div class="relative flex items-center py-2">
                  <div class="flex-grow border-t border-gray-300"></div>
                  <span class="flex-shrink mx-4 text-gray-500 text-sm">または</span>
                  <div class="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Email Registration */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    id="registrationEmail"
                    placeholder="example@email.com"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onclick="sendVerificationCode()"
                  class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <i class="fas fa-paper-plane mr-2"></i>
                  確認コードを送信
                </button>
              </div>
            </div>

            {/* OTP Verification Step */}
            <div id="otpStep" class="hidden">
              <p class="text-gray-600 mb-2 text-center">
                確認コードを送信しました
              </p>
              <p class="text-sm text-gray-500 mb-6 text-center" id="sentToEmail">
                example@email.com
              </p>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    6桁の確認コード
                  </label>
                  <input
                    type="text"
                    id="verificationCode"
                    placeholder="000000"
                    maxlength="6"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest font-mono"
                  />
                </div>

                <button
                  onclick="verifyCode()"
                  class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <i class="fas fa-check mr-2"></i>
                  確認
                </button>

                <button
                  onclick="resendVerificationCode()"
                  class="w-full text-blue-600 hover:text-blue-800 py-2 text-sm"
                >
                  <i class="fas fa-redo mr-2"></i>
                  確認コードを再送信
                </button>
              </div>
            </div>

            <div class="mt-6 text-center">
              <button
                onclick="backToAuthSelection()"
                class="text-gray-600 hover:text-gray-800 transition"
              >
                <i class="fas fa-arrow-left mr-2"></i>
                戻る
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Login Page */}
      <div id="loginPage" class="hidden fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto z-40">
        <div class="min-h-screen flex items-center justify-center p-4">
          <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">
              <i class="fas fa-sign-in-alt text-blue-600 mr-2"></i>
              ログイン
            </h2>

            <p class="text-gray-600 mb-6 text-center">
              Googleアカウントでログイン、または<br/>
              登録済みのメールアドレスを入力してください。
            </p>
            
            {/* Email Input Step */}
            <div id="loginEmailStep">
              <div class="space-y-4">
                {/* Google Sign-in Button */}
                <button
                  onclick="signInWithGoogle()"
                  class="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center space-x-3 font-medium"
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Sign in with Google</span>
                </button>

                {/* Divider */}
                <div class="relative flex items-center py-2">
                  <div class="flex-grow border-t border-gray-300"></div>
                  <span class="flex-shrink mx-4 text-gray-500 text-sm">または</span>
                  <div class="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Email Login */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    id="loginEmail"
                    placeholder="example@email.com"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onclick="sendLoginCode()"
                  class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <i class="fas fa-paper-plane mr-2"></i>
                  確認コードを送信
                </button>
              </div>
            </div>

            {/* OTP Verification Step */}
            <div id="loginOtpStep" class="hidden">
              <p class="text-gray-600 mb-2 text-center">
                確認コードを送信しました
              </p>
              <p class="text-sm text-gray-500 mb-6 text-center" id="loginSentToEmail">
                example@email.com
              </p>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    6桁の確認コード
                  </label>
                  <input
                    type="text"
                    id="loginVerificationCode"
                    placeholder="000000"
                    maxlength="6"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest font-mono"
                  />
                </div>

                <button
                  onclick="verifyLoginCode()"
                  class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <i class="fas fa-check mr-2"></i>
                  ログイン
                </button>

                <button
                  onclick="resendLoginCode()"
                  class="w-full text-blue-600 hover:text-blue-800 py-2 text-sm"
                >
                  <i class="fas fa-redo mr-2"></i>
                  確認コードを再送信
                </button>
              </div>
            </div>

            <div class="mt-6 text-center">
              <button
                onclick="backToAuthSelection()"
                class="text-gray-600 hover:text-gray-800 transition"
              >
                <i class="fas fa-arrow-left mr-2"></i>
                戻る
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Page */}
      <div id="bookingPage" class="hidden fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto z-40">
        <div class="min-h-screen flex flex-col">
          <div class="container mx-auto px-4 py-8 flex-grow">
          {/* Back Button */}
          <button 
            onclick="backToSearch()" 
            class="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            <i class="fas fa-arrow-left mr-2"></i>
            検索結果に戻る
          </button>

          {/* Booking Header */}
          <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 class="text-3xl font-bold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-ticket-alt text-blue-600 mr-3"></i>
              予約内容の確認
            </h2>
            <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p class="text-sm text-gray-700">
                <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                フライトと座席クラスを選択しました。次に座席を選択し、お客様情報を入力してください。
              </p>
            </div>
          </div>

          {/* Flight Summary */}
          <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-plane text-blue-600 mr-2"></i>
              選択済みフライト情報
            </h3>
            <div id="flightSummary" class="space-y-4">
              {/* Flight summary will be inserted here */}
            </div>
          </div>

          {/* Seat Map Section */}
          <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <i class="fas fa-chair text-blue-600 mr-2"></i>
              座席選択
              <span class="ml-auto text-sm font-normal text-gray-600" id="seatSelectionStatus">
                選択済み: <span id="selectedSeatsCount">0</span> / <span id="requiredSeats">1</span> 座席
              </span>
            </h3>
            
            {/* Seat Map Legend */}
            <div class="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">空</div>
                <span class="text-sm text-gray-700">利用可能</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">選</div>
                <span class="text-sm text-gray-700">選択済み</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gray-400 rounded flex items-center justify-center text-white text-xs font-bold">×</div>
                <span class="text-sm text-gray-700">利用不可</span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold">特</div>
                <span class="text-sm text-gray-700">特別席（追加料金）</span>
              </div>
            </div>

            {/* Aircraft Map Container */}
            <div class="aircraftmap_container mb-6">
              <div class="od-aircraftmap-map-wrapper">
                {/* Outbound Flight Seat Map */}
                <div class="mb-8">
                  <h4 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-plane-departure text-blue-600 mr-2"></i>
                    往路便 - 座席選択
                  </h4>
                  <div id="outboundSeatMap" class="od-aircraftmap-cabins">
                    {/* Seat map will be generated here */}
                  </div>
                </div>

                {/* Return Flight Seat Map */}
                <div>
                  <h4 class="text-lg font-bold text-gray-800 mb-3 flex items-center">
                    <i class="fas fa-plane-arrival text-blue-600 mr-2"></i>
                    復路便 - 座席選択
                  </h4>
                  <div id="returnSeatMap" class="od-aircraftmap-cabins">
                    {/* Seat map will be generated here */}
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Seats Summary */}
            <div class="bg-blue-50 rounded-lg p-4">
              <h5 class="font-bold text-gray-800 mb-2">選択済み座席</h5>
              <div id="selectedSeatsSummary" class="text-sm text-gray-700">
                座席を選択してください
              </div>
            </div>
          </div>

          {/* Customer Information Form */}
          <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <i class="fas fa-user-edit text-blue-600 mr-2"></i>
              お客様情報
            </h3>

            <form id="customerInfoForm">
              {/* Passenger Info (will be dynamically generated based on passenger count) */}
              <div id="passengerFormsContainer">
                {/* Passenger forms will be inserted here */}
              </div>

              {/* Contact Information */}
              <div class="border-t border-gray-200 pt-6 mt-6">
                <h4 class="text-xl font-bold text-gray-800 mb-4">連絡先情報</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span class="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="contactEmail"
                      required
                      placeholder="example@email.com"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      電話番号 <span class="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      id="contactPhone"
                      required
                      placeholder="090-1234-5678"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div class="border-t border-gray-200 pt-6 mt-6">
                <h4 class="text-xl font-bold text-gray-800 mb-4">緊急連絡先</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      氏名
                    </label>
                    <input 
                      type="text" 
                      id="emergencyName"
                      placeholder="山田 太郎"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      電話番号
                    </label>
                    <input 
                      type="tel" 
                      id="emergencyPhone"
                      placeholder="090-1234-5678"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div class="border-t border-gray-200 pt-6 mt-6">
                <label class="flex items-start space-x-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="agreeTerms"
                    required
                    class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-1"
                  />
                  <span class="text-sm text-gray-700">
                    <a href="#" class="text-blue-600 hover:underline">利用規約</a>および
                    <a href="#" class="text-blue-600 hover:underline">プライバシーポリシー</a>に同意します
                    <span class="text-red-500">*</span>
                  </span>
                </label>
              </div>
            </form>
          </div>

          {/* Booking Summary and Submit */}
          <div class="bg-white rounded-2xl shadow-xl p-6 sticky bottom-4">
            <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div>
                <div class="text-sm text-gray-600 mb-1">合計金額</div>
                <div class="text-4xl font-bold text-blue-600" id="finalTotalPrice">¥0</div>
                <div class="text-xs text-gray-500 mt-1">
                  <span id="totalPassengersCount">1</span>名分 • 往復 • 税・手数料込み
                </div>
              </div>
              <div class="flex space-x-4 w-full md:w-auto">
                <button 
                  type="button"
                  onclick="backToSearch()" 
                  class="flex-1 md:flex-none bg-gray-200 text-gray-700 py-4 px-8 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  キャンセル
                </button>
                <button 
                  type="button"
                  onclick="proceedToConfirmation()" 
                  class="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl"
                  disabled
                  id="proceedConfirmationBtn"
                >
                  <i class="fas fa-check-circle mr-2"></i>
                  予約内容の確認
                </button>
              </div>
            </div>
          </div>
          </div>
          
          {/* Footer inside booking page */}
          <footer class="bg-gray-800 text-white mt-auto">
            <div class="container mx-auto px-4 py-8">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h5 class="font-bold text-lg mb-4">FlightSearch</h5>
                  <p class="text-gray-400">お得な航空券を簡単検索</p>
                </div>
                <div>
                  <h5 class="font-bold text-lg mb-4">リンク</h5>
                  <ul class="space-y-2 text-gray-400">
                    <li><a href="#" class="hover:text-white">利用規約</a></li>
                    <li><a href="#" class="hover:text-white">プライバシーポリシー</a></li>
                    <li><a href="#" class="hover:text-white">お問い合わせ</a></li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-bold text-lg mb-4">フォロー</h5>
                  <div class="flex space-x-4">
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook text-2xl"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-2xl"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-2xl"></i></a>
                  </div>
                </div>
              </div>
              <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2026 FlightSearch. All rights reserved.</p>
                <p class="mt-2 text-sm">
                  <a href="https://3001-ixum760vzlh6kn5x9qt8b-dfc00ec5.sandbox.novita.ai" target="_blank" class="text-blue-400 hover:text-blue-300">
                    <i class="fas fa-user-shield mr-1"></i>
                    管理画面（モック）
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Booking Confirmation Review Page */}
      <div id="confirmationPage" class="hidden fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto z-40">
        <div class="min-h-screen flex flex-col">
          <div class="container mx-auto px-4 py-8 flex-grow">
            {/* Back Button */}
            <button 
              onclick="backToBooking()" 
              class="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              座席選択に戻る
            </button>

            {/* Confirmation Header */}
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h2 class="text-3xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-clipboard-check text-blue-600 mr-3"></i>
                予約内容の最終確認
              </h2>
              <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p class="text-sm text-gray-700">
                  <i class="fas fa-info-circle text-blue-600 mr-2"></i>
                  ご予約内容をご確認の上、お間違いがなければ「支払いへ進む」ボタンをクリックしてください。
                </p>
              </div>
            </div>

            {/* Flight and Seat Summary */}
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-plane text-blue-600 mr-2"></i>
                フライト情報
              </h3>
              <div id="confirmationFlightSummary" class="space-y-4">
                {/* Flight summary will be inserted here */}
              </div>
            </div>

            {/* Passenger Information Summary */}
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-users text-blue-600 mr-2"></i>
                お客様情報
              </h3>
              <div id="confirmationPassengerSummary" class="space-y-4">
                {/* Passenger summary will be inserted here */}
              </div>
            </div>

            {/* Contact Information Summary */}
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-envelope text-blue-600 mr-2"></i>
                連絡先情報
              </h3>
              <div id="confirmationContactSummary" class="space-y-2">
                {/* Contact summary will be inserted here */}
              </div>
            </div>

            {/* Price Summary and Submit */}
            <div class="bg-white rounded-2xl shadow-xl p-6 sticky bottom-4">
              <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div>
                  <div class="text-sm text-gray-600 mb-1">お支払い合計金額</div>
                  <div class="text-4xl font-bold text-blue-600" id="confirmationTotalPrice">¥0</div>
                  <div class="text-xs text-gray-500 mt-1">
                    <span id="confirmationPassengersCount">1</span>名分 • 往復 • 税・手数料込み
                  </div>
                </div>
                <div class="flex space-x-4 w-full md:w-auto">
                  <button 
                    type="button"
                    onclick="backToBooking()" 
                    class="flex-1 md:flex-none bg-gray-200 text-gray-700 py-4 px-8 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    戻る
                  </button>
                  <button 
                    type="button"
                    onclick="proceedToPayment()" 
                    class="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl"
                    id="proceedPaymentBtn"
                  >
                    <i class="fas fa-credit-card mr-2"></i>
                    支払いへ進む
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer inside confirmation page */}
          <footer class="bg-gray-800 text-white mt-auto">
            <div class="container mx-auto px-4 py-8">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h5 class="font-bold text-lg mb-4">FlightSearch</h5>
                  <p class="text-gray-400">お得な航空券を簡単検索</p>
                </div>
                <div>
                  <h5 class="font-bold text-lg mb-4">リンク</h5>
                  <ul class="space-y-2 text-gray-400">
                    <li><a href="#" class="hover:text-white">利用規約</a></li>
                    <li><a href="#" class="hover:text-white">プライバシーポリシー</a></li>
                    <li><a href="#" class="hover:text-white">お問い合わせ</a></li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-bold text-lg mb-4">フォロー</h5>
                  <div class="flex space-x-4">
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook text-2xl"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-2xl"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-2xl"></i></a>
                  </div>
                </div>
              </div>
              <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2026 FlightSearch. All rights reserved.</p>
                <p class="mt-2 text-sm">
                  <a href="https://3001-ixum760vzlh6kn5x9qt8b-dfc00ec5.sandbox.novita.ai" target="_blank" class="text-blue-400 hover:text-blue-300">
                    <i class="fas fa-user-shield mr-1"></i>
                    管理画面（モック）
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Payment Page (Stripe-style) */}
      <div id="paymentPage" class="hidden fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto z-40">
        <div class="min-h-screen flex flex-col">
          <div class="container mx-auto px-4 py-8 flex-grow max-w-4xl">
            {/* Back Button */}
            <button 
              onclick="backToConfirmation()" 
              class="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              予約内容の確認に戻る
            </button>

            {/* Payment Header */}
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-3xl font-bold text-gray-800 flex items-center">
                  <i class="fas fa-lock text-blue-600 mr-3"></i>
                  安全な決済
                </h2>
                <div class="flex items-center space-x-2">
                  <i class="fab fa-cc-visa text-3xl text-blue-600"></i>
                  <i class="fab fa-cc-mastercard text-3xl text-orange-600"></i>
                  <i class="fab fa-cc-amex text-3xl text-blue-500"></i>
                  <i class="fab fa-cc-jcb text-3xl text-red-600"></i>
                </div>
              </div>
              <div class="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                <p class="text-sm text-gray-700">
                  <i class="fas fa-shield-alt text-green-600 mr-2"></i>
                  このページの情報は、SSL/TLS暗号化技術により保護されています。
                </p>
              </div>
            </div>

            {/* Order Summary */}
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">ご注文内容</h3>
              <div class="space-y-3">
                <div class="flex justify-between text-gray-700">
                  <span>フライト料金</span>
                  <span id="paymentFlightPrice">¥0</span>
                </div>
                <div class="flex justify-between text-gray-700">
                  <span>座席アップグレード</span>
                  <span id="paymentSeatUpgrade">¥0</span>
                </div>
                <div class="flex justify-between text-gray-700">
                  <span>税金・手数料</span>
                  <span id="paymentTaxes">¥0</span>
                </div>
                <div class="border-t border-gray-300 pt-3 flex justify-between items-center">
                  <span class="text-xl font-bold text-gray-800">合計</span>
                  <span class="text-2xl font-bold text-blue-600" id="paymentTotalPrice">¥0</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 class="text-xl font-bold text-gray-800 mb-6">お支払い情報</h3>
              <form id="paymentForm" class="space-y-6">
                {/* Card Number */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">カード番号</label>
                  <div class="relative">
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456"
                      pattern="[0-9\s]{13,19}"
                      maxlength="19"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <i class="fas fa-credit-card absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                {/* Expiry and CVV */}
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">有効期限</label>
                    <input 
                      type="text" 
                      placeholder="MM/YY"
                      pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                      maxlength="5"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">セキュリティコード</label>
                    <input 
                      type="text" 
                      placeholder="CVV"
                      pattern="[0-9]{3,4}"
                      maxlength="4"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">カード名義人</label>
                  <input 
                    type="text" 
                    placeholder="TARO YAMADA"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Billing Address */}
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">請求先住所</label>
                  <input 
                    type="text" 
                    placeholder="東京都渋谷区..."
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </form>
            </div>

            {/* Payment Actions */}
            <div class="bg-white rounded-2xl shadow-xl p-6 sticky bottom-4">
              <div class="flex space-x-4">
                <button 
                  type="button"
                  onclick="backToConfirmation()" 
                  class="flex-1 bg-gray-200 text-gray-700 py-4 px-8 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  キャンセル
                </button>
                <button 
                  type="button"
                  onclick="completeBooking()" 
                  class="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl"
                >
                  <i class="fas fa-lock mr-2"></i>
                  <span id="paymentButtonText">¥0 を支払う</span>
                </button>
              </div>
              <p class="text-xs text-gray-500 text-center mt-4">
                <i class="fas fa-shield-alt mr-1"></i>
                お客様の決済情報は暗号化され、安全に処理されます。
              </p>
            </div>
          </div>

          {/* Footer inside payment page */}
          <footer class="bg-gray-800 text-white mt-auto">
            <div class="container mx-auto px-4 py-8">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h5 class="font-bold text-lg mb-4">FlightSearch</h5>
                  <p class="text-gray-400">お得な航空券を簡単検索</p>
                </div>
                <div>
                  <h5 class="font-bold text-lg mb-4">リンク</h5>
                  <ul class="space-y-2 text-gray-400">
                    <li><a href="#" class="hover:text-white">利用規約</a></li>
                    <li><a href="#" class="hover:text-white">プライバシーポリシー</a></li>
                    <li><a href="#" class="hover:text-white">お問い合わせ</a></li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-bold text-lg mb-4">フォロー</h5>
                  <div class="flex space-x-4">
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook text-2xl"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-2xl"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-2xl"></i></a>
                  </div>
                </div>
              </div>
              <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2026 FlightSearch. All rights reserved.</p>
                <p class="mt-2 text-sm">
                  <a href="https://3001-ixum760vzlh6kn5x9qt8b-dfc00ec5.sandbox.novita.ai" target="_blank" class="text-blue-400 hover:text-blue-300">
                    <i class="fas fa-user-shield mr-1"></i>
                    管理画面（モック）
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Booking Complete Page */}
      <div id="completePage" class="hidden fixed inset-0 bg-gradient-to-br from-green-50 to-blue-100 overflow-y-auto z-40">
        <div class="min-h-screen flex flex-col">
          <div class="container mx-auto px-4 py-8 flex-grow max-w-4xl">
            {/* Success Animation */}
            <div class="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
              <div class="mb-6">
                <div class="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
                  <i class="fas fa-check-circle text-green-600 text-6xl"></i>
                </div>
                <h2 class="text-4xl font-bold text-gray-800 mb-2">予約が完了しました！</h2>
                <p class="text-gray-600">ご予約ありがとうございます。予約確認メールをお送りしました。</p>
              </div>

              {/* Booking Reference */}
              <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-6">
                <div class="text-sm text-gray-600 mb-2">予約番号</div>
                <div class="text-3xl font-bold text-blue-600" id="bookingReference">ABC123456</div>
                <p class="text-xs text-gray-500 mt-2">
                  この予約番号は、予約の確認や変更に必要です。大切に保管してください。
                </p>
              </div>
            </div>

            {/* Booking Summary */}
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-plane text-blue-600 mr-2"></i>
                フライト情報
              </h3>
              <div id="completeFlightSummary" class="space-y-4">
                {/* Flight summary will be inserted here */}
              </div>
            </div>

            {/* Next Steps */}
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h3 class="text-xl font-bold text-gray-800 mb-4">次のステップ</h3>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800">予約確認メールを確認</h4>
                    <p class="text-sm text-gray-600">ご登録のメールアドレスに予約詳細を送信しました。</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800">オンラインチェックイン</h4>
                    <p class="text-sm text-gray-600">出発24時間前からオンラインチェックインが可能です。</p>
                  </div>
                </div>
                <div class="flex items-start space-x-3">
                  <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span class="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800">空港へ出発</h4>
                    <p class="text-sm text-gray-600">出発の2時間前までに空港へお越しください。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div class="bg-white rounded-2xl shadow-xl p-6">
              <div class="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <button 
                  type="button"
                  onclick="downloadTicket()" 
                  class="flex-1 bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                >
                  <i class="fas fa-download mr-2"></i>
                  予約確認書をダウンロード
                </button>
                <button 
                  type="button"
                  onclick="returnToSearch()" 
                  class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl"
                >
                  <i class="fas fa-home mr-2"></i>
                  検索トップに戻る
                </button>
              </div>
            </div>
          </div>

          {/* Footer inside complete page */}
          <footer class="bg-gray-800 text-white mt-auto">
            <div class="container mx-auto px-4 py-8">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h5 class="font-bold text-lg mb-4">FlightSearch</h5>
                  <p class="text-gray-400">お得な航空券を簡単検索</p>
                </div>
                <div>
                  <h5 class="font-bold text-lg mb-4">リンク</h5>
                  <ul class="space-y-2 text-gray-400">
                    <li><a href="#" class="hover:text-white">利用規約</a></li>
                    <li><a href="#" class="hover:text-white">プライバシーポリシー</a></li>
                    <li><a href="#" class="hover:text-white">お問い合わせ</a></li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-bold text-lg mb-4">フォロー</h5>
                  <div class="flex space-x-4">
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook text-2xl"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-2xl"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-2xl"></i></a>
                  </div>
                </div>
              </div>
              <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2026 FlightSearch. All rights reserved.</p>
                <p class="mt-2 text-sm">
                  <a href="https://3001-ixum760vzlh6kn5x9qt8b-dfc00ec5.sandbox.novita.ai" target="_blank" class="text-blue-400 hover:text-blue-300">
                    <i class="fas fa-user-shield mr-1"></i>
                    管理画面（モック）
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* My Page */}
      <div id="myPage" class="hidden fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 overflow-y-auto z-40">
        <div class="min-h-screen flex flex-col">
          <div class="container mx-auto px-4 py-8 flex-grow">
            {/* Back Button */}
            <button 
              onclick="backToHome()" 
              class="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              ホームに戻る
            </button>

            {/* My Page Header */}
            <div class="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <h2 class="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <i class="fas fa-user-circle text-blue-600 mr-3"></i>
                マイページ
              </h2>
              <p class="text-gray-600" id="myPageUserEmail">
                ログイン中: user@example.com
              </p>
            </div>

            {/* Tab Navigation */}
            <div class="bg-white rounded-2xl shadow-xl mb-6 overflow-hidden">
              <div class="flex border-b">
                <button
                  onclick="switchMyPageTab('bookings')"
                  id="tabBookings"
                  class="flex-1 py-4 px-6 font-semibold text-center transition mypage-tab active"
                >
                  <i class="fas fa-list mr-2"></i>
                  予約履歴
                </button>
                <button
                  onclick="switchMyPageTab('profile')"
                  id="tabProfile"
                  class="flex-1 py-4 px-6 font-semibold text-center transition mypage-tab"
                >
                  <i class="fas fa-user-edit mr-2"></i>
                  会員情報
                </button>
              </div>
            </div>

            {/* Bookings Tab */}
            <div id="bookingsTab" class="mypage-tab-content">
              <div class="bg-white rounded-2xl shadow-xl p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <i class="fas fa-history text-blue-600 mr-2"></i>
                  予約履歴
                </h3>
                
                <div id="bookingsList" class="space-y-4">
                  {/* Booking items will be inserted here by JavaScript */}
                </div>
              </div>
            </div>

            {/* Profile Tab */}
            <div id="profileTab" class="mypage-tab-content hidden">
              <div class="bg-white rounded-2xl shadow-xl p-6">
                <h3 class="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <i class="fas fa-id-card text-blue-600 mr-2"></i>
                  会員情報
                </h3>

                <form id="profileForm" class="space-y-6">
                  {/* Email */}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス
                    </label>
                    <input
                      type="email"
                      id="profileEmail"
                      disabled
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
                    />
                  </div>

                  {/* Name */}
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">
                        姓 <span class="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="profileLastName"
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
                        id="profileFirstName"
                        placeholder="太郎"
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      電話番号 <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="profilePhone"
                      placeholder="090-1234-5678"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      生年月日 <span class="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="profileDob"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      性別 <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="profileGender"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">選択してください</option>
                      <option value="male">男性</option>
                      <option value="female">女性</option>
                      <option value="other">その他</option>
                    </select>
                  </div>

                  {/* Passport */}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      パスポート番号
                    </label>
                    <input
                      type="text"
                      id="profilePassport"
                      placeholder="AB1234567"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Nationality */}
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      国籍
                    </label>
                    <input
                      type="text"
                      id="profileNationality"
                      placeholder="日本"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Save Button */}
                  <div class="flex justify-end space-x-4">
                    <button
                      type="button"
                      onclick="cancelProfileEdit()"
                      class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg hover:shadow-xl"
                    >
                      <i class="fas fa-save mr-2"></i>
                      保存する
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Footer inside my page */}
          <footer class="bg-gray-800 text-white mt-auto">
            <div class="container mx-auto px-4 py-8">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h5 class="font-bold text-lg mb-4">FlightSearch</h5>
                  <p class="text-gray-400">お得な航空券を簡単検索</p>
                </div>
                <div>
                  <h5 class="font-bold text-lg mb-4">リンク</h5>
                  <ul class="space-y-2 text-gray-400">
                    <li><a href="#" class="hover:text-white">利用規約</a></li>
                    <li><a href="#" class="hover:text-white">プライバシーポリシー</a></li>
                    <li><a href="#" class="hover:text-white">お問い合わせ</a></li>
                  </ul>
                </div>
                <div>
                  <h5 class="font-bold text-lg mb-4">フォロー</h5>
                  <div class="flex space-x-4">
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook text-2xl"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-2xl"></i></a>
                    <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-2xl"></i></a>
                  </div>
                </div>
              </div>
              <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2026 FlightSearch. All rights reserved.</p>
                <p class="mt-2 text-sm">
                  <a href="https://3001-ixum760vzlh6kn5x9qt8b-dfc00ec5.sandbox.novita.ai" target="_blank" class="text-blue-400 hover:text-blue-300">
                    <i class="fas fa-user-shield mr-1"></i>
                    管理画面（モック）
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Booking Detail Modal */}
      <div id="bookingDetailModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            {/* Modal Header */}
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold text-gray-800 flex items-center">
                <i class="fas fa-ticket-alt text-blue-600 mr-2"></i>
                予約詳細
              </h3>
              <button onclick="closeBookingDetailModal()" class="text-gray-400 hover:text-gray-600 text-2xl">
                <i class="fas fa-times"></i>
              </button>
            </div>

            {/* Booking Detail Content */}
            <div id="bookingDetailContent">
              {/* Content will be inserted by JavaScript */}
            </div>

            {/* Cancel Button */}
            <div class="mt-6 flex justify-end space-x-4">
              <button
                onclick="closeBookingDetailModal()"
                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                閉じる
              </button>
              <button
                id="cancelBookingBtn"
                onclick="showCancelConfirmation()"
                class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                <i class="fas fa-times-circle mr-2"></i>
                この予約をキャンセル
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <div id="cancelConfirmModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <i class="fas fa-exclamation-triangle text-yellow-500 mr-2"></i>
            キャンセル確認
          </h3>
          <p class="text-gray-600 mb-6">
            この予約をキャンセルしてもよろしいですか？<br/>
            この操作は取り消すことができません。
          </p>
          <div class="flex justify-end space-x-4">
            <button
              onclick="closeCancelConfirmation()"
              class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
            >
              戻る
            </button>
            <button
              onclick="confirmCancelBooking()"
              class="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              キャンセルする
            </button>
          </div>
        </div>
      </div>

      {/* JavaScript */}
      <script src="/static/app.js"></script>
    </div>
  )
})

// API endpoint for flight search (will integrate with Amadeus later)
app.post('/api/search', async (c) => {
  const body = await c.req.json()
  
  // TODO: Integrate with Amadeus API
  // For now, return mock data
  return c.json({
    success: true,
    message: 'Search received',
    data: body
  })
})

export default app
