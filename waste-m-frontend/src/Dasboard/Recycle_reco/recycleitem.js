export const recyclingItems = [
  {
    id: 1,
    category: "plastic",
    title: "Plastic Bottles (PET)",
    description: "Clean and empty plastic bottles can be recycled.",
    difficulty: "easy",
    points: 10,
    impact: "Saves 3kg CO2 per month",
    instructions: [
      "Remove caps and labels",
      "Rinse thoroughly",
      "Crush to save space",
    ],
    tips: "Most bottle caps are made from different plastic and should be recycled separately.",
    locations: ["Local Recycling Center", "Curbside Pickup"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/IsmK1h84Ph0",
      content:
        "This comprehensive video guide covers everything you need to know about recycling PET plastic bottles, including identification, preparation, and common mistakes to avoid.",
      quiz: [
        {
          question: "What should you do before recycling a plastic bottle?",
          options: ["Crush it", "Rinse it", "Leave the cap on", "Paint it"],
          correct: 1,
        },
        {
          question:
            "Which type of plastic is typically used for water bottles?",
          options: ["PVC", "HDPE", "PET", "PP"],
          correct: 2,
        },
      ],
    },
  },
  {
    id: 2,
    category: "paper",
    title: "Cardboard Boxes",
    description: "Flatten cardboard boxes for recycling.",
    difficulty: "medium",
    points: 15,
    impact: "Saves 2 trees per month",
    instructions: [
      "Remove tape and staples",
      "Break down boxes",
      "Keep dry and clean",
    ],
    tips: "Pizza boxes with grease stains should go in compost instead.",
    locations: ["Recycling Bins", "Collection Points"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "/placeholder.svg?height=360&width=640",
      content:
        "Learn how to properly recycle cardboard boxes, including how to prepare them and what to watch out for to ensure they can be recycled effectively.",
      quiz: [
        {
          question:
            "What should you do with a cardboard box before recycling it?",
          options: [
            "Leave it as is",
            "Flatten it",
            "Fill it with other recyclables",
            "Wet it down",
          ],
          correct: 1,
        },
        {
          question: "Can you recycle pizza boxes?",
          options: [
            "Always",
            "Never",
            "Only if they're not greasy",
            "Only the lid",
          ],
          correct: 2,
        },
      ],
    },
  },
  {
    id: 3,
    category: "glass",
    title: "Glass Bottles and Jars",
    description: "Clean and empty glass containers can be recycled.",
    difficulty: "easy",
    points: 12,
    impact: "Saves 2kg CO2 per month",
    instructions: [
      "Remove caps and labels",
      "Rinse thoroughly",
      "Keep lids separate for recycling",
    ],
    tips: "Avoid mixing colored glass with clear glass.",
    locations: ["Glass Recycling Bins", "Local Recycling Center"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/x_yQe7I5hQ8",
      content:
        "Learn how to recycle glass bottles and jars, including the importance of cleanliness and proper sorting.",
      quiz: [
        {
          question:
            "What should you do with a glass bottle before recycling it?",
          options: ["Leave the label on", "Rinse it", "Paint it", "Smash it"],
          correct: 1,
        },
        {
          question: "What type of glass should be recycled separately?",
          options: [
            "Colored and clear glass",
            "Only clear glass",
            "Only colored glass",
            "None",
          ],
          correct: 0,
        },
      ],
    },
  },
  {
    id: 4,
    category: "metal",
    title: "Aluminum Cans",
    description: "Recycling aluminum cans reduces energy use.",
    difficulty: "easy",
    points: 8,
    impact: "Saves 1kg CO2 per month",
    instructions: ["Rinse the can to remove residue", "Crush to save space"],
    tips: "Do not recycle cans with food residue.",
    locations: ["Curbside Pickup", "Recycling Centers"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/Zm4jjB94eT4",
      content:
        "Discover the process of recycling aluminum cans, including preparation and the benefits of recycling them.",
      quiz: [
        {
          question:
            "What should you do with an aluminum can before recycling it?",
          options: ["Keep it dirty", "Rinse it", "Paint it", "Cut it"],
          correct: 1,
        },
        {
          question: "How much energy does recycling aluminum save?",
          options: ["20%", "50%", "90%", "10%"],
          correct: 2,
        },
      ],
    },
  },
  {
    id: 5,
    category: "electronics",
    title: "Old Phones",
    description:
      "Recycling old phones reduces waste and recovers valuable materials.",
    difficulty: "medium",
    points: 25,
    impact: "Recovers precious metals like gold and silver",
    instructions: [
      "Remove the battery and SIM card",
      "Wipe all data from the device",
      "Recycle with a certified electronics recycler",
    ],
    tips: "Consider donating working phones to charity.",
    locations: ["Electronics Recycling Points", "Drop-off Locations"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/YGwtLXg4miI",
      content:
        "Watch this video to learn how to properly recycle old mobile phones and what you need to do before recycling.",
      quiz: [
        {
          question: "What should you remove from a phone before recycling it?",
          options: ["Battery", "Camera", "Screen", "Speakers"],
          correct: 0,
        },
        {
          question: "What is a key benefit of recycling old phones?",
          options: [
            "Recovers gold",
            "Reduces battery life",
            "Increases waste",
            "Gives more data",
          ],
          correct: 0,
        },
      ],
    },
  },
  {
    id: 6,
    category: "plastic",
    title: "Plastic Bags",
    description:
      "Plastic bags are recyclable, but should be brought to specific collection points.",
    difficulty: "medium",
    points: 10,
    impact: "Reduces plastic pollution in the environment",
    instructions: [
      "Clean and dry the bags",
      "Do not mix with other plastics",
      "Take to dedicated plastic bag recycling points",
    ],
    tips: "Avoid throwing plastic bags in regular recycling bins.",
    locations: ["Grocery Stores", "Recycling Bins"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/wqLqFZXiRzk",
      content:
        "Learn the proper way to recycle plastic bags and reduce their environmental impact.",
      quiz: [
        {
          question: "Where should you take plastic bags for recycling?",
          options: [
            "Regular recycling bins",
            "Plastic bag collection points",
            "Landfill",
            "Curbside",
          ],
          correct: 1,
        },
        {
          question:
            "What should you do with plastic bags before recycling them?",
          options: [
            "Throw them in with general waste",
            "Wash and dry them",
            "Leave them dirty",
            "Tear them up",
          ],
          correct: 1,
        },
      ],
    },
  },
  {
    id: 7,
    category: "paper",
    title: "Newspapers",
    description: "Recycling newspapers saves trees and reduces landfill waste.",
    difficulty: "easy",
    points: 8,
    impact: "Saves 1 tree per month",
    instructions: [
      "Flatten the newspaper",
      "Remove any plastic covers or inserts",
      "Keep dry and clean",
    ],
    tips: "Avoid recycling newspapers with food stains or ink smudges.",
    locations: ["Recycling Bins", "Collection Points"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/W1pv7_yE5jw",
      content:
        "This video shows how to prepare and recycle newspapers correctly, helping reduce deforestation.",
      quiz: [
        {
          question: "What should you do with newspapers before recycling?",
          options: [
            "Shred them",
            "Flatten them",
            "Leave them in a stack",
            "Wet them down",
          ],
          correct: 1,
        },
        {
          question: "Can newspapers with food stains be recycled?",
          options: [
            "Always",
            "Never",
            "Only if they're dry",
            "Only if they have no ink",
          ],
          correct: 1,
        },
      ],
    },
  },
  {
    id: 8,
    category: "metal",
    title: "Tin Cans",
    description: "Recycling tin cans reduces energy consumption and pollution.",
    difficulty: "easy",
    points: 10,
    impact: "Saves 5% of energy used to create new cans",
    instructions: [
      "Rinse the can to remove food residue",
      "Crush the can to save space",
      "Remove plastic labels if possible",
    ],
    tips: "Avoid recycling cans with non-metal components, like plastic lids.",
    locations: ["Recycling Bins", "Local Recycling Center"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/fEB5ckbGq60",
      content:
        "This guide walks you through the proper recycling process for tin cans and their benefits to the environment.",
      quiz: [
        {
          question: "What should you do with a tin can before recycling it?",
          options: ["Keep it dirty", "Rinse it", "Paint it", "Leave it full"],
          correct: 1,
        },
        {
          question: "How much energy can be saved by recycling tin cans?",
          options: ["10%", "20%", "50%", "90%"],
          correct: 3,
        },
      ],
    },
  },
  {
    id: 9,
    category: "glass",
    title: "Wine Bottles",
    description:
      "Wine bottles are 100% recyclable and should be cleaned before recycling.",
    difficulty: "medium",
    points: 15,
    impact: "Saves 1kg CO2 per bottle",
    instructions: [
      "Remove cork and any other attachments",
      "Rinse thoroughly to remove wine residue",
      "Keep the bottle intact, do not crush",
    ],
    tips: "Recycling wine bottles saves valuable materials like sand and soda ash.",
    locations: ["Glass Recycling Bins", "Recycling Centers"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/v-vXW2blO44",
      content:
        "Watch this tutorial on how to recycle wine bottles effectively, contributing to reducing the need for new glass production.",
      quiz: [
        {
          question:
            "What should you do with a wine bottle before recycling it?",
          options: [
            "Leave the cork on",
            "Rinse it",
            "Smash it",
            "Keep it dirty",
          ],
          correct: 1,
        },
        {
          question: "Can you recycle wine bottles with labels still on?",
          options: [
            "Yes",
            "No",
            "Only if they are wet",
            "Only if they are clean",
          ],
          correct: 0,
        },
      ],
    },
  },
  {
    id: 10,
    category: "plastic",
    title: "Plastic Packaging (Bubble Wrap)",
    description:
      "Bubble wrap is recyclable at specific centers, not in regular curbside bins.",
    difficulty: "medium",
    points: 12,
    impact: "Reduces waste and reuses plastic material",
    instructions: [
      "Remove any non-plastic materials like tape",
      "Clean and dry the bubble wrap",
      "Take to specialized plastic recycling centers",
    ],
    tips: "Avoid throwing bubble wrap in the general waste or regular recycling bin.",
    locations: ["Grocery Stores", "Recycling Bins at Specialty Locations"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/w8hj2E3XPh0",
      content:
        "Learn how to properly recycle bubble wrap and other types of plastic packaging that require special handling.",
      quiz: [
        {
          question: "Where should you take bubble wrap for recycling?",
          options: [
            "Regular recycling bins",
            "Specialized recycling centers",
            "Trash can",
            "Grocery store bins",
          ],
          correct: 1,
        },
        {
          question: "What should you do with bubble wrap before recycling it?",
          options: [
            "Leave it dirty",
            "Clean and dry it",
            "Shred it",
            "Leave the tape on",
          ],
          correct: 1,
        },
      ],
    },
  },
  {
    id: 11,
    category: "electronics",
    title: "Old Computers",
    description:
      "Recycling old computers recovers valuable parts and reduces e-waste.",
    difficulty: "high",
    points: 30,
    impact: "Recovers valuable metals like gold and silver",
    instructions: [
      "Backup and wipe all personal data",
      "Remove hard drives and batteries",
      "Drop off at certified e-waste recycling center",
    ],
    tips: "Consider donating working computers to local charities or schools.",
    locations: ["E-Waste Recycling Centers", "Drop-off Points"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/EO5gYh8W4Xw",
      content:
        "This detailed video teaches you the correct procedure for recycling old computers, ensuring all valuable components are recovered.",
      quiz: [
        {
          question: "What should you do before recycling an old computer?",
          options: [
            "Wipe the data",
            "Throw it in the trash",
            "Sell it",
            "Keep it intact",
          ],
          correct: 0,
        },
        {
          question: "What valuable metals are recovered from old computers?",
          options: ["Iron", "Gold and silver", "Copper", "Platinum"],
          correct: 1,
        },
      ],
    },
  },
  {
    id: 12,
    category: "plastic",
    title: "Plastic Containers (HDPE)",
    description:
      "Plastic containers like milk jugs are recyclable and widely accepted.",
    difficulty: "easy",
    points: 9,
    impact: "Saves 2kg CO2 per month",
    instructions: [
      "Rinse out the container",
      "Crush to save space",
      "Remove any caps or lids",
    ],
    tips: "Check for the recycling code to confirm the type of plastic.",
    locations: ["Local Recycling Center", "Curbside Pickup"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/4rODzxATqz8",
      content:
        "This tutorial covers how to prepare HDPE containers for recycling, including the importance of separating caps and rinsing out the containers.",
      quiz: [
        {
          question:
            "What should you do with a plastic container before recycling it?",
          options: [
            "Leave it full",
            "Rinse it",
            "Keep the lid on",
            "Throw it away",
          ],
          correct: 1,
        },
        {
          question: "Which plastic code is typically used for milk jugs?",
          options: ["1", "2", "4", "5"],
          correct: 1,
        },
      ],
    },
  },
  {
    id: 13,
    category: "paper",
    title: "Magazines",
    description:
      "Magazines can be recycled in most curbside recycling programs.",
    difficulty: "easy",
    points: 7,
    impact: "Saves 0.5 trees per month",
    instructions: [
      "Flatten the magazines",
      "Remove any non-paper materials (e.g., plastic covers)",
      "Place in paper recycling bin",
    ],
    tips: "Recycling magazines helps reduce deforestation and saves energy.",
    locations: ["Recycling Bins", "Collection Points"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/SZzmJcXcZCw",
      content:
        "This video shows how to recycle magazines properly, ensuring they are processed efficiently and sustainably.",
      quiz: [
        {
          question: "What should you do with magazines before recycling them?",
          options: [
            "Shred them",
            "Leave them as is",
            "Flatten them",
            "Tear the covers off",
          ],
          correct: 2,
        },
        {
          question: "Can magazines with plastic covers be recycled?",
          options: [
            "Yes",
            "No",
            "Only if the cover is removed",
            "Only if the cover is recyclable",
          ],
          correct: 1,
        },
      ],
    },
  },

  {
    id: 14,
    category: "electronics",
    title: "Old Mobile Phones",
    description:
      "Recycling old mobile phones recovers valuable metals like gold, silver, and copper.",
    difficulty: "medium",
    points: 20,
    impact: "Recovers valuable minerals and reduces e-waste",
    instructions: [
      "Backup and erase all data",
      "Remove SIM cards and memory cards",
      "Drop off at an e-waste recycling center",
    ],
    tips: "Many phone manufacturers offer trade-in programs for old devices.",
    locations: ["E-Waste Recycling Centers", "Electronics Stores"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/MVxx8F9sdIU",
      content:
        "Watch this guide to properly recycle your old mobile phones and the benefits of recycling e-waste.",
      quiz: [
        {
          question: "What should you do before recycling a mobile phone?",
          options: [
            "Backup and erase data",
            "Throw it in the trash",
            "Keep the battery in",
            "Sell it without erasing data",
          ],
          correct: 0,
        },
        {
          question:
            "What valuable materials can be recovered from old mobile phones?",
          options: [
            "Copper and gold",
            "Iron and aluminum",
            "Plastic and glass",
            "Only plastic",
          ],
          correct: 0,
        },
      ],
    },
  },
  {
    id: 15,
    category: "electronics",
    title: "Old Televisions",
    description:
      "Old televisions can be recycled to recover metals, glass, and plastics.",
    difficulty: "high",
    points: 25,
    impact: "Reduces e-waste and recycles valuable components",
    instructions: [
      "Unplug the television and safely remove it from its stand",
      "Drop off at a certified e-waste recycling center",
      "Check for any hazardous materials before disposal",
    ],
    tips: "Avoid breaking the glass screen when transporting the TV to the recycling center.",
    locations: [
      "E-Waste Recycling Centers",
      "Specialized Electronics Collection Points",
    ],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/EO5gYh8W4Xw",
      content:
        "This tutorial explains the process of recycling old televisions and the importance of doing so to protect the environment.",
      quiz: [
        {
          question:
            "What should you do with an old television before recycling it?",
          options: [
            "Break the screen",
            "Remove batteries",
            "Unplug it and check for hazardous materials",
            "Keep it plugged in",
          ],
          correct: 2,
        },
        {
          question:
            "What valuable components can be recovered from old televisions?",
          options: [
            "Metals, glass, and plastics",
            "Food scraps",
            "Organic material",
            "None",
          ],
          correct: 0,
        },
      ],
    },
  },
  {
    id: 16,
    category: "organic",
    title: "Fruit and Vegetable Scraps",
    description:
      "Organic waste like fruit and vegetable scraps can be composted to enrich soil.",
    difficulty: "easy",
    points: 5,
    impact: "Creates nutrient-rich compost that benefits plant growth",
    instructions: [
      "Collect fruit and vegetable peels, cores, and scraps",
      "Avoid adding meat or dairy products to compost",
      "Add to a compost bin or pile",
    ],
    tips: "Try to maintain a balance of 'green' (nitrogen-rich) and 'brown' (carbon-rich) materials in your compost.",
    locations: [
      "Compost Bins",
      "Home Composting Piles",
      "Local Composting Centers",
    ],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/4pExI9RXTN4",
      content:
        "Learn how to start composting fruit and vegetable scraps at home, turning waste into valuable compost.",
      quiz: [
        {
          question: "What should you avoid adding to compost?",
          options: [
            "Fruit and vegetable scraps",
            "Meat and dairy",
            "Leaves and grass",
            "Coffee grounds",
          ],
          correct: 1,
        },
        {
          question: "Why is composting important?",
          options: [
            "It reduces landfill waste",
            "It makes garbage smell better",
            "It produces oxygen",
            "It takes less time than recycling",
          ],
          correct: 0,
        },
      ],
    },
  },
  {
    id: 17,
    category: "organic",
    title: "Coffee Grounds",
    description:
      "Coffee grounds can be composted or used as fertilizer for plants.",
    difficulty: "easy",
    points: 6,
    impact: "Nutrient-rich compost for plants and gardens",
    instructions: [
      "Collect used coffee grounds from your coffee maker",
      "Dry out the grounds if necessary",
      "Add to compost bin or directly to your garden soil",
    ],
    tips: "Coffee grounds also work as a natural pest repellent in the garden.",
    locations: ["Compost Bins", "Home Gardens", "Local Composting Centers"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/NGy_l06hv6A",
      content:
        "Discover the benefits of using coffee grounds in your garden and how they can improve soil health.",
      quiz: [
        {
          question: "How can coffee grounds benefit your garden?",
          options: [
            "Improve soil health",
            "Create a stronger cup of coffee",
            "Reduce pests",
            "All of the above",
          ],
          correct: 3,
        },
        {
          question: "What should you avoid adding to coffee grounds?",
          options: ["Oily substances", "Paper", "Water", "Lemon peels"],
          correct: 0,
        },
      ],
    },
  },
  {
    id: 18,
    category: "organic",
    title: "Grass Clippings",
    description:
      "Grass clippings can be composted or used as mulch in your garden.",
    difficulty: "easy",
    points: 7,
    impact: "Helps enrich soil and reduce landfill waste",
    instructions: [
      "Let grass clippings dry if wet",
      "Add to your compost pile or garden bed",
      "Use as mulch to retain soil moisture",
    ],
    tips: "Avoid adding large amounts of clippings all at once to prevent clumping and odor.",
    locations: ["Compost Bins", "Garden Beds", "Local Composting Centers"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/XjwFY4td8gA",
      content:
        "Learn how to recycle grass clippings by composting them or using them as mulch to keep your garden healthy.",
      quiz: [
        {
          question: "How should you treat grass clippings before composting?",
          options: [
            "Keep them wet",
            "Let them dry",
            "Mix them with other chemicals",
            "Leave them on the lawn",
          ],
          correct: 1,
        },
        {
          question: "What can you use grass clippings for?",
          options: ["Mulch", "Fertilizer", "Compost", "All of the above"],
          correct: 3,
        },
      ],
    },
  },
  {
    id: 19,
    category: "electronics",
    title: "Old Laptops",
    description:
      "Recycling old laptops helps recover rare earth metals and reduces electronic waste.",
    difficulty: "medium",
    points: 22,
    impact: "Recovers valuable materials and prevents hazardous waste",
    instructions: [
      "Backup and erase all personal data",
      "Remove batteries if possible",
      "Drop off at an e-waste recycling center",
    ],
    tips: "Many laptop manufacturers offer recycling or trade-in programs.",
    locations: [
      "E-Waste Recycling Centers",
      "Electronics Stores",
      "Drop-off Points",
    ],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/RZjxosAkKlk",
      content:
        "This video explains how to recycle your old laptops and the positive environmental impact of proper disposal.",
      quiz: [
        {
          question: "What should you do with your old laptop before recycling?",
          options: [
            "Keep it running",
            "Erase all data",
            "Give it to someone else",
            "Store it in a drawer",
          ],
          correct: 1,
        },
        {
          question: "What valuable materials can be recovered from laptops?",
          options: [
            "Metals like gold and silver",
            "Plastic",
            "Textiles",
            "Food waste",
          ],
          correct: 0,
        },
      ],
    },
  },
  {
    id: 20,
    category: "organic",
    title: "Leaves",
    description:
      "Leaves can be composted or used as mulch to improve soil quality.",
    difficulty: "medium",
    points: 10,
    impact: "Enriches soil and prevents waste from going to landfills",
    instructions: [
      "Collect dry or wet leaves",
      "Shred them for faster composting",
      "Add to compost pile or use as mulch",
    ],
    tips: "Shredding leaves helps them break down faster and prevents them from matting together.",
    locations: ["Compost Bins", "Garden Beds", "Local Composting Centers"],
    videoPlaceholder: "/placeholder.svg?height=180&width=320",
    tutorial: {
      videoUrl: "https://www.youtube.com/embed/TYh0mfwET9g",
      content:
        "Learn how to properly recycle leaves by composting them or using them as mulch in your garden.",
      quiz: [
        {
          question: "What should you do with leaves before composting?",
          options: [
            "Shred them",
            "Burn them",
            "Let them sit in a pile",
            "Put them in the trash",
          ],
          correct: 0,
        },
        {
          question: "What is the benefit of using leaves as mulch?",
          options: [
            "Improves soil health",
            "Attracts pests",
            "Produces oxygen",
            "Makes compost smell better",
          ],
          correct: 0,
        },
      ],
    },
  },
  // You can continue adding more items following this structure...
];
