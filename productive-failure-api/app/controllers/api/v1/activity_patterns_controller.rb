module Api::V1
    class ActivityPatternsController < ApplicationController
        def index
            @activity_pattern = ActivityPattern.where(productive_failure_id: params[:productive_failure_id])
            render json: @activity_pattern
        end

        def create
            activity_patterns = JSON.parse(params[:data])
            result = []
            activity_patterns.each do |activity_pattern|
                @activity_pattern = ActivityPattern.create(activity_pattern["activityPattern"])
                result.push(@activity_pattern)
            end

            render json: result
        end
          
        private

        def activity_pattern_params
            params.require(:activity_pattern).permit(:productive_failure_id, :pattern_id)
        end
    end
end
