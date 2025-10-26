import { useEffect, useState } from "react";
import Header from "@/components/Header";
import FreelancerCard from "@/components/FreelancerCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  full_name: string;
  title: string | null;
  location: string | null;
  hourly_rate: number | null;
  avatar_url: string | null;
  profile_skills: Array<{ skills: { name: string } }>;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Browse = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = async () => {
    try {
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      setCategories(categoriesData || []);

      // Build query for profiles
      let query = supabase
        .from("profiles")
        .select(`
          *,
          profile_skills(skills(name))
        `)
        .not("title", "is", null);

      // Filter by category if selected
      if (selectedCategory !== "all") {
        const { data: profileIds } = await supabase
          .from("profile_categories")
          .select("profile_id")
          .eq("category_id", selectedCategory);

        const ids = profileIds?.map(p => p.profile_id) || [];
        if (ids.length > 0) {
          query = query.in("id", ids);
        }
      }

      const { data: profilesData, error } = await query;

      if (error) throw error;

      setProfiles(profilesData || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading freelancers",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter((profile) => {
    const searchLower = searchTerm.toLowerCase();
    const nameMatch = profile.full_name.toLowerCase().includes(searchLower);
    const titleMatch = profile.title?.toLowerCase().includes(searchLower);
    const skillsMatch = profile.profile_skills?.some((ps: any) =>
      ps.skills?.name.toLowerCase().includes(searchLower)
    );

    return nameMatch || titleMatch || skillsMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse Freelancers</h1>
          <p className="text-lg text-muted-foreground">
            Discover talented professionals ready to bring your projects to life
          </p>
        </div>

        <div className="mb-8 grid md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by skill, name, or title..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredProfiles.length}</span> freelancers
          </p>
        </div>

        {filteredProfiles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No freelancers found. Try adjusting your search criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <FreelancerCard
                key={profile.id}
                id={profile.id}
                name={profile.full_name}
                title={profile.title || "Freelancer"}
                location={profile.location || "Remote"}
                rating={4.8}
                reviews={0}
                hourlyRate={profile.hourly_rate || 50}
                skills={profile.profile_skills?.map((ps: any) => ps.skills?.name).filter(Boolean) || []}
                image={profile.avatar_url || `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
