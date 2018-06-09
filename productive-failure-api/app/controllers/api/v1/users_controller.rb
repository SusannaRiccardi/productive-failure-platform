module Api::V1
class UsersController < ApplicationController
    # before_action :set_user, only: [:show, :create, :new, :update, :destroy]
  
    # GET /users
    def index
      @users = User.all
  
      render json: @users
    end
  
    # GET /users/1
    def show
      render json: @user
    end
  
    # POST /users
    def create
        puts params
        @user = User.new(user_params_post)
  
      if @user.save
        render json: @user
      else
        render json: @user.errors
      end
    end
  
    # PATCH/PUT /users/1
    def update
      if @user.update(user_params)
        render json: @user
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /users/1
    def destroy
      @user.destroy
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_user
        @user = User.find(params[:id])
      end
  
      def user_params_post
            params.require(:user).permit(:email, :password, :password_confirmation, :admin)
      end

      # Only allow a trusted parameter "white list" through.
      def user_params
        params.require(:user).permit(:email, :password_digest, :admin)
      end
  end
end
