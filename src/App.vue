<template>
   <div class="container mx-auto flex flex-col items-center bg-gray-100 p-4">
      <div class="container">
         <div>
            test: {{ testLett }}
         </div>
         <section>
            <div class="flex">
               <div class="max-w-xs">
                  <div>{{ ticker }}</div>
                  <label for="wallet" class="block text-sm font-medium text-gray-700">Тикер</label>
                  <div class="mt-1 relative rounded-md shadow-md">
                     <input
                         v-model.trim="ticker"
                         @keydown.enter="addObject"
                         type="text"
                         name="wallet"
                         id="wallet"
                         class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                         placeholder="Например DOGE"
                     />
                  </div>
                  <div class="flex bg-white shadow-md p-1 rounded-md shadow-md flex-wrap">
            <span
                class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              BTC
            </span>
                     <span
                         class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              DOGE
            </span>
                     <span
                         class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              BCH
            </span>
                     <span
                         class="inline-flex items-center px-2 m-1 rounded-md text-xs font-medium bg-gray-300 text-gray-800 cursor-pointer">
              CHD
            </span>
                  </div>
                  <div v-if="!checkInput()" class="text-sm text-red-600">Такой тикер уже добавлен</div>
               </div>
            </div>
            <button
                type="button"
                @click="addObject"
                class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
               <svg
                   class="-ml-0.5 mr-2 h-6 w-6"
                   xmlns="http://www.w3.org/2000/svg"
                   width="30"
                   height="30"
                   viewBox="0 0 24 24"
                   fill="#ffffff"
               >
                  <path
                      d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                  ></path>
               </svg>
               Добавить
            </button>
            <hr class="w-full border-t border-gray-600 my-4"/>
            <div class="buttons">
               <button
                   @click="prevPage"
                   type="button"
                   style="margin-right: 1rem"
                   class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
               >
                  Назад
               </button>
               <button
                   @click="nextPage"
                   type="button"
                   class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
               >
                  Вперед
               </button>
               <div>
                  Фильтр:
                  <input
                      type="text"
                      v-model="filter"
                  >
               </div>
               <div v-if="emptySearch"
                    style="text-align: center">
                  Ничего не найдено
               </div>
            </div>
         </section>
         <template v-if="arrayTickers.length !== 0">
            <hr class="w-full border-t border-gray-600 my-4"
                v-if="!emptySearch"
            />
            <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
               <div
                   v-for="(item) in filtredTickers()"
                   @click="sel = item"
                   :key="item.name"
                   :class="{
                   'border-4': sel == item
                }"
                   class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
               >
                  <div class="px-4 py-5 sm:p-6 text-center">
                     <dt class="text-sm font-medium text-gray-500 truncate">
                        {{ item.name }} - USD
                     </dt>
                     <dd class="mt-1 text-3xl font-semibold text-gray-900">
                        {{ item.price }}
                     </dd>
                  </div>
                  <div class="w-full border-t border-gray-200"></div>
                  <button
                      @click.stop="handelDelete(item)"
                      class="flex items-center justify-center font-medium w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
                  >
                     Удалить
                  </button>
               </div>
            </dl>
            <hr class="w-full border-t border-gray-600 my-4"
                v-if="!emptySearch"
            />
            <section
                v-if="sel"
                class="relative">
               <h3 class="text-lg leading-6 font-medium text-gray-900 my-8">
                  {{ sel.name }} - USD
               </h3>
               <div class="flex items-end border-gray-600 border-b border-l h-64">
                  <div
                      class="bg-purple-800 border w-10 h-24"
                  ></div>
                  <div
                      class="bg-purple-800 border w-10 h-32"
                  ></div>
                  <div
                      class="bg-purple-800 border w-10 h-48"
                  ></div>
                  <div
                      class="bg-purple-800 border w-10 h-16"
                  ></div>
               </div>
               <button
                   @click="sel = null"
                   type="button"
                   class="absolute top-0 right-0"
               >
               </button>
            </section>
         </template>
      </div>
   </div>
</template>

<script>

export default {
   name: 'App',
   data() {
      return {
         ticker: '',
         arrayTickers: [
            {name: 'iPhone 7', company: 'Apple'},
            {name: 'iPhone 6S', company: 'Apple'},
         ],
         sel: null,
         errorText: false,
         filter: '',
         page: 1,
         emptySearch: false,
         users: [],
         testLett: 'test'
      }
   },
   methods: {
      nextPage() {
         this.page = this.page + 1
         console.log(this.page)
      },
      prevPage() {
         this.page = this.page - 1
      },
      subscribeToUpdate(ticker) {
         setInterval(async () => {
            const data = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${ticker.name}&tsyms=USD&api_key=b21a3093554703d4653f805d40ebd670ada5fb329486ecb44cae07d4f7b45b1c`)
            const obj = await data.json()
            this.arrayTickers.find(t => t.name === ticker.name)
                .price = obj.USD > 1 ?
                obj.USD.toFixed(1) :
                obj.USD.toPrecision(1)
         }, 3000)
      },
      filtredTickers() {
         let start= (this.page - 1 ) * 6
         let end = (this.page * 6)
         
         
         return this.arrayTickers.filter(ticker => {
            if (this.filter === '') {
               return true
            } else if (ticker.name.indexOf(this.filter) > -1) {
               this.emptySearch = false
               return ticker.name.indexOf(this.filter) > -1
            } else if (ticker.name.indexOf(this.filter) <= -1) {
               this.emptySearch = true
            }
         }).slice(start, end)
      },
      checkInput() {
         if (this.ticker && !this.arrayTickers.includes(this.filter)) {
            return true
         }
         return false
      },
      addObject() {
         if (this.checkInput()) {
            const newTicker = {
               name: this.ticker,
               price: '-'
            }
            this.arrayTickers.push(newTicker)
            localStorage.setItem('tickers', JSON.stringify(this.arrayTickers))
            this.filter = ''
            this.subscribeToUpdate(newTicker)
            this.ticker = ''
         }
      },
      handelDelete(item) {
         this.arrayTickers = this.arrayTickers.filter(i => i !== item)
         localStorage.setItem('tickers', JSON.stringify(this.arrayTickers))
      },
   },
   created() {
      const tickers = localStorage.getItem('tickers')
      if(tickers) {
         this.arrayTickers = JSON.parse(localStorage.getItem('tickers'))
      }
      this.arrayTickers.forEach(item => {
         this.subscribeToUpdate(item)
      })
   }
}
</script>

<style src="./assets/css/app.css">
.icon {
   transform: rotate(90deg);
   display: none;
}
body {
   display: none;
}
</style>
