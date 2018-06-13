module Api::V1
    class ReconstructPatternsController < ApplicationController
        before_action :authenticate_user, :except => [:create]
        
        def index
            @reconstruct_pattern = ReconstructPattern.where(productive_failure_id: params[:productive_failure_id])
            render json: @reconstruct_pattern
        end

        def create
            reconstruct_patterns = JSON.parse(params[:data])
            result = []
            reconstruct_patterns.each do |reconstruct_pattern|
                @reconstruct_pattern = ReconstructPattern.create(reconstruct_pattern["reconstructPattern"])
                result.push(@reconstruct_pattern)
            end

            render json: result
        end
          
        private

        def reconstruct_pattern_params
            params.require(:reconstruct_pattern).permit(:productive_failure_id, :representation_id)
        end
    end
end
