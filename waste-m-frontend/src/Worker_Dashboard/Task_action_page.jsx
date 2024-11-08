import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, Clock, Trash2, CheckCircle, XCircle, Navigation, 
  Camera, MessageSquare, Calendar, Timer, Truck, User,
  ThumbsUp, AlertTriangle, Package, Scale
} from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const WasteCollectionTask = () => {
  const [activeTab, setActiveTab] = useState('details');
  const [task, setTask] = useState({
    id: "TSK001",
    status: "pending",
    address: "123 Green Street, City Name",
    coordinates: {
      latitude: "12.9716",
      longitude: "77.5946"
    },
    wasteType: "Plastic",
    quantity: "25kg",
    submittedBy: "John Doe",
    submittedAt: "2024-11-01T10:30:00",
    instructions: "Gate code: 1234. Waste bags are in the backyard.",
    imageUrl: "/api/placeholder/400/300",
    priority: "high",
    estimatedTime: "30 mins",
    reward: "50 points",
    distance: "2.5 km",
    messages: [
      { sender: "John Doe", text: "Please collect before 5 PM", time: "10:30 AM" },
      { sender: "System", text: "Task assigned", time: "10:35 AM" }
    ]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: '', description: '' });
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Timer management
  React.useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const updateTaskStatus = (newStatus) => {
    setIsLoading(true);
    setTimeout(() => {
      setTask({ ...task, status: newStatus });
      setAlertMessage({
        title: "Status Updated",
        description: `Task has been marked as ${newStatus}`
      });
      setShowAlert(true);
      setIsLoading(false);
      if (newStatus === 'in_progress') {
        setIsTimerRunning(true);
      } else {
        setIsTimerRunning(false);
      }
    }, 1000);
  };

  const openInMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${task.coordinates.latitude},${task.coordinates.longitude}`;
    window.open(url, '_blank');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Time Elapsed</p>
              <p className="font-bold">{formatTime(timer)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Distance</p>
              <p className="font-bold">{task.distance}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Reward</p>
              <p className="font-bold">{task.reward}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`h-5 w-5 ${getPriorityColor(task.priority)}`} />
            <div>
              <p className="text-sm text-gray-500">Priority</p>
              <p className="font-bold capitalize">{task.priority}</p>
            </div>
          </div>
        </Card>
      </div>

      {showAlert && (
        <Alert className="mb-4">
          <AlertTitle>{alertMessage.title}</AlertTitle>
          <AlertDescription>{alertMessage.description}</AlertDescription>
        </Alert>
      )}

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Task #{task.id}</CardTitle>
              <p className="text-sm text-gray-500">Estimated time: {task.estimatedTime}</p>
            </div>
            <Badge 
              variant={task.status === 'completed' ? 'success' : 'secondary'}
              className={`capitalize text-lg px-4 py-2 ${
                task.status === 'in_progress' ? 'bg-blue-500' :
                task.status === 'completed' ? 'bg-green-500' :
                task.status === 'cancelled' ? 'bg-red-500' :
                'bg-gray-500'
              }`}
            >
              {task.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="details" className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Task Progress</span>
                  <span>
                    {task.status === 'pending' ? '0%' :
                     task.status === 'in_progress' ? '50%' :
                     task.status === 'completed' ? '100%' : '0%'}
                  </span>
                </div>
                <Progress 
                  value={
                    task.status === 'pending' ? 0 :
                    task.status === 'in_progress' ? 50 :
                    task.status === 'completed' ? 100 : 0
                  }
                />
              </div>

              {/* Waste Details */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">Waste Type</h3>
                  </div>
                  <p>{task.wasteType}</p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Scale className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">Quantity</h3>
                  </div>
                  <p>{task.quantity}</p>
                </Card>
              </div>

              {/* Instructions */}
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Special Instructions</h3>
                <p>{task.instructions}</p>
              </Card>

              {/* Site Image */}
              <Card className="p-4">
                <h3 className="font-semibold mb-2">Site Image</h3>
                <img 
                  src={task.imageUrl} 
                  alt="Waste collection site" 
                  className="rounded-lg w-full object-cover h-48"
                />
              </Card>
            </TabsContent>

            <TabsContent value="location" className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <h3 className="font-semibold">Collection Location</h3>
                </div>
                <p className="mb-2">{task.address}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Coordinates: {task.coordinates.latitude}, {task.coordinates.longitude}
                </p>
                <Button 
                  onClick={openInMaps}
                  className="w-full"
                  variant="outline"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Open in Maps
                </Button>
              </Card>
            </TabsContent>

            <TabsContent value="communication" className="space-y-4">
              <Card className="p-4">
                <div className="space-y-4">
                  {task.messages.map((message, index) => (
                    <div key={index} className="flex gap-2">
                      <User className="h-5 w-5" />
                      <div>
                        <p className="text-sm font-semibold">{message.sender}</p>
                        <p>{message.text}</p>
                        <p className="text-xs text-gray-500">{message.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Button
              className={`${task.status === 'pending' ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
              onClick={() => updateTaskStatus('in_progress')}
              disabled={isLoading || task.status === 'completed'}
            >
              <Truck className="h-4 w-4 mr-2" />
              Start Collection
            </Button>
            <Button
              className={`${task.status === 'in_progress' ? 'bg-green-500 hover:bg-green-600' : ''}`}
              onClick={() => updateTaskStatus('completed')}
              disabled={isLoading || task.status === 'completed'}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Task
            </Button>
            <Button
              variant="destructive"
              onClick={() => updateTaskStatus('cancelled')}
              disabled={isLoading || task.status === 'completed'}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Cancel Task
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WasteCollectionTask;