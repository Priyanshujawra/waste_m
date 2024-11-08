import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  Book,
  Video,
  ListChecks,
  Award,
  CheckCircle2,
} from "lucide-react";
import { recyclingItems } from "./recycleitem";
import { useParams } from "react-router-dom";

const TutorialPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const { Rid } = useParams(); // Get the id from URL params
  const [tutorialData, setTutorialData] = useState(null);
  console.log(Rid);

  useEffect(() => {
    // Fetch the tutorial data based on the id
    const item = recyclingItems.find((item) => item.id === parseInt(Rid));
    setTutorialData(item);
  }, [Rid]);

  if (!tutorialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Recycling Guide & Tutorials
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn how to properly recycle different materials and make a
            positive impact on the environment.
          </p>
        </div>

        {/* Progress Tracker */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Your Progress</span>
              <span className="text-sm font-medium">{progress}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="learn" className="space-y-8">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <Book className="w-4 h-4" /> Learn
            </TabsTrigger>
            <TabsTrigger value="watch" className="flex items-center gap-2">
              <Video className="w-4 h-4" /> Watch
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-2">
              <ListChecks className="w-4 h-4" /> Practice
            </TabsTrigger>
          </TabsList>

          {/* Learn Section */}
          <TabsContent value="learn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{tutorialData.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      <strong>Category:</strong> {tutorialData.category}
                    </p>
                    <p>
                      <strong>Description:</strong> {tutorialData.description}
                    </p>
                    <p>
                      <strong>Difficulty:</strong> {tutorialData.difficulty}
                    </p>
                    <p>
                      <strong>Impact:</strong> {tutorialData.impact}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-semibold">Instructions:</h4>
                      <ul className="list-disc list-inside">
                        {tutorialData.instructions.map((instruction, idx) => (
                          <li key={idx}>{instruction}</li>
                        ))}
                      </ul>
                    </div>
                    <p>
                      <strong>Tips:</strong> {tutorialData.tips}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Watch Section */}
          <TabsContent value="watch">
            <Card>
              <CardContent className="pt-6">
                <div className="aspect-video bg-gray-100 mb-4 relative">
                  <iframe
                    width="853"
                    height="480"
                    src={tutorialData.tutorial.videoUrl}
                    title="Plastic को फैक्ट्री में कैसे Recycle किया है जाता है? | Plastic Recycling Process In Hindi"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                  <div className="absolute bottom-4 left-4 space-x-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                    <Button variant="secondary" size="icon">
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <h3 className="text-xl font-semibold">
                  {tutorialData.title} - Tutorial
                </h3>
                <p className="text-gray-600">{tutorialData.tutorial.content}</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practice Section */}
          <TabsContent value="practice">
            <Card>
              <CardHeader>
                <CardTitle>Test Your Knowledge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {tutorialData.tutorial.quiz.map((quiz, index) => (
                    <div key={index} className="space-y-4">
                      <h3 className="font-semibold">
                        Question: {quiz.question}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {quiz.options.map((option, optionIndex) => (
                          <Button
                            key={optionIndex}
                            variant={
                              optionIndex === quiz.correct
                                ? "default"
                                : "outline"
                            }
                            className="justify-start"
                            onClick={() => {
                              if (optionIndex === quiz.correct) {
                                setProgress((prev) => Math.min(prev + 10, 100));
                              }
                            }}
                          >
                            {optionIndex === quiz.correct && (
                              <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                            )}
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievement Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Your Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Recycling Rookie",
                "Plastic Pro",
                "Paper Master",
                "Green Guardian",
              ].map((achievement, index) => (
                <Card key={index} className="text-center p-4">
                  <div className="text-green-500 mb-2">
                    <CheckCircle2 className="w-8 h-8 mx-auto" />
                  </div>
                  <div className="font-medium">{achievement}</div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TutorialPage;
