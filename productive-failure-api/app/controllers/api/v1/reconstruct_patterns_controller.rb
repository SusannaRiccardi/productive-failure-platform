module Api::V1
    class ReconstructPatternsController < ApplicationController
        def index
            @reconstruct_pattern = ReconstructPattern.where(productive_failure_id: params[:productive_failure_id])
            render json: @reconstruct_pattern
        end

        def create
            @reconstruct_pattern = ReconstructPattern.create(reconstruct_pattern_params)
            render json: @reconstruct_pattern
        end
          
        private

        def reconstruct_pattern_params
            params.require(:reconstruct_pattern).permit(:productive_failure_id, :representation_id)
        end
    end
end
