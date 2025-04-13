class RegistrationsController < Devise::RegistrationsController

 private

 # Permit the name parameter along with the default Devise parameters
 def sign_up_params
  params.require(:user).permit(:name, :email, :password, :password_confirmation)
 end

 # Permit name and current_password for account updates
 def account_update_params
  params.require(:user).permit(:name, :email, :password, :password_confirmation, :current_password)
 end
end