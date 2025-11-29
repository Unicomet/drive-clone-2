import { env } from "~/env";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function SandBoxStripePage() {
  const publishableKey = env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const pricingTableId = env.NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID;

  return (
    <>
      <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
      <div>Stripe Sandbox</div>
      <form
        action={"/api/products/starter-d1cb1df/create-checkout-session"}
        method="POST"
      >
        <input
          type="hidden"
          id="lookup_key"
          name="lookup_key"
          value="starter_monthly"
        />
        <button id="checkout-and-portal-button" type="submit">
          Checkout
        </button>
      </form>
      <stripe-pricing-table
        pricing-table-id={pricingTableId}
        publishable-key={publishableKey}
        client-reference-id="user_1234"
      ></stripe-pricing-table>
    </>
  );
}
