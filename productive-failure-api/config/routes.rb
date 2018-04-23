Rails.application.routes.draw do
    namespace :api do
        namespace :v1 do
            resources :representations, :patterns, :activity_patterns, :representation
        end
    end
end
