import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, MapPin } from "lucide-react";

interface FreelancerCardProps {
  id: string | number;
  name: string;
  title: string;
  location: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  skills: string[];
  image: string;
}

const FreelancerCard = ({
  id,
  name,
  title,
  location,
  rating,
  reviews,
  hourlyRate,
  skills,
  image,
}: FreelancerCardProps) => {
  return (
    <Link to={`/freelancer/${id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:-translate-y-1 bg-gradient-to-br from-card to-muted/20">
        <CardHeader className="p-0">
          <div className="aspect-square overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{title}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-1 text-sm">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-medium">{rating}</span>
              <span className="text-muted-foreground">({reviews})</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="px-6 pb-6 pt-0">
          <div className="text-lg font-bold text-primary">
            ${hourlyRate}
            <span className="text-sm text-muted-foreground font-normal">/hour</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default FreelancerCard;
