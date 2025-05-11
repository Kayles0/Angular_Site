export interface Profile {
  id: number;
  login: string;
  gender: Gender;
  firstName: string;
  lastName: string;
  email: string;
  status: Status;
  department: Department;
  imageId: number;
}

export enum Gender {
  MAN = 'MAN',
  'WOMAN' = 'WOMAN'
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING'
}

export enum Department {
  SOFTWARE_DEVELOPMENT_DEPARTMENT,
  QUALITY_ASSURANCE_DEPARTMENT,
  DEVOPS_DEPARTMENT,
  SUPPORT_AND_OPERATIONS_DEPARTMENT,
  MOBILE_DEVELOPMENT_DEPARTMENT
}


export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN'
}
