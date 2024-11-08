import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Camera, Upload, Check, AlertCircle } from "lucide-react";

const NGOJoinPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Organization Details
    ngoName: "",
    registrationNumber: "",
    establishmentYear: "",
    website: "",

    // Contact Details
    contactPerson: "",
    email: "",
    phone: "",

    // Address
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Additional Information
    description: "",
    focusAreas: [],
    teamSize: "",
    previousWork: "",

    // Documents
    registrationCertificate: null,
    taxExemptionCertificate: null,
    logo: null,
  });

  const [errors, setErrors] = useState({});

  const focusAreaOptions = [
    "Waste Collection",
    "Recycling",
    "Composting",
    "Awareness Programs",
    "Research",
    "Policy Advocacy",
    "Community Engagement",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFocusAreaChange = (area) => {
    setFormData((prev) => ({
      ...prev,
      focusAreas: prev.focusAreas.includes(area)
        ? prev.focusAreas.filter((a) => a !== area)
        : [...prev.focusAreas, area],
    }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  const validateStep = () => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.ngoName)
        newErrors.ngoName = "Organization name is required";
      if (!formData.registrationNumber)
        newErrors.registrationNumber = "Registration number is required";
      if (!formData.establishmentYear)
        newErrors.establishmentYear = "Establishment year is required";
    }

    if (step === 2) {
      if (!formData.contactPerson)
        newErrors.contactPerson = "Contact person name is required";
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.phone) newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Handle form submission
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Join as an NGO Partner
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {step > stepNumber ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className="text-sm mt-2">
                  {stepNumber === 1 && "Organization Details"}
                  {stepNumber === 2 && "Contact Info"}
                  {stepNumber === 3 && "Additional Info"}
                  {stepNumber === 4 && "Documents"}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Organization Details */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Organization Name*</label>
                  <input
                    type="text"
                    name="ngoName"
                    value={formData.ngoName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.ngoName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.ngoName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1">Registration Number*</label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.registrationNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.registrationNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1">Establishment Year*</label>
                  <input
                    type="number"
                    name="establishmentYear"
                    value={formData.establishmentYear}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.establishmentYear && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.establishmentYear}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1">Website</label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Details */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Contact Person*</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.contactPerson && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.contactPerson}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1">Phone Number*</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1">Address*</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Organization Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  />
                </div>

                <div>
                  <label className="block mb-1">Focus Areas</label>
                  <div className="grid grid-cols-2 gap-2">
                    {focusAreaOptions.map((area) => (
                      <label key={area} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.focusAreas.includes(area)}
                          onChange={() => handleFocusAreaChange(area)}
                          className="rounded"
                        />
                        <span>{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Team Size</label>
                  <select
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select team size</option>
                    <option value="1-10">1-10 members</option>
                    <option value="11-50">11-50 members</option>
                    <option value="51-100">51-100 members</option>
                    <option value="100+">100+ members</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: Documents */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Organization Logo</label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "logo")}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm text-gray-600">
                        Click to upload logo
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-1">
                    Registration Certificate*
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-4">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        handleFileChange(e, "registrationCertificate")
                      }
                      className="hidden"
                      id="reg-cert-upload"
                    />
                    <label htmlFor="reg-cert-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm text-gray-600">
                        Upload registration certificate (PDF/DOC)
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block mb-1">
                    Tax Exemption Certificate (if applicable)
                  </label>
                  <div className="border-2 border-dashed rounded-lg p-4">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) =>
                        handleFileChange(e, "taxExemptionCertificate")
                      }
                      className="hidden"
                      id="tax-cert-upload"
                    />
                    <label htmlFor="tax-cert-upload" className="cursor-pointer">
                      <span className="mt-2 block text-sm text-gray-600">
                        Upload tax exemption certificate (PDF/DOC)
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((prev) => prev - 1)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Previous
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ml-auto"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-auto"
                >
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NGOJoinPage;
