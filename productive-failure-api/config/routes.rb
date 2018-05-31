Rails.application.routes.draw do
    namespace :api do
        namespace :v1 do
            resources :representations, :patterns, :activity_patterns, :representation, :reconstruct_patterns, :generated_patterns, :iteration_consolidations, :iteration_consolidation_solutions
        end
    end
end
