# Audit-Safety Test Suite

This suite validates the hard separation between advisory analytics and authoritative rule governance.

## Hazard Checks (Pass/Fail)
1. **Analytics override rule output**
   - **Pass**: Decision is rejected if rule engine flags AUTHORITATIVE_REQUIRED and disposition is not COMPLY.
   - **Fail**: Any advisory-driven disposition overrides rule requirements.

2. **Logging failure**
   - **Pass**: Decision event creation fails closed when acknowledgment is missing.
   - **Fail**: Decision event is stored without acknowledgment.

3. **Ingestion corruption**
   - **Pass**: Ingestion payload with `recommendation` or `workOrder` keys is rejected and logged.
   - **Fail**: Ingestion accepts advisory or work-order content.

## Scenario Validations
A. Scheduled task, no advisory trigger
- Advisory only with COMPLY disposition allowed.

B. Advisory predicts issue but no compliance trigger → human review required
- Advisory recorded, requires acknowledgement, disposition may be MONITOR/SCHEDULE with rationale.

C. Corrupted input → advisory suppressed, audit recorded
- Ingestion rejects payload, audit event captures rejection.

## How to Run
- `npm run audit-safety-test`
