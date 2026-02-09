import { Hono } from 'hono'
import { renderer } from './renderer'

const app = new Hono()

app.use(renderer)

app.get('/', (c) => {
  return c.render(
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header class="bg-blue-600 text-white shadow-lg">
        <div class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <i class="fas fa-plane text-3xl"></i>
              <h1 class="text-2xl font-bold">FlightSearch</h1>
            </div>
            <nav class="hidden md:flex space-x-6">
              <a href="/" class="hover:text-blue-200 transition">ホーム</a>
              <a href="#" class="hover:text-blue-200 transition">予約確認</a>
              <a href="#" class="hover:text-blue-200 transition">お問い合わせ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main class="container mx-auto px-4 py-8">
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
              <input type="radio" name="tripType" value="roundtrip" checked class="w-4 h-4 text-blue-600" />
              <span class="text-gray-700 font-medium">往復</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="tripType" value="oneway" class="w-4 h-4 text-blue-600" />
              <span class="text-gray-700 font-medium">片道</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="tripType" value="multicity" class="w-4 h-4 text-blue-600" />
              <span class="text-gray-700 font-medium">複数都市</span>
            </label>
          </div>

          {/* Search Fields */}
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

          {/* Passengers and Class */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      </main>

      {/* Footer */}
      <footer class="bg-gray-800 text-white mt-16">
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
          </div>
        </div>
      </footer>

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
