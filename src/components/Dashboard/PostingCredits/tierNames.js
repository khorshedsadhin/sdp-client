// Display-only tier names for the standard bundle sizes, mirroring the
// Basic/Standard/Premium naming used for subscription plans elsewhere in the
// dashboard. bundleOptions itself stays a plain number array on the backend,
// so an unlisted quantity simply renders without a tier badge.
export const TIER_NAMES = { 3: "Basic", 5: "Standard", 10: "Premium" };
