import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import {AuthorizationGuard} from "../../auth/authorization.guard"
import { ProductsService } from '../../../services/products.service';

import { CreateProductInput } from '../inputs/create-product-input';
import {Product} from "../models/product"
import { Customer } from '../models/customer';
import { CustomersService } from 'src/services/customers.service';
import { AuthUser, CurrentUser } from 'src/http/auth/current-user';

@Resolver(() => Customer)
export class CustomersResolver {
    constructor(private customerService: CustomersService){}

    @UseGuards(AuthorizationGuard)
    @Query(() => Customer)
    me(@CurrentUser() user: AuthUser){
        return this.customerService.getCustomerByAuthUserid(user.sub)
    }
}
