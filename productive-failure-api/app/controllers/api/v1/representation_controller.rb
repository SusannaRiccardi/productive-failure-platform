module Api::V1
    class RepresentationController < ApplicationController
        def index
            @representation = Representation.order("Random()").first
            render json: @representation
        end
    end
end
