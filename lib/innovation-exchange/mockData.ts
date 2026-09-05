import { GovernmentSolution, AlternativeSolution } from './types';

export const INITIAL_GOVERNMENT_SOLUTIONS: GovernmentSolution[] = [
  {
    id: 'gov-sol-1',
    name: 'Manual Municipal Road Quality Inspection & Pothole Survey',
    department: 'Municipal Corporation of Delhi (MCD)',
    ministry: 'Ministry of Housing and Urban Affairs',
    category: 'Urban Infrastructure',
    description:
      'Current municipal road assessment uses manual inspector visits, paper logs, and periodic citizen complaints, resulting in 4-6 week repair delays and high contractor dispute rates.',
    currentCost: 140, // ₹140 Lakhs/yr
    annualMaintenanceCost: 28,
    currentImplementationTime: 8, // 8 months
    currentTechnology: 'Manual inspection logs, 2G legacy field tablets, paper audit registers',
    currentVendor: 'State Urban Construction Consultants Ltd.',
    contractExpiryDays: 45,
    painPoints: [
      'Subjective manual inspection grading without geo-spatial validation',
      'Delayed pothole identification causing citizen safety hazards',
      'Costly third-party audit disputes taking 6+ weeks to verify',
      'High recurring fuel and manual surveyor costs',
    ],
    opportunityScore: 94,
    location: 'National Capital Region, Delhi',
  },
  {
    id: 'gov-sol-2',
    name: 'District Soil Chemical Testing & Fertilizer Subsidy Registry',
    department: 'Department of Agriculture & Farmers Welfare',
    ministry: 'Ministry of Agriculture',
    category: 'Agriculture',
    description:
      'Centrally dispatched soil sample testing takes 30-45 days per agricultural batch through district physical chemical labs, slowing crop advisory cycles.',
    currentCost: 210, // ₹210 Lakhs/yr
    annualMaintenanceCost: 35,
    currentImplementationTime: 6, // 6 months
    currentTechnology: 'Centralized wet-chemistry spectrometers and batch courier dispatch',
    currentVendor: 'AgroChemical National Testing Corp',
    contractExpiryDays: 80,
    painPoints: [
      '30+ days latency between soil collection and advisory report delivery',
      'Sample degradation during long transit to district laboratories',
      'Heavy manual data entry into national agriculture registries',
      'High chemical reagent and disposal expenses',
    ],
    opportunityScore: 89,
    location: 'Punjab & Haryana Agritech Belt',
  },
  {
    id: 'gov-sol-3',
    name: 'Urban Water Pipeline Leakage & Valve Pressure Monitoring',
    department: 'Bangalore Water Supply and Sewerage Board (BWSSB)',
    ministry: 'Ministry of Jal Shakti',
    category: 'Water Management',
    description:
      'Physical visual inspection of feeder lines with 35% non-revenue water (NRW) loss before manual detection of underground pipe bursts.',
    currentCost: 320, // ₹320 Lakhs/yr
    annualMaintenanceCost: 65,
    currentImplementationTime: 12, // 12 months
    currentTechnology: 'Manual pressure gauges and scheduled valve operator rounds',
    currentVendor: 'HydroTech Municipal Infrastructure Pvt Ltd',
    contractExpiryDays: 120,
    painPoints: [
      'Over 35% potable water lost as non-revenue water (NRW)',
      'Subterranean pipeline bursts undetected for days until road cave-ins',
      'High manual labor cost for 24/7 physical valve rotation rounds',
    ],
    opportunityScore: 92,
    location: 'Bengaluru Metropolitan Area',
  },
  {
    id: 'gov-sol-4',
    name: 'District Hospital Remote ICU & Patient Telemetry System',
    department: 'National Health Mission (NHM)',
    ministry: 'Ministry of Health and Family Welfare',
    category: 'Healthcare',
    description:
      'Rural Community Health Centers lack continuous ICU specialist monitoring, resulting in critical patient referrals across 100km+ transfers.',
    currentCost: 480, // ₹480 Lakhs/yr
    annualMaintenanceCost: 90,
    currentImplementationTime: 14, // 14 months
    currentTechnology: 'Standalone patient monitors with offline nurse charts',
    currentVendor: 'Global MedTech Systems Consortium',
    contractExpiryDays: 60,
    painPoints: [
      'Lack of real-time specialist oversight in remote tribal CHCs',
      'Delayed intervention during nocturnal patient decompensation',
      'Heavy referral load on overburdened district medical colleges',
    ],
    opportunityScore: 96,
    location: 'Karnataka & Maharashtra Rural Districts',
  },
];

export const INITIAL_ALTERNATIVES: AlternativeSolution[] = [
  {
    id: 'alt-sol-101',
    title: 'VisionSetu: Edge-AI Computer Vision for Municipal Road Distress & Auto-Pothole Patching',
    startupName: 'GeoVision Dynamics Technologies',
    startupDpiitNumber: 'DPIIT-2024-DL-87421',
    startupFoundedYear: 2023,
    startupLocation: 'New Delhi, India',
    targetSolutionId: 'gov-sol-1',
    proposedCost: 78, // ₹78 Lakhs/yr vs 140 (44% savings)
    costReductionPercent: 44,
    proposedTimelineMonths: 3, // 3 months vs 8 (62% faster)
    timeReductionPercent: 62,
    technologyStack: [
      'YOLOv10 Edge Vision',
      'Jetson Orin Nano IoT',
      'Real-Time GPS RTK',
      'NIC GIS Webhooks',
      'Sovereign Cloud',
    ],
    description:
      'Vehicle-mounted compact edge-camera modules installed on public garbage trucks that continuously scan 100% of municipal road networks every 48 hours, automatically classifying pothole depth, area, and GIS coordinates with sub-millimeter precision.',
    howItWorks:
      '1. Edge AI cameras mounted on municipal fleets capture high-definition road feed.\n2. Onboard Jetson neural processor identifies road distress, potholes, and cracks with 98.4% accuracy.\n3. Geo-tagged telemetry sent securely to Municipal Ward Dashboard with auto-generated repair work orders.\n4. Post-repair validation photo auto-reconciles contractor billing without human bias.',
    architectureDetails:
      'End-to-end sovereign edge architecture. Camera feed processed locally on-device; only anonymized bounding box metadata and GPS coordinates stream over encrypted 4G/5G tunnels to sovereign NIC cloud nodes.',
    uploadedDocuments: [
      {
        name: 'Technical_Whitepaper_EdgeAI_RoadSurveillance_v2.pdf',
        size: '3.4 MB',
        type: 'Technical Architecture',
      },
      {
        name: 'DPIIT_Recognition_Certificate_87421.pdf',
        size: '1.2 MB',
        type: 'Statutory Verification',
      },
      {
        name: 'CRRI_Lab_Validation_Accuracy_Report.pdf',
        size: '2.9 MB',
        type: 'Third-Party Benchmark',
      },
    ],
    aiFeasibilityScore: 93,
    aiJustification:
      'High technical feasibility. Proven edge inference on automotive mounts with certified 44% fiscal savings. Interoperable with municipal GIS and MCD work-order registries.',
    review: {
      technicalScore: 9.2,
      feasibilityScore: 9.0,
      impactScore: 9.5,
      innovationScore: 9.0,
      overallScore: 9.2,
      comments:
        'Exceptional proposal with validated CRRI test bench data. Exceeds Rule 149(iv) 10% minimum threshold with 44% verified cost reduction. Sanctioned for South Delhi trial.',
      reviewerName: 'Dr. Rameshwar Varma',
      reviewerDesignation: 'Chief Engineer (Smart Cities), MoHUA',
      evaluatedAt: '2026-03-12',
    },
    status: 'pilot_ongoing',
    likes: 42,
    comments: [
      {
        id: 'c-1',
        author: 'Ashok Kumar',
        role: 'Department Official',
        text: 'Initial 10-day test in Ward 48 identified 312 road distress points with 100% geo-accuracy. Substantially reduced inspection turnaround.',
        date: '2026-04-02',
      },
      {
        id: 'c-2',
        author: 'Priya Sharma (Founder)',
        role: 'Startup Founder',
        text: 'We have integrated our automated webhook directly into the MCD PMS system for automated contractor ticketing.',
        date: '2026-04-05',
      },
    ],
    pilot: {
      approved: true,
      pilotSite: 'South Delhi Municipal Zone (Wards 45-52)',
      budgetLakhs: 25,
      startDate: '2026-04-01',
      status: 'Live Deployment Phase 1',
      progressPct: 75,
      monitoringAgency: 'Central Road Research Institute (CRRI)',
    },
    recognition: {
      governmentApproved: true,
      recognitionLevel: 'DPIIT Star Innovation Champion',
      fundingAmountLakhs: 25,
    },
    submittedAt: '2026-02-18',
    updatedAt: '2026-04-10',
  },
  {
    id: 'alt-sol-102',
    title: 'BhoomiSens: Portable NIR Spectroscopy & Instant Soil Health AI Cloud',
    startupName: 'AgroQuantum Technologies',
    startupDpiitNumber: 'DPIIT-2023-HR-65109',
    startupFoundedYear: 2023,
    startupLocation: 'Gurugram, Haryana',
    targetSolutionId: 'gov-sol-2',
    proposedCost: 115, // ₹115 Lakhs vs 210 (45% savings)
    costReductionPercent: 45,
    proposedTimelineMonths: 2, // 2 months vs 6 (67% faster)
    timeReductionPercent: 67,
    technologyStack: [
      'Micro-NIR Spectroscopy',
      'BLE 5.3',
      'TensorFlow Lite Micro',
      'Soil Chemistry ML Model',
      'Multilingual Voice Advisory',
    ],
    description:
      'Handheld pocket spectrometer allowing Village Level Entrepreneurs (VLEs) and Krishi Mitras to test NPK, pH, and micronutrients in 90 seconds on the field at ₹50/test without wet chemicals.',
    howItWorks:
      '1. Handheld optical probe scans soil core sample using near-infrared light spectrum.\n2. Reflected spectral signature is transmitted via Bluetooth to mobile app.\n3. Cloud ML model correlates signature with ICAR calibration database.\n4. Instant bilingual Soil Health Card and precision fertilizer prescription issued in 90 seconds.',
    uploadedDocuments: [
      {
        name: 'ICAR_Field_Accuracy_Audit_Certificate.pdf',
        size: '4.1 MB',
        type: 'Agricultural Test Audit',
      },
      {
        name: 'BhoomiSens_Hardware_Datasheet.pdf',
        size: '1.8 MB',
        type: 'Hardware Specification',
      },
    ],
    aiFeasibilityScore: 88,
    aiJustification:
      'Reduces advisory turnaround from 35 days to under 2 minutes. Eliminates expensive laboratory wet reagents while cutting district expenditure by 45%.',
    review: {
      technicalScore: 8.8,
      feasibilityScore: 9.0,
      impactScore: 9.2,
      innovationScore: 8.5,
      overallScore: 8.9,
      comments:
        'Significant operational upgrade over district wet-labs. Portable form factor enables saturation of Soil Health Card scheme in remote blocks.',
      reviewerName: 'Dr. Sunita Deshmukh',
      reviewerDesignation: 'Director of Agritech Modernization, ICAR',
      evaluatedAt: '2026-03-20',
    },
    status: 'approved_for_pilot',
    likes: 31,
    comments: [
      {
        id: 'c-3',
        author: 'Rajiv Patel',
        role: 'Evaluator',
        text: 'Accuracy benchmarks verified within 4% of lab standards. Recommend testing in 50 Krishi Vigyan Kendras.',
        date: '2026-03-22',
      },
    ],
    pilot: {
      approved: true,
      pilotSite: 'Karnal & Kurukshetra Krishi Vigyan Kendras',
      budgetLakhs: 30,
      startDate: '2026-05-01',
      status: 'Escrow Account Provisioned',
      progressPct: 40,
      monitoringAgency: 'Haryana Department of Agriculture',
    },
    recognition: {
      governmentApproved: true,
      recognitionLevel: 'National Agritech Pilot Finalist',
      fundingAmountLakhs: 30,
    },
    submittedAt: '2026-03-01',
    updatedAt: '2026-03-25',
  },
  {
    id: 'alt-sol-103',
    title: 'AuraHydro: Acoustic Waveguide IoT Sensor Grid for Early Leak & Burst Triangulation',
    startupName: 'HydroWave Intelligence Labs',
    startupDpiitNumber: 'DPIIT-2024-KA-91024',
    startupFoundedYear: 2024,
    startupLocation: 'Bengaluru, Karnataka',
    targetSolutionId: 'gov-sol-3',
    proposedCost: 195, // ₹195 Lakhs vs 320 (39% savings)
    costReductionPercent: 39,
    proposedTimelineMonths: 5, // 5 months vs 12 (58% faster)
    timeReductionPercent: 58,
    technologyStack: [
      'Piezo-Acoustic Waveguides',
      'NB-IoT Cellular',
      'Time-Difference-of-Arrival (TDoA)',
      'Digital Twin GIS',
    ],
    description:
      'Clamp-on non-intrusive acoustic IoT transducers placed every 500m on municipal trunk pipelines that listen to fluid turbulence and pinpoint subterranean pinhole leaks to within 1.5 meters before road damage occurs.',
    howItWorks:
      '1. Clamp-on acoustic sensors listen for micro-frequency turbulence emitted by escaping water.\n2. TDoA algorithm cross-correlates audio signatures between neighboring nodes.\n3. Leak location triangulated to within 1.5m and visualized on 3D Digital Twin GIS.\n4. Automatic shutoff valve actuator triggers if flow rate surpasses emergency thresholds.',
    uploadedDocuments: [
      {
        name: 'AuraHydro_Acoustic_Patent_Spec.pdf',
        size: '2.5 MB',
        type: 'Patent Specification',
      },
    ],
    aiFeasibilityScore: 91,
    aiJustification:
      'Non-invasive clamp-on design allows rapid retrofitting onto existing cast-iron and ductile iron pipelines without cutting water supply.',
    review: {
      technicalScore: 9.0,
      feasibilityScore: 8.8,
      impactScore: 9.4,
      innovationScore: 9.2,
      overallScore: 9.1,
      comments:
        'Directly targets the 35% non-revenue water crisis in Bengaluru. Substantially cheaper than foreign acoustic crawler systems.',
      reviewerName: 'K. S. Narayanaswamy',
      reviewerDesignation: 'Chief Technical Advisor, Urban Water Mission',
      evaluatedAt: '2026-03-28',
    },
    status: 'under_review',
    likes: 19,
    comments: [],
    pilot: {
      approved: false,
    },
    submittedAt: '2026-03-15',
    updatedAt: '2026-03-29',
  },
  {
    id: 'alt-sol-104',
    title: 'AyuPulse: Edge Bio-Telemetry Hub & Tele-ICU Specialist Grid for Primary Healthcare',
    startupName: 'CardioNext Bioelectronics',
    startupDpiitNumber: 'DPIIT-2023-MH-44129',
    startupFoundedYear: 2023,
    startupLocation: 'Pune, Maharashtra',
    targetSolutionId: 'gov-sol-4',
    proposedCost: 240, // ₹240 Lakhs vs 480 (50% savings)
    costReductionPercent: 50,
    proposedTimelineMonths: 6, // 6 months vs 14 (57% faster)
    timeReductionPercent: 57,
    technologyStack: [
      'Multi-Parameter Bio-Sensors',
      'WebRTC Sovereign Tele-ICU',
      'Real-Time Early Warning Score (NEWS2)',
      'FHIR / ABDM Compliant API',
    ],
    description:
      'Plug-and-play 6-parameter ICU tele-monitoring station linking rural community health beds to central medical college ICU intensivist doctors 24/7 with automated decompensation risk warnings.',
    howItWorks:
      '1. Multi-lead ECG, SpO2, NIBP, and Capnography data streams via encrypted ABDM health cloud.\n2. Machine learning early warning algorithm calculates modified NEWS2 score every 15 seconds.\n3. Automatic audio-video link opens to central Command Center if critical threshold breached.\n4. Intensivist guides rural medical officer through stabilization protocol.',
    uploadedDocuments: [
      {
        name: 'CDSCO_Medical_Device_Class_B_Approval.pdf',
        size: '1.9 MB',
        type: 'Regulatory Approval',
      },
    ],
    aiFeasibilityScore: 95,
    aiJustification:
      'ABDM-native architecture with CDSCO certification. Cut equipment costs in half compared to multinational medical equipment imports.',
    review: {
      technicalScore: 9.5,
      feasibilityScore: 9.3,
      impactScore: 9.8,
      innovationScore: 9.1,
      overallScore: 9.5,
      comments:
        'Life-saving innovation with potential to convert 500+ rural CHCs into virtual ICU beds. Recommended for immediate scale up.',
      reviewerName: 'Dr. Arvind Mahajan',
      reviewerDesignation: 'Director General, Digital Health Mission',
      evaluatedAt: '2026-04-01',
    },
    status: 'approved',
    likes: 58,
    comments: [
      {
        id: 'c-4',
        author: 'Dr. Meera Nambiar',
        role: 'Department Official',
        text: 'Tested across 12 CHCs in Mysore district; reduced emergency transit transfers by 68%. Outstanding clinical outcome.',
        date: '2026-04-08',
      },
    ],
    pilot: {
      approved: true,
      pilotSite: 'Mysuru Rural CHC Network (12 Centers)',
      budgetLakhs: 50,
      startDate: '2026-01-15',
      status: 'Completed & Certified',
      progressPct: 100,
      monitoringAgency: 'Karnataka State Health System Resource Centre',
    },
    recognition: {
      governmentApproved: true,
      recognitionLevel: 'National Health Innovation Award 2026',
      fundingAmountLakhs: 50,
    },
    submittedAt: '2025-11-20',
    updatedAt: '2026-04-09',
  },
];
