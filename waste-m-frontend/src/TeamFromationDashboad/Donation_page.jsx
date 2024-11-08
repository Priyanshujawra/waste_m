import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  QrCode,
  IndianRupee,
  Smartphone,
  CreditCard,
  Check,
  Copy,
  Heart,
  Sparkles,
  Zap,
} from "lucide-react";

const DonationPage = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [copied, setCopied] = useState(false);

  const predefinedAmounts = [100, 500, 1000, 2000];

  const paymentMethods = [
    {
      id: "googlepay",
      name: "Google Pay",
      upiId: "example@okaxis",
      color: "from-blue-500 to-green-500",
    },
    {
      id: "phonepay",
      name: "Phone Pe",
      upiId: "example@ybl",
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "paytm",
      name: "Paytm",
      upiId: "example@paytm",
      color: "from-blue-400 to-blue-600",
    },
  ];

  const handleCopyUPI = (upiId) => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header with Gradient Background */}
        <div className="bg-gradient-to-r from-violet-500 to-purple-500 text-white p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-white rounded-full"></div>
          </div>
          <div className="relative">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-12 w-12 text-pink-200 animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold text-center mb-2">
              Support Our Work
            </h1>
            <p className="text-center text-purple-100">
              Your generosity fuels our creativity
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* Amount Selection with Enhanced Style */}
          <div className="mb-8">
            <label className="flex items-center text-lg font-medium text-gray-700 mb-4">
              <Sparkles className="h-5 w-5 mr-2 text-purple-500" />
              Choose Your Impact
            </label>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {predefinedAmounts.map((preset) => (
                <Button
                  key={preset}
                  variant={amount === preset.toString() ? "default" : "outline"}
                  onClick={() => setAmount(preset.toString())}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    amount === preset.toString()
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none"
                      : "hover:border-purple-500"
                  }`}
                >
                  <IndianRupee className="h-4 w-4 mr-1" />
                  {preset}
                </Button>
              ))}
            </div>
            <Input
              type="number"
              placeholder="Enter custom amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-2 border-2 focus:border-purple-500 rounded-lg"
            />
          </div>

          {/* Message Section with Enhanced Style */}
          <div className="mb-8">
            <label className="flex items-center text-lg font-medium text-gray-700 mb-4">
              <Zap className="h-5 w-5 mr-2 text-purple-500" />
              Leave Your Mark
            </label>
            <Textarea
              placeholder="Share your words of encouragement..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="h-24 border-2 focus:border-purple-500 rounded-lg"
            />
          </div>

          {/* Payment Methods with Enhanced Style */}
          <div className="mb-8">
            <h2 className="flex items-center text-lg font-medium text-gray-700 mb-4">
              <Smartphone className="h-5 w-5 mr-2 text-purple-500" />
              Choose Payment Method
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedMethod === method.id
                      ? `bg-gradient-to-r ${method.color} text-white shadow-lg scale-[1.02]`
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setSelectedMethod(method.id);
                    setShowQR(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone
                        className={`h-5 w-5 ${
                          selectedMethod === method.id
                            ? "text-white"
                            : "text-purple-500"
                        }`}
                      />
                      <span className="font-medium">{method.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant={
                          selectedMethod === method.id ? "secondary" : "ghost"
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyUPI(method.upiId);
                        }}
                        className={
                          selectedMethod === method.id
                            ? "bg-white/20 hover:bg-white/30"
                            : ""
                        }
                      >
                        {copied ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <span
                        className={`text-sm ${
                          selectedMethod === method.id
                            ? "text-white/90"
                            : "text-gray-500"
                        }`}
                      >
                        {method.upiId}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code Section with Enhanced Style */}
          {showQR && selectedMethod && (
            <div className="text-center p-8 rounded-xl bg-gradient-to-b from-purple-50 to-white border border-purple-100 mb-8">
              <div className="mb-4">
                <div className="w-48 h-48 bg-white mx-auto rounded-xl shadow-lg flex items-center justify-center transform transition-transform hover:scale-105">
                  <QrCode className="w-32 h-32 text-purple-500" />
                </div>
              </div>
              <p className="text-sm text-purple-600 font-medium">
                Scan with{" "}
                {paymentMethods.find((m) => m.id === selectedMethod)?.name}
              </p>
            </div>
          )}

          {/* Support Button with Enhanced Style */}
          <Button
            className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transform transition-all duration-300 hover:scale-[1.02] shadow-lg"
            size="lg"
          >
            <Heart className="mr-2 h-5 w-5" />
            Support with {amount ? `₹${amount}` : "Custom Amount"}
          </Button>

          {/* Footer Note with Enhanced Style */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Your support means the world to us. Thank you for being amazing! 💜
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
