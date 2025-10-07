import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Settings, Coffee, Target } from "lucide-react";

const FocusTimer = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [currentTime, setCurrentTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<"work" | "shortBreak" | "longBreak">("work");
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isActive && currentTime > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(time => time - 1);
      }, 1000);
    } else if (currentTime === 0) {
      setIsActive(false);
      handleSessionComplete();
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, currentTime]);

  const handleSessionComplete = () => {
    // Play completion sound here if implemented
    
    if (mode === "work") {
      setSessionsCompleted(prev => prev + 1);
      setTotalSessions(prev => prev + 1);
      
      // After 4 work sessions, take a long break
      if ((sessionsCompleted + 1) % 4 === 0) {
        setMode("longBreak");
        setCurrentTime(longBreakTime * 60);
      } else {
        setMode("shortBreak");
        setCurrentTime(breakTime * 60);
      }
    } else {
      setMode("work");
      setCurrentTime(workTime * 60);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === "work") {
      setCurrentTime(workTime * 60);
    } else if (mode === "shortBreak") {
      setCurrentTime(breakTime * 60);
    } else {
      setCurrentTime(longBreakTime * 60);
    }
  };

  const switchMode = (newMode: "work" | "shortBreak" | "longBreak") => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === "work") {
      setCurrentTime(workTime * 60);
    } else if (newMode === "shortBreak") {
      setCurrentTime(breakTime * 60);
    } else {
      setCurrentTime(longBreakTime * 60);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalTime = () => {
    if (mode === "work") return workTime * 60;
    if (mode === "shortBreak") return breakTime * 60;
    return longBreakTime * 60;
  };

  const progress = ((getTotalTime() - currentTime) / getTotalTime()) * 100;

  const getModeColor = () => {
    switch (mode) {
      case "work": return "from-primary to-primary-glow";
      case "shortBreak": return "from-calm to-peace";
      case "longBreak": return "from-harmony to-serenity";
      default: return "from-primary to-primary-glow";
    }
  };

  const getModeIcon = () => {
    switch (mode) {
      case "work": return <Target className="h-6 w-6" />;
      case "shortBreak": return <Coffee className="h-6 w-6" />;
      case "longBreak": return <Coffee className="h-6 w-6" />;
      default: return <Target className="h-6 w-6" />;
    }
  };

  const focusTips = [
    "Remove distractions from your workspace",
    "Set a specific goal for this session",
    "Keep water nearby to stay hydrated",
    "Take deep breaths before starting",
    "Turn off notifications on your devices",
  ];

  const breakActivities = [
    "Take a walk around the room",
    "Do some light stretching",
    "Practice deep breathing",
    "Look away from your screen",
    "Drink some water",
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Focus Timer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            25/5 Pomodoro technique to boost productivity and maintain focus
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="timer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="timer">Timer</TabsTrigger>
              <TabsTrigger value="settings">Settings & Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="timer">
              <Card className="calm-card p-8 text-center">
                {/* Mode Selector */}
                <div className="flex flex-col sm:flex-row justify-center gap-2 mb-8">
                  <Button
                    variant={mode === "work" ? "default" : "outline"}
                    onClick={() => switchMode("work")}
                    className={mode === "work" ? `bg-gradient-to-r ${getModeColor()}` : ""}
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Work
                  </Button>
                  <Button
                    variant={mode === "shortBreak" ? "default" : "outline"}
                    onClick={() => switchMode("shortBreak")}
                    className={mode === "shortBreak" ? `bg-gradient-to-r ${getModeColor()}` : ""}
                  >
                    <Coffee className="h-4 w-4 mr-2" />
                    Short Break
                  </Button>
                  <Button
                    variant={mode === "longBreak" ? "default" : "outline"}
                    onClick={() => switchMode("longBreak")}
                    className={mode === "longBreak" ? `bg-gradient-to-r ${getModeColor()}` : ""}
                  >
                    <Coffee className="h-4 w-4 mr-2" />
                    Long Break
                  </Button>
                </div>

                {/* Current Mode Display */}
                <div className="mb-8">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${getModeColor()} text-white mb-4`}>
                    {getModeIcon()}
                    <span className="font-medium capitalize">
                      {mode === "shortBreak" ? "Short Break" : mode === "longBreak" ? "Long Break" : "Focus Time"}
                    </span>
                  </div>
                </div>

                {/* Timer Display */}
                <div className="mb-8">
                  <div className="text-7xl md:text-8xl font-bold text-foreground mb-6">
                    {formatTime(currentTime)}
                  </div>
                  <Progress value={progress} className="w-full max-w-lg mx-auto mb-6 h-3" />
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <Button
                      onClick={toggleTimer}
                      size="lg"
                      className={`bg-gradient-to-r ${getModeColor()} hover:shadow-soft text-lg px-8`}
                    >
                      {isActive ? <Pause className="h-6 w-6 mr-2" /> : <Play className="h-6 w-6 mr-2" />}
                      {isActive ? "Pause" : "Start"}
                    </Button>
                    <Button
                      onClick={resetTimer}
                      variant="outline"
                      size="lg"
                      className="text-lg px-8"
                    >
                      <RotateCcw className="h-6 w-6 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Session Counter */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <div className="text-2xl font-bold text-primary">{sessionsCompleted}</div>
                    <div className="text-sm text-muted-foreground">Sessions Today</div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <div className="text-2xl font-bold text-accent">{totalSessions}</div>
                    <div className="text-sm text-muted-foreground">Total Sessions</div>
                  </div>
                </div>

                {/* Current Mode Guidance */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-muted/50 to-muted/30 max-w-lg mx-auto">
                  {mode === "work" ? (
                    <div>
                      <h3 className="font-semibold mb-3 text-foreground">Focus Time 🎯</h3>
                      <p className="text-muted-foreground text-sm">
                        Time to focus! Work on your most important task. Avoid distractions and stay committed to your goal.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-semibold mb-3 text-foreground">Break Time ☕</h3>
                      <p className="text-muted-foreground text-sm">
                        Take a break! Step away from your work, stretch, hydrate, or do something relaxing to recharge.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="calm-card p-6">
                  <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Timer Settings
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Work Time (minutes)
                      </label>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setWorkTime(Math.max(1, workTime - 5))}
                        >
                          -5
                        </Button>
                        <span className="text-xl font-semibold text-primary w-16 text-center">
                          {workTime}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setWorkTime(workTime + 5)}
                        >
                          +5
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Short Break (minutes)
                      </label>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setBreakTime(Math.max(1, breakTime - 1))}
                        >
                          -1
                        </Button>
                        <span className="text-xl font-semibold text-primary w-16 text-center">
                          {breakTime}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setBreakTime(breakTime + 1)}
                        >
                          +1
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Long Break (minutes)
                      </label>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setLongBreakTime(Math.max(5, longBreakTime - 5))}
                        >
                          -5
                        </Button>
                        <span className="text-xl font-semibold text-primary w-16 text-center">
                          {longBreakTime}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setLongBreakTime(longBreakTime + 5)}
                        >
                          +5
                        </Button>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => {
                        setCurrentTime(workTime * 60);
                        setMode("work");
                        setIsActive(false);
                      }}
                    >
                      Apply Settings
                    </Button>
                  </div>
                </Card>

                <div className="space-y-6">
                  <Card className="calm-card p-6">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Focus Tips</h3>
                    <div className="space-y-3">
                      {focusTips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-muted-foreground text-sm">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="calm-card p-6">
                    <h3 className="text-xl font-semibold mb-4 text-foreground">Break Activities</h3>
                    <div className="space-y-3">
                      {breakActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="bg-calm text-white rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-muted-foreground text-sm">{activity}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FocusTimer;