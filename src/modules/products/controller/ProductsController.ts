import CreateProductService from "@modules/products/service/CreateProductService";
import DeleteProductService from "@modules/products/service/DeleteProductService";
import ListProductService from "@modules/products/service/ListProductService";
import ShowProductService from "@modules/products/service/ShowProductService";
import UpdateProductService from "@modules/products/service/UpdateProductService";
import { Request, Response } from "express";

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProductService = new ListProductService();

    const products = await listProductService.execute();
    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProductService = new ShowProductService();

    const product = await showProductService.execute({ id });
    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name, price, quantity
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params; 
    const updateProductService = new UpdateProductService();

    const product = await updateProductService.execute({
      id, name, price, quantity
    });

    return response.json(product);
  }


  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute({ id });


    return response.json([]);
  }
}
