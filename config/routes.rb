Rails.application.routes.draw do
  resources :line_items
  resources :carts
  resources :products

  devise_for :users, controllers: {
    registrations: 'registrations'
  }

  root 'products#index'
end