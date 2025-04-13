class LineItem < ApplicationRecord
  belongs_to :product
  belongs_to :cart

  # Calculate the total price for this line item (product price × quantity)
  def total_price
    product.price * quantity
  end
end# frozen_string_literal: true

