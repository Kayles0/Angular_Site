export interface Profile {
  id: number;
  login: string;
  gender: Gender | string;
  firstName: string;
  lastName: string;
  email: string;
  status: Status | string;
  department: Department | string;
  imageId: number;
  imageUrl?: string;
  groups: Groups[];
}

export enum Gender {
  Male = 'MAN',
  Female = 'WOMAN'
}

export interface Groups {
  name: string;
}

export enum Status {
  ACTIVE = 'ACTIVE',
  ON_VACATION = 'ON_VACATION',
  DISMISSED = 'DISMISSED',
  ON_PROBATION = 'ON_PROBATION',
  INTERN = 'INTERN'
}

export enum Department {
  Software_Development = 'SOFTWARE_DEVELOPMENT_DEPARTMENT',
  Quality_Assurance = 'QUALITY_ASSURANCE_DEPARTMENT',
  DevOps = 'DEVOPS_DEPARTMENT',
  Support_Operations = 'SUPPORT_AND_OPERATIONS_DEPARTMENT',
  Mobile_Development = 'MOBILE_DEVELOPMENT_DEPARTMENT'
}


export enum Role {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN'
}
