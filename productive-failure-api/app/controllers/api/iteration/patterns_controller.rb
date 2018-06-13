module Api::Iteration
    class PatternsController < ApplicationController
        before_action :authenticate_user, :except => [:create]

        def index
            @patterns = Pattern.order("Random()").first(2)
            render json: @patterns
        end

        def show
            @pattern = Pattern.find(params[:id])
            render json: @pattern
        end

    end
end
