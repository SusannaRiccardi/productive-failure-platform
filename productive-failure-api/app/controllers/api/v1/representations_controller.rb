module Api::V1
    class RepresentationsController < ApplicationController
        def index
            @representations = Representation.all
            render json: @representations
        end
    end
end
