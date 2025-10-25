import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Briefcase, Award, MessageSquare } from "lucide-react";

const FreelancerProfile = () => {
  const { id } = useParams();

  // Mock data - in a real app, this would be fetched based on the id
  const freelancer = {
    id: Number(id),
    name: "Sarah Johnson",
    title: "Senior UI/UX Designer",
    location: "New York, USA",
    rating: 4.9,
    reviews: 127,
    hourlyRate: 85,
    completedProjects: 156,
    memberSince: "2021",
    skills: ["UI Design", "Figma", "User Research", "Prototyping", "Wireframing", "Design Systems"],
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",
    bio: "Passionate UI/UX designer with over 8 years of experience creating intuitive and beautiful digital experiences. I specialize in user-centered design and have worked with startups and Fortune 500 companies alike.",
    portfolio: [
      {
        title: "E-commerce Mobile App",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
        description: "Complete redesign of a shopping app, increasing conversions by 45%",
      },
      {
        title: "SaaS Dashboard",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
        description: "Analytics dashboard for B2B platform with complex data visualization",
      },
      {
        title: "Healthcare Portal",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
        description: "Patient management system with focus on accessibility and usability",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="w-32 h-32 rounded-2xl object-cover shadow-[var(--shadow-card)]"
                />
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{freelancer.name}</h1>
                  <p className="text-xl text-muted-foreground mb-4">{freelancer.title}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {freelancer.location}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-accent text-accent" />
                      {freelancer.rating} ({freelancer.reviews} reviews)
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {freelancer.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{freelancer.bio}</p>
                </div>
              </div>
            </div>

            {/* Sidebar Card */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-primary mb-1">
                      ${freelancer.hourlyRate}
                      <span className="text-lg text-muted-foreground font-normal">/hour</span>
                    </div>
                  </div>
                  <Button className="w-full mb-3" variant="hero" size="lg">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Contact Me
                  </Button>
                  <Button className="w-full" variant="outline" size="lg">
                    View Portfolio
                  </Button>
                  
                  <div className="mt-6 pt-6 border-t border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span className="text-sm">Projects</span>
                      </div>
                      <span className="font-semibold">{freelancer.completedProjects}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground">
                        <Award className="h-4 w-4 mr-2" />
                        <span className="text-sm">Member Since</span>
                      </div>
                      <span className="font-semibold">{freelancer.memberSince}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Portfolio</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {freelancer.portfolio.map((project, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-[var(--shadow-card)] transition-all duration-300">
                <CardHeader className="p-0">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="mb-2">{project.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfile;
