import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle, XCircle, Lightbulb } from "lucide-react";

const Education = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const mentalHealthTips = [
    {
      title: "Practice Deep Breathing",
      content: "When you feel stressed, try the 4-7-8 breathing technique: inhale for 4, hold for 7, exhale for 8. This activates your body's relaxation response.",
      category: "Stress Management"
    },
    {
      title: "Maintain a Sleep Schedule",
      content: "Regular sleep patterns improve mood, concentration, and emotional regulation. Aim for 7-9 hours and try to sleep and wake at consistent times.",
      category: "Sleep Health"
    },
    {
      title: "Connect with Others",
      content: "Social connections are vital for mental health. Reach out to friends, family, or join community groups to maintain meaningful relationships.",
      category: "Social Wellness"
    },
    {
      title: "Move Your Body Daily",
      content: "Physical activity releases endorphins, natural mood boosters. Even a 10-minute walk can improve your mental state.",
      category: "Physical Activity"
    },
    {
      title: "Practice Gratitude",
      content: "Writing down three things you're grateful for each day can shift your focus from negative to positive aspects of life.",
      category: "Mindfulness"
    },
    {
      title: "Set Boundaries",
      content: "Learning to say 'no' and setting healthy boundaries protects your mental energy and prevents burnout.",
      category: "Self-Care"
    }
  ];

  const copingStrategies = [
    {
      emotion: "Anxiety",
      icon: "🌊",
      strategies: [
        "Practice grounding techniques (5-4-3-2-1)",
        "Use progressive muscle relaxation",
        "Challenge anxious thoughts with evidence",
        "Break overwhelming tasks into smaller steps",
        "Practice mindful breathing exercises"
      ]
    },
    {
      emotion: "Sadness",
      icon: "🌧️",
      strategies: [
        "Allow yourself to feel the emotion",
        "Engage in activities you usually enjoy",
        "Connect with supportive people",
        "Practice self-compassion",
        "Consider professional help if persistent"
      ]
    },
    {
      emotion: "Anger",
      icon: "🔥",
      strategies: [
        "Take deep breaths before reacting",
        "Count to 10 (or 100) before responding",
        "Use physical exercise to release tension",
        "Practice assertive communication",
        "Remove yourself from triggering situations when possible"
      ]
    },
    {
      emotion: "Overwhelm",
      icon: "🌪️",
      strategies: [
        "Prioritize tasks using the urgent/important matrix",
        "Delegate or ask for help when possible",
        "Take regular breaks throughout the day",
        "Practice saying 'no' to additional commitments",
        "Use time-blocking for better organization"
      ]
    }
  ];

  const selfCareChecklist = [
    { category: "Physical Care", items: [
      "Had enough water today",
      "Ate nutritious meals",
      "Got some physical movement",
      "Took care of personal hygiene",
      "Got adequate sleep"
    ]},
    { category: "Emotional Care", items: [
      "Practiced mindfulness or meditation",
      "Expressed feelings in a healthy way",
      "Did something I enjoy",
      "Practiced self-compassion",
      "Connected with loved ones"
    ]},
    { category: "Mental Care", items: [
      "Took breaks from work/stress",
      "Learned something new",
      "Organized my space",
      "Limited negative news/social media",
      "Practiced gratitude"
    ]},
    { category: "Spiritual Care", items: [
      "Spent time in nature",
      "Reflected on my values",
      "Practiced mindfulness",
      "Engaged in meaningful activities",
      "Took time for quiet reflection"
    ]}
  ];

  const mythsAndFacts = [
    {
      myth: "Mental health problems are a sign of weakness",
      fact: "Mental health conditions are medical conditions that can affect anyone, regardless of strength or character. Seeking help shows courage and self-awareness.",
      category: "Stigma"
    },
    {
      myth: "Therapy is only for people with serious mental illness",
      fact: "Therapy can benefit anyone wanting to improve their mental health, develop coping skills, or work through life challenges.",
      category: "Treatment"
    },
    {
      myth: "Children don't experience mental health problems",
      fact: "Mental health conditions can affect people of all ages, including children. Early intervention and support are crucial.",
      category: "Age"
    },
    {
      myth: "People with mental health problems are violent or dangerous",
      fact: "People with mental health conditions are more likely to be victims of violence than perpetrators. Most are not violent at all.",
      category: "Safety"
    },
    {
      myth: "You can just 'snap out of' depression or anxiety",
      fact: "Mental health conditions are not a choice. They require proper treatment, support, and time to heal, just like physical illnesses.",
      category: "Understanding"
    }
  ];

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % mentalHealthTips.length);
  };

  const prevTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + mentalHealthTips.length) % mentalHealthTips.length);
  };

  const toggleChecklistItem = (category: string, item: string) => {
    const key = `${category}-${item}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getCategoryProgress = (category: string, items: string[]) => {
    const checkedCount = items.filter(item => checkedItems[`${category}-${item}`]).length;
    return (checkedCount / items.length) * 100;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Mental Health Education
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn evidence-based strategies, understand your emotions, and build a comprehensive self-care routine
          </p>
        </div>

        <Tabs defaultValue="tips" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="tips">Daily Tips</TabsTrigger>
            <TabsTrigger value="coping">Coping Strategies</TabsTrigger>
            <TabsTrigger value="checklist">Self-Care</TabsTrigger>
            <TabsTrigger value="myths">Myths vs Facts</TabsTrigger>
          </TabsList>

          {/* Mental Health Tips Carousel */}
          <TabsContent value="tips">
            <Card className="calm-card p-8">
              <div className="text-center mb-6">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground">Daily Mental Health Tips</h2>
                <p className="text-muted-foreground mt-2">Evidence-based practices for better mental wellness</p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Card className="p-8 bg-gradient-to-r from-primary-soft/20 to-serenity/20 border-none">
                    <div className="text-center">
                      <div className="inline-block bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium mb-4">
                        {mentalHealthTips[currentTipIndex].category}
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground mb-4">
                        {mentalHealthTips[currentTipIndex].title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {mentalHealthTips[currentTipIndex].content}
                      </p>
                    </div>
                  </Card>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={prevTip}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    Previous
                  </Button>

                  <div className="flex space-x-2">
                    {mentalHealthTips.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTipIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentTipIndex ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="lg"
                    onClick={nextTip}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Coping Strategies */}
          <TabsContent value="coping">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {copingStrategies.map((strategy, index) => (
                <Card key={index} className="calm-card p-6 hover:shadow-soft transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">{strategy.icon}</div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Dealing with {strategy.emotion}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {strategy.strategies.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
                          {itemIndex + 1}
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Self-Care Checklist */}
          <TabsContent value="checklist">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selfCareChecklist.map((category, index) => {
                const progress = getCategoryProgress(category.category, category.items);
                return (
                  <Card key={index} className="calm-card p-6">
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {category.category}
                      </h3>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {Math.round(progress)}% completed
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      {category.items.map((item, itemIndex) => {
                        const isChecked = checkedItems[`${category.category}-${item}`];
                        return (
                          <div key={itemIndex} className="flex items-center space-x-3">
                            <Checkbox
                              id={`${category.category}-${item}`}
                              checked={isChecked}
                              onCheckedChange={() => toggleChecklistItem(category.category, item)}
                            />
                            <label
                              htmlFor={`${category.category}-${item}`}
                              className={`text-sm cursor-pointer transition-colors ${
                                isChecked 
                                  ? 'text-muted-foreground line-through' 
                                  : 'text-foreground hover:text-primary'
                              }`}
                            >
                              {item}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Myths vs Facts */}
          <TabsContent value="myths">
            <div className="space-y-6">
              {mythsAndFacts.map((item, index) => (
                <Card key={index} className="calm-card p-6 hover:shadow-soft transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <XCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-destructive mb-2">Myth</h3>
                          <p className="text-muted-foreground">{item.myth}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold text-primary mb-2">Fact</h3>
                          <p className="text-muted-foreground">{item.fact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="inline-block bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-sm">
                      {item.category}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="calm-card p-6 mt-8 bg-gradient-to-r from-harmony/20 to-serenity/20">
              <div className="text-center">
                <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Remember
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mental health is just as important as physical health. It's okay to ask for help, 
                  and seeking professional support is a sign of strength, not weakness. 
                  Everyone deserves to feel mentally well and supported.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Education;