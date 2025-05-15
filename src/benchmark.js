/**
 * estimatePiPercentile(n)
 *
 * Analytically estimates the percentile rank (0–100) of a user
 * who can recall n digits of π, based on a logistic fit
 * to SurveyMonkey/FiveThirtyEight data.
 *
 * Model: P(n) = 1 / (1 + exp(-k*(n - n0))) * 100
 *
 * Reference:
 * - FiveThirtyEight SurveyMonkey poll (n≈941)
 * - Logistic function overview
 */
export function estimatePercentile(n) {
  const k  = 0.6152038606077862;  // curve steepness
  const n0 = 3.486871308901414;  // midpoint (50th percentile)
  // Compute percentile
  const pct = 1 / (1 + Math.exp(-k * (n - n0))) * 100;
  // Clamp to [0,100]
  return Math.max(0, Math.min(100, pct));
}
