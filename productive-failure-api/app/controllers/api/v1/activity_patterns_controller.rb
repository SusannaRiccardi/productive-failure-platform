module Api::V1
    class ActivityPatternsController < ApplicationController
        def index
            @activity_patterns = ActivityPattern.all
            render json: @activity_patterns
        end

        def create
            @activity_pattern = ActivityPattern.create(activity_pattern_params)
            render json: @activity_pattern
        end
          
        private
          
        def activity_pattern_params
            params.require(:activity_pattern).permit(:productive_failure_id, :pattern_id)
        end
    end
end
