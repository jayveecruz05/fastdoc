export interface FormDataType {
  status: boolean;
  loading?: boolean;
  notification?: { type: 'success' | 'info' | 'warning' | 'error'; text: string; } | null;
};

export interface FileType {
  model: any[] | undefined | null;
  content: any;
};

export interface DefaultFieldType<ValueType = string> {
  value: ValueType | undefined | null;
  error?: string | string[] | undefined | null;
  slug?: string;
};

export interface SoonSignUpType extends FormDataType {
  data: {
    email: DefaultFieldType;
  };
};

export interface LoginType extends FormDataType {
  data: {
    email: DefaultFieldType;
    password: DefaultFieldType & { visible: boolean; };
    rememberMe: DefaultFieldType<boolean>;
  };
};

export interface ForgotPasswordType extends FormDataType {
  data: {
    email: DefaultFieldType;
  };
};

export interface ResetPasswordType extends FormDataType {
  data: {
    newPassword: DefaultFieldType & { visible: boolean; };
    confirmPassword: DefaultFieldType & { visible: boolean; };
  };
};

export interface PasswordCreationType extends FormDataType {
  data: {
    currentPassword: DefaultFieldType & { visible: boolean; };
    password: DefaultFieldType & { visible: boolean; };
    confirmPassword: DefaultFieldType & { visible: boolean; };
  };
};

export interface SignUpType extends FormDataType {
  hasChanges: boolean,
  data: {
    firstName: DefaultFieldType;
    middleName: DefaultFieldType;
    lastName: DefaultFieldType;
    email: DefaultFieldType;
    phoneNumber: DefaultFieldType;
    birthDate: DefaultFieldType<Date>;
    parent: {
      firstName: DefaultFieldType;
      middleName: DefaultFieldType;
      lastName: DefaultFieldType;
      email: DefaultFieldType;
    };
    password: DefaultFieldType & { visible: boolean; };
    confirmPassword: DefaultFieldType & { visible: boolean; };
    gender: DefaultFieldType;
    race: DefaultFieldType;
    ethnicity: DefaultFieldType;
    agreePrivacyPolicy: DefaultFieldType<boolean>;
  };
};

export interface ConsultationType extends FormDataType {
  hasChanges: boolean,
  data: {
    selectedProfile: 'myself' | 'family';
    family: {
      firstName: DefaultFieldType;
      middleName: DefaultFieldType;
      lastName: DefaultFieldType;
      relationship: DefaultFieldType;
      birthDate: DefaultFieldType<Date>;
      gender: DefaultFieldType;
    };
    firstName: DefaultFieldType;
    middleName: DefaultFieldType;
    lastName: DefaultFieldType;
    email: DefaultFieldType;
    phoneNumber: DefaultFieldType;
    symptoms: DefaultFieldType<string[]>;
    thermometer: DefaultFieldType;
    temperature: DefaultFieldType;
    temperatureLocation: DefaultFieldType;
    traveled: DefaultFieldType;
    travelLocation: DefaultFieldType;
    modeOfTransport: DefaultFieldType;
    booking: DefaultFieldType<string | number>;
    personalInformation: {
      birthDate: DefaultFieldType<Date>;
      gender: DefaultFieldType;
      race: DefaultFieldType;
      ethnicity: DefaultFieldType;
    };
    insuranceInformation: {
      myInsurance: DefaultFieldType;
      haveInsurance:  DefaultFieldType;
      isPrimaryInsuranceMember:  DefaultFieldType;
      insuranceCompany:  DefaultFieldType;
      subscriberMemberID:  DefaultFieldType;
      groupNumber:  DefaultFieldType;
      insuranceIDImage:  {
        front: DefaultFieldType<FileType>;
        back: DefaultFieldType<FileType>;
      };
    };
    address: {
      myAddress: DefaultFieldType;
      homeAddress: DefaultFieldType;
      apartmentSuiteOffice: DefaultFieldType;
      city: DefaultFieldType;
      state: DefaultFieldType;
      zip: DefaultFieldType;
    };
  };
};

export interface PersonalType extends FormDataType {
  action: 'view' | 'edit';
  data: {
    profileImage: DefaultFieldType<FileType>;
    firstName: DefaultFieldType;
    middleName: DefaultFieldType;
    lastName: DefaultFieldType;
    email: DefaultFieldType & { visible: boolean; };
    phoneNumber: DefaultFieldType & { visible: boolean; };
    birthDate: DefaultFieldType<Date> & { visible: boolean; };
    gender: DefaultFieldType;
    race: DefaultFieldType;
    ethnicity: DefaultFieldType;
  };
};

export interface InsuranceCreationType extends FormDataType {
  data: {
    isPrimary: DefaultFieldType<boolean>;
    isPrimaryInsuranceMember:  DefaultFieldType;
    insuranceCompany:  DefaultFieldType;
    subscriberMemberID:  DefaultFieldType;
    groupNumber:  DefaultFieldType;
    insuranceIDImage:  {
      front: DefaultFieldType<FileType>;
      back: DefaultFieldType<FileType>;
    };
  };
};

export interface AddressCreationType extends FormDataType {
  data: {
    isPrimary: DefaultFieldType<boolean>;
    homeAddress: DefaultFieldType;
    apartmentSuiteOffice: DefaultFieldType;
    city: DefaultFieldType;
    state: DefaultFieldType;
    zip: DefaultFieldType;
  };
};

export interface MedicalAllergiesType extends FormDataType {
  action: 'view' | 'edit';
  data: {
    foodAllergies: DefaultFieldType<string[]>;
    otherAllergies: DefaultFieldType;
  };
};

export interface MedicalConditionsType extends FormDataType {
  action: 'view' | 'edit';
  data: {
    conditions: { value: { name: string; year: string | number; remarks: string; }[] };
  };
};

export interface DiagnosticsCreationType extends FormDataType {
  data: {
    laboratory: DefaultFieldType;
    date: DefaultFieldType<Date>;
    requestFor: DefaultFieldType;
    requestBy: DefaultFieldType;
    findings: DefaultFieldType;
    files: DefaultFieldType<FileType>;
  };
};

export interface CareerFormType extends FormDataType {
  hasChanges: boolean,
  data: {
    firstName: DefaultFieldType;
    middleName: DefaultFieldType;
    lastName: DefaultFieldType;
    resumeCV: DefaultFieldType<FileType>;
    coverLetter: DefaultFieldType<FileType>;
    medicalSpecialization: DefaultFieldType;
    primaryResidence: DefaultFieldType;
    email: DefaultFieldType;
    phoneNumber: DefaultFieldType;
    haveAnActiveStateLicense: DefaultFieldType;
    haveAnActiveFederalDEACertificateNumber: DefaultFieldType;
    haveBoardCertifiedByABMSOrAOA: DefaultFieldType;
    educationAndExperience: DefaultFieldType;
    haveMoreThanOneOpenMalPracticeClaim: DefaultFieldType;
    haveOpenLicensingBoardComplaints: DefaultFieldType;
    currentlyMedicaidProvider: DefaultFieldType;
    npiNumber: DefaultFieldType;
    preferredWorkArrangement: DefaultFieldType;
    subjectToAnActiveEmployer: DefaultFieldType;
    gender: DefaultFieldType;
    race: DefaultFieldType;
    ethnicity: DefaultFieldType;
    disabilities: DefaultFieldType;
    ableToPerformAllFunctions: DefaultFieldType;
    howDidYouLearn: DefaultFieldType;
    agreePrivacyPolicy: DefaultFieldType<boolean>;
  };
};