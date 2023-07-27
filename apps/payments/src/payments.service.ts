import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { ConfigService } from '@nestjs/config';
import { CreateChargeDto } from '@app/common/dto/create-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly configService: ConfigService) {}
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2022-11-15',
    },
  );

  async createCharge({ amount }: CreateChargeDto) {
    return this.stripe.paymentIntents.create({
      amount: amount * 100,
      payment_method: 'pm_card_visa',
      confirm: true,
      currency: 'usd',
    });
  }
}
