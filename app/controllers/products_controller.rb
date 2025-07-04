class ProductsController < ApplicationController
  # Add this line to handle missing products
  rescue_from ActiveRecord::RecordNotFound, with: :invalid_product

  before_action :set_product, only: [:show, :edit, :update, :destroy]

  before_action :authenticate_user!, except: [:index, :show]
  before_action :authorize_user, only: [:edit, :update, :destroy]

  # GET /products or /products.json
  def index
    @products = Product.all.order("created_at desc")
  end

  # GET /products/1 or /products/1.json
  def show
    @products = Product.find(params[:id])
  end

  def find_product_by_id(id)
    connection.execute("SELECT * FROM products WHERE products.id = ? LIMIT 1", id).first
  end

  # GET /products/new
  def new
    @product = current_user.products.build
  end

  # GET /products/1/edit
  def edit
  end

  # POST /products or /products.json
  def create
    @product = current_user.products.build(product_params)

    respond_to do |format|
      if @product.save
        format.html { redirect_to @product, notice: "Product was successfully created." }
        format.json { render :show, status: :created, location: @product }
      else
        puts "Product validation errors: #{@product.errors.full_messages}" # Debug errors
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /products/1 or /products/1.json
  def update
    respond_to do |format|
      if @product.update(product_params)
        format.html { redirect_to @product, notice: "Product was successfully updated." }
        format.json { render :show, status: :ok, location: @product }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @product.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /products/1 or /products/1.json
  def destroy
    @product.destroy
    respond_to do |format|
      format.html { redirect_to products_path, notice: "Product was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def product_params
    params.require(:product).permit(:brand, :model, :description, :condition, :finish, :title, :price, :image)
  end

  # Ensure only the owner can edit/update/destroy their products
  def authorize_user
    unless @product.user == current_user
      redirect_to products_path, alert: "You are not authorized to perform this action."
    end
  end

  # Handle invalid product IDs (similar to invalid_cart in CartsController)
  def invalid_product
    logger.error "Attempt to access invalid product #{params[:id]}"
    redirect_to products_path, notice: "That product doesn't exist"
  end
end