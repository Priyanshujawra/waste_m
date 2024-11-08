const WasteLog = require("../models/WasteLog");

exports.createWasteLog = async (req, res) => {
  try {
    const {
      wasteTypes,
      weight,
      latitude,
      longitude,
      contactNumber,
      preferredPickupTime,
      urgencyLevel,
      description,
      address,
    } = req.body;

    const user = req.user.id;
    const image = req.file ? req.file.path : null; // Get the file path from Multer

    // Determine the dustbin type based on waste types
    let dustbinType;
    if (
      wasteTypes.includes("biomedical") ||
      wasteTypes.includes("non-biodegradable")
    ) {
      dustbinType = "Red";
    } else if (
      wasteTypes.includes("organic") ||
      wasteTypes.includes("biodegradable")
    ) {
      dustbinType = "Green";
    } else {
      dustbinType = "Blue";
    }

    // Create new waste log document
    const newWasteLog = new WasteLog({
      user,
      wasteTypes,
      weight,
      description,
      image, // Store the image path here
      location: {
        latitude,
        longitude,
        address,
      },
      contactNumber,
      preferredPickupTime,
      urgencyLevel,
      dustbinType,
    });

    await newWasteLog.save();
    res.status(201).json(newWasteLog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, could not create waste log" });
  }
};

exports.getUserWasteLogs = async (req, res) => {
  try {
    const user = req.user.id;
    const wasteLogs = await WasteLog.find({ user });
    res.status(200).json(wasteLogs);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Server error, could not retrieve waste logs" });
  }
};
