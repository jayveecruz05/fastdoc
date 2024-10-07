// Queries Type
export interface PaginationMeta {
  current_page?: number;
  has_more_pages?: boolean;
  last_page?: number;
  per_page?: number;
  query_string?: string;
  total?: number;
}

export interface SpecializationType {
  id?: number;
  slug?: string;
  name?: string;
  description?: string;
  icon?: string;
};

export interface DoctorType {
  id?: number;
  image?: string;
  display_name?: string;
  specialization?: string;
  rating?: number;
  reviews?: number;
  bio?: string;
};

export interface DoctorsType {
  data: DoctorType[],
  meta: PaginationMeta
};

// Mutations Type
export type DefaultDataType<ValueType = string> = ValueType | null | undefined;

export type LoginDataType = {
  email: DefaultDataType;
  password: DefaultDataType;
};

export type ForgotPasswordDataType = {
  email: DefaultDataType;
};

export type SignUpdDataType = {
  first_name: DefaultDataType;
  middle_name: DefaultDataType;
  last_name: DefaultDataType;
  email: DefaultDataType;
  mobile_number: DefaultDataType;
  dob: DefaultDataType;
  parent_first_name?: DefaultDataType;
  parent_middle_name?: DefaultDataType;
  parent_last_name?: DefaultDataType;
  parent_email?: DefaultDataType;
  password: DefaultDataType;
  gender: DefaultDataType;
  race: DefaultDataType;
  ethnicity: DefaultDataType;
  user_type: 'Patient'
};