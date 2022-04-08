import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';

import {AuthorizationGuard} from "../../auth/authorization.guard"
import { PurchasesService } from 'src/services/purchases.service';

import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Purchase } from '../models/purchase';
import { ProductsService } from 'src/services/products.service';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';

@Resolver(() => Purchase)
export class PurchaseResolver {
    constructor(
        private purchasesService: PurchasesService,
        private productsServicce: ProductsService,
        private customersService: CustomersService
    ){}

    @Query(() => [Purchase])
    @UseGuards(AuthorizationGuard)
    purchases(){
        return this.purchasesService.listAllPurchases()
    }

    @ResolveField()
    product(@Parent() purchase: Purchase){
        return this.productsServicce.getProductById(purchase.productId )
    }

    @Mutation(() => Purchase)
    @UseGuards(AuthorizationGuard)
    async createPurchase(
        @Args('data') data: CreatePurchaseInput, 
        @CurrentUser() user: AuthUser
    ) {
        console.log(user)
        let customer = await this.customersService.getCustomerByAuthUserid(
            user.sub
        );
        console.log(customer)
        if(!customer){
            customer = await this.customersService.createCustomer({
                authUserId: user.sub
            })
        }

        return this.purchasesService.createPurchase({
            customerId: customer.id,
            productId: data.productId
        })
    }
}
