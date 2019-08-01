class CreateStocks < ActiveRecord::Migration[6.0]
  def change
    create_table :stocks do |t|
      t.string :name
      t.string :description
      t.bigint :high
      t.bigint :low
      t.bigint :close
      t.string :slug

      t.timestamps
    end
  end
end
