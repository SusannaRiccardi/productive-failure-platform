module Api::V1
    class RepresentationController < ApplicationController
        def index
            @representation = Representation.where.not(productive_failure_id: params[:productive_failure_id])
            @representation = @representation.order("Random()").first(2)
            render json: @representation
        end
    end
end
