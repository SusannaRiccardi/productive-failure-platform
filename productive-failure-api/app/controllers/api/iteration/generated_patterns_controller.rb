require 'json'

module Api::Iteration
    class GeneratedPatternsController < ApplicationController
        def create
            generated_patterns = JSON.parse(params[:data])

            generated_patterns.each do |generated_pattern|
                GeneratedPattern.create(generated_pattern["generated_pattern"])
            end
        end

    end
end
