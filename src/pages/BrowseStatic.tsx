import Header from "@/components/Header";
import FreelancerCard from "@/components/FreelancerCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const Browse = () => {
  // Mock data - in a real app, this would come from an API
  const freelancers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior UI/UX Designer",
      location: "New York, USA",
      rating: 4.9,
      reviews: 127,
      hourlyRate: 85,
      skills: ["UI Design", "Figma", "User Research", "Prototyping"],
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Full Stack Developer",
      location: "San Francisco, USA",
      rating: 5.0,
      reviews: 89,
      hourlyRate: 95,
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Emma Williams",
      title: "Content Strategist",
      location: "London, UK",
      rating: 4.8,
      reviews: 156,
      hourlyRate: 75,
      skills: ["SEO", "Content Writing", "Strategy", "Marketing"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "David Rodriguez",
      title: "Brand Designer",
      location: "Barcelona, Spain",
      rating: 4.9,
      reviews: 93,
      hourlyRate: 80,
      skills: ["Branding", "Illustration", "Adobe CC", "Typography"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      title: "Digital Marketing Expert",
      location: "Toronto, Canada",
      rating: 4.7,
      reviews: 201,
      hourlyRate: 70,
      skills: ["Social Media", "PPC", "Analytics", "Email Marketing"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      name: "James Taylor",
      title: "Mobile App Developer",
      location: "Austin, USA",
      rating: 5.0,
      reviews: 67,
      hourlyRate: 90,
      skills: ["React Native", "iOS", "Android", "Firebase"],
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Freelancers</h1>
          <p className="text-lg text-muted-foreground">
            Discover talented professionals ready to bring your projects to life
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 grid md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search by skill, name, or title..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="writing">Writing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{freelancers.length}</span> freelancers
          </p>
        </div>

        {/* Freelancer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freelancers.map((freelancer) => (
            <FreelancerCard key={freelancer.id} {...freelancer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
