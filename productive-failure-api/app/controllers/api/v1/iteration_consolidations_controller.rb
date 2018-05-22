module Api::V1
    class IterationConsolidationsController < ApplicationController
        def index
            @iteration_consolidation = IterationConsolidation.order("Random()").first
            render json: @iteration_consolidation
        end
    end
end
