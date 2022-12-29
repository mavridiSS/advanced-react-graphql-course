import { integer, relationship, select, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const OrderItem = list({
  // access
  fields: {
    name: text({ isRequired: true }),
    photo: relationship({
      ref: "ProductImage",
      ui: {
        displayMode: "cards",
        cardFields: ["image", "altText"],
        inlineCreate: { fields: ["image", "altText"] },
        inlineEdit: { fields: ["image", "altText"] },
      },
    }),
    price: integer(),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
    quantity: integer(),
    order: relationship({ ref: "Order.items" }),
  },
});
