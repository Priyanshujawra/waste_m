import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  User,
  FileText,
  Briefcase,
  Shield,
  Camera,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Banknote,
  Upload,
  AlertTriangle,
  Clock,
  Award,
} from "lucide-react";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const WorkerOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    pincode: "",

    // Government IDs
    aadharNumber: "",
    panNumber: "",
    drivingLicense: "",

    // Work Experience
    yearsOfExperience: "",
    previousEmployer: "",
    skillSet: [],
    preferredZones: [],

    // Bank Details
    accountHolder: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",

    // Emergency Contact
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",

    // Documents
    profilePhoto: null,
    aadharCard: null,
    panCard: null,
    drivingLicenseDoc: null,
    addressProof: null,
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <User className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Personal Information</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter first name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter last name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter full address"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter pincode"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Government IDs</h2>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aadharNumber">Aadhar Number</Label>
                  <Input
                    id="aadharNumber"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    placeholder="Enter 12-digit Aadhar number"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Aadhar Card</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <Input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "aadharCard")}
                      className="hidden"
                      id="aadharUpload"
                    />
                    <Label
                      htmlFor="aadharUpload"
                      className="cursor-pointer text-sm text-gray-500"
                    >
                      Click to upload Aadhar Card
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    placeholder="Enter PAN number"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload PAN Card</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <Input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "panCard")}
                      className="hidden"
                      id="panUpload"
                    />
                    <Label
                      htmlFor="panUpload"
                      className="cursor-pointer text-sm text-gray-500"
                    >
                      Click to upload PAN Card
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="drivingLicense">Driving License Number</Label>
                  <Input
                    id="drivingLicense"
                    name="drivingLicense"
                    value={formData.drivingLicense}
                    onChange={handleInputChange}
                    placeholder="Enter driving license number"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Upload Driving License</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <Input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "drivingLicenseDoc")}
                      className="hidden"
                      id="licenseUpload"
                    />
                    <Label
                      htmlFor="licenseUpload"
                      className="cursor-pointer text-sm text-gray-500"
                    >
                      Click to upload Driving License
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Work Experience</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleInputChange}
                  placeholder="Enter years of experience"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousEmployer">Previous Employer</Label>
                <Input
                  id="previousEmployer"
                  name="previousEmployer"
                  value={formData.previousEmployer}
                  onChange={handleInputChange}
                  placeholder="Enter previous employer name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skillSet">Skill Set</Label>
              <Input
                id="skillSet"
                name="skillSet"
                value={formData.skillSet.join(", ")}
                onChange={handleInputChange}
                placeholder="Enter skills separated by commas"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredZones">Preferred Zones</Label>
              <Input
                id="preferredZones"
                name="preferredZones"
                value={formData.preferredZones.join(", ")}
                onChange={handleInputChange}
                placeholder="Enter preferred work zones separated by commas"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Banknote className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Bank Details</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="accountHolder">Account Holder Name</Label>
                <Input
                  id="accountHolder"
                  name="accountHolder"
                  value={formData.accountHolder}
                  onChange={handleInputChange}
                  placeholder="Enter account holder name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  placeholder="Enter account number"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  placeholder="Enter bank name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ifscCode">IFSC Code</Label>
                <Input
                  id="ifscCode"
                  name="ifscCode"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  placeholder="Enter IFSC code"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Phone className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Emergency Contact</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Name</Label>
                <Input
                  id="emergencyName"
                  name="emergencyName"
                  value={formData.emergencyName}
                  onChange={handleInputChange}
                  placeholder="Enter emergency contact name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyRelation">Relation</Label>
                <Input
                  id="emergencyRelation"
                  name="emergencyRelation"
                  value={formData.emergencyRelation}
                  onChange={handleInputChange}
                  placeholder="Enter relationship to contact"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Phone Number</Label>
              <Input
                id="emergencyPhone"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                placeholder="Enter emergency contact phone number"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Camera className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Document Uploads</h2>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Profile Photo</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    onChange={(e) => handleFileUpload(e, "profilePhoto")}
                    className="hidden"
                    id="profilePhotoUpload"
                  />
                  <Label
                    htmlFor="profilePhotoUpload"
                    className="cursor-pointer text-sm text-gray-500"
                  >
                    Click to upload Profile Photo
                  </Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Upload Address Proof</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Input
                    type="file"
                    onChange={(e) => handleFileUpload(e, "addressProof")}
                    className="hidden"
                    id="addressProofUpload"
                  />
                  <Label
                    htmlFor="addressProofUpload"
                    className="cursor-pointer text-sm text-gray-500"
                  >
                    Click to upload Address Proof
                  </Label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Worker Onboarding</CardTitle>
          <Progress value={progress} className="my-4" />
          <div className="flex justify-between">
            <Button disabled={currentStep === 1} onClick={prevStep}>
              Previous
            </Button>
            <Button onClick={nextStep}>
              {currentStep === totalSteps ? "Submit" : "Next"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>

      {currentStep === totalSteps && (
        <Alert variant="info">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Your onboarding is completed.</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default WorkerOnboarding;
