import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { ArrowRight, Users, Briefcase, TrendingUp, Shield } from "lucide-react";
import heroImage from "@/assets/hero-workspace.jpg";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Top Talent",
      description: "Connect with verified freelancers across all industries and skill levels",
    },
    {
      icon: Briefcase,
      title: "Quality Projects",
      description: "Showcase your portfolio and attract clients who value your expertise",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Career",
      description: "Build your reputation and scale your freelance business",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Protected profiles and verified credentials for peace of mind",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Find Top{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Freelance Talent
                </span>{" "}
                Worldwide
              </h1>
              <p className="text-lg text-muted-foreground">
                Connect with skilled freelancers or showcase your portfolio to attract your next big opportunity.
                Join thousands of professionals growing their careers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="hero" asChild>
                  <Link to="/browse">
                    Browse Freelancers <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/dashboard">Join as Freelancer</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img
                src={heroImage}
                alt="Freelance workspace"
                className="relative rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FreelanceHub</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The platform that connects exceptional talent with amazing opportunities
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary via-secondary to-accent p-12 rounded-3xl text-center shadow-[var(--shadow-elegant)]">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join our community of talented freelancers and start building your future today
            </p>
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90" asChild>
              <Link to="/dashboard">
                Create Your Profile <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 FreelanceHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
