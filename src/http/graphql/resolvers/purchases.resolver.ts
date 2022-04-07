import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import {AuthorizationGuard} from "../../auth/authorization.guard"
import { PurchasesService } from 'src/services/purchases.service';

import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import {Product} from "../models/product"
import { Purchase } from '../models/purchase';
import { ProductsService } from 'src/services/products.service';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

@Resolver(() => Purchase)
export class PurchaseResolver {
    constructor(
        private purchasesService: PurchasesService,
        private productsServicce: ProductsService
    ){}

    @Query(() => [Purchase])
    // @UseGuards(AuthorizationGuard)
    purchases(){
        return this.purchasesService.listAllPurchases()
    }

    @ResolveField()
    product(@Parent() purchase: Purchase){
        return this.productsServicce.getProductById(purchase.productId )
    }

    @Mutation(() => Purchase)
    @UseGuards(AuthorizationGuard)
    createPurchase(@Args('data') data: CreatePurchaseInput, 
    @CurrentUser() user: AuthUser) {
        console.log(user.sub)
        return null
        // return this.purchasesService.createPurchase({
        //     productId: data.productId
        // })
    }
}
