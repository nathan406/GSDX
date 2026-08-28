import { NextResponse } from "next/server";
import {
  megaProjectById,
  megaLedger,
  megaChangeRequest,
  megaAnomalyFlag,
  megaPrivateSectorDisbursements,
  megaDistributionStatus,
  demoCitizensForMegaProject,
  DISTRIBUTION_REASONS,
  CAPITAL_STRUCTURE,
  PRIVATE_SECTOR_SPLIT,
} from "@/lib/data";

export async function GET(_request, { params }) {
  const mp = megaProjectById(params.id);
  if (!mp) {
    return NextResponse.json({ error: "Mega-project not found" }, { status: 404 });
  }
  return NextResponse.json({
    megaProject: mp,
    capitalStructure: CAPITAL_STRUCTURE,
    privateSectorSplit: PRIVATE_SECTOR_SPLIT,
    ledger: megaLedger(mp),
    changeRequest: megaChangeRequest(mp),
    anomalyFlag: megaAnomalyFlag(mp),
    distributionStatus: megaDistributionStatus(mp),
    privateSectorDisbursements: megaPrivateSectorDisbursements(mp),
    distributionReasons: DISTRIBUTION_REASONS,
    demoCitizens: demoCitizensForMegaProject(mp.id),
  });
}
