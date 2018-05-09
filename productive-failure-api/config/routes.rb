Rails.application.routes.draw do
    namespace :api do
        namespace :v1 do
            resources :representations, :patterns, :activity_patterns, :representation, :reconstruct_patterns, :generated_patterns
        end
    end
end
