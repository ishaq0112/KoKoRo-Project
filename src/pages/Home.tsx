import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Brain, Wrench, Timer, BookOpen } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "Mindfulness & Meditation",
      description: "Guided meditation, breathing exercises, and grounding techniques",
      link: "/mindfulness",
      color: "from-primary to-primary-glow"
    },
    {
      icon: Wrench,
      title: "Interactive Tools",
      description: "Stress assessment, gratitude journal, and breathing patterns",
      link: "/tools",
      color: "from-accent to-serenity"
    },
    {
      icon: Timer,
      title: "Focus Timer",
      description: "25/5 Pomodoro timer to enhance productivity and mindfulness",
      link: "/focus",
      color: "from-calm to-peace"
    },
    {
      icon: BookOpen,
      title: "Education",
      description: "Mental health tips, coping strategies, and wellness guides",
      link: "/education",
      color: "from-harmony to-serenity"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="floating absolute top-20 left-10 w-20 h-20 bg-primary-soft rounded-full blur-xl"></div>
          <div className="floating absolute top-40 right-20 w-32 h-32 bg-accent rounded-full blur-2xl" style={{ animationDelay: '2s' }}></div>
          <div className="floating absolute bottom-32 left-1/3 w-24 h-24 bg-calm rounded-full blur-xl" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-primary animate-gentle-pulse" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              KoKoRo
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-4 font-light">
              Mental Health Awareness
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed px-4">
              Your peaceful companion for mindfulness, emotional wellness, and mental health awareness. 
              Take small steps toward a calmer, more balanced you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg gentle-glow"
              >
                <Link to="/mindfulness">Start Your Journey</Link>
              </Button>
              <Button 
                asChild
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg"
              >
                <Link to="/education">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Wellness Tools for Every Moment
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of mindfulness tools, educational resources, and support systems 
              designed to nurture your mental well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="calm-card group hover:shadow-soft transition-all duration-300 hover:-translate-y-2"
                >
                  <Link to={feature.link} className="block p-6 h-full">
                    <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-gradient-to-r from-primary-soft/20 to-serenity/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
            Start Your Wellness Practice Now
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Button 
              asChild
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-soft transition-all duration-300 flex-1"
            >
              <Link to="/mindfulness">Begin Meditation</Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground flex-1"
            >
              <Link to="/tools">Check Your Mood</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;