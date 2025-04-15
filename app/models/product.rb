class Product < ApplicationRecord
  before_destroy :not_referenced_by_any_line_item
  belongs_to :user, optional: true
  has_many :line_items

  mount_uploader :image, ImageUploader
  serialize :image, JSON # If you use SQLite, add this line

  # Validations
  validates :title, :brand, :model, :description, :condition, :finish, presence: true
  validates :price, presence: true, numericality: { greater_than: 0, less_than: 100000 }

  # Set max length to the description, price and title
  validates :description, length: { maximum: 1000, too_long: "%{count} characters is the maximum allowed." }
  validates :title, length: { maximum: 140, too_long: "%{count} characters is the maximum allowed." }
  validates :price, length: { maximum: 10 }

  # You can input more brands finish and condition here
  BRAND = %w{ Ferrari Opel Lenovo Fossil }
  FINISH = %w{ Black White Navy Blue Red Clear Satin Yellow Seafoam }
  CONDITION = %w{ New Excellent Mint Used Fair Poor }

  # Validate brand, finish and condition against the allowed values
  validates :brand, inclusion: { in: BRAND, message: "must be selected from the available options" }, allow_blank: false
  validates :finish, inclusion: { in: FINISH, message: "must be selected from the available options" }, allow_blank: false
  validates :condition, inclusion: { in: CONDITION, message: "must be selected from the available options" }, allow_blank: false

  private

  def not_referenced_by_any_line_item
    unless line_items.empty?
      errors.add(:base, "Line items present")
      throw :abort
    end
  end
end