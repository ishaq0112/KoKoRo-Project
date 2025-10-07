import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";

const Mindfulness = () => {
  const location = useLocation();
  const [meditationTime, setMeditationTime] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default
  const [currentPhase, setCurrentPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingDuration, setBreathingDuration] = useState(4000); // Default 4 seconds
  const [activeTab, setActiveTab] = useState("meditation");
  const intervalRef = useRef<NodeJS.Timeout>();

  // Handle navigation from Tools breathing patterns
  useEffect(() => {
    if (location.state?.fromBreathing) {
      setActiveTab("breathing");
      const pattern = location.state.pattern;
      if (pattern) {
        // Set breathing duration based on pattern
        const durations: Record<string, number> = {
          "4-7-8": 6333, // (4+7+8)/3 seconds average
          "4-4-4": 4000,
          "box": 4000,
        };
        setBreathingDuration(durations[pattern] || 4000);
        setBreathingActive(true);
      }
    }
  }, [location]);

  // Meditation timer effect
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Play completion sound here if implemented
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft]);

  // Breathing pattern effect
  useEffect(() => {
    let breathInterval: NodeJS.Timeout;
    if (breathingActive) {
      breathInterval = setInterval(() => {
        setCurrentPhase(phase => {
          switch (phase) {
            case "inhale": return "hold";
            case "hold": return "exhale";
            case "exhale": return "inhale";
            default: return "inhale";
          }
        });
      }, breathingDuration);
    }
    return () => {
      if (breathInterval) clearInterval(breathInterval);
    };
  }, [breathingActive, breathingDuration]);

  const handleMeditationStart = () => {
    if (!isActive) {
      setTimeLeft(meditationTime * 60);
    }
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(meditationTime * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((meditationTime * 60 - timeLeft) / (meditationTime * 60)) * 100;

  const groundingSteps = [
    { number: 5, sense: "things you can see", description: "Look around and name 5 things you can observe" },
    { number: 4, sense: "things you can touch", description: "Notice 4 textures or objects you can feel" },
    { number: 3, sense: "things you can hear", description: "Listen for 3 different sounds around you" },
    { number: 2, sense: "things you can smell", description: "Identify 2 scents in your environment" },
    { number: 1, sense: "thing you can taste", description: "Notice 1 taste in your mouth or take a sip of water" },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Mindfulness & Meditation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find your inner peace with guided meditation, breathing exercises, and grounding techniques
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="meditation">Meditation Timer</TabsTrigger>
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="relaxation">Muscle Relaxation</TabsTrigger>
            <TabsTrigger value="grounding">Grounding</TabsTrigger>
          </TabsList>

          {/* Meditation Timer */}
          <TabsContent value="meditation">
            <Card className="calm-card p-8 text-center">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Guided Meditation Timer</h2>
              
              <div className="mb-8">
                <div className="text-6xl font-bold text-primary mb-4">
                  {formatTime(timeLeft)}
                </div>
                <Progress value={progress} className="w-full max-w-md mx-auto mb-6" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 mb-6">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMeditationTime(Math.max(1, meditationTime - 1))}
                      disabled={isActive}
                    >
                      -
                    </Button>
                    <span className="text-lg font-medium w-20">
                      {meditationTime} min
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMeditationTime(meditationTime + 1)}
                      disabled={isActive}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleMeditationStart}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 gentle-glow"
                  >
                    {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    {isActive ? "Pause" : "Start"}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="lg"
                  >
                    <RotateCcw className="h-5 w-5" />
                    Reset
                  </Button>
                </div>
              </div>

              <p className="text-muted-foreground">
                Find a comfortable position, close your eyes, and focus on your breath. 
                Let thoughts come and go without judgment.
              </p>
            </Card>
          </TabsContent>

          {/* Breathing Exercise */}
          <TabsContent value="breathing">
            <Card className="calm-card p-8 text-center">
              <h2 className="text-2xl font-semibold mb-6 text-foreground">Guided Breathing</h2>
              
              <div className="mb-8">
                <div className="flex justify-center mb-8">
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center text-white font-semibold text-lg transition-transform duration-4000 ${breathingActive ? 'animate-breathe' : ''}`}>
                    {currentPhase === "inhale" && "Breathe In"}
                    {currentPhase === "hold" && "Hold"}
                    {currentPhase === "exhale" && "Breathe Out"}
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xl text-muted-foreground mb-2">
                    {currentPhase === "inhale" && "Slowly breathe in through your nose..."}
                    {currentPhase === "hold" && "Hold your breath gently..."}
                    {currentPhase === "exhale" && "Slowly breathe out through your mouth..."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Follow the circle and breathe at your own pace
                  </p>
                </div>

                <Button
                  onClick={() => setBreathingActive(!breathingActive)}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 gentle-glow"
                >
                  {breathingActive ? "Stop" : "Start Breathing"}
                </Button>
              </div>

              <div className="text-left max-w-md mx-auto space-y-4 text-sm text-muted-foreground">
                <p><strong>4-4-4 Breathing Pattern:</strong></p>
                <p>• Inhale for 4 seconds</p>
                <p>• Hold for 4 seconds</p>
                <p>• Exhale for 4 seconds</p>
                <p>This technique helps reduce anxiety and promotes relaxation.</p>
              </div>
            </Card>
          </TabsContent>

          {/* Progressive Muscle Relaxation */}
          <TabsContent value="relaxation">
            <Card className="calm-card p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">Progressive Muscle Relaxation</h2>
              
              <div className="space-y-6 max-w-2xl mx-auto">
                <p className="text-muted-foreground text-center mb-8">
                  Follow this step-by-step guide to release tension throughout your body.
                  Tense each muscle group for 5 seconds, then relax for 10 seconds.
                </p>

                <div className="space-y-4">
                  {[
                    "Start with your toes - curl them tightly, then release",
                    "Tense your calf muscles, hold, then let go",
                    "Tighten your thigh muscles, then relax completely",
                    "Clench your fists, then open and release your hands",
                    "Tense your arms and shoulders, then let them drop",
                    "Scrunch your facial muscles, then smooth them out",
                    "Take three deep breaths and notice the relaxation",
                  ].map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-foreground pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* 5-4-3-2-1 Grounding Technique */}
          <TabsContent value="grounding">
            <Card className="calm-card p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">5-4-3-2-1 Grounding Technique</h2>
              
              <div className="space-y-6 max-w-2xl mx-auto">
                <p className="text-muted-foreground text-center mb-8">
                  This technique helps you reconnect with the present moment when feeling anxious or overwhelmed.
                  Use your senses to ground yourself in the here and now.
                </p>

                <div className="space-y-6">
                  {groundingSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-r from-muted/50 to-muted/30 hover:shadow-soft transition-all duration-300">
                      <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold flex-shrink-0">
                        {step.number}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Name {step.number} {step.sense}
                        </h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8 p-6 bg-serenity/20 rounded-2xl">
                  <p className="text-foreground font-medium mb-2">Remember:</p>
                  <p className="text-muted-foreground">
                    Take your time with each step. There's no rush. This exercise helps bring you back to the present moment.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Mindfulness;