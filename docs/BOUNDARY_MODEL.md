# Four-Layer Boundary Model

This platform separates the maintenance lifecycle into four explicit boundaries:

1. **Data Acquisition & Contextualization**
   - Collects and normalizes inputs only (no recommendations).
   - Implemented via ingestion contracts and `/api/ingestion`.

2. **Advisory Analytical Synthesis**
   - Generates advisory outputs marked `ADVISORY_ONLY`.
   - Uses `PolicyStampedAdvisory` schema with no execution rights.

3. **Deterministic Rule-Governed Decision Authority**
   - Rule engine enforces AMM/AD/MEL primacy.
   - Implemented via `RuleEngineDecision` in decision events.

4. **Traceability & Audit Interface**
   - Immutable decision events + export endpoints.
   - Implemented via `/api/decision-events` and `/api/decision-events/export`.
