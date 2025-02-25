import { integer, relationship, select, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import { isSignedIn, rules } from "../access";

export const Product = list({
  access: {
    create: isSignedIn,
    read: rules.canReadProducts,
    delete: rules.canManageProducts,
    update: rules.canManageProducts,
  },
  fields: {
    name: text({ isRequired: true }),
    status: select({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" },
      ],
      defaultValue: "DRAFT",
      ui: {
        displayMode: "segmented-control",
        createView: { fieldMode: "hidden" },
      },
    }),
    photo: relationship({
      ref: "ProductImage.product",
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
    user: relationship({
      ref: "User.products",
      defaultValue: ({ context }) => ({
        connect: { id: context.session.itemId },
      }),
    }),
  },
});
