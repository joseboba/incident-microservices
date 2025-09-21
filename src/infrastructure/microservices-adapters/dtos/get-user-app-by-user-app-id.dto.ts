export interface UserType {
  isActive: boolean;
  userTypeCode: string;
  name: string;
  description: string;
  isAdmin: boolean;
  isTechnical: boolean;
}

export interface GetUserAppByUserAppIdResponse {
  isActive: boolean;
  userAppId: number;
  name: string;
  email: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}
