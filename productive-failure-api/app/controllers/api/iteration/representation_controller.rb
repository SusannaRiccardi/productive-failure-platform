module Api::Iteration
    class RepresentationController < ApplicationController
        before_action :authenticate_user, :except => [:create]

        def index
            @representation = Representation.where.not(productive_failure_id: params[:productive_failure_id])
            @representation = @representation.order("Random()").first(2)
            render json: @representation
        end
    end
end
