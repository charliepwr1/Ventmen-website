/**
 * Centralized content for service and area pages.
 * Used by both page components (display) and schema generators (structured data).
 * Update content here -- it propagates to both human-visible and machine-readable output.
 */

export const SERVICE_CONTENT = {
  'furnace-cleaning': {
    title: 'Furnace Cleaning in Calgary',
    metaTitle: 'Furnace Cleaning Calgary | From $159.95 | Video-Verified',
    metaDescription:
      'Professional furnace cleaning in Calgary starting at $159.95. Includes blower motor cleaning, filter replacement, and before-and-after video documentation sent directly to your phone. The Vent Men.',
    // Answer-first: the first thing on the page, directly answering the search query
    answerBlock:
      'A professional furnace cleaning from The Vent Men costs $159.95 and includes a complete blower motor cleaning, filter replacement, heat exchanger inspection, and before-and-after video documentation sent directly to your phone. We serve Calgary, Okotoks, Cochrane, Chestermere, and surrounding communities.',
    whatIsIncluded: [
      'Complete blower motor removal and cleaning',
      'Furnace filter replacement',
      'Heat exchanger visual inspection',
      'Condensate drain check (high-efficiency units)',
      'Before-and-after video documentation',
      'Same-day video report sent to your phone',
    ],
    process: [
      { step: 'Arrival & Inspection', description: 'Our technician arrives in a clean, branded Ford Transit, introduces themselves, and inspects your furnace system. We identify your furnace type, note any concerns, and explain exactly what we will do.' },
      { step: 'Before Documentation', description: 'We record video of your furnace internals and ductwork connections before any work begins. This is your proof of what the system looked like before cleaning.' },
      { step: 'Blower Motor Cleaning', description: 'We remove the blower motor assembly and clean every blade and housing surface. A dirty blower motor reduces airflow by up to 25% and forces your furnace to work harder.' },
      { step: 'System Cleaning', description: 'Using our HyperVac H2 commercial HEPA vacuum, we clean the furnace cabinet, heat exchanger surfaces, and all accessible components.' },
      { step: 'After Documentation & Report', description: 'We record the same areas after cleaning, reassemble everything, and send you a side-by-side video report the same day.' },
    ],
    equipment:
      'We use a HyperVac H2 -- a commercial-grade HEPA-filtered vacuum system that creates powerful suction to remove dust, debris, and contaminants. This is not a residential shop-vac. It is the same caliber of equipment used in commercial buildings and hospitals.',
    faqs: [
      {
        question: 'How much does furnace cleaning cost in Calgary?',
        answer: 'Our furnace cleaning starts at $159.95 and includes 10 vents, blower motor cleaning, filter replacement, and before-and-after video documentation. Extra vents are $9.95 each. No hidden fees or surprise charges.',
      },
      {
        question: 'How often should I get my furnace cleaned?',
        answer: 'Most Calgary homes should have their furnace cleaned every 1-2 years. Homes with pets, smokers, recent renovations, or allergy sufferers should clean annually. New construction homes should be cleaned before first occupancy.',
      },
      {
        question: 'What is included in a furnace cleaning?',
        answer: 'Our standard furnace cleaning includes blower motor removal and cleaning, filter replacement, heat exchanger inspection, condensate drain check, and before-and-after video documentation sent to your phone.',
      },
      {
        question: 'How long does furnace cleaning take?',
        answer: 'A furnace cleaning typically takes 1-2 hours depending on the furnace type and condition. If combined with duct cleaning, plan for 2-3 hours total.',
      },
      {
        question: 'Do you clean high-efficiency furnaces?',
        answer: 'Yes. We clean all furnace types including standard, mid-efficiency, and high-efficiency (condensing) furnaces. High-efficiency units have additional components like secondary heat exchangers and condensate drains that we inspect and clean.',
      },
    ],
  },

  'duct-cleaning': {
    title: 'Duct Cleaning in Calgary',
    metaTitle: 'Duct Cleaning Calgary | From $159.95 | Before & After Video Proof',
    metaDescription:
      'Professional duct cleaning in Calgary with before-and-after video documentation. See what is actually in your ducts. Flat-rate pricing from $159.95. The Vent Men.',
    answerBlock:
      'Professional duct cleaning in Calgary from The Vent Men starts at $159.95 for 10 vents and includes before-and-after video documentation so you can see exactly what was in your system. We use a HyperVac H2 commercial HEPA vacuum -- not a residential shop-vac. Serving Calgary, Okotoks, Cochrane, Chestermere, and area.',
    whatIsIncluded: [
      'Cleaning of all supply and return air ducts (10 vents included)',
      'Main trunk line cleaning',
      'Register removal and cleaning',
      'Before-and-after video documentation',
      'Same-day video report sent to your phone',
      'Furnace filter check',
    ],
    process: [
      { step: 'System Assessment', description: 'We inspect your ductwork layout, identify all supply and return vents, and note any areas of concern. We explain the full scope of work before starting.' },
      { step: 'Before Video', description: 'We insert a camera into your ductwork and record what is inside -- dust, debris, construction materials, pet hair, whatever has accumulated. This is your baseline proof.' },
      { step: 'Source Removal Cleaning', description: 'We connect the HyperVac H2 to your main trunk line, creating powerful negative pressure throughout the system. Each vent is cleaned individually using compressed air tools or rotary brushes (Pro package) to dislodge debris and push it toward the vacuum.' },
      { step: 'Verification & After Video', description: 'We re-inspect with the camera to verify all ducts are clean. We record after footage of the same areas so you can compare side-by-side.' },
      { step: 'Report Delivery', description: 'You receive a video report the same day showing before-and-after footage of your ductwork. No more wondering if the job was actually done.' },
    ],
    equipment:
      'Our HyperVac H2 commercial HEPA vacuum creates the suction needed to actually remove debris from your entire duct system. Many budget operators use underpowered equipment that pushes dust around without removing it. Our system captures particles down to 0.3 microns.',
    faqs: [
      {
        question: 'How much does duct cleaning cost in Calgary?',
        answer: 'Duct cleaning from The Vent Men starts at $159.95 for 10 vents. Extra vents are $9.95 each (Basic) or $13.95 each (Pro with rotary brush). Our Pro package at $219.95 is recommended for homes with pets or allergies. All packages include before-and-after video documentation.',
      },
      {
        question: 'What is the difference between a $99 duct cleaning special and a real cleaning?',
        answer: 'A $99 special typically uses low-powered equipment, cleans only a few vents, and relies on upselling once technicians are in your home. A proper duct cleaning uses commercial-grade equipment, cleans every vent in the system, and provides documentation proving the work was done. We include video proof with every job.',
      },
      {
        question: 'How do I know if my ducts need cleaning?',
        answer: 'Signs include visible dust blowing from vents, musty odors when the furnace runs, increased allergy symptoms indoors, recent renovations or construction, or it has been more than 2 years since the last cleaning. If you can see dust buildup inside a vent cover, your ducts likely need attention.',
      },
      {
        question: 'Do you provide before-and-after documentation?',
        answer: 'Yes. Every duct cleaning includes before-and-after video documentation. We record your ductwork before we start and again after cleaning, then send you the video the same day. You see exactly what was in your system and can verify it is actually clean.',
      },
      {
        question: 'How long does duct cleaning take?',
        answer: 'A standard home with 10-15 vents takes approximately 2-3 hours. Larger homes or systems with heavy buildup may take longer. We will give you a time estimate during booking.',
      },
      {
        question: 'Is duct cleaning worth it or is it a scam?',
        answer: 'Duct cleaning from a reputable company with proper equipment is absolutely worth it -- especially for homes with pets, allergies, new construction, or systems that have not been cleaned in years. The scams come from operators using inadequate equipment who do not actually clean the full system. That is why we provide video proof of every job.',
      },
    ],
  },

  'dryer-vent-cleaning': {
    title: 'Dryer Vent Cleaning in Calgary',
    metaTitle: 'Dryer Vent Cleaning Calgary | From $59.95 | Fire Prevention',
    metaDescription:
      'Professional dryer vent cleaning in Calgary from $59.95. Prevent dryer fires, reduce drying times, and lower energy bills. The Vent Men.',
    answerBlock:
      'Dryer vent cleaning from The Vent Men starts at $59.95 for ground-floor vents in Calgary. Clogged dryer vents are a leading cause of house fires in Canada -- lint buildup restricts airflow, causes overheating, and can ignite. We clean the full vent run from dryer to exterior exhaust.',
    whatIsIncluded: [
      'Full vent line cleaning from dryer to exterior exhaust',
      'Lint trap and housing cleaning',
      'Exterior vent cap inspection and cleaning',
      'Airflow verification after cleaning',
      'Visual inspection for damage or disconnections',
    ],
    process: [
      { step: 'Inspection', description: 'We inspect the dryer vent run, identify the exhaust location (ground level, 2nd floor, or rooftop), and check for any visible damage or disconnections.' },
      { step: 'Cleaning', description: 'We use rotary brushes and compressed air to clean the entire vent run from the dryer connection to the exterior exhaust, removing all lint and debris buildup.' },
      { step: 'Verification', description: 'We verify proper airflow through the cleaned vent and ensure the exterior cap opens and closes correctly.' },
    ],
    equipment:
      'We use specialized rotary brush systems designed for dryer vent cleaning, combined with compressed air to ensure complete lint removal through the full vent run.',
    faqs: [
      {
        question: 'How much does dryer vent cleaning cost?',
        answer: 'Dryer vent cleaning starts at $59.95 for ground-floor vents. Second-floor vents are $129.95 and rooftop vents are $199.95 due to additional access requirements. Save by bundling with our Full Service package ($349.95) which includes dryer vent cleaning.',
      },
      {
        question: 'How often should I clean my dryer vent?',
        answer: 'The National Fire Protection Association recommends cleaning dryer vents at least once per year. Homes that do heavy laundry or have longer vent runs should clean more frequently. Signs of a clogged vent include longer drying times, a hot dryer top, and a musty smell on clothes.',
      },
      {
        question: 'Are clogged dryer vents really a fire risk?',
        answer: 'Yes. Dryer fires cause an estimated 15,500 structure fires per year in North America. Lint is highly flammable, and when it accumulates in the vent, it restricts airflow and causes the dryer to overheat. Regular cleaning is simple, inexpensive fire prevention.',
      },
      {
        question: 'Can I clean my dryer vent myself?',
        answer: 'You can clean the lint trap and the first few inches of vent behind the dryer, but the full vent run to the exterior requires professional equipment to clean properly. DIY kits often push lint further into the vent rather than removing it.',
      },
    ],
  },

  'full-system-cleaning': {
    title: 'Full HVAC System Cleaning in Calgary',
    metaTitle: 'Full HVAC Cleaning Calgary | $349.95 | Everything Included',
    metaDescription:
      'Complete HVAC system cleaning in Calgary for $349.95. Includes furnace, all ducts, dryer vent, HRV, fresh air intake, and 2-year care plan. Video-verified by The Vent Men.',
    answerBlock:
      'Our Full Service HVAC cleaning is $349.95 and includes everything: furnace cleaning, all duct cleaning with rotary brushes, dryer vent cleaning, HRV cleaning, fresh air intake cleaning, octopus whip treatment, and a 2-year care plan. Before-and-after video documentation included. This is the complete package for homeowners who want their entire system cleaned properly.',
    whatIsIncluded: [
      'Complete furnace cleaning (blower motor, filter, heat exchanger)',
      'All supply and return duct cleaning with rotary brushes (10 vents included)',
      'Dryer vent cleaning (ground floor)',
      'HRV (Heat Recovery Ventilator) cleaning',
      'Fresh air intake cleaning',
      'Octopus whip treatment for stubborn buildup',
      'Before-and-after video documentation',
      '2-year care plan with priority scheduling',
    ],
    process: [
      { step: 'Full System Assessment', description: 'We inspect your entire HVAC system -- furnace, ductwork, dryer vent, HRV, and fresh air intake. We document the baseline condition on video.' },
      { step: 'Furnace Cleaning', description: 'Complete furnace cleaning including blower motor removal, filter replacement, and heat exchanger inspection.' },
      { step: 'Duct Cleaning with Rotary Brushes', description: 'Every supply and return vent is cleaned using rotary brushes (not just compressed air) for the most thorough debris removal. The HyperVac H2 provides continuous negative pressure throughout.' },
      { step: 'Supplementary Systems', description: 'We clean the dryer vent run, HRV unit, and fresh air intake -- components most basic packages skip entirely.' },
      { step: 'Octopus Whip & Final Pass', description: 'The octopus whip attachment agitates stubborn buildup in main trunk lines that standard tools miss.' },
      { step: 'Documentation & Care Plan', description: 'You receive complete before-and-after video documentation and enrollment in our 2-year care plan with priority scheduling for your next cleaning.' },
    ],
    equipment:
      'The Full Service package uses every tool in our arsenal: the HyperVac H2 commercial HEPA vacuum, rotary brush system, octopus whip agitator, compressed air tools, and specialized HRV cleaning equipment. This is the most thorough cleaning available.',
    faqs: [
      {
        question: 'What is included in the Full Service package?',
        answer: 'Everything: furnace cleaning, all duct cleaning with rotary brushes (10 vents included), dryer vent cleaning, HRV cleaning, fresh air intake cleaning, octopus whip treatment, before-and-after video documentation, and a 2-year care plan. It is our most comprehensive package at $349.95.',
      },
      {
        question: 'Is the Full Service package worth the extra cost?',
        answer: 'If your home has an HRV, dryer vent, and has not been cleaned in 2+ years, the Full Service package saves money compared to booking each service individually. It also includes rotary brush cleaning and the 2-year care plan, which most basic packages do not.',
      },
      {
        question: 'What is a 2-year care plan?',
        answer: 'Our care plan gives you priority scheduling for your next cleaning within 2 years, a locked-in rate, and seasonal maintenance reminders. It is our way of making sure your system stays clean long-term.',
      },
      {
        question: 'What is octopus whip cleaning?',
        answer: 'The octopus whip is a specialized attachment with multiple flexible arms that spin inside main trunk lines, agitating and dislodging debris that standard tools cannot reach. It is especially effective for homes with heavy buildup or systems that have not been cleaned in years.',
      },
    ],
  },
} as const;

export type ServiceSlug = keyof typeof SERVICE_CONTENT;

export const AREA_CONTENT = {
  calgary: {
    title: 'Furnace & Duct Cleaning in Calgary',
    metaTitle: 'Duct Cleaning Calgary | Video-Verified | The Vent Men',
    metaDescription:
      'Professional furnace and duct cleaning across all Calgary neighborhoods. Before-and-after video proof, flat-rate pricing from $159.95. The Vent Men.',
    answerBlock:
      'The Vent Men provides professional furnace and duct cleaning across all Calgary neighborhoods -- NW, NE, SW, and SE. Every job includes before-and-after video documentation so you can see exactly what was in your system. Flat-rate pricing starts at $159.95 for 10 vents. No hidden fees, no bait-and-switch.',
    localContext:
      'Calgary\'s dry climate and long heating season mean your furnace works hard from September through May. Dust, pet hair, and construction debris accumulate in ductwork faster than most homeowners realize. We serve every Calgary neighborhood and typically book within the same week.',
    neighborhoods: ['Tuscany', 'Cranston', 'Signal Hill', 'McKenzie Towne', 'Panorama Hills', 'Auburn Bay', 'Evanston', 'Seton', 'Legacy', 'Mahogany', 'Walden', 'Bridgeland'],
    faqs: [
      {
        question: 'How much does duct cleaning cost in Calgary?',
        answer: 'Duct cleaning in Calgary from The Vent Men starts at $159.95 for 10 vents (Basic package). Our Pro package with rotary brush cleaning is $219.95, and our Full Service package including dryer vent and HRV is $349.95. All packages include before-and-after video documentation.',
      },
      {
        question: 'What is the best duct cleaning company in Calgary?',
        answer: 'The Vent Men is Calgary\'s video-verified duct cleaning service. We provide before-and-after video documentation of every job, use commercial-grade HyperVac H2 equipment, and offer transparent flat-rate pricing with no upsells. Our technicians arrive in uniform with a professional, fully wrapped service vehicle.',
      },
      {
        question: 'How often should I clean my ducts in Calgary?',
        answer: 'In Calgary\'s climate, most homes should have their ducts cleaned every 1-2 years. Homes with pets, allergy sufferers, or recent renovations should clean annually. New construction homes should be cleaned before first occupancy to remove construction dust and debris.',
      },
    ],
  },

  okotoks: {
    title: 'Furnace & Duct Cleaning in Okotoks',
    metaTitle: 'Duct Cleaning Okotoks | Video-Verified | The Vent Men',
    metaDescription:
      'Professional furnace and duct cleaning in Okotoks. Before-and-after video documentation, flat-rate pricing. No travel fees. The Vent Men.',
    answerBlock:
      'The Vent Men provides professional furnace and duct cleaning in Okotoks with no travel fees. Every job includes before-and-after video documentation. We are based in Calgary and serve Okotoks regularly -- just 30 minutes south on Highway 2. Flat-rate pricing from $159.95.',
    localContext:
      'Okotoks is one of Alberta\'s fastest-growing communities, with thousands of newer homes that benefit from regular HVAC maintenance. Whether you are in the established neighborhoods near downtown Okotoks or the newer developments along the edges, we provide the same professional service with no additional travel charges.',
    neighborhoods: ['D\'Arcy', 'Cimarron', 'Drake Landing', 'Sheep River', 'Crystal Shores', 'Westridge'],
    faqs: [
      {
        question: 'Do you charge extra to come to Okotoks?',
        answer: 'No. We serve Okotoks regularly and do not charge travel fees. The same flat-rate pricing applies whether you are in Calgary or Okotoks.',
      },
      {
        question: 'How much does duct cleaning cost in Okotoks?',
        answer: 'Duct cleaning in Okotoks starts at $159.95 for 10 vents with before-and-after video documentation. Our Pro package with rotary brush cleaning is $219.95. Same pricing as Calgary, no travel surcharge.',
      },
      {
        question: 'Who is the best duct cleaning company in Okotoks?',
        answer: 'The Vent Men serves Okotoks with the same professional, video-verified service we provide across Calgary. We use commercial-grade HyperVac H2 equipment, provide before-and-after video proof, and offer transparent flat-rate pricing with no upsells.',
      },
    ],
  },

  chestermere: {
    title: 'Furnace & Duct Cleaning in Chestermere',
    metaTitle: 'Duct Cleaning Chestermere | Video-Verified | The Vent Men',
    metaDescription:
      'Professional furnace and duct cleaning in Chestermere. Before-and-after video documentation, flat-rate pricing. No travel fees. The Vent Men.',
    answerBlock:
      'The Vent Men provides professional furnace and duct cleaning in Chestermere with no travel fees. Just 20 minutes east of Calgary, we serve Chestermere regularly. Every job includes before-and-after video documentation and flat-rate pricing from $159.95.',
    localContext:
      'Chestermere\'s lakeside community has seen rapid residential growth. Many homes here are newer builds that can accumulate construction dust and drywall particles in the ductwork. Regular cleaning helps maintain air quality, especially for families with young children or allergy concerns.',
    neighborhoods: ['Kinniburgh', 'Westmere', 'Rainbow Falls', 'Lakepointe', 'The Cove', 'Dawson\'s Landing'],
    faqs: [
      {
        question: 'Do you serve Chestermere?',
        answer: 'Yes. We serve all of Chestermere with no travel fees. Same flat-rate pricing and video-verified service as Calgary. Chestermere is just 20 minutes from our base.',
      },
      {
        question: 'How much does duct cleaning cost in Chestermere?',
        answer: 'Duct cleaning in Chestermere starts at $159.95 for 10 vents with before-and-after video documentation. No travel surcharges for Chestermere service.',
      },
    ],
  },

  cochrane: {
    title: 'Furnace & Duct Cleaning in Cochrane',
    metaTitle: 'Duct Cleaning Cochrane | Video-Verified | The Vent Men',
    metaDescription:
      'Professional furnace and duct cleaning in Cochrane, AB. Before-and-after video documentation, flat-rate pricing. No travel fees. The Vent Men.',
    answerBlock:
      'The Vent Men provides professional furnace and duct cleaning in Cochrane with no travel fees. Located 30 minutes northwest of Calgary, Cochrane is part of our regular service area. Every job includes before-and-after video documentation. Flat-rate pricing from $159.95.',
    localContext:
      'Cochrane\'s location at the edge of the foothills means colder winters and more furnace runtime than Calgary proper. The town has grown significantly in recent years with new subdivisions that benefit from post-construction duct cleaning. We serve all Cochrane neighborhoods on a regular basis.',
    neighborhoods: ['Fireside', 'Sunset Ridge', 'Heartland', 'Riversong', 'Jumping Pound Ridge', 'Heritage Hills'],
    faqs: [
      {
        question: 'Do you charge travel fees for Cochrane?',
        answer: 'No. Cochrane is part of our regular service area. Same flat-rate pricing as Calgary, no travel surcharges.',
      },
      {
        question: 'How much does duct cleaning cost in Cochrane?',
        answer: 'Duct cleaning in Cochrane starts at $159.95 for 10 vents with before-and-after video documentation. Same pricing as Calgary.',
      },
    ],
  },

  'high-river': {
    title: 'Furnace & Duct Cleaning in High River',
    metaTitle: 'Duct Cleaning High River | Video-Verified | The Vent Men',
    metaDescription:
      'Professional furnace and duct cleaning in High River, AB. Before-and-after video documentation, flat-rate pricing. The Vent Men.',
    answerBlock:
      'The Vent Men provides professional furnace and duct cleaning in High River. Located 45 minutes south of Calgary on Highway 2, High River is part of our service area. Every job includes before-and-after video documentation and flat-rate pricing from $159.95.',
    localContext:
      'High River experienced significant flood damage in 2013, and many homes underwent major renovations afterward. If your home was renovated or rebuilt post-flood, a professional duct cleaning can remove residual construction materials and ensure your HVAC system is operating cleanly.',
    neighborhoods: [],
    faqs: [
      {
        question: 'Do you serve High River?',
        answer: 'Yes. High River is part of our regular service area, about 45 minutes south of Calgary. Same pricing and video-verified service.',
      },
    ],
  },

  'black-diamond': {
    title: 'Furnace & Duct Cleaning in Black Diamond',
    metaTitle: 'Duct Cleaning Black Diamond AB | Video-Verified | The Vent Men',
    metaDescription:
      'Professional furnace and duct cleaning in Black Diamond and Turner Valley, AB. Video documentation, flat-rate pricing. The Vent Men.',
    answerBlock:
      'The Vent Men provides professional furnace and duct cleaning in Black Diamond and Turner Valley. About 50 minutes southwest of Calgary, these communities are part of our service area. Every job includes before-and-after video documentation. Flat-rate pricing from $159.95.',
    localContext:
      'Black Diamond and neighboring Turner Valley are smaller communities where finding professional HVAC services can be challenging. We bring the same commercial-grade equipment and video-verified process that we use in Calgary, with no compromise on quality.',
    neighborhoods: [],
    faqs: [
      {
        question: 'Do you serve Black Diamond and Turner Valley?',
        answer: 'Yes. Black Diamond and Turner Valley are part of our service area. Same flat-rate pricing and video-verified service as Calgary.',
      },
    ],
  },

  langdon: {
    title: 'Furnace & Duct Cleaning in Langdon',
    metaTitle: 'Duct Cleaning Langdon AB | Video-Verified | The Vent Men',
    metaDescription:
      'Professional furnace and duct cleaning in Langdon, AB. Before-and-after video documentation, flat-rate pricing. No travel fees. The Vent Men.',
    answerBlock:
      'The Vent Men provides professional furnace and duct cleaning in Langdon with no travel fees. Just 25 minutes east of Calgary, Langdon is part of our regular service area. Every job includes before-and-after video documentation. Flat-rate pricing from $159.95.',
    localContext:
      'Langdon has seen steady growth with new residential developments east of Calgary. Many of these newer homes benefit from an initial professional duct cleaning to remove construction dust and debris that accumulates during the building process.',
    neighborhoods: ['Boulder Creek', 'Indus'],
    faqs: [
      {
        question: 'Do you serve Langdon?',
        answer: 'Yes. Langdon is part of our regular service area, about 25 minutes east of Calgary. Same pricing, no travel fees.',
      },
    ],
  },
} as const;

export type AreaSlug = keyof typeof AREA_CONTENT;
