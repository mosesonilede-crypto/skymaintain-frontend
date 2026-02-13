import BackToHub from "@/components/app/BackToHub";
import { INGESTION_CONTRACTS } from "@/lib/ingestion/contracts";

export default function IngestionContractsPage() {
    return (
        <section className="flex flex-col gap-6">
            <BackToHub title="Ingestion Contracts" />

            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Ingestion Contracts</h1>
                <p className="mt-2 text-sm text-slate-600">
                    Authoritative ingestion boundaries for data acquisition &amp; contextualization. No recommendations are
                    generated at ingestion time.
                </p>
            </div>

            <div className="space-y-6">
                {INGESTION_CONTRACTS.map((contract) => (
                    <div key={contract.source} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-semibold text-slate-900">{contract.source}</h2>
                            <p className="text-sm text-slate-600">{contract.description}</p>
                            <p className="text-xs text-slate-500">
                                Required identifiers: {contract.requiredIdentifiers.join(", ")}
                            </p>
                        </div>

                        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                    <tr>
                                        <th className="px-4 py-3">Field</th>
                                        <th className="px-4 py-3">Type</th>
                                        <th className="px-4 py-3">Units</th>
                                        <th className="px-4 py-3">Required</th>
                                        <th className="px-4 py-3">Validation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contract.fields.map((field) => (
                                        <tr key={field.field} className="border-t border-slate-200">
                                            <td className="px-4 py-3 font-medium text-slate-900">{field.field}</td>
                                            <td className="px-4 py-3 text-slate-600">{field.type}</td>
                                            <td className="px-4 py-3 text-slate-600">{field.units ?? "—"}</td>
                                            <td className="px-4 py-3 text-slate-600">{field.required ? "Yes" : "No"}</td>
                                            <td className="px-4 py-3 text-slate-600">{field.validation}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
