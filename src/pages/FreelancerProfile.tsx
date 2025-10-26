import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, Briefcase, Award, MessageSquare, Loader2, Bookmark } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  title: string | null;
  bio: string | null;
  location: string | null;
  hourly_rate: number | null;
  years_experience: number;
  avatar_url: string | null;
  portfolio_url: string | null;
  availability_status: string;
  created_at: string;
  profile_skills: Array<{ skills: { name: string } }>;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  project_url: string | null;
}

const FreelancerProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchProfileData();
      if (user) {
        checkBookmark();
      }
    }
  }, [id, user]);

  const fetchProfileData = async () => {
    try {
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(`
          *,
          profile_skills(skills(name))
        `)
        .eq("id", id)
        .single();

      if (profileError) throw profileError;

      setProfile(profileData);

      // Fetch projects
      const { data: projectsData, error: projectsError } = await supabase
        .from("projects")
        .select("*")
        .eq("profile_id", id)
        .order("created_at", { ascending: false });

      if (projectsError) throw projectsError;

      setProjects(projectsData || []);

      // Increment profile view count
      await supabase.rpc("increment_profile_views", { profile_id: id });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error loading profile",
        description: error.message,
      });
      navigate("/browse");
    } finally {
      setLoading(false);
    }
  };

  const checkBookmark = async () => {
    if (!user || !id) return;

    const { data } = await supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", user.id)
      .eq("freelancer_id", id)
      .maybeSingle();

    setIsBookmarked(!!data);
  };

  const handleBookmark = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to bookmark freelancers",
      });
      navigate("/auth");
      return;
    }

    try {
      if (isBookmarked) {
        await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", user.id)
          .eq("freelancer_id", id);

        setIsBookmarked(false);
        toast({ title: "Bookmark removed" });
      } else {
        await supabase
          .from("bookmarks")
          .insert({ user_id: user.id, freelancer_id: id });

        setIsBookmarked(true);
        toast({ title: "Freelancer bookmarked" });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

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

  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-muted-foreground">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={profile.avatar_url || `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop`}
                  alt={profile.full_name}
                  className="w-32 h-32 rounded-2xl object-cover shadow-[var(--shadow-card)]"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold">{profile.full_name}</h1>
                    <Button
                      variant={isBookmarked ? "default" : "outline"}
                      size="icon"
                      onClick={handleBookmark}
                    >
                      <Bookmark className={isBookmarked ? "fill-current" : ""} />
                    </Button>
                  </div>
                  <p className="text-xl text-muted-foreground mb-4">{profile.title || "Freelancer"}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    {profile.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profile.location}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1 fill-accent text-accent" />
                      4.9 (0 reviews)
                    </div>
                    <Badge variant="secondary" className="capitalize">{profile.availability_status}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {profile.profile_skills?.map((ps: any, index: number) => (
                      <Badge key={index} variant="secondary">
                        {ps.skills?.name}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{profile.bio || "No bio available"}</p>
                </div>
              </div>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-primary mb-1">
                      ${profile.hourly_rate || 50}
                      <span className="text-lg text-muted-foreground font-normal">/hour</span>
                    </div>
                  </div>
                  <Button className="w-full mb-3" variant="hero" size="lg" onClick={() => navigate("/messages")}>
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Contact Me
                  </Button>
                  {profile.portfolio_url && (
                    <Button className="w-full" variant="outline" size="lg" asChild>
                      <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer">
                        View External Portfolio
                      </a>
                    </Button>
                  )}

                  <div className="mt-6 pt-6 border-t border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground">
                        <Briefcase className="h-4 w-4 mr-2" />
                        <span className="text-sm">Experience</span>
                      </div>
                      <span className="font-semibold">{profile.years_experience} years</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-muted-foreground">
                        <Award className="h-4 w-4 mr-2" />
                        <span className="text-sm">Member Since</span>
                      </div>
                      <span className="font-semibold">{new Date(profile.created_at).getFullYear()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {projects.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Portfolio</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden group hover:shadow-[var(--shadow-card)] transition-all duration-300"
                >
                  <CardHeader className="p-0">
                    <div className="aspect-video overflow-hidden bg-muted">
                      {project.thumbnail_url ? (
                        <img
                          src={project.thumbnail_url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Briefcase className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="mb-2">{project.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{project.description || "No description"}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreelancerProfile;
