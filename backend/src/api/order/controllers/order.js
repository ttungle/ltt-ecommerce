const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

("use strict");

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    try {
      const { email, name, phone, address, city, cartItems, paymentMethod } =
        ctx.request.body;

      let session;
      console.log(email, name, phone, address, city, cartItems, paymentMethod);
      if (paymentMethod !== "cash") {
        const lineItems = await Promise.all(
          cartItems.map(async (item) => {
            const product = await strapi
              .service("api::product.product")
              .findOne(item.id);

            return {
              price_data: {
                currency: "usd",
                unit_amount: product.salePrice * 100,
                product_data: {
                  name: product.name,
                  description: product.description,
                  metadata: {
                    size: item.size,
                  },
                },
              },
              quantity: item.quantity,
            };
          })
        );

        session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          customer_email: email,
          line_items: lineItems,
          mode: "payment",
          success_url: `${process.env.CLIENT_URL}/checkout/success`,
          cancel_url: `${process.env.CLIENT_URL}/checkout`,
        });
      }

      await strapi.service("api::order.order").create({
        data: {
          email,
          name,
          phone,
          address,
          city,
          paymentMethod,
          products: cartItems,
          stripeId: session?.id,
        },
      });

      return { status: "success", paymentMethod, stripeSession: session };
    } catch (err) {
      console.log(err);
      ctx.response.status = 500;
      return err;
    }
  },
}));
