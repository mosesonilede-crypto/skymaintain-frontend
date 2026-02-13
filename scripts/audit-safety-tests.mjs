import fs from "fs";
import path from "path";

const fixturesDir = path.resolve("tests/audit/fixtures");
const fixtures = ["scenario-a.json", "scenario-b.json", "scenario-c.json"];

function loadFixture(name) {
    const raw = fs.readFileSync(path.join(fixturesDir, name), "utf8");
    return JSON.parse(raw);
}

function evaluateRuleDecision(ruleInputs) {
    const hits = [];
    if (ruleInputs.mandatedIntervalHit) hits.push("MANDATED_INTERVAL_REACHED");
    if (
        typeof ruleInputs.remainingHours === "number" &&
        typeof ruleInputs.hardTimeThresholdHours === "number" &&
        ruleInputs.remainingHours <= ruleInputs.hardTimeThresholdHours
    ) {
        hits.push("HARD_TIME_HOURS_THRESHOLD_REACHED");
    }
    if (
        typeof ruleInputs.remainingCycles === "number" &&
        typeof ruleInputs.hardTimeThresholdCycles === "number" &&
        ruleInputs.remainingCycles <= ruleInputs.hardTimeThresholdCycles
    ) {
        hits.push("HARD_TIME_CYCLES_THRESHOLD_REACHED");
    }
    return hits.length > 0 ? "AUTHORITATIVE_REQUIRED" : "ADVISORY_ONLY";
}

function validateDecisionEvent(payload) {
    if (!payload.advisory || payload.advisory.label !== "ADVISORY_ONLY") {
        return { ok: false, reason: "Missing ADVISORY_ONLY label" };
    }
    if (!payload.acknowledgement?.acknowledgedBy || !payload.acknowledgement?.acknowledgedAt) {
        return { ok: false, reason: "Missing acknowledgement" };
    }
    const ruleOutcome = evaluateRuleDecision(payload.ruleInputs || {});
    if (ruleOutcome === "AUTHORITATIVE_REQUIRED" && payload.disposition !== "COMPLY") {
        return { ok: false, reason: "Rule primacy violated" };
    }
    if (payload.disposition !== "COMPLY" && !payload.overrideRationale) {
        return { ok: false, reason: "Missing override rationale" };
    }
    if (payload.disposition === "WORK_ORDER" && payload.canCreateWorkorder !== true) {
        return { ok: false, reason: "No workorder permission" };
    }
    return { ok: true, ruleOutcome };
}

let failed = false;

for (const fixture of fixtures) {
    const payload = loadFixture(fixture);
    const result = validateDecisionEvent(payload);
    if (!result.ok) {
        failed = true;
        console.error(`[FAIL] ${fixture}: ${result.reason}`);
    } else {
        console.log(`[PASS] ${fixture} (ruleOutcome=${result.ruleOutcome})`);
    }
}

process.exit(failed ? 1 : 0);
