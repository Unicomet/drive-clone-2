export default function SandBoxStripePage() {
  return (
    <>
      <div>Stripe Sandbox</div>
      <form
        action={"/api/products/starter-d1cb1df/create-checkout-session"}
        method="POST"
      >
        <input
          type="hidden"
          id="lookup_key"
          name="lookup_key"
          value="starter-d1cb1df"
        />
        <button id="checkout-and-portal-button" type="submit">
          Checkout
        </button>
      </form>
    </>
  );
}
