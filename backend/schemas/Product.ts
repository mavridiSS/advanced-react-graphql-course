import { integer, select, text } from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";

export const Product = list({
  // access
  fields: {
    name: text({ isRequired: true }),
    status: select({
      options: [
        { label: "Draft", value: "DRAFT" },
        { label: "Available", value: "AVAILABLE" },
        { label: "Unavailable", value: "UNAVAILABLE" },
      ],
      defaultValue: "DRAFT",
    }),
    price: integer(),
    description: text({
      ui: {
        displayMode: "textarea",
      },
    }),
  },
});
