export default () => {
  const genderList = [
    { title: 'Male (M)', value: 'Male (M)' },
    { title: 'Female (F)', value: 'Female (F)' },
    { title: 'Unspecified (U)', value: 'Unspecified (U)' },
    { title: 'Undisclosed (X)', value: 'Undisclosed (X)' },
    { title: 'Prefer not to answer', value: 'Prefer not to answer' }
  ];

  const relationshipList = [
    { title: 'Daughter', value: 'Daughter' },
    { title: 'Son', value: 'Son' },
    { title: 'Domestic Partner', value: 'Domestic Partner' },
    { title: 'Husband', value: 'Husband' },
    { title: 'Wife', value: 'Wife' },
    { title: 'Parent', value: 'Parent' },
    { title: 'Other', value: 'Other' }
  ];

  const raceList = [
    { title: 'American Indian and Alaskan Native', value: 'American Indian and Alaskan Native' },
    { title: 'Asian', value: 'Asian' },
    { title: 'Black or African American', value: 'Black or African American' },
    { title: 'Native Hawaiian and other Pacific Islander', value: 'Native Hawaiian and other Pacific Islander' },
    { title: 'Two or more races', value: 'Two or more races' },
    { title: 'White', value: 'White' },
    { title: 'Other', value: 'Other' },
    { title: 'Prefer not to answer', value: 'Prefer not to answer' },
    { title: 'Unknown', value: 'Unknown' }
  ];

  const ethnicityList = [
    { title: 'Hispanic or Latino', value: 'Hispanic or Latino' },
    { title: 'Not Hispanic or Latino', value: 'Not Hispanic or Latino' },
    { title: 'Other', value: 'Other' },
    { title: 'Prefer not to answer', value: 'Prefer not to answer' },
    { title: 'Unknown', value: 'Unknown' }
  ];

  const transportList = [
    { title: 'Private Car', value: 'Private Car' },
    { title: 'Motor Bike', value: 'Motor Bike' },
    { title: 'Bus', value: 'Bus' },
    { title: 'Train', value: 'Train' },
    { title: 'Flight', value: 'Flight' },
    { title: 'Ship', value: 'Ship' },
    { title: 'Other', value: 'Other' }
  ];

  const temperatureLocationList = [
    { title: 'Forehead', value: 'Forehead' },
    { title: 'Mouth', value: 'Mouth' },
    { title: 'Ear', value: 'Ear' },
    { title: 'Armpit', value: 'Armpit' },
    { title: 'Rectum', value: 'Rectum' }
  ];
  
  return {
    genderList,
    relationshipList,
    raceList,
    ethnicityList,
    transportList,
    temperatureLocationList
  };
};