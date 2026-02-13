create table if not exists decision_event (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    advisory jsonb not null,
    authoritative_sources text[] not null,
    acknowledgement jsonb not null,
    disposition text not null,
    override_rationale text,
    rule_decision jsonb not null,
    user_action text not null,
    can_create_workorder boolean not null default false
);

create index if not exists decision_event_created_at_idx on decision_event (created_at desc);
