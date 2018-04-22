module Api::V1
    class PatternsController < ApplicationController
        def index
            @patterns = Pattern.order("Random()").first(2)
            render json: @patterns
        end
    end
end
