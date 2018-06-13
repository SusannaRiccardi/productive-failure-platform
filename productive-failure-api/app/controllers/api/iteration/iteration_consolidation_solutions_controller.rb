module Api::Iteration
    class IterationConsolidationSolutionsController < ApplicationController
        def index
            @iteration_consolidation_solutions = IterationConsolidationSolution.all
            render json: @iteration_consolidation_solutions
        end
        
        def create
            @iteration_consolidation_solution = IterationConsolidationSolution.create(iteration_consolidation_solution)
            render json: @iteration_consolidation_solution
          end
          
        private
          
        def iteration_consolidation_solution
            params.require(:iteration_consolidation_solution).permit(:productive_failure_id, :rep1, :rep2, :rep3, :rep4, :rep5, :rep6, :iteration_consolidation_id)
        end
    end
end
