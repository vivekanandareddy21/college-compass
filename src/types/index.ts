export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  collegeId: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  collegeId: string;
  createdAt: string;
}

export interface College {
  id: string;
  name: string;
  location: string;
  fees: number;
  rating: number;
  overview: string;
  placementPercentage: number;
  createdAt: string;
}

export interface CollegeWithRelations extends College {
  courses: Course[];
  reviews: Review[];
}

export interface SavedCollege {
  id: string;
  userId: string;
  collegeId: string;
  createdAt: string;
  college: College;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

export interface CollegeFilter {
  search?: string;
  location?: string[];
  minRating?: number;
  minFee?: number;
  maxFee?: number;
  sortBy?: "rating" | "fees" | "placement";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface CollegeListResponse {
  colleges: College[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
