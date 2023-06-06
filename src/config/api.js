export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

export const NFTListById = (id) => 
  `https://api.coingecko.com/api/v3/nfts/list?order=h24_volume_native_asc&asset_platform_id=${id}&per_page=134&page=1`

  export const NFTList = (Nft) => 
  `https://api.coingecko.com/api/v3/asset_platforms?filter=${Nft}`


export const IndexsList = (id, contract) => `https://api.coingecko.com/api/v3/nfts/${id}/contract/${contract}`