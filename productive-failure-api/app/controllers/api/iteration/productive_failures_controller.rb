module Api::Iteration
    class ProductiveFailuresController < ApplicationController
        def index
            @productive_failures = ProductiveFailure.all
            render json: @productive_failures
        end

        def create
            @productive_failure = ProductiveFailure.create(productive_failure)
            render json: @productive_failure
          end
          
        private
          
        def productive_failure
            params.require(:productive_failure).permit(:owner_id)
        end
    end
end
