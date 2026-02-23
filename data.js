// Product database – each entry includes source and last updated date
const products = [
    {
        name: "Seventh Generation Dish Soap",
        brand: "Seventh Generation",
        category: "Cleaning",
        grade: "A",
        reason: "Plant‑based, recycled packaging, B Corp certified.",
        pros: ["Biodegradable", "No synthetic fragrances", "Cruelty‑free"],
        cons: ["Slightly more expensive"],
        evidence: [
            { name: "Seventh Generation Sustainability", url: "https://www.seventhgeneration.com/sustainability" },
            { name: "B Corp Directory", url: "https://www.bcorporation.net/" }
        ],
        lastUpdated: "2025-02-15"
    },
    {
        name: "Clorox Disinfecting Wipes",
        brand: "Clorox",
        category: "Cleaning",
        grade: "D",
        reason: "Single‑use plastic, harsh chemicals, not biodegradable.",
        pros: ["Effective germ kill"],
        cons: ["Contains bleach", "Non‑recyclable packaging", "Harmful to aquatic life"],
        evidence: [
            { name: "EWG Guide", url: "https://www.ewg.org/guides/cleaners/1234-CloroxDisinfectingWipes" }
        ],
        lastUpdated: "2025-02-10"
    },
    {
        name: "Beyond Meat Burger",
        brand: "Beyond Meat",
        category: "Snacks",
        grade: "B",
        reason: "Lower carbon footprint than beef, but highly processed.",
        pros: ["Plant‑based", "Less water usage", "Comparable taste"],
        cons: ["Processed ingredients", "Plastic packaging"],
        evidence: [
            { name: "Beyond Meat Environmental Impact", url: "https://www.beyondmeat.com/environmental-impact" }
        ],
        lastUpdated: "2025-02-18"
    },
    {
        name: "Dasani Water Bottle",
        brand: "Coca‑Cola",
        category: "Snacks",
        grade: "F",
        reason: "Single‑use plastic, bottled tap water, massive plastic pollution.",
        pros: ["Hydrating"],
        cons: ["Non‑renewable", "Low recycling rates", "Corporate water grabbing"],
        evidence: [
            { name: "The World Counts", url: "https://www.theworldcounts.com/stories/environmental-impact-of-plastic-water-bottles" }
        ],
        lastUpdated: "2025-02-12"
    },
    {
        name: "Patagonia Better Sweater",
        brand: "Patagonia",
        category: "Clothing",
        grade: "A",
        reason: "Fair Trade sewn, recycled materials, repair program.",
        pros: ["Recycled polyester", "Fair Trade certified", "Durable"],
        cons: ["Expensive"],
        evidence: [
            { name: "Patagonia Footprint", url: "https://www.patagonia.com/our-footprint/" }
        ],
        lastUpdated: "2025-02-20"
    },
    {
        name: "H&M Conscious Dress",
        brand: "H&M",
        category: "Clothing",
        grade: "C",
        reason: "Uses some recycled materials but fast fashion model is unsustainable.",
        pros: ["Affordable", "Recycled polyester in some lines"],
        cons: ["Fast fashion business model", "Mixed materials hard to recycle"],
        evidence: [
            { name: "Elle Sustainability Rating", url: "https://www.elle.com/fashion/a29502807/handm-sustainability-rating/" }
        ],
        lastUpdated: "2025-02-14"
    },
    {
        name: "Method All‑Purpose Cleaner",
        brand: "Method",
        category: "Cleaning",
        grade: "B",
        reason: "Plant‑based, but uses plastic bottles (though recycled).",
        pros: ["Biodegradable formula", "Recycled plastic bottles", "Cruelty‑free"],
        cons: ["Still single‑use plastic", "Fragrances may irritate"],
        evidence: [
            { name: "Method Sustainability", url: "https://methodhome.com/sustainability/" }
        ],
        lastUpdated: "2025-02-16"
    },
    {
        name: "Nestlé Pure Life Water",
        brand: "Nestlé",
        category: "Snacks",
        grade: "F",
        reason: "Massive plastic waste, water extraction controversies.",
        pros: ["Widely available"],
        cons: ["Single‑use plastic", "Questionable water sourcing", "Low transparency"],
        evidence: [
            { name: "Nestlé Water Controversy", url: "https://www.theguardian.com/global-development/2021/mar/25/nestle-pays-france-500k-euros-to-end-water-dispute" }
        ],
        lastUpdated: "2025-02-11"
    },
    {
        name: "Allbirds Tree Runners",
        brand: "Allbirds",
        category: "Clothing",
        grade: "A",
        reason: "Renewable materials, carbon neutral, transparent footprint.",
        pros: ["Eucalyptus fiber", "SweetFoam® sole from sugarcane", "Carbon neutral"],
        cons: ["Limited durability for heavy use"],
        evidence: [
            { name: "Allbirds Sustainability", url: "https://www.allbirds.com/pages/sustainability" }
        ],
        lastUpdated: "2025-02-19"
    },
    {
        name: "Aveeno Positively Mineral Sunscreen",
        brand: "Aveeno",
        category: "Personal Care",
        grade: "C",
        reason: "Mineral sunscreen but contains some questionable additives.",
        pros: ["Reef‑safe (non‑nano zinc oxide)", "No oxybenzone"],
        cons: ["Packaging not recycled", "Contains dimethicone"],
        evidence: [
            { name: "EWG Sunscreen Guide", url: "https://www.ewg.org/sunscreen/browse/Aveeno/Positively+Mineral+Sunscreen/" }
        ],
        lastUpdated: "2025-02-13"
    }
];
