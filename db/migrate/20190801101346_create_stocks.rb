class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :currencies do |t|
      t.string :name
      t.string :description
      t.bigint :max_supply
      t.string :currency_symbol
      t.string :logo
      t.string :slug

      t.timestamps
    end
  end
end
