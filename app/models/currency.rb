class Currency < ApplicationRecord
  def current_price
    url = 'https://api.coinmarketcap.com/v1/ticker/'
    request = HTTParty.get(url + self.slug)
    response = JSON.parse(request.body)
  end
end
