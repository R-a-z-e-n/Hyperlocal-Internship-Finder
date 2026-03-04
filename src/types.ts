export interface Internship {
  id: number;
  company: string;
  role: string;
  stipend: string;
  location: string;
  lat: number;
  lng: number;
  skills: string;
  description: string;
  isSaved?: boolean;
}

export interface Application {
  id: number;
  internship_id: number;
  applicant_name: string;
  status: string;
}
