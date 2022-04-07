import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';

import {AuthorizationGuard} from "../../auth/authorization.guard"
import { ProductsService } from '../../../services/products.service';

import {Product} from "../models/product"

@Resolver()
export class ProductsResolver {
    constructor(private productsService: ProductsService){}

    @Query(() => [Product])
    // @UseGuards(AuthorizationGuard)
    products() {
        return this.productsService.listAllProducts()
    }
}
