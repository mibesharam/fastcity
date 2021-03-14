import { UserDetails } from './userDetails';

export interface UserProfile {
    email: string;
    firstName: string;
    lastName: string;
    userDetails: UserDetails[];
}
