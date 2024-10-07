<template>
  <v-container id="doctor" class="bg-tertiary-background fill-height align-start py-10" fluid>
    <v-row class="max-width ma-0">
      <v-col class="pt-0 pb-3 px-3" cols="12">
        <v-btn class="text-primary" rounded="lg" size="large" prepend-icon="mdi-arrow-left" :to="{ path: '/find-a-doctor' }">Back</v-btn>
      </v-col>

      <v-col class="text-left" cols="12">
        <v-card class="d-flex flex-column align-start fill-height text-left" rounded="lg" color="primary-background">
          <v-container class="pa-0" fluid>
            <v-row class="ma-0">
              <v-col class="pa-0" md="9" cols="12">
                <v-container class="pa-0" fluid>
                  <v-row class="ma-0">
                    <v-col class="pa-0" cols="12">
                      <v-container class="pa-10 pr-md-0" fluid>
                        <v-row class="ma-0" align="center">
                          <v-col class="d-flex justify-center pa-0 pr-sm-7" sm="auto" md="auto" cols="12">
                            <v-avatar v-if="(doctorDetails?.image)" size="200">
                              <v-img loading="lazy" :src="doctorDetails.image" :lazy-src="doctorDetails.image" :alt="doctorDetails.name" />
                            </v-avatar>
                            <v-avatar v-else size="200" color="secondary-background">
                              <v-icon icon="mdi-doctor" color="secondary-text-color" size="150" />
                            </v-avatar>
                          </v-col>

                          <v-col class="pa-0 pt-7 pt-sm-0 pr-sm-7" sm="auto" md="auto" cols="12">
                            <v-card-title tag="h1" class="text-h4 font-weight-bold text-primary pa-0 pl-1 pb-3">{{ doctorDetails.name }}</v-card-title>
                            <v-card-text class="text-primary-text-color text-body-1 pa-0 pl-1 pb-2">{{ doctorDetails.specialization }}</v-card-text>
                            <v-card-text class="d-flex align-center flex-wrap text-primary-text-color pa-0 pb-1">
                              <v-rating :model-value="doctorDetails.ratingTotal" color="yellow-darken-3" density="compact" half-increments readonly />
                              <span class="pt-1 px-1">{{ `${doctorDetails.ratingTotal} ${(doctorDetails.ratingTotal <= 1) ? 'star' : 'stars'}` }} &lpar;{{ `${doctorDetails.reviewTotal}&nbsp;${(doctorDetails.reviewTotal <= 1) ? 'review' : 'reviews'}` }}&rpar;</span>
                            </v-card-text>
                            <!-- <NuxtLink class="link-to text-primary text-body-2 pa-0 pl-1">See all reviews</NuxtLink> -->
                          </v-col>

                          <v-spacer />

                          <v-col class="pa-0 pt-7 pt-lg-0" sm="auto" md="auto" cols="12" align-self="start">
                            <!-- <v-btn class="d-flex d-sm-inline-flex mx-auto ml-sm-0 mr-sm-4 mb-4 text-primary" append-icon="mdi-email" size="large" rounded="lg">Email</v-btn> -->
                            <v-btn class="d-flex d-sm-inline-flex mx-auto mx-sm-0 mb-4" append-icon="mdi-headset" size="large" rounded="lg" color="primary">Connect Now</v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>

                    <v-col class="pa-0" cols="12">
                      <v-card-text class="text-primary-text-color pa-10 pr-md-0 pt-0 pb-5">
                        <p class="text-body-1 text-primary font-weight-bold pb-4">About Me</p>
                        <p v-for="(paragraph, index) in doctorDetails.bio.split('\n')" :key="`paragraph-${index}`" class="text-body-2 pb-4">{{ String(paragraph).trim() }}</p>
                      </v-card-text>

                      <v-card-text class="text-primary-text-color pa-10 pr-md-0 pt-0">
                        <v-container class="pa-0" fluid>
                          <v-row class="ma-0">
                            <v-col v-for="(value, name) in doctorDetails.info" :key="`info-${name}`" class="px-0 pr-sm-7 pr-lg-0" sm="6" md="4" lg="3" cols="12">
                              <p class="text-body-1 text-primary text-capitalize font-weight-bold pb-3">{{ String(name).replace(/-/g, ' ') }}</p>
                              <p class="text-body-2">{{ value }}</p>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>

              <v-col class="pa-0" md="3" cols="12" align-self="start">
                <v-card-text class="text-body-1 text-primary font-weight-bold pa-0 pt-md-10 px-10">Availability</v-card-text>
                <v-container class="pa-0 px-6" fluid>
                  <v-row class="ma-0 pt-1 pb-10 px-2">
                    <v-col v-for="(value, index) in doctorDetails.availability" :key="`availability-${index}`" class="pa-2" sm="3" md="12" lg="12" cols="12">
                      <p :class="`text-caption font-weight-medium text-uppercase text-center rounded-lg elevation-2 pa-1 ${(getDayNow() === value.day) ? 'text-white bg-primary' : 'text-primary bg-tertiary-background'}`">{{ value.day }}</p>
                      <p v-for="(schedule, index) in value.schedules" :key="`schedule-${index}`" class="text-body-2 text-black text-center pt-2">{{ schedule }}</p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>

              <v-divider class="mx-10" />

              <v-col class="pa-0" cols="12">
                <v-container class="pa-10" fluid>
                  <v-row class="ma-0">
                    <v-col class="flex-grow-1 pa-0" md="auto" cols="12">
                      <v-card-text tag="h2" class="text-h6 text-primary font-weight-bold px-0 pl-1 pt-0 pb-3">Patient Reviews</v-card-text>
                      <v-card-text class="text-body-2 text-primary-text-color px-0 pl-1 pt-0 pb-2">Overall satisfaction</v-card-text>
                      <v-card-text class="d-flex align-center flex-wrap text-primary-text-color pa-0 pb-5">
                        <v-rating :model-value="doctorDetails.ratingTotal" color="yellow-darken-3" density="compact" half-increments readonly />
                        <span class="pt-1 px-1">{{ `${doctorDetails.ratingTotal} ${(doctorDetails.ratingTotal <= 1) ? 'star' : 'stars'}` }}</span>
                      </v-card-text>
                    </v-col>
                    
                    <v-col class="flex-grow-1 pa-0" md="auto" cols="12">
                      <v-card-text v-for="(value) in getRatings" :key="`rating-${value.star}`" class="d-flex align-center text-primary-text-color font-weight-bold px-0 pt-0 pb-2">
                        <span class="star text-body-1 text-center mx-1">{{ value.star }}</span>
                        <v-icon class="mr-2" icon="mdi-star" />
                        <v-progress-linear :model-value="value.percent" color="primary" max="100" rounded="lg" height="10" location="left top" />
                        <span class="count text-body-1 text-center ml-1">{{ value.count }}</span>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>

              <v-col class="pa-0" cols="12">
                <v-container class="px-10 py-0" fluid>
                  <v-row class="ma-0">
                    <v-col v-for="(value, index) in doctorDetails.reviews" :key="`review-${index}`" class="px-0 pt-0 pb-10" cols="12">
                      <v-container class="pa-0" fluid>
                        <v-row class="ma-0">
                          <v-col class="pa-0" md="10" cols="12">
                            <v-card-text class="text-body-1 text-primary-text-color font-weight-bold px-0 pl-1 pt-0 pb-3">{{ value.name }}</v-card-text>
                            <v-card-text class="text-body-2 text-primary-text-color px-0 pl-1 pt-0 pb-2">{{ value.review }}</v-card-text>
                            <v-card-text class="text-caption text-tertiary-text-color px-0 pl-1 pt-0 pb-2">{{ getTimeline(value.date) }}</v-card-text>
                          </v-col>
                          
                          <v-col class="d-flex justify-end pa-0 pl-4" md="2" cols="12">
                            <v-rating :model-value="value.rating" color="yellow-darken-3" density="compact" half-increments readonly />
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import doctorPhoto from '@/public/images/common/doctor-photo.png';

  // Special Data
  const { getDayNow, getTimeline } = useDate();

  // Data
  const doctorDetails = {
    id: '1',
    image: doctorPhoto,
    name: 'Dr. Lisa Parker',
    specialization: 'Geriatrician',
    ratingTotal: 5,
    reviewTotal: 1,
    ratings: [
      { star: '5', count: 1 },
      { star: '4', count: 0 },
      { star: '3', count: 0 },
      { star: '2', count: 0 },
      { star: '1', count: 0 }
    ],
    reviews: [
      { name: 'John Smith', review: 'Dr. Lisa Parker was very knowledgeable and took the time to explain everything to me in detail. I would definitely recommend him to anyone looking for a great doctor.', date: '2024/01/01', rating: 5 }
    ],
    bio: `Dr. Lisa Parker is a highly skilled geriatrician with a passion for improving the health and quality of life of elderly patients. With 5 years of experience in the field, Dr. Parker is known for her compassionate care and her commitment to helping her patients maintain their independence and dignity.
          Dr. Parker earned her Doctor of Medicine degree from the University of Michigan Medical School, where she graduated with honors. She completed her residency in internal medicine at Brigham and Women's Hospital in Boston, Massachusetts, where she gained extensive experience in the care of older adults. Dr. Parker then went on to complete a fellowship in geriatric medicine at the Johns Hopkins University School of Medicine in Baltimore, Maryland, where she further honed her skills in the care of elderly patients.
          Throughout her career, Dr. Parker has been committed to advancing the field of geriatric medicine through research and education. She has published numerous articles in leading medical journals, and has presented her research at national and international conferences. In addition, she has served as a mentor to medical students and residents, helping to inspire and guide the next generation of physicians.
          When she is not working, Dr. Parker enjoys hiking, cooking, and spending time with her family. She is also an avid traveler, and has visited countries all around the world, gaining a deep appreciation for the diverse cultures and customs of different regions.`,
    info: {
      'licensed-to-practice': 'New York, California',
      'hospital-affiliations': 'NY Presbyterian Hospital',
      'languages-spoken': 'English, Spanish',
      'board-certifications': 'Geriatrics',
      'practice-name': 'City Choice Medical',
      'years-of-experience': '5',
      'professional-memberships': 'Geriatrics and Medicine Associates'
    },
    availability: [
      { day: 'monday', schedules: [ '09:00 AM - 12:00PM' ] },
      { day: 'tuesday', schedules: [ '09:00 AM - 12:00PM', '01:00 PM - 04:00 PM' ] },
      { day: 'friday', schedules: [ '09:00 AM - 12:00PM', '01:00 PM - 04:00 PM' ] },
      { day: 'saturday', schedules: [ '09:00 AM - 12:00PM' ] }
    ]
  };

  // Computed
  const getRatings = computed(() => {
    const totalCount = doctorDetails.ratings.reduce((total, currentValue) => (total + currentValue.count), 0);
    const totalRatings = doctorDetails.ratings.map((currentValue) => ({ ...currentValue, percent: ((currentValue.count / totalCount) * 100) }), []);
    return totalRatings;
  });

  useSeoMeta({ title: doctorDetails.name });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #doctor {
    .star {
      width: 20px;
    }

    .count {
      width: 35px;
    }
  }
</style>