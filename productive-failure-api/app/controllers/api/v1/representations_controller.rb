require 'json'

module Api::V1
    class RepresentationsController < ApplicationController
        before_action :authenticate_user, :except => [:create]

        def index
            @representations = Representation.all
            render json: @representations
        end

        def create
            representations = JSON.parse(params[:data])

            representations.each do |representation|
                Representation.create(representation["representation"])
            end
        end

        def show
            @representation = Representation.find(params[:id])
            render json: @representation
        end
    end
end
