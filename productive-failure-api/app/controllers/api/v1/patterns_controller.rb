module Api::V1
    class PatternsController < ApplicationController
        def index
            @patterns = Pattern.all
            render json: @patterns
        end
    end
end
