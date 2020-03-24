class Blog < ApplicationRecord
  scope :ordered, -> { order(created_at: :desc) }
  enum status: { draft: 0, published: 1 }
  extend FriendlyId
  friendly_id :title, use: :slugged

  validates_presence_of :title, :body

  belongs_to :topic, optional: true

  has_many :comments, dependent: :destroy
end
