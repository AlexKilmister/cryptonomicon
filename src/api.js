const API_KEY = 'f19c6c83234e2819bbc40ffcd598179340b9ad584b7f657a28ad7e65ca22a480'

const tickersHandlers = new Map()

const loadTickers = () => {
  if (tickersHandlers.size === 0) {
    return
  }

  return fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[...tickersHandlers.keys()].join(',')}&tsyms=USD&api_key=${API_KEY}`)
    .then(r => r.json())
    .then(rawData => {
      const updatedPrices = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, value.USD])
      )

      Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
        const handlers = tickersHandlers.get(currency) ?? []
        handlers.forEach(fn => fn(newPrice))
      })
    })
}

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || []
  tickersHandlers.set(ticker, [...subscribers, cb])
}

export const unsubscribeFromTicker = ticker => {
  tickersHandlers.delete(ticker)
}

setInterval(loadTickers, 5000)
