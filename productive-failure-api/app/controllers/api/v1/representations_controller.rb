module Api::V1
    class RepresentationsController < ApplicationController
        def index
            @representations = Representation.all
            render json: @representations
        end

        def create
            @representation = Representation.create(representation_params)
            render json: @representation
        end

        def show
            @representation = Representation.find(params[:id])
            render json: @representation
        end
          
        private
          
        def representation_params
            params.require(:representation).permit(:constraint, :svg, :productive_failure_id, :activity_pattern_id)
        end
    end
end
