module Api::V1
    class RepresentationController < ApplicationController
        def index
            @representation = Representation.order("Random()").first(2)
            render json: @representation
        end
    end
end
