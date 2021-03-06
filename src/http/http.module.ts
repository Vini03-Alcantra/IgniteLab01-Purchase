import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {GraphQLModule} from "@nestjs/graphql"
import path from "node:path"
import {CustomersService} from "../services/customers.service"
import { DatabaseModule } from 'src/database/database.module';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { ProductsResolver } from './graphql/resolvers/products.resolver'; 
import { PurchaseResolver } from './graphql/resolvers/purchases.resolver';
import { CustomersResolver } from './graphql/resolvers/customers.resolver';
import { MessagingModule } from 'src/messaging/messaging.module';
@Module({
    imports: [
        ConfigModule.forRoot(), 
        DatabaseModule,
        MessagingModule,
        GraphQLModule.forRoot<ApolloFederationDriverConfig>({
            driver: ApolloFederationDriver,
            autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql')
        })
    ],
    providers: [
        //Resolvers
        ProductsResolver,         
        PurchaseResolver,
        CustomersResolver,

        // Servies
        ProductsService,
        PurchasesService,
        CustomersService
    ]
})
export class HttpModule {}
