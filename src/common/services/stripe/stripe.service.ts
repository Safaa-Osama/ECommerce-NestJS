import Stripe from 'stripe';
import { Injectable } from '@nestjs/common';
import { metadata } from 'reflect-metadata/no-conflict';

@Injectable({})
export class StripeService {

    private readonly stripe = new Stripe(process.env.STRIPE_SECRET!)
    constructor() { }

    createCgeckoutSeasion = async function () {

        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            customer_email: "",
            metadata: {},
            success_url: "http://localhost:3000/order/success",
            cancel_url: "http://localhost:3000/order/failure",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "",
                            images: [],
                            description: "",
                        },
                        unit_amount: 0,
                    },
                    quantity: 0,
                }
            ]

        })

        return session;

    }

}

