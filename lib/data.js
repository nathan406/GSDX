// GSDX in-memory data layer.
// In production this would be replaced by a real database (Postgres, etc).
// The shape is kept intentionally simple so it can be swapped out later.

export const regions = ["Africa", "Asia", "Latin America & Caribbean", "Middle East", "Pacific"];

export const countries = [
  { slug: "zambia", name: "Zambia", region: "Africa", priorities: ["Energy", "Agriculture", "Healthcare", "Manufacturing", "Digital infrastructure"], readiness: 74 },
  { slug: "malawi", name: "Malawi", region: "Africa", priorities: ["Agriculture", "Energy", "Education", "Transportation", "Healthcare"], readiness: 61 },
  { slug: "kenya", name: "Kenya", region: "Africa", priorities: ["Digital infrastructure", "Energy", "Manufacturing", "Healthcare", "Transportation"], readiness: 82 },
  { slug: "ghana", name: "Ghana", region: "Africa", priorities: ["Manufacturing", "Energy", "Agriculture", "Technology", "Infrastructure"], readiness: 69 },
  { slug: "tanzania", name: "Tanzania", region: "Africa", priorities: ["Transportation", "Energy", "Agriculture", "Manufacturing", "Healthcare"], readiness: 63 },
  { slug: "uganda", name: "Uganda", region: "Africa", priorities: ["Agriculture", "Energy", "Healthcare", "Digital infrastructure", "Education"], readiness: 59 },
  { slug: "rwanda", name: "Rwanda", region: "Africa", priorities: ["Technology", "Digital infrastructure", "Manufacturing", "Healthcare", "Energy"], readiness: 77 },
  { slug: "senegal", name: "Senegal", region: "Africa", priorities: ["Energy", "Infrastructure", "Agriculture", "Manufacturing", "Digital infrastructure"], readiness: 65 },
  { slug: "nepal", name: "Nepal", region: "Asia", priorities: ["Hydro energy", "Transportation", "Agriculture", "Education", "Healthcare"], readiness: 58 },
  { slug: "bangladesh", name: "Bangladesh", region: "Asia", priorities: ["Manufacturing", "Digital infrastructure", "Transportation", "Healthcare", "Energy"], readiness: 71 },
  { slug: "pakistan", name: "Pakistan", region: "Asia", priorities: ["Energy", "Agriculture", "Infrastructure", "Manufacturing", "Healthcare"], readiness: 60 },
  { slug: "vietnam", name: "Vietnam", region: "Asia", priorities: ["Manufacturing", "Technology", "Infrastructure", "Energy", "Agriculture"], readiness: 80 },
  { slug: "philippines", name: "Philippines", region: "Asia", priorities: ["Digital infrastructure", "Infrastructure", "Manufacturing", "Energy", "Healthcare"], readiness: 73 },
  { slug: "sri-lanka", name: "Sri Lanka", region: "Asia", priorities: ["Agriculture", "Infrastructure", "Manufacturing", "Technology", "Transportation"], readiness: 67 },
  { slug: "jamaica", name: "Jamaica", region: "Latin America & Caribbean", priorities: ["Energy", "Digital infrastructure", "Agriculture", "Transportation", "Healthcare"], readiness: 66 },
  { slug: "bolivia", name: "Bolivia", region: "Latin America & Caribbean", priorities: ["Energy", "Agriculture", "Manufacturing", "Infrastructure", "Healthcare"], readiness: 55 },
  { slug: "honduras", name: "Honduras", region: "Latin America & Caribbean", priorities: ["Agriculture", "Manufacturing", "Energy", "Infrastructure", "Education"], readiness: 57 },
  { slug: "peru", name: "Peru", region: "Latin America & Caribbean", priorities: ["Manufacturing", "Energy", "Agriculture", "Infrastructure", "Technology"], readiness: 70 },
  { slug: "jordan", name: "Jordan", region: "Middle East", priorities: ["Energy", "Digital infrastructure", "Manufacturing", "Healthcare", "Education"], readiness: 68 },
  { slug: "fiji", name: "Fiji", region: "Pacific", priorities: ["Agriculture", "Infrastructure", "Energy", "Transportation", "Healthcare"], readiness: 64 },
];

export const sectors = [
  "Energy",
  "Agriculture",
  "Infrastructure",
  "Healthcare",
  "Manufacturing",
  "Technology",
  "Hydro energy",
  "Digital infrastructure",
  "Transportation",
  "Education",
];

// Project lifecycle stages, in order.
export const stages = [
  "Idea",
  "Project submission",
  "Country review",
  "Verification",
  "Due diligence",
  "Development assessment",
  "Investment ready",
  "Capital matching",
  "Financing",
  "Implementation",
  "Monitoring",
  "Completion",
  "Impact measurement",
];

// Derives a plausible 8-part readiness breakdown from one overall score,
// rather than hand-authoring eight numbers for every project.
function breakdown(base) {
  const clamp = (n) => Math.max(5, Math.min(99, n));
  return {
    financial: clamp(base - 3),
    technical: clamp(base + 4),
    legal: clamp(base - 5),
    government: clamp(base + 2),
    market: clamp(base + 1),
    execution: clamp(base - 6),
    impact: clamp(base + 6),
    environmental: clamp(base - 1),
  };
}

const rawProjects = [
  // Zambia
  { id: "zmb-solar-01", name: "Lusaka South Solar Array", country: "zambia", sector: "Energy", stage: "Capital matching", amountRequested: 32_000_000, readiness: 87, jobsExpected: 350, capacityMW: 50, summary: "Utility-scale solar generation and rural electrification lines serving southern Zambia." },
  { id: "zmb-irrigation-02", name: "Kafue Basin Irrigation Modernization", country: "zambia", sector: "Agriculture", stage: "Investment ready", amountRequested: 12_500_000, readiness: 79, jobsExpected: 1200, summary: "Modernized irrigation and storage infrastructure for smallholder cooperatives along the Kafue basin." },
  { id: "zmb-health-03", name: "Copperbelt Regional Clinics Network", country: "zambia", sector: "Healthcare", stage: "Due diligence", amountRequested: 9_800_000, readiness: 66, jobsExpected: 210, summary: "A network of primary-care clinics and a shared logistics hub serving Copperbelt mining communities." },

  // Malawi
  { id: "mwi-agri-01", name: "Shire Valley Agro-Processing Hub", country: "malawi", sector: "Agriculture", stage: "Investment ready", amountRequested: 8_200_000, readiness: 72, jobsExpected: 640, summary: "Processing and cold-storage facility for smallholder maize and legume cooperatives." },
  { id: "mwi-energy-02", name: "Lilongwe Mini-Grid Electrification", country: "malawi", sector: "Energy", stage: "Development assessment", amountRequested: 14_000_000, readiness: 55, jobsExpected: 190, summary: "Solar mini-grids extending reliable power to peri-urban districts around Lilongwe." },
  { id: "mwi-transit-03", name: "Blantyre-Lilongwe Road Corridor", country: "malawi", sector: "Transportation", stage: "Country review", amountRequested: 26_000_000, readiness: 41, jobsExpected: 800, summary: "Rehabilitation of the primary freight corridor connecting Malawi's two largest cities." },

  // Kenya
  { id: "ken-tech-01", name: "Nairobi Tier III Data Center", country: "kenya", sector: "Technology", stage: "Financing", amountRequested: 45_000_000, readiness: 91, jobsExpected: 210, summary: "Regional data infrastructure supporting East African digital services and cloud connectivity." },
  { id: "ken-health-02", name: "Rift Valley Regional Hospital Network", country: "kenya", sector: "Healthcare", stage: "Implementation", amountRequested: 28_000_000, readiness: 84, jobsExpected: 640, completion: 41, summary: "Four-facility regional hospital network with attached training and pharmaceutical distribution hub." },
  { id: "ken-energy-03", name: "Turkana Geothermal Extension", country: "kenya", sector: "Energy", stage: "Investment ready", amountRequested: 38_000_000, readiness: 80, jobsExpected: 300, capacityMW: 65, summary: "Expansion of geothermal generation capacity in the Turkana rift corridor." },

  // Ghana
  { id: "gha-manuf-01", name: "Tema Industrial Park Expansion", country: "ghana", sector: "Manufacturing", stage: "Due diligence", amountRequested: 19_000_000, readiness: 68, jobsExpected: 900, summary: "Expansion of processing and light-manufacturing capacity for export-oriented cooperatives near Tema port." },
  { id: "gha-energy-02", name: "Accra Rooftop Solar Program", country: "ghana", sector: "Energy", stage: "Capital matching", amountRequested: 11_000_000, readiness: 74, jobsExpected: 260, capacityMW: 20, summary: "Distributed rooftop solar for public buildings and commercial districts in Accra." },
  { id: "gha-tech-03", name: "Kumasi Digital Skills & Innovation Hub", country: "ghana", sector: "Technology", stage: "Project submission", amountRequested: 4_500_000, readiness: 33, jobsExpected: 150, summary: "A training and incubation facility for software and digital-services entrepreneurs." },

  // Tanzania
  { id: "tza-transit-01", name: "Dar es Salaam Bus Rapid Transit Extension", country: "tanzania", sector: "Transportation", stage: "Investment ready", amountRequested: 34_000_000, readiness: 75, jobsExpected: 1100, summary: "New BRT corridors reducing commute times across greater Dar es Salaam." },
  { id: "tza-energy-02", name: "Rufiji Solar-Hydro Hybrid Plant", country: "tanzania", sector: "Energy", stage: "Development assessment", amountRequested: 42_000_000, readiness: 52, jobsExpected: 310, capacityMW: 55, summary: "Combined solar and small-hydro generation for the Rufiji river basin." },
  { id: "tza-agri-03", name: "Morogoro Grain Storage Network", country: "tanzania", sector: "Agriculture", stage: "Verification", amountRequested: 6_700_000, readiness: 47, jobsExpected: 420, summary: "Regional grain silos and drying facilities to reduce post-harvest loss." },

  // Uganda
  { id: "uga-agri-01", name: "Northern Uganda Cassava Processing", country: "uganda", sector: "Agriculture", stage: "Investment ready", amountRequested: 5_300_000, readiness: 69, jobsExpected: 580, summary: "Processing facility converting cassava into flour and industrial starch for export." },
  { id: "uga-energy-02", name: "Karamoja Solar Mini-Grids", country: "uganda", sector: "Energy", stage: "Due diligence", amountRequested: 9_100_000, readiness: 61, jobsExpected: 140, summary: "Off-grid solar electrification for underserved districts in the Karamoja sub-region." },
  { id: "uga-health-03", name: "Kampala Maternal Health Network", country: "uganda", sector: "Healthcare", stage: "Country review", amountRequested: 7_800_000, readiness: 38, jobsExpected: 260, summary: "Maternal and neonatal care facilities linked to a shared referral network." },

  // Rwanda
  { id: "rwa-tech-01", name: "Kigali Innovation City Phase II", country: "rwanda", sector: "Technology", stage: "Financing", amountRequested: 22_000_000, readiness: 88, jobsExpected: 480, summary: "Second-phase build-out of Rwanda's flagship technology and applied-sciences campus." },
  { id: "rwa-digital-02", name: "Rwanda National Fiber Backbone", country: "rwanda", sector: "Digital infrastructure", stage: "Capital matching", amountRequested: 15_500_000, readiness: 81, jobsExpected: 220, summary: "Nationwide fiber backbone extending broadband to secondary cities and districts." },
  { id: "rwa-manuf-03", name: "Bugesera Agro-Manufacturing Zone", country: "rwanda", sector: "Manufacturing", stage: "Investment ready", amountRequested: 13_000_000, readiness: 73, jobsExpected: 700, summary: "A dedicated processing zone linking Bugesera farms to export markets." },

  // Senegal
  { id: "sen-energy-01", name: "Saint-Louis Offshore Wind Pilot", country: "senegal", sector: "Energy", stage: "Development assessment", amountRequested: 29_000_000, readiness: 56, jobsExpected: 190, capacityMW: 40, summary: "Senegal's first offshore wind pilot, sited off the Saint-Louis coastline." },
  { id: "sen-infra-02", name: "Dakar Regional Port Access Roads", country: "senegal", sector: "Infrastructure", stage: "Investment ready", amountRequested: 31_000_000, readiness: 70, jobsExpected: 950, summary: "New access roads relieving freight congestion around the Port of Dakar." },
  { id: "sen-agri-03", name: "Casamance Rice Value Chain", country: "senegal", sector: "Agriculture", stage: "Due diligence", amountRequested: 8_600_000, readiness: 64, jobsExpected: 510, summary: "Milling and storage infrastructure for the Casamance rice-growing region." },

  // Nepal
  { id: "npl-hydro-01", name: "Karnali Run-of-River Hydro", country: "nepal", sector: "Hydro energy", stage: "Development assessment", amountRequested: 60_000_000, readiness: 58, jobsExpected: 480, capacityMW: 90, summary: "Run-of-river hydro generation intended to supply both domestic grid capacity and regional export." },
  { id: "npl-transit-02", name: "Kathmandu-Pokhara Highway Upgrade", country: "nepal", sector: "Transportation", stage: "Investment ready", amountRequested: 48_000_000, readiness: 62, jobsExpected: 1300, summary: "Widening and resilience upgrades along Nepal's busiest tourism and freight corridor." },
  { id: "npl-edu-03", name: "Karnali Girls' Secondary Schools Initiative", country: "nepal", sector: "Education", stage: "Verification", amountRequested: 5_400_000, readiness: 44, jobsExpected: 300, summary: "New secondary-school facilities and boarding capacity for girls in the Karnali highlands." },

  // Bangladesh
  { id: "bgd-transit-01", name: "Chattogram Freight Rail Upgrade", country: "bangladesh", sector: "Transportation", stage: "Investment ready", amountRequested: 75_000_000, readiness: 76, jobsExpected: 1500, summary: "Freight rail capacity upgrade linking inland manufacturing zones to Chattogram port." },
  { id: "bgd-manuf-02", name: "Dhaka Export Garment Cluster Modernization", country: "bangladesh", sector: "Manufacturing", stage: "Capital matching", amountRequested: 26_000_000, readiness: 78, jobsExpected: 2200, summary: "Safety and efficiency modernization across a cluster of export garment factories." },
  { id: "bgd-digital-03", name: "Sylhet Digital Payments Infrastructure", country: "bangladesh", sector: "Digital infrastructure", stage: "Financing", amountRequested: 9_700_000, readiness: 85, jobsExpected: 180, summary: "Interoperable digital payments rails extending mobile banking to rural Sylhet." },

  // Pakistan
  { id: "pak-energy-01", name: "Sindh Solar Park Expansion", country: "pakistan", sector: "Energy", stage: "Investment ready", amountRequested: 40_000_000, readiness: 66, jobsExpected: 340, capacityMW: 75, summary: "Expansion of utility-scale solar capacity in the Sindh solar corridor." },
  { id: "pak-agri-02", name: "Punjab Water-Efficient Irrigation", country: "pakistan", sector: "Agriculture", stage: "Due diligence", amountRequested: 17_000_000, readiness: 58, jobsExpected: 890, summary: "Drip and precision irrigation retrofits across Punjab smallholder cooperatives." },
  { id: "pak-infra-03", name: "Karachi Coastal Flood Defense", country: "pakistan", sector: "Infrastructure", stage: "Country review", amountRequested: 33_000_000, readiness: 40, jobsExpected: 620, summary: "Coastal flood-defense infrastructure protecting low-lying Karachi districts." },

  // Vietnam
  { id: "vnm-manuf-01", name: "Haiphong Electronics Manufacturing Zone", country: "vietnam", sector: "Manufacturing", stage: "Financing", amountRequested: 55_000_000, readiness: 89, jobsExpected: 3100, summary: "A dedicated electronics assembly and component-manufacturing zone near Haiphong port." },
  { id: "vnm-tech-02", name: "Da Nang Software & BPO Campus", country: "vietnam", sector: "Technology", stage: "Capital matching", amountRequested: 18_000_000, readiness: 83, jobsExpected: 640, summary: "A software development and business-process campus anchoring Da Nang's tech sector." },
  { id: "vnm-energy-03", name: "Mekong Delta Floating Solar", country: "vietnam", sector: "Energy", stage: "Investment ready", amountRequested: 27_000_000, readiness: 77, jobsExpected: 210, capacityMW: 45, summary: "Floating solar arrays sited on irrigation reservoirs across the Mekong Delta." },

  // Philippines
  { id: "phl-digital-01", name: "Mindanao Broadband Expansion", country: "philippines", sector: "Digital infrastructure", stage: "Investment ready", amountRequested: 21_000_000, readiness: 72, jobsExpected: 260, summary: "Broadband backbone extension bringing reliable connectivity to Mindanao provinces." },
  { id: "phl-infra-02", name: "Cebu Inter-Island Port Upgrade", country: "philippines", sector: "Infrastructure", stage: "Due diligence", amountRequested: 36_000_000, readiness: 63, jobsExpected: 940, summary: "Capacity upgrades to inter-island ferry and cargo terminals serving Cebu." },
  { id: "phl-manuf-03", name: "Clark Freeport Electronics Assembly", country: "philippines", sector: "Manufacturing", stage: "Capital matching", amountRequested: 24_000_000, readiness: 79, jobsExpected: 1600, summary: "Electronics assembly lines within the Clark Freeport special economic zone." },

  // Sri Lanka
  { id: "lka-agri-01", name: "Central Highlands Tea Value Addition", country: "sri-lanka", sector: "Agriculture", stage: "Investment ready", amountRequested: 6_200_000, readiness: 68, jobsExpected: 380, summary: "Processing upgrades allowing highland tea cooperatives to export finished product directly." },
  { id: "lka-infra-02", name: "Colombo Port-City Access Corridor", country: "sri-lanka", sector: "Infrastructure", stage: "Development assessment", amountRequested: 44_000_000, readiness: 51, jobsExpected: 1050, summary: "Road and transit links connecting Colombo Port City to the wider metro area." },
  { id: "lka-tech-03", name: "Kandy Software Park", country: "sri-lanka", sector: "Technology", stage: "Project submission", amountRequested: 5_000_000, readiness: 29, jobsExpected: 220, summary: "A software and IT-services park intended to anchor Kandy's growing tech sector." },

  // Jamaica
  { id: "jam-energy-01", name: "Kingston Coastal Wind Cluster", country: "jamaica", sector: "Energy", stage: "Capital matching", amountRequested: 21_000_000, readiness: 72, jobsExpected: 180, capacityMW: 35, summary: "Coastal wind generation cluster designed to reduce fossil-fuel import dependency." },
  { id: "jam-digital-02", name: "Montego Bay Digital Services Hub", country: "jamaica", sector: "Digital infrastructure", stage: "Investment ready", amountRequested: 8_300_000, readiness: 70, jobsExpected: 240, summary: "A digital-services and BPO hub supporting Montego Bay's tourism-adjacent economy." },
  { id: "jam-agri-03", name: "South Coast Agro-Tourism Corridor", country: "jamaica", sector: "Agriculture", stage: "Due diligence", amountRequested: 4_100_000, readiness: 54, jobsExpected: 160, summary: "Farm-to-table infrastructure linking south-coast agriculture with the tourism sector." },

  // Bolivia
  { id: "bol-energy-01", name: "Altiplano Solar-Lithium Complex", country: "bolivia", sector: "Energy", stage: "Development assessment", amountRequested: 52_000_000, readiness: 49, jobsExpected: 260, capacityMW: 60, summary: "Solar generation co-located with lithium processing infrastructure on the Altiplano." },
  { id: "bol-agri-02", name: "Santa Cruz Soy Processing Modernization", country: "bolivia", sector: "Agriculture", stage: "Investment ready", amountRequested: 11_500_000, readiness: 65, jobsExpected: 470, summary: "Modernized processing capacity for Santa Cruz soy cooperatives." },
  { id: "bol-manuf-03", name: "El Alto Textile Manufacturing Zone", country: "bolivia", sector: "Manufacturing", stage: "Country review", amountRequested: 7_000_000, readiness: 37, jobsExpected: 390, summary: "A textile manufacturing zone intended to formalize El Alto's informal garment sector." },

  // Honduras
  { id: "hnd-agri-01", name: "Sula Valley Cold Chain Network", country: "honduras", sector: "Agriculture", stage: "Investment ready", amountRequested: 6_800_000, readiness: 63, jobsExpected: 340, summary: "Cold-storage and logistics network for Sula Valley fruit and vegetable exporters." },
  { id: "hnd-manuf-02", name: "San Pedro Sula Apparel Cluster", country: "honduras", sector: "Manufacturing", stage: "Capital matching", amountRequested: 9_400_000, readiness: 71, jobsExpected: 980, summary: "Modernization of an existing apparel manufacturing cluster near San Pedro Sula." },
  { id: "hnd-energy-03", name: "Cortes Solar & Storage Pilot", country: "honduras", sector: "Energy", stage: "Verification", amountRequested: 12_000_000, readiness: 42, jobsExpected: 120, capacityMW: 18, summary: "A solar-plus-storage pilot intended to stabilize grid supply in Cortes department." },

  // Peru
  { id: "per-manuf-01", name: "Arequipa Textile Export Zone", country: "peru", sector: "Manufacturing", stage: "Financing", amountRequested: 16_500_000, readiness: 82, jobsExpected: 1100, summary: "An alpaca and cotton textile export zone anchored in Arequipa." },
  { id: "per-energy-02", name: "Moquegua Solar-Mining Hybrid", country: "peru", sector: "Energy", stage: "Investment ready", amountRequested: 37_000_000, readiness: 74, jobsExpected: 290, capacityMW: 55, summary: "Solar generation supplying both grid capacity and nearby mining operations." },
  { id: "per-infra-03", name: "Amazon River Logistics Hub", country: "peru", sector: "Infrastructure", stage: "Due diligence", amountRequested: 20_000_000, readiness: 60, jobsExpected: 530, summary: "A river-freight logistics hub connecting Amazonian communities to national markets." },

  // Jordan
  { id: "jor-energy-01", name: "Ma'an Solar-Wind Complex", country: "jordan", sector: "Energy", stage: "Capital matching", amountRequested: 33_000_000, readiness: 78, jobsExpected: 260, capacityMW: 60, summary: "A combined solar and wind generation complex in Jordan's southern desert." },
  { id: "jor-digital-02", name: "Amman Fintech & Digital Services Zone", country: "jordan", sector: "Digital infrastructure", stage: "Investment ready", amountRequested: 10_200_000, readiness: 75, jobsExpected: 310, summary: "A fintech and digital-services free zone anchored in greater Amman." },
  { id: "jor-health-03", name: "Zarqa Regional Medical Center", country: "jordan", sector: "Healthcare", stage: "Due diligence", amountRequested: 14_500_000, readiness: 59, jobsExpected: 420, summary: "A regional medical center serving Zarqa and surrounding governorates." },

  // Fiji
  { id: "fji-agri-01", name: "Viti Levu Sugar-to-Bioenergy Conversion", country: "fiji", sector: "Agriculture", stage: "Development assessment", amountRequested: 9_600_000, readiness: 53, jobsExpected: 210, summary: "Converting surplus sugarcane byproduct into bioenergy generation capacity." },
  { id: "fji-infra-02", name: "Suva Coastal Resilience Infrastructure", country: "fiji", sector: "Infrastructure", stage: "Investment ready", amountRequested: 15_000_000, readiness: 68, jobsExpected: 340, summary: "Sea-wall and drainage upgrades protecting greater Suva from coastal flooding." },
  { id: "fji-energy-03", name: "Outer Islands Solar Microgrids", country: "fiji", sector: "Energy", stage: "Verification", amountRequested: 5_800_000, readiness: 45, jobsExpected: 90, capacityMW: 8, summary: "Standalone solar microgrids electrifying Fiji's outer island communities." },
];

export const projects = rawProjects.map((p) => ({
  ...p,
  currency: "USD",
  completion: p.completion ?? 0,
  readinessBreakdown: breakdown(p.readiness),
}));

// ---------------------------------------------------------------------------
// TRANSPARENCY & INVESTMENT LAYER
// ---------------------------------------------------------------------------
// GSDX's standard, publicly published allocation model — the same formula
// applies to every project so investors can verify where each dollar goes.
export const PROJECT_FUND_ALLOCATION = [
  { key: "implementation", label: "Direct project implementation", pct: 58 },
  { key: "localProcurement", label: "Local procurement & suppliers", pct: 14 },
  { key: "projectPreparation", label: "Project preparation & advisory", pct: 8 },
  { key: "monitoring", label: "Monitoring & public transparency reporting", pct: 5 },
  { key: "contingency", label: "Contingency reserve", pct: 9 },
  { key: "platform", label: "GSDX platform & coordination fee", pct: 6 },
];

// How capital contributed to a country's National Wealth Fund (rather than
// a single project) is allocated, per the GSDX National Wealth System.
export const COUNTRY_FUND_ALLOCATION = [
  { key: "priorityProjects", label: "Priority project financing", pct: 45 },
  { key: "servicesInvestment", label: "Healthcare & education investment", pct: 20 },
  { key: "reinvestment", label: "Reinvestment into productive assets", pct: 20 },
  { key: "dividendReserve", label: "Citizen development-dividend reserve", pct: 10 },
  { key: "oversight", label: "Administration & independent oversight", pct: 5 },
];

const investorNames = [
  "Meridian Pension Partners", "Highline Family Office", "Okoye Diaspora Fund",
  "Global South Impact Capital", "Baobab Sovereign Co-Investment", "Crestwater Foundation",
  "Tembo Institutional Partners", "Everline Development Bank", "Anchor Point Capital",
  "Lumen Frontier Markets Fund", "Coastal Diaspora Collective", "Vantage Public-Private Trust",
];

// Seed ledger of past investments/disbursements, shown publicly on the
// transparency page and rolled up into per-project and per-country totals.
export const investments = [
  { id: "inv-1001", date: "2026-02-11", investorName: "Meridian Pension Partners", type: "project", targetId: "zmb-solar-01", amount: 8_000_000 },
  { id: "inv-1002", date: "2026-03-02", investorName: "Lumen Frontier Markets Fund", type: "project", targetId: "zmb-solar-01", amount: 6_500_000 },
  { id: "inv-1003", date: "2026-01-22", investorName: "Okoye Diaspora Fund", type: "country-fund", targetId: "zambia", amount: 3_200_000 },
  { id: "inv-1004", date: "2026-04-14", investorName: "Everline Development Bank", type: "project", targetId: "ken-tech-01", amount: 15_000_000 },
  { id: "inv-1005", date: "2026-04-30", investorName: "Anchor Point Capital", type: "project", targetId: "ken-health-02", amount: 9_500_000 },
  { id: "inv-1006", date: "2026-02-19", investorName: "Tembo Institutional Partners", type: "country-fund", targetId: "kenya", amount: 5_000_000 },
  { id: "inv-1007", date: "2026-03-18", investorName: "Crestwater Foundation", type: "project", targetId: "rwa-tech-01", amount: 4_200_000 },
  { id: "inv-1008", date: "2026-05-06", investorName: "Vantage Public-Private Trust", type: "project", targetId: "rwa-digital-02", amount: 6_000_000 },
  { id: "inv-1009", date: "2026-01-09", investorName: "Baobab Sovereign Co-Investment", type: "country-fund", targetId: "rwanda", amount: 4_800_000 },
  { id: "inv-1010", date: "2026-03-27", investorName: "Global South Impact Capital", type: "project", targetId: "bgd-manuf-02", amount: 11_000_000 },
  { id: "inv-1011", date: "2026-04-02", investorName: "Coastal Diaspora Collective", type: "project", targetId: "bgd-digital-03", amount: 3_400_000 },
  { id: "inv-1012", date: "2026-02-25", investorName: "Highline Family Office", type: "project", targetId: "vnm-manuf-01", amount: 20_000_000 },
  { id: "inv-1013", date: "2026-05-15", investorName: "Everline Development Bank", type: "project", targetId: "vnm-tech-02", amount: 7_500_000 },
  { id: "inv-1014", date: "2026-01-30", investorName: "Meridian Pension Partners", type: "country-fund", targetId: "vietnam", amount: 6_000_000 },
  { id: "inv-1015", date: "2026-03-11", investorName: "Anchor Point Capital", type: "project", targetId: "per-manuf-01", amount: 6_800_000 },
  { id: "inv-1016", date: "2026-04-21", investorName: "Global South Impact Capital", type: "project", targetId: "jor-energy-01", amount: 12_000_000 },
  { id: "inv-1017", date: "2026-02-07", investorName: "Vantage Public-Private Trust", type: "country-fund", targetId: "jordan", amount: 2_500_000 },
  { id: "inv-1018", date: "2026-05-01", investorName: "Lumen Frontier Markets Fund", type: "project", targetId: "gha-energy-02", amount: 4_000_000 },
  { id: "inv-1019", date: "2026-03-30", investorName: "Crestwater Foundation", type: "project", targetId: "sen-infra-02", amount: 9_000_000 },
  { id: "inv-1020", date: "2026-04-09", investorName: "Tembo Institutional Partners", type: "project", targetId: "phl-manuf-03", amount: 10_500_000 },
  { id: "inv-1021", date: "2026-01-17", investorName: "Okoye Diaspora Fund", type: "country-fund", targetId: "jamaica", amount: 1_800_000 },
  { id: "inv-1022", date: "2026-05-20", investorName: "Baobab Sovereign Co-Investment", type: "project", targetId: "jam-energy-01", amount: 5_500_000 },
];

export function projectFundedAmount(projectId) {
  return investments
    .filter((i) => i.type === "project" && i.targetId === projectId)
    .reduce((sum, i) => sum + i.amount, 0);
}

export function countryFundedAmount(countrySlug) {
  return investments
    .filter((i) => i.type === "country-fund" && i.targetId === countrySlug)
    .reduce((sum, i) => sum + i.amount, 0);
}

export function transparencyTotals() {
  const totalMobilized = investments.reduce((sum, i) => sum + i.amount, 0);
  const toProjects = investments.filter((i) => i.type === "project").reduce((s, i) => s + i.amount, 0);
  const toCountryFunds = investments.filter((i) => i.type === "country-fund").reduce((s, i) => s + i.amount, 0);
  const investorCount = new Set(investments.map((i) => i.investorName)).size;
  return { totalMobilized, toProjects, toCountryFunds, investorCount, transactionCount: investments.length };
}

// NOTE: mutates the in-memory array for demo purposes only — swap for a
// real database with an audit trail in production.
export function recordInvestment({ investorName, type, targetId, amount }) {
  const record = {
    id: `inv-${Date.now()}`,
    date: new Date().toISOString().slice(0, 10),
    investorName,
    type,
    targetId,
    amount,
  };
  investments.unshift(record);
  return record;
}

export function scoreMatch(investorProfile, project) {
  let score = 0;
  const country = countries.find((c) => c.slug === project.country);

  if (investorProfile.sectors?.includes(project.sector)) score += 40;
  if (country && investorProfile.regions?.includes(country.region)) score += 30;

  if (investorProfile.minAmount != null && investorProfile.maxAmount != null) {
    if (
      project.amountRequested >= investorProfile.minAmount &&
      project.amountRequested <= investorProfile.maxAmount
    ) {
      score += 20;
    }
  } else {
    score += 10;
  }

  score += Math.round(project.readiness / 10);

  return Math.min(100, score);
}

// ---------------------------------------------------------------------------
// YOUTH PROJECT HUB  (AU–EU Youth Action Lab features)
// ---------------------------------------------------------------------------
export const youthSectors = [
  "Renewable energy",
  "Agriculture",
  "Education",
  "Healthcare",
  "Waste management",
  "Digital inclusion",
  "Employment",
  "Community infrastructure",
  "Women/youth economic empowerment",
];

// The ten criteria GSDX checks when scoring a youth project's readiness.
export const YOUTH_CRITERIA = [
  { key: "problemDefinition", label: "Problem definition" },
  { key: "targetBeneficiaries", label: "Target beneficiaries" },
  { key: "projectModel", label: "Business / project model" },
  { key: "budget", label: "Detailed implementation budget" },
  { key: "implementationPlan", label: "Implementation plan" },
  { key: "sdgAlignment", label: "SDG alignment" },
  { key: "sustainabilityPlan", label: "Sustainability plan" },
  { key: "team", label: "Team" },
  { key: "evidence", label: "Evidence of beneficiary demand" },
  { key: "impactPotential", label: "Potential impact" },
];

export function computeYouthReadiness(criteriaMet) {
  const met = YOUTH_CRITERIA.filter((c) => criteriaMet[c.key]);
  const missing = YOUTH_CRITERIA.filter((c) => !criteriaMet[c.key]);
  return {
    score: Math.round((met.length / YOUTH_CRITERIA.length) * 100),
    missing: missing.map((c) => c.label),
  };
}

const rawYouthProjects = [
  { id: "yp-001", name: "Rural Solar Irrigation Collective", country: "zambia", sector: "Renewable energy", submitterName: "Chanda Mwewa", ageRange: "18-24", summary: "Solar-powered irrigation pumps for smallholder farms outside Lusaka.", fundingRequired: 250_000, youngPeopleReached: 150, jobsExpected: 25, beneficiaries: 300, sdgs: [2, 7, 8, 13], status: "Seeking funding", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: true, implementationPlan: true, sdgAlignment: true, sustainabilityPlan: false, team: true, evidence: false, impactPotential: true } },
  { id: "yp-002", name: "Lusaka Waste-to-Value Recyclers", country: "zambia", sector: "Waste management", submitterName: "Mutale Banda", ageRange: "20-27", summary: "Youth-run collection and upcycling network turning plastic waste into building materials.", fundingRequired: 85_000, youngPeopleReached: 60, jobsExpected: 40, beneficiaries: 5000, sdgs: [11, 12, 13], status: "Seeking funding", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: false, implementationPlan: true, sdgAlignment: true, sustainabilityPlan: true, team: true, evidence: false, impactPotential: true } },
  { id: "yp-003", name: "Copperbelt Girls in Code", country: "zambia", sector: "Digital inclusion", submitterName: "Natasha Phiri", ageRange: "16-22", summary: "After-school coding and digital-literacy program for girls in Copperbelt township schools.", fundingRequired: 40_000, youngPeopleReached: 400, jobsExpected: 8, beneficiaries: 400, sdgs: [4, 5, 10], status: "Verified", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: true, implementationPlan: true, sdgAlignment: true, sustainabilityPlan: true, team: true, evidence: true, impactPotential: true } },
  { id: "yp-004", name: "Kitwe Youth Employment Bridge", country: "zambia", sector: "Employment", submitterName: "Joseph Chileshe", ageRange: "22-29", summary: "Apprenticeship placement service connecting unemployed youth to manufacturing employers.", fundingRequired: 60_000, youngPeopleReached: 250, jobsExpected: 180, beneficiaries: 250, sdgs: [8, 4], status: "Idea", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: false, budget: false, implementationPlan: false, sdgAlignment: true, sustainabilityPlan: false, team: true, evidence: false, impactPotential: true } },
  { id: "yp-005", name: "Kibera Community Health Navigators", country: "kenya", sector: "Healthcare", submitterName: "Wanjiru Kamau", ageRange: "19-25", summary: "Youth health navigators guiding informal-settlement residents to maternal and child health services.", fundingRequired: 55_000, youngPeopleReached: 45, jobsExpected: 45, beneficiaries: 8000, sdgs: [3, 5, 10], status: "Investment ready", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: true, implementationPlan: true, sdgAlignment: true, sustainabilityPlan: true, team: true, evidence: true, impactPotential: true } },
  { id: "yp-006", name: "Nairobi Circular Fashion Hub", country: "kenya", sector: "Women/youth economic empowerment", submitterName: "Achieng Otieno", ageRange: "21-28", summary: "Training and micro-enterprise incubation for young women turning textile offcuts into fashion goods.", fundingRequired: 30_000, youngPeopleReached: 120, jobsExpected: 35, beneficiaries: 120, sdgs: [5, 8, 12], status: "Seeking funding", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: true, implementationPlan: false, sdgAlignment: true, sustainabilityPlan: false, team: true, evidence: false, impactPotential: true } },
  { id: "yp-007", name: "Mombasa Youth Fish Farming Cooperative", country: "kenya", sector: "Agriculture", submitterName: "Hassan Mwalimu", ageRange: "20-26", summary: "Aquaculture cooperative training coastal youth in sustainable tilapia farming.", fundingRequired: 70_000, youngPeopleReached: 90, jobsExpected: 60, beneficiaries: 90, sdgs: [2, 8, 14], status: "Verified", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: true, implementationPlan: true, sdgAlignment: true, sustainabilityPlan: true, team: false, evidence: true, impactPotential: true } },
  { id: "yp-008", name: "Kampala Youth Water Kiosk Network", country: "uganda", sector: "Community infrastructure", submitterName: "Grace Nakato", ageRange: "18-23", summary: "Solar-powered water kiosks run by youth cooperatives in underserved Kampala suburbs.", fundingRequired: 95_000, youngPeopleReached: 70, jobsExpected: 50, beneficiaries: 15000, sdgs: [6, 8, 11], status: "Seeking funding", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: false, implementationPlan: true, sdgAlignment: true, sustainabilityPlan: false, team: true, evidence: false, impactPotential: true } },
  { id: "yp-009", name: "Gulu Youth Agribusiness Incubator", country: "uganda", sector: "Agriculture", submitterName: "Okello Denis", ageRange: "22-28", summary: "Incubator helping young farmers formalize cooperatives and access processing equipment.", fundingRequired: 45_000, youngPeopleReached: 200, jobsExpected: 70, beneficiaries: 200, sdgs: [2, 8], status: "Idea", criteria: { problemDefinition: true, targetBeneficiaries: false, projectModel: false, budget: false, implementationPlan: false, sdgAlignment: true, sustainabilityPlan: false, team: true, evidence: false, impactPotential: false } },
  { id: "yp-010", name: "Kigali Youth Solar Repair Academy", country: "rwanda", sector: "Renewable energy", submitterName: "Uwase Diane", ageRange: "19-24", summary: "Technical training academy certifying young technicians in solar system installation and repair.", fundingRequired: 65_000, youngPeopleReached: 180, jobsExpected: 90, beneficiaries: 180, sdgs: [4, 7, 8], status: "Investment ready", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: true, implementationPlan: true, sdgAlignment: true, sustainabilityPlan: true, team: true, evidence: true, impactPotential: true } },
  { id: "yp-011", name: "Dhaka Youth Digital Literacy Vans", country: "bangladesh", sector: "Digital inclusion", submitterName: "Farhana Akter", ageRange: "20-26", summary: "Mobile classrooms bringing basic digital and financial literacy to informal settlements.", fundingRequired: 38_000, youngPeopleReached: 600, jobsExpected: 15, beneficiaries: 600, sdgs: [4, 10], status: "Seeking funding", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: true, implementationPlan: false, sdgAlignment: true, sustainabilityPlan: false, team: false, evidence: true, impactPotential: true } },
  { id: "yp-012", name: "Kathmandu Youth Climate Corps", country: "nepal", sector: "Community infrastructure", submitterName: "Sabina Gurung", ageRange: "18-25", summary: "Youth-led slope stabilization and flood-resilience works in landslide-prone hill districts.", fundingRequired: 52_000, youngPeopleReached: 130, jobsExpected: 40, beneficiaries: 3000, sdgs: [11, 13, 15], status: "Verified", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: true, implementationPlan: true, sdgAlignment: true, sustainabilityPlan: true, team: true, evidence: false, impactPotential: true } },
  { id: "yp-013", name: "Kingston Youth Green Jobs Studio", country: "jamaica", sector: "Employment", submitterName: "Kadeem Brown", ageRange: "21-27", summary: "Green-skills bootcamp preparing unemployed youth for solar and waste-management jobs.", fundingRequired: 32_000, youngPeopleReached: 90, jobsExpected: 65, beneficiaries: 90, sdgs: [8, 13], status: "Seeking funding", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: false, budget: true, implementationPlan: false, sdgAlignment: true, sustainabilityPlan: false, team: true, evidence: false, impactPotential: false } },
  { id: "yp-014", name: "Accra Youth Sanitation Ventures", country: "ghana", sector: "Waste management", submitterName: "Kwame Asante", ageRange: "20-25", summary: "Youth-owned sanitation micro-enterprises servicing unplanned settlements around Accra.", fundingRequired: 41_000, youngPeopleReached: 55, jobsExpected: 30, beneficiaries: 12000, sdgs: [6, 8, 11], status: "Idea", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: false, implementationPlan: false, sdgAlignment: true, sustainabilityPlan: false, team: false, evidence: false, impactPotential: true } },
  { id: "yp-015", name: "Suva Youth Coral Coast Guardians", country: "fiji", sector: "Community infrastructure", submitterName: "Litia Naidu", ageRange: "18-24", summary: "Youth-led mangrove restoration and coastal-monitoring program protecting fishing livelihoods.", fundingRequired: 28_000, youngPeopleReached: 60, jobsExpected: 20, beneficiaries: 1200, sdgs: [13, 14, 15], status: "Verified", criteria: { problemDefinition: true, targetBeneficiaries: true, projectModel: true, budget: true, implementationPlan: true, sdgAlignment: true, sustainabilityPlan: true, team: true, evidence: false, impactPotential: true } },
];

export const youthProjects = rawYouthProjects.map((p) => {
  const { score, missing } = computeYouthReadiness(p.criteria);
  return { ...p, readinessScore: score, missing, supporters: p.supporters ?? 0, comments: p.comments ?? [] };
});

export function youthDashboard(countrySlug) {
  const list = countrySlug ? youthProjects.filter((p) => p.country === countrySlug) : youthProjects;
  return {
    submitted: list.length,
    verified: list.filter((p) => p.readinessScore >= 70).length,
    investmentReady: list.filter((p) => p.status === "Investment ready").length,
    fundingRequested: list.reduce((s, p) => s + p.fundingRequired, 0),
    beneficiaries: list.reduce((s, p) => s + (p.beneficiaries || 0), 0),
    jobsExpected: list.reduce((s, p) => s + (p.jobsExpected || 0), 0),
  };
}

export function addYouthSupport(id) {
  const p = youthProjects.find((yp) => yp.id === id);
  if (!p) return null;
  p.supporters += 1;
  return p;
}

export function addYouthComment(id, name, comment) {
  const p = youthProjects.find((yp) => yp.id === id);
  if (!p) return null;
  const entry = { name, comment, date: new Date().toISOString().slice(0, 10) };
  p.comments.push(entry);
  return entry;
}

// ---------------------------------------------------------------------------
// AFRICAN TRADE & INVESTMENT  (AfCFTA Digital Innovation Challenge features)
// ---------------------------------------------------------------------------
export const fundingTypes = ["Grant", "Equity", "Debt", "Concessional financing", "Guarantee"];

// The nine criteria GSDX checks when scoring a business's cross-border trade readiness.
export const TRADE_CRITERIA = [
  { key: "registration", label: "Business registration" },
  { key: "productInfo", label: "Product information" },
  { key: "financialInfo", label: "Financial information" },
  { key: "certifications", label: "Certifications" },
  { key: "exportCapability", label: "Export capability" },
  { key: "targetMarket", label: "Target market defined" },
  { key: "productionCapacity", label: "Production capacity documented" },
  { key: "complianceDocs", label: "Compliance documentation" },
  { key: "businessModel", label: "Business model" },
];

export function computeTradeReadiness(criteriaMet) {
  const met = TRADE_CRITERIA.filter((c) => criteriaMet[c.key]);
  const missing = TRADE_CRITERIA.filter((c) => !criteriaMet[c.key]);
  return {
    score: Math.round((met.length / TRADE_CRITERIA.length) * 100),
    missing: missing.map((c) => c.label),
  };
}

const rawBusinesses = [
  { id: "biz-001", name: "Mosi Agro Exports", country: "zambia", sector: "Agriculture", products: "Dried fruit, honey, and processed cassava flour", productionCapacity: "40 tonnes / month", targetMarkets: ["Tanzania", "Kenya"], currentMarkets: ["Zambia"], fundingRequired: 150_000, expansionPlans: "Open a distribution partnership in Tanzania within 12 months.", certifications: "COMESA certificate of origin", contact: "trade@mosiagro.example", partnershipRequirements: "Tanzanian distributor with cold-chain logistics", criteria: { registration: true, productInfo: true, financialInfo: true, certifications: true, exportCapability: false, targetMarket: true, productionCapacity: true, complianceDocs: false, businessModel: true } },
  { id: "biz-002", name: "Zamsolar Equipment Distribution", country: "zambia", sector: "Energy", products: "Residential and commercial solar equipment", productionCapacity: "N/A — distributor", targetMarkets: ["Tanzania"], currentMarkets: ["Zambia", "Malawi"], fundingRequired: 150_000, expansionPlans: "Establish a Tanzanian distribution partner for solar equipment.", certifications: "IEC 62109 supplier certification", contact: "sales@zamsolar.example", partnershipRequirements: "Tanzanian distributor", criteria: { registration: true, productInfo: true, financialInfo: true, certifications: true, exportCapability: true, targetMarket: true, productionCapacity: true, complianceDocs: true, businessModel: true } },
  { id: "biz-003", name: "Kenya AgriTech Processors", country: "kenya", sector: "Agriculture", products: "Modular grain and coffee processing technology", productionCapacity: "120 units / year", targetMarkets: ["Zambia", "Uganda", "Tanzania"], currentMarkets: ["Kenya"], fundingRequired: 400_000, expansionPlans: "Seeking a Zambian implementation partner for grain-processing rollout.", certifications: "KEBS quality mark", contact: "partnerships@kenyaagritech.example", partnershipRequirements: "Zambian implementation and installation partner", criteria: { registration: true, productInfo: true, financialInfo: true, certifications: true, exportCapability: true, targetMarket: true, productionCapacity: true, complianceDocs: true, businessModel: true } },
  { id: "biz-004", name: "Nairobi Fintech Rails", country: "kenya", sector: "Technology", products: "Interoperable mobile-money payment infrastructure", productionCapacity: "N/A — software", targetMarkets: ["Rwanda", "Uganda"], currentMarkets: ["Kenya"], fundingRequired: 900_000, expansionPlans: "License payment rails to mobile network operators in Rwanda.", certifications: "PCI-DSS compliant", contact: "bd@nairobifintech.example", partnershipRequirements: "Licensed Rwandan mobile network operator", criteria: { registration: true, productInfo: true, financialInfo: false, certifications: true, exportCapability: true, targetMarket: true, productionCapacity: false, complianceDocs: true, businessModel: true } },
  { id: "biz-005", name: "Bugesera Textile Works", country: "rwanda", sector: "Manufacturing", products: "Cut-and-sew apparel for export", productionCapacity: "18,000 garments / month", targetMarkets: ["Kenya", "Ghana"], currentMarkets: ["Rwanda"], fundingRequired: 220_000, expansionPlans: "Find a Kenyan buyer for a standing export order.", certifications: "AGOA-eligible manufacturer", contact: "export@bugeseratextile.example", partnershipRequirements: "Kenyan wholesale buyer or distributor", criteria: { registration: true, productInfo: true, financialInfo: true, certifications: true, exportCapability: true, targetMarket: false, productionCapacity: true, complianceDocs: false, businessModel: true } },
  { id: "biz-006", name: "Kigali Digital Services Collective", country: "rwanda", sector: "Technology", products: "Software development and BPO services", productionCapacity: "N/A — services", targetMarkets: ["Ghana", "Senegal"], currentMarkets: ["Rwanda"], fundingRequired: 60_000, expansionPlans: "Open a satellite delivery team serving West African clients.", certifications: "ISO 27001 in progress", contact: "hello@kigalidigital.example", partnershipRequirements: "West African client-acquisition partner", criteria: { registration: true, productInfo: true, financialInfo: false, certifications: false, exportCapability: true, targetMarket: true, productionCapacity: false, complianceDocs: false, businessModel: true } },
  { id: "biz-007", name: "Tema Processed Foods", country: "ghana", sector: "Manufacturing", products: "Packaged cassava, plantain, and cocoa snack products", productionCapacity: "60 tonnes / month", targetMarkets: ["Senegal", "Zambia"], currentMarkets: ["Ghana"], fundingRequired: 180_000, expansionPlans: "Enter Senegalese retail through a regional distributor.", certifications: "FDA Ghana export license", contact: "export@temafoods.example", partnershipRequirements: "Senegalese retail distributor", criteria: { registration: true, productInfo: true, financialInfo: true, certifications: true, exportCapability: true, targetMarket: true, productionCapacity: true, complianceDocs: true, businessModel: true } },
  { id: "biz-008", name: "Kumasi Renewable Micro-Grids", country: "ghana", sector: "Energy", products: "Containerized solar micro-grid systems", productionCapacity: "25 units / year", targetMarkets: ["Senegal"], currentMarkets: ["Ghana"], fundingRequired: 310_000, expansionPlans: "Pilot micro-grid deployments in rural Senegal.", certifications: "IEC micro-grid safety certification", contact: "info@kumasimicrogrids.example", partnershipRequirements: "Senegalese rural electrification agency partner", criteria: { registration: true, productInfo: true, financialInfo: true, certifications: false, exportCapability: false, targetMarket: true, productionCapacity: true, complianceDocs: false, businessModel: true } },
  { id: "biz-009", name: "Dakar Rice Value Chain Co.", country: "senegal", sector: "Agriculture", products: "Milled and packaged rice", productionCapacity: "500 tonnes / month", targetMarkets: ["Ghana"], currentMarkets: ["Senegal"], fundingRequired: 130_000, expansionPlans: "Supply Ghanaian wholesale rice markets.", certifications: "ECOWAS quality certificate", contact: "sales@dakarrice.example", partnershipRequirements: "Ghanaian wholesale distributor", criteria: { registration: true, productInfo: true, financialInfo: true, certifications: true, exportCapability: true, targetMarket: true, productionCapacity: true, complianceDocs: false, businessModel: true } },
  { id: "biz-010", name: "Dar Logistics & Freight Partners", country: "tanzania", sector: "Infrastructure", products: "Cross-border freight forwarding and customs clearance", productionCapacity: "N/A — services", targetMarkets: ["Zambia", "Kenya"], currentMarkets: ["Tanzania"], fundingRequired: 90_000, expansionPlans: "Open Zambian branch office to handle inbound freight.", certifications: "AEO-certified customs broker", contact: "ops@darlogistics.example", partnershipRequirements: "Zambian bonded-warehouse partner", criteria: { registration: true, productInfo: true, financialInfo: true, certifications: true, exportCapability: true, targetMarket: true, productionCapacity: false, complianceDocs: true, businessModel: true } },
  { id: "biz-011", name: "Colombo Ceylon Tea Exports", country: "sri-lanka", sector: "Agriculture", products: "Graded and packaged Ceylon tea", productionCapacity: "80 tonnes / month", targetMarkets: ["Bangladesh"], currentMarkets: ["Sri Lanka"], fundingRequired: 75_000, expansionPlans: "Establish a Bangladeshi wholesale distribution agreement.", certifications: "Ceylon Tea Board mark", contact: "export@colombotea.example", partnershipRequirements: "Bangladeshi wholesale distributor", criteria: { registration: true, productInfo: true, financialInfo: true, certifications: true, exportCapability: true, targetMarket: false, productionCapacity: true, complianceDocs: true, businessModel: false } },
  { id: "biz-012", name: "Arequipa Alpaca Textile Exports", country: "peru", sector: "Manufacturing", products: "Alpaca fiber yarn and finished garments", productionCapacity: "12 tonnes yarn / month", targetMarkets: ["Honduras"], currentMarkets: ["Peru"], fundingRequired: 95_000, expansionPlans: "Supply Central American fashion brands through Honduras.", certifications: "Responsible Alpaca Standard", contact: "trade@arequipaalpaca.example", partnershipRequirements: "Honduran apparel brand partner", criteria: { registration: true, productInfo: true, financialInfo: false, certifications: true, exportCapability: true, targetMarket: true, productionCapacity: true, complianceDocs: false, businessModel: true } },
  { id: "biz-013", name: "Lilongwe Agro-Processing Cooperative", country: "malawi", sector: "Agriculture", products: "Processed maize, groundnuts, and legume flour", productionCapacity: "30 tonnes / month", targetMarkets: ["Zambia", "Tanzania"], currentMarkets: ["Malawi"], fundingRequired: 60_000, expansionPlans: "Approved under the Malawi private-sector development fund to expand processing capacity.", certifications: "Malawi Bureau of Standards mark", contact: "info@lilongweagro.example", partnershipRequirements: "Regional distribution partner", criteria: { registration: true, productInfo: true, financialInfo: true, certifications: false, exportCapability: false, targetMarket: true, productionCapacity: true, complianceDocs: false, businessModel: true } },
  { id: "biz-014", name: "Kampala Solar Assembly Works", country: "uganda", sector: "Energy", products: "Assembled residential solar kits", productionCapacity: "1,200 units / month", targetMarkets: ["Kenya", "Rwanda"], currentMarkets: ["Uganda"], fundingRequired: 85_000, expansionPlans: "Approved under the Uganda private-sector development fund to scale assembly capacity.", certifications: "UNBS quality mark", contact: "sales@kampalasolar.example", partnershipRequirements: "Regional distribution partner", criteria: { registration: true, productInfo: true, financialInfo: true, certifications: true, exportCapability: false, targetMarket: true, productionCapacity: true, complianceDocs: false, businessModel: true } },
];

export const businesses = rawBusinesses.map((b) => {
  const { score, missing } = computeTradeReadiness(b.criteria);
  return { ...b, tradeReadiness: score, missing };
});

export function crossBorderMatch(businessId, targetCountrySlug) {
  const business = businesses.find((b) => b.id === businessId);
  if (!business) return null;

  const partnerBusinesses = businesses
    .filter((b) => b.id !== businessId && b.country === targetCountrySlug)
    .map((b) => ({ business: b, reason: b.sector === business.sector ? "Same sector — potential partner or buyer" : "Cross-sector — potential local partner" }));

  const matchingTrade = tradeOpportunities.filter(
    (t) => t.country === targetCountrySlug && t.sector === business.sector
  );

  const matchingFunding = fundingOpportunities.filter(
    (f) => f.countriesEligible.includes(targetCountrySlug) && f.sectors.includes(business.sector)
  );

  return { business, partnerBusinesses, matchingTrade, matchingFunding };
}

export const tradeOpportunities = [
  { id: "trd-001", country: "tanzania", sector: "Energy", flag: "🇹🇿", headline: "Looking for: Tanzanian solar equipment distributor", capitalRequired: 150_000, expansionTarget: "Tanzania", relatedBusiness: "biz-002" },
  { id: "trd-002", country: "zambia", sector: "Agriculture", flag: "🇿🇲", headline: "Looking for: Zambian grain-processing implementation partner", capitalRequired: 400_000, expansionTarget: "Zambia", relatedBusiness: "biz-003" },
  { id: "trd-003", country: "kenya", sector: "Manufacturing", flag: "🇰🇪", headline: "Looking for: Kenyan wholesale buyer for export apparel", capitalRequired: 220_000, expansionTarget: "Kenya", relatedBusiness: "biz-005" },
  { id: "trd-004", country: "senegal", sector: "Manufacturing", flag: "🇸🇳", headline: "Looking for: Senegalese retail distributor for packaged foods", capitalRequired: 180_000, expansionTarget: "Senegal", relatedBusiness: "biz-007" },
  { id: "trd-005", country: "ghana", sector: "Agriculture", flag: "🇬🇭", headline: "Looking for: Ghanaian wholesale rice distributor", capitalRequired: 130_000, expansionTarget: "Ghana", relatedBusiness: "biz-009" },
  { id: "trd-006", country: "zambia", sector: "Infrastructure", flag: "🇿🇲", headline: "Looking for: Zambian bonded-warehouse logistics partner", capitalRequired: 90_000, expansionTarget: "Zambia", relatedBusiness: "biz-010" },
  { id: "trd-007", country: "rwanda", sector: "Technology", flag: "🇷🇼", headline: "Looking for: Rwandan mobile network operator partnership", capitalRequired: 900_000, expansionTarget: "Rwanda", relatedBusiness: "biz-004" },
  { id: "trd-008", country: "senegal", sector: "Energy", flag: "🇸🇳", headline: "Looking for: Senegalese rural electrification agency partner", capitalRequired: 310_000, expansionTarget: "Senegal", relatedBusiness: "biz-008" },
  { id: "trd-009", country: "bangladesh", sector: "Agriculture", flag: "🇧🇩", headline: "Looking for: Bangladeshi wholesale tea distributor", capitalRequired: 75_000, expansionTarget: "Bangladesh", relatedBusiness: "biz-011" },
  { id: "trd-010", country: "honduras", sector: "Manufacturing", flag: "🇭🇳", headline: "Looking for: Honduran apparel brand partnership", capitalRequired: 95_000, expansionTarget: "Honduras", relatedBusiness: "biz-012" },
];

export const fundingOpportunities = [
  { id: "fund-001", funder: "AU–EU Youth Action Lab Innovation Grant", amount: "$20,000 – $150,000", countriesEligible: countries.map((c) => c.slug), sectors: youthSectors.concat(sectors), type: "Grant", deadline: "2026-11-30", requirements: "Youth-led (18-35), community impact evidence, replicable model.", applicationLink: "https://example.org/au-eu-youth-action-lab" },
  { id: "fund-002", funder: "AfCFTA Digital Innovation Challenge", amount: "$50,000 – $500,000", countriesEligible: countries.filter((c) => c.region === "Africa").map((c) => c.slug), sectors: sectors, type: "Grant", deadline: "2026-10-15", requirements: "African-owned business, cross-border trade or digital-trade focus.", applicationLink: "https://example.org/afcfta-digital-innovation" },
  { id: "fund-003", funder: "Baobab Sovereign Co-Investment Facility", amount: "$1,000,000 – $20,000,000", countriesEligible: countries.filter((c) => c.region === "Africa").map((c) => c.slug), sectors: ["Energy", "Infrastructure", "Manufacturing"], type: "Equity", deadline: "2026-12-31", requirements: "Investment-ready project (GSDX readiness ≥ 70), sovereign co-investment eligible.", applicationLink: "https://example.org/baobab-facility" },
  { id: "fund-004", funder: "Everline Development Bank Concessional Window", amount: "$500,000 – $10,000,000", countriesEligible: countries.map((c) => c.slug), sectors: ["Healthcare", "Education", "Agriculture", "Infrastructure"], type: "Concessional financing", deadline: "Rolling", requirements: "Government-endorsed priority project, environmental and social safeguards.", applicationLink: "https://example.org/everline-concessional" },
  { id: "fund-005", funder: "Crestwater Foundation Community Grants", amount: "$10,000 – $75,000", countriesEligible: countries.map((c) => c.slug), sectors: youthSectors, type: "Grant", deadline: "2026-09-30", requirements: "Community-nominated project, measurable beneficiary outcomes.", applicationLink: "https://example.org/crestwater-grants" },
  { id: "fund-006", funder: "Lumen Frontier Markets Fund", amount: "$2,000,000 – $50,000,000", countriesEligible: countries.map((c) => c.slug), sectors: ["Energy", "Technology", "Digital infrastructure"], type: "Equity", deadline: "Rolling", requirements: "GSDX readiness ≥ 75, audited financials, scalable business model.", applicationLink: "https://example.org/lumen-frontier" },
  { id: "fund-007", funder: "Okoye Diaspora Fund", amount: "$25,000 – $2,000,000", countriesEligible: countries.map((c) => c.slug), sectors: sectors, type: "Debt", deadline: "Rolling", requirements: "Diaspora-linked founder or beneficiary community.", applicationLink: "https://example.org/okoye-diaspora-fund" },
  { id: "fund-008", funder: "Vantage Public-Private Trust Guarantee Facility", amount: "$500,000 – $15,000,000", countriesEligible: countries.map((c) => c.slug), sectors: ["Infrastructure", "Transportation", "Energy"], type: "Guarantee", deadline: "Rolling", requirements: "Blended-finance structure with at least one private co-investor.", applicationLink: "https://example.org/vantage-guarantee" },
];

export function scoreFundingMatch(target, funder) {
  // target: a project, youth project, or business — anything with sector + country
  let score = 0;
  if (funder.countriesEligible.includes(target.country)) score += 40;
  if (funder.sectors.includes(target.sector)) score += 40;
  const readiness = target.readiness ?? target.readinessScore ?? target.tradeReadiness ?? 0;
  score += Math.round(readiness / 5);
  return Math.min(100, score);
}

export function matchFundingOpportunities(target) {
  return fundingOpportunities
    .map((funder) => ({ funder, matchScore: scoreFundingMatch(target, funder) }))
    .filter((r) => r.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}

// ---------------------------------------------------------------------------
// NATIONAL CAPITAL STRUCTURE & DIRECT CITIZEN DISTRIBUTION
// ---------------------------------------------------------------------------
// Flagship, nation-scale projects that route a fixed share of their capital
// through GSDX's citizen-participation mechanism. Figures below (adult
// population, capital size) are illustrative demo data, not verified
// national statistics — see the disclaimer surfaced on the mega-projects
// pages. The 60/30/10 split, and the 1%/99% split of the 10% tranche, are
// GSDX's default configuration; in a real deployment each government would
// configure its own percentages, eligibility rules, and payment provider.

export const CAPITAL_STRUCTURE = [
  { key: "investors", label: "Investors / participating entities", pct: 60 },
  { key: "government", label: "Government", pct: 30 },
  { key: "privateSector", label: "Private-sector development", pct: 10 },
];

export const PRIVATE_SECTOR_SPLIT = [
  { key: "citizenPool", label: "Direct citizen distribution", pct: 1 },
  { key: "remainingFund", label: "Private-sector development fund (SMEs, startups, local suppliers)", pct: 99 },
];

const rawMegaProjects = [
  { id: "mp-zambia-01", name: "Zambia Manufacturing Project", country: "zambia", sector: "Manufacturing", totalCapital: 5_000_000_000, eligibleAdults: 10_000_000, mobileMoneyProvider: "MTN Mobile Money", jobsCreated: 25_000, smesSupported: 4_200, localSuppliers: 1_300, completion: 64, status: "Implementation" },
  { id: "mp-malawi-01", name: "Malawi Agricultural Value Chain Project", country: "malawi", sector: "Agriculture", totalCapital: 1_800_000_000, eligibleAdults: 10_500_000, mobileMoneyProvider: "Airtel Money", jobsCreated: 14_000, smesSupported: 2_600, localSuppliers: 900, completion: 38, status: "Implementation" },
  { id: "mp-kenya-01", name: "Kenya Digital Infrastructure Project", country: "kenya", sector: "Digital infrastructure", totalCapital: 6_200_000_000, eligibleAdults: 29_000_000, mobileMoneyProvider: "M-Pesa", jobsCreated: 31_000, smesSupported: 6_800, localSuppliers: 2_100, completion: 52, status: "Implementation" },
  { id: "mp-ghana-01", name: "Ghana Manufacturing & Export Project", country: "ghana", sector: "Manufacturing", totalCapital: 3_400_000_000, eligibleAdults: 18_000_000, mobileMoneyProvider: "MTN Mobile Money", jobsCreated: 19_500, smesSupported: 3_900, localSuppliers: 1_450, completion: 71, status: "Implementation" },
  { id: "mp-tanzania-01", name: "Tanzania National Infrastructure Project", country: "tanzania", sector: "Infrastructure", totalCapital: 4_100_000_000, eligibleAdults: 33_000_000, mobileMoneyProvider: "M-Pesa", jobsCreated: 22_000, smesSupported: 3_100, localSuppliers: 1_050, completion: 29, status: "Financing" },
  { id: "mp-uganda-01", name: "Uganda Energy Access Project", country: "uganda", sector: "Energy", totalCapital: 2_600_000_000, eligibleAdults: 21_000_000, mobileMoneyProvider: "MTN Mobile Money", jobsCreated: 12_800, smesSupported: 2_200, localSuppliers: 780, completion: 46, status: "Implementation" },
  { id: "mp-rwanda-01", name: "Rwanda Technology & Innovation Project", country: "rwanda", sector: "Technology", totalCapital: 1_500_000_000, eligibleAdults: 7_200_000, mobileMoneyProvider: "MTN Mobile Money", jobsCreated: 9_600, smesSupported: 2_900, localSuppliers: 640, completion: 58, status: "Implementation" },
  { id: "mp-senegal-01", name: "Senegal Renewable Energy Project", country: "senegal", sector: "Energy", totalCapital: 2_900_000_000, eligibleAdults: 9_500_000, mobileMoneyProvider: "Orange Money", jobsCreated: 13_400, smesSupported: 2_050, localSuppliers: 710, completion: 22, status: "Financing" },
];

export function computeMegaFinancials(mp) {
  const investors = mp.totalCapital * 0.6;
  const government = mp.totalCapital * 0.3;
  const privateSector = mp.totalCapital * 0.1;
  const citizenPool = privateSector * 0.01;
  const remainingPrivateSectorFund = privateSector - citizenPool;
  const perAdultPayment = citizenPool / mp.eligibleAdults;
  return { investors, government, privateSector, citizenPool, remainingPrivateSectorFund, perAdultPayment };
}

// Illustrative transaction ledger — generated from each project's own
// figures rather than hand-authored per project, so every mega-project has
// a consistent, proportionate set of example transactions.
export function megaLedger(mp) {
  const f = computeMegaFinancials(mp);
  return [
    {
      ref: `TXN-${mp.id.toUpperCase()}-001`,
      amount: Math.round(mp.totalCapital * 0.35),
      from: "Project Capital Account",
      to: "Lead Construction & Equipment Contractor",
      purpose: "Construction and equipment procurement",
      approvals: "5/5",
      status: "Approved",
    },
    {
      ref: `TXN-${mp.id.toUpperCase()}-002`,
      amount: Math.round(mp.totalCapital * 0.08),
      from: "Project Capital Account",
      to: "Local Supplier Network",
      purpose: "Local goods and services procurement",
      approvals: "5/5",
      status: "Approved",
    },
    {
      ref: `TXN-${mp.id.toUpperCase()}-003`,
      amount: Math.round(f.remainingPrivateSectorFund * 0.2),
      from: "Private-Sector Development Fund",
      to: "SME & Startup Disbursement Pool",
      purpose: "Quarterly tranche to approved SMEs and startups",
      approvals: "4/5 — pending independent oversight sign-off",
      status: "Pending",
    },
    {
      ref: `TXN-${mp.id.toUpperCase()}-004`,
      amount: Math.round(f.citizenPool / 12),
      from: "Citizen Benefit Pool",
      to: `Eligible adults via ${mp.mobileMoneyProvider}`,
      purpose: "Monthly citizen distribution",
      approvals: "5/5",
      status: "Completed",
    },
  ];
}

export function megaChangeRequest(mp) {
  const originalBudget = Math.round(mp.totalCapital * 0.16);
  const proposedBudget = Math.round(originalBudget * 1.12);
  return {
    line: "Equipment budget",
    original: originalBudget,
    proposed: proposedBudget,
    difference: proposedBudget - originalBudget,
    requestedBy: "Project administrator",
    reason: "Additional equipment required to meet revised production targets.",
  };
}

export function megaAnomalyFlag(mp) {
  return {
    headline: "Potential anomaly",
    detail: `Construction spending on ${mp.name} increased by 40% while reported project completion increased by only 7% over the same period.`,
    note: "Flagged for independent review — this indicates a pattern worth checking, not a finding of wrongdoing.",
  };
}

export const megaProjects = rawMegaProjects.map((mp) => ({
  ...mp,
  ...computeMegaFinancials(mp),
}));

export function megaProjectById(id) {
  return megaProjects.find((mp) => mp.id === id);
}

export function megaProjectsForCountry(slug) {
  return megaProjects.filter((mp) => mp.country === slug);
}

export function nationalDashboard(countrySlug) {
  const list = countrySlug ? megaProjectsForCountry(countrySlug) : megaProjects;
  return {
    projectCount: list.length,
    capitalMobilized: list.reduce((s, mp) => s + mp.totalCapital, 0),
    citizensReached: list.reduce((s, mp) => s + mp.eligibleAdults, 0),
    citizenDistributions: list.reduce((s, mp) => s + mp.citizenPool, 0),
    smesSupported: list.reduce((s, mp) => s + mp.smesSupported, 0),
    jobsCreated: list.reduce((s, mp) => s + mp.jobsCreated, 0),
    projectsCompleted: list.filter((mp) => mp.completion >= 100).length,
    projectsActive: list.filter((mp) => mp.completion < 100).length,
  };
}

// Each mega-project's private-sector development fund also appears in the
// funding marketplace, so SMEs, startups, and local suppliers can find it
// the same way they'd find any other funder.
megaProjects.forEach((mp) => {
  const country = countries.find((c) => c.slug === mp.country);
  fundingOpportunities.push({
    id: `psf-${mp.id}`,
    funder: `${mp.name} — Private-Sector Development Fund`,
    amount: `Up to ${new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(mp.remainingPrivateSectorFund)}`,
    countriesEligible: [mp.country],
    sectors: sectors,
    type: "Private-sector development fund",
    deadline: "Rolling",
    requirements: `SME, startup, local supplier, or manufacturer approved under the ${country.name} national private-sector development program.`,
    applicationLink: "",
  });
});

// ---------------------------------------------------------------------------
// MONTHLY CITIZEN DISTRIBUTION — SUCCESS TRACKING, NEED-BASED WEIGHTING,
// PRIVATE-SECTOR FUND DESTINATIONS, MOBILE MONEY REFERENCE, AND DEMO ACCOUNTS
// ---------------------------------------------------------------------------
// Everything below is illustrative demo data simulating one distribution
// cycle — not a record of any real transfer. Real provider names are used
// only as recognizable account-type labels; GSDX does not claim a
// partnership with any of them.

// Why someone says they need the money — GSDX never withholds a payment
// over this, but the declared reason reweights the shared pool so people
// with higher-priority needs (e.g. medical) receive a larger share.
// populationShare is the assumed share of the eligible population citing
// each reason; the weighted average of multiplier × share is normalized to
// 1.0 so the total pool paid out is unchanged by the reweighting.
export const DISTRIBUTION_REASONS = [
  { key: "medical", label: "Medical expenses", multiplier: 1.40, populationShare: 0.15 },
  { key: "education", label: "School / education", multiplier: 1.25, populationShare: 0.25 },
  { key: "business", label: "Business / entrepreneurship", multiplier: 1.15, populationShare: 0.20 },
  { key: "career", label: "Career / professional development", multiplier: 1.10, populationShare: 0.15 },
  { key: "other", label: "Other essential expenses", multiplier: 1.00, populationShare: 0.25 },
];

const WEIGHTED_AVG_REASON_MULTIPLIER = DISTRIBUTION_REASONS.reduce(
  (sum, r) => sum + r.multiplier * r.populationShare,
  0
);

// basePayment is citizenPool / eligibleAdults (the equal-split figure).
// Returns the actual amount a person citing this reason receives — higher
// for higher-priority needs, lower for lower-priority ones, always > 0,
// and averaging back to basePayment across the whole population.
export function computeAdjustedPayment(basePayment, reasonKey) {
  const reason = DISTRIBUTION_REASONS.find((r) => r.key === reasonKey) || DISTRIBUTION_REASONS[4];
  return (basePayment * reason.multiplier) / WEIGHTED_AVG_REASON_MULTIPLIER;
}

// Real-world mobile money / digital payment account types, by country —
// reference information only. Each mega-project's mobileMoneyProvider field
// (above) is set to the real, primary provider for that country; this is
// still a simulation — no real transaction, integration, or partnership
// with any named provider exists.
export const MOBILE_MONEY_PROVIDERS = {
  zambia: ["MTN Mobile Money", "Airtel Money", "Zamtel Kwacha"],
  malawi: ["Airtel Money", "TNM Mpamba"],
  kenya: ["M-Pesa", "Airtel Money", "T-Kash"],
  ghana: ["MTN Mobile Money", "Vodafone Cash", "AirtelTigo Money"],
  tanzania: ["M-Pesa", "Tigo Pesa", "Airtel Money", "HaloPesa"],
  uganda: ["MTN Mobile Money", "Airtel Money"],
  rwanda: ["MTN Mobile Money", "Airtel Money"],
  senegal: ["Orange Money", "Wave", "Free Money"],
  nepal: ["eSewa", "Khalti"],
  bangladesh: ["bKash", "Nagad", "Rocket"],
  pakistan: ["JazzCash", "EasyPaisa"],
  vietnam: ["MoMo", "ZaloPay", "VNPAY"],
  philippines: ["GCash", "Maya"],
  "sri-lanka": ["eZ Cash", "FriMi"],
  jamaica: ["Lynk", "NCB Quisk"],
  bolivia: ["Tigo Money", "Billetera Móvil BCP"],
  honduras: ["Tigo Money"],
  peru: ["Yape", "Plin"],
  jordan: ["JoMoPay", "Dinarak", "Zain Cash"],
  fiji: ["M-PAiSA", "MyCash Digital Wallet"],
};

// Additional well-known mobile money services used elsewhere across
// Africa, beyond the countries GSDX currently operates in.
export const OTHER_AFRICA_MOBILE_MONEY = [
  { provider: "EcoCash", country: "Zimbabwe" },
  { provider: "Moov Money", country: "Côte d'Ivoire / Togo / Benin" },
  { provider: "Paga", country: "Nigeria" },
  { provider: "OPay", country: "Nigeria" },
  { provider: "PalmPay", country: "Nigeria" },
  { provider: "Chipper Cash", country: "Multi-country" },
  { provider: "Orange Money", country: "Multi-country (West & Central Africa)" },
  { provider: "M-Pesa", country: "Multi-country (Mozambique, DRC, Egypt, Lesotho, Ghana)" },
];

// Generates the "money out" side of the private-sector development fund:
// named recipient accounts (existing GSDX business profiles where one
// exists for the country, otherwise a generic approved-SME placeholder),
// plus a rollup of the rest of the approved pool.
export function megaPrivateSectorDisbursements(mp) {
  const countryBusinesses = businesses.filter((b) => b.country === mp.country).slice(0, 2);
  const namedTotal = countryBusinesses.reduce((s) => s + Math.round(mp.remainingPrivateSectorFund * 0.015), 0);
  const named = countryBusinesses.map((b) => ({
    account: b.name,
    accountType: "Approved SME account",
    amount: Math.round(mp.remainingPrivateSectorFund * 0.015),
    purpose: `${b.sector} expansion`,
    status: "Transferred",
    linkId: b.id,
  }));
  const remainderRecipients = Math.max(mp.smesSupported - named.length, 0);
  const remainderAmount = mp.remainingPrivateSectorFund - namedTotal;
  return {
    named,
    remainder: {
      account: `${remainderRecipients.toLocaleString()} additional approved SMEs, startups, and local suppliers`,
      accountType: "Pooled disbursement",
      amount: Math.max(remainderAmount, 0),
      purpose: "Financing, equipment, contracts, and expansion capital",
      status: "Transferred",
    },
  };
}

// Aggregate "this cycle" distribution success stats for a mega-project —
// in this demo, every eligible adult is treated as successfully paid.
export function megaDistributionStatus(mp) {
  return {
    period: "Distribution #12",
    adultsEnrolled: mp.eligibleAdults,
    adultsPaid: mp.eligibleAdults,
    successRate: 100,
    totalTransferred: mp.citizenPool,
    frequency: "Monthly",
    provider: mp.mobileMoneyProvider,
  };
}

const demoFirstNames = ["Grace", "Joseph", "Amina", "David", "Chipo", "Emmanuel", "Fatima", "Peter", "Nomsa", "Samuel", "Aisha", "Moses", "Ruth", "Daniel", "Zanele", "John"];
const demoLastNames = ["Banda", "Mwansa", "Kamau", "Osei", "Mrema", "Okello", "Uwimana", "Diallo", "Phiri", "Chirwa", "Wanjiru", "Boateng", "Kessy", "Nakato", "Mugisha", "Sarr"];

function maskAccount(seed) {
  return `•••• ${String(1000 + (seed % 9000))}`;
}

let demoIdCounter = 1;
export const demoCitizens = megaProjects.flatMap((mp) => {
  const providers = MOBILE_MONEY_PROVIDERS[mp.country] || [mp.mobileMoneyProvider];
  const basePayment = mp.perAdultPayment;
  return [0, 1, 2].map((i) => {
    const reason = DISTRIBUTION_REASONS[(demoIdCounter + i) % DISTRIBUTION_REASONS.length];
    const provider = providers[i % providers.length];
    const amount = computeAdjustedPayment(basePayment, reason.key);
    const id = `citizen-${String(demoIdCounter).padStart(3, "0")}`;
    const name = `${demoFirstNames[demoIdCounter % demoFirstNames.length]} ${demoLastNames[(demoIdCounter * 3) % demoLastNames.length]}`;
    demoIdCounter += 1;
    return {
      id,
      name,
      country: mp.country,
      megaProjectId: mp.id,
      reason: reason.key,
      reasonLabel: reason.label,
      mobileMoneyProvider: provider,
      accountNumber: maskAccount(demoIdCounter * 137),
      monthlyAmount: amount,
      status: "Payment successful",
      recentPayments: [2, 1, 0].map((monthsAgo) => ({
        period: `Month ${12 - monthsAgo}`,
        amount,
        status: "Completed",
      })),
    };
  });
});

export function demoCitizensForMegaProject(megaProjectId) {
  return demoCitizens.filter((c) => c.megaProjectId === megaProjectId);
}
