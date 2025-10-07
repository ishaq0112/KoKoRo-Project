import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Heart, Smile, Frown, Coffee, Moon, Zap, RefreshCw } from "lucide-react";

const Tools = () => {
  const navigate = useNavigate();
  const [stressLevel, setStressLevel] = useState([5]);
  const [moodRating, setMoodRating] = useState([5]);
  const [gratitudeEntry, setGratitudeEntry] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [breathingPattern, setBreathingPattern] = useState("4-7-8");

  const handleStartBreathing = () => {
    navigate("/mindfulness", { 
      state: { 
        fromBreathing: true, 
        pattern: breathingPattern 
      } 
    });
  };

  const stressQuestions = [
    "How overwhelmed do you feel right now?",
    "How well did you sleep last night?",
    "How supported do you feel by others?",
    "How in control of your day do you feel?",
  ];

  const copingSuggestions = {
    low: [
      "Keep up the good work! Consider maintaining your current routine.",
      "Try a short gratitude practice to maintain your positive state.",
      "Engage in activities you enjoy to sustain your well-being.",
    ],
    medium: [
      "Take some deep breaths and try the 5-4-3-2-1 grounding technique.",
      "Consider a 10-minute walk or gentle stretching.",
      "Practice mindful breathing or listen to calming music.",
    ],
    high: [
      "Consider taking a break and practicing deep breathing exercises.",
      "Reach out to a trusted friend, family member, or counselor.",
      "Try progressive muscle relaxation or gentle movement.",
      "If overwhelming, consider professional support resources.",
    ],
  };

  const gratitudePrompts = [
    "What made you smile today?",
    "Who are you grateful for and why?",
    "What's something beautiful you noticed today?",
    "What challenge helped you grow recently?",
    "What comfort or luxury do you appreciate?",
  ];

  const colorTherapy = [
    { name: "Calming Blue", color: "bg-blue-400", description: "Promotes peace and tranquility", hex: "#60a5fa" },
    { name: "Soothing Green", color: "bg-green-400", description: "Encourages balance and harmony", hex: "#4ade80" },
    { name: "Gentle Purple", color: "bg-purple-400", description: "Inspires creativity and spirituality", hex: "#a78bfa" },
    { name: "Warm Orange", color: "bg-orange-400", description: "Boosts energy and optimism", hex: "#fb923c" },
    { name: "Soft Pink", color: "bg-pink-400", description: "Nurtures love and compassion", hex: "#f472b6" },
  ];

  const breathingPatterns = {
    "4-7-8": { inhale: 4, hold: 7, exhale: 8, description: "Relaxation and sleep" },
    "4-4-4": { inhale: 4, hold: 4, exhale: 4, description: "General stress relief" },
    "box": { inhale: 4, hold: 4, exhale: 4, hold2: 4, description: "Focus and concentration" },
  };

  const getStressCategory = (level: number) => {
    if (level <= 3) return "low";
    if (level <= 7) return "medium";
    return "high";
  };

  const currentPrompt = gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Interactive Wellness Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Assess your current state, practice gratitude, and explore calming techniques
          </p>
        </div>

        <Tabs defaultValue="stress" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="stress">Stress Check</TabsTrigger>
            <TabsTrigger value="gratitude">Gratitude Journal</TabsTrigger>
            <TabsTrigger value="breathing">Breathing Patterns</TabsTrigger>
            <TabsTrigger value="color">Color Therapy</TabsTrigger>
          </TabsList>

          {/* Stress Level Assessment */}
          <TabsContent value="stress">
            <Card className="calm-card p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">Stress Level Assessment</h2>
              
              <div className="space-y-8 max-w-2xl mx-auto">
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Rate your current stress level from 1 (very calm) to 10 (very stressed)
                  </p>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-primary mb-2">{stressLevel[0]}/10</div>
                    <Slider
                      value={stressLevel}
                      onValueChange={setStressLevel}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full max-w-md mx-auto"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                      <span>Very Calm</span>
                      <span>Very Stressed</span>
                    </div>
                  </div>

                  <Progress 
                    value={stressLevel[0] * 10} 
                    className="w-full max-w-md mx-auto mb-6"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-muted/50 to-muted/30">
                  <h3 className="text-lg font-semibold mb-4 text-center">Personalized Suggestions</h3>
                  <div className="space-y-3">
                    {copingSuggestions[getStressCategory(stressLevel[0])].map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-foreground">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Button className="bg-gradient-to-r from-calm to-peace hover:shadow-soft">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retake Assessment
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Gratitude Journal */}
          <TabsContent value="gratitude">
            <Card className="calm-card p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">Daily Gratitude Practice</h2>
              
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <Heart className="h-12 w-12 text-primary mx-auto mb-4 animate-gentle-pulse" />
                  <p className="text-muted-foreground">
                    Taking time to reflect on what you're grateful for can improve mood and overall well-being.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-primary-soft/20 to-serenity/20">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">Today's Prompt:</h3>
                  <p className="text-primary font-medium text-lg">{currentPrompt}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Write your thoughts here:
                  </label>
                  <Textarea
                    value={gratitudeEntry}
                    onChange={(e) => setGratitudeEntry(e.target.value)}
                    placeholder="I'm grateful for..."
                    className="min-h-32 resize-none"
                  />
                </div>

                <div className="flex gap-4 justify-center">
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    disabled={!gratitudeEntry.trim()}
                  >
                    Save Entry
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setGratitudeEntry("")}
                  >
                    Clear
                  </Button>
                </div>

                <div className="text-center p-4 bg-harmony/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Tip:</strong> Try to be specific about why you're grateful for something. 
                    This deepens the positive impact of the practice.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Breathing Patterns */}
          <TabsContent value="breathing">
            <Card className="calm-card p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">Breathing Patterns</h2>
              
              <div className="space-y-8 max-w-2xl mx-auto">
                <p className="text-muted-foreground text-center">
                  Choose a breathing pattern that suits your current needs. Each technique offers different benefits.
                </p>

                <div className="grid gap-4">
                  {Object.entries(breathingPatterns).map(([key, pattern]) => (
                    <div
                      key={key}
                      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                        breathingPattern === key
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border bg-muted/20 hover:border-primary/50"
                      }`}
                      onClick={() => setBreathingPattern(key)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-foreground capitalize">
                          {key.replace("-", "-")} Breathing
                        </h3>
                        <div className={`w-4 h-4 rounded-full ${
                          breathingPattern === key ? "bg-primary" : "bg-muted"
                        }`} />
                      </div>
                      <p className="text-muted-foreground mb-3">{pattern.description}</p>
                      <div className="flex gap-2 text-sm">
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded">
                          Inhale: {pattern.inhale}s
                        </span>
                        <span className="bg-accent/20 text-accent-foreground px-2 py-1 rounded">
                          Hold: {pattern.hold}s
                        </span>
                        <span className="bg-calm/20 text-foreground px-2 py-1 rounded">
                          Exhale: {pattern.exhale}s
                        </span>
                        {"hold2" in pattern && (
                          <span className="bg-peace/20 text-foreground px-2 py-1 rounded">
                            Hold: {pattern.hold2}s
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button 
                    onClick={handleStartBreathing}
                    className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-soft"
                  >
                    Start {breathingPattern.toUpperCase()} Breathing
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Color Therapy */}
          <TabsContent value="color">
            <Card className="calm-card p-8">
              <h2 className="text-2xl font-semibold mb-6 text-foreground text-center">Color Therapy</h2>
              
              <div className="space-y-8 max-w-2xl mx-auto">
                <p className="text-muted-foreground text-center">
                  Colors can influence our mood and emotions. Choose a color that resonates with you right now 
                  and spend a few moments focusing on it.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {colorTherapy.map((color, index) => (
                    <div
                      key={index}
                      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                        selectedColor === color.name
                          ? "border-primary shadow-soft scale-105"
                          : "border-border hover:border-primary/50 hover:scale-102"
                      }`}
                      onClick={() => setSelectedColor(color.name)}
                    >
                      <div className={`w-full h-24 ${color.color} rounded-xl mb-4`} />
                      <h3 className="text-lg font-semibold text-foreground mb-2">{color.name}</h3>
                      <p className="text-muted-foreground text-sm">{color.description}</p>
                    </div>
                  ))}
                </div>

                {selectedColor && (
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-primary-soft/20 to-serenity/20">
                    <p className="text-foreground mb-4">
                      <strong>Focus Exercise:</strong> Breathe deeply and visualize yourself surrounded by {selectedColor.toLowerCase()}. 
                      Let this color fill you with its healing energy.
                    </p>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      Start Color Meditation
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Tools;