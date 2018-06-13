module Api::V1
    class IterationConsolidationsController < ApplicationController
        before_action :authenticate_user, :except => [:create]

        def index
            @iteration_consolidation = IterationConsolidation.order("Random()").first
            render json: @iteration_consolidation
        end

        def create
            @iteration_consolidation = IterationConsolidation.create(iteration_consolidation)
            render json: @iteration_consolidation
          end
          
        private
          
        def iteration_consolidation
            params.require(:iteration_consolidation).permit(:pattern, :rep1, :rep2, :rep3, :rep4, :rep5, :rep6)
        end
    end
end
