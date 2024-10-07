import AllergyImmunology from '@/public/images/common/specialization/allergy-immunology.svg';
import Cardiology from '@/public/images/common/specialization/cardiology.svg';
import Dermatology from '@/public/images/common/specialization/dermatology.svg';
import Endocrinology from '@/public/images/common/specialization/endocrinology.svg';
import Gastroenterology from '@/public/images/common/specialization/gastroenterology.svg';
import Geriatrics from '@/public/images/common/specialization/geriatrics.svg';
import Gynecology from '@/public/images/common/specialization/gynecology.svg';
import Hepatology from '@/public/images/common/specialization/hepatology.svg';
import Neurology from '@/public/images/common/specialization/neurology.svg';
import Obstetrics from '@/public/images/common/specialization/obstetrics.svg';
import Oncology from '@/public/images/common/specialization/oncology.svg';
import Optometry from '@/public/images/common/specialization/optometry.svg';
import Otology from '@/public/images/common/specialization/otology.svg';
import Pathology from '@/public/images/common/specialization/pathology.svg';
import Pediatrics from '@/public/images/common/specialization/pediatrics.svg';
import PrimaryCare from '@/public/images/common/specialization/primary-care.svg';
import Psychiatry from '@/public/images/common/specialization/psychiatry.svg';
import Pulmonology from '@/public/images/common/specialization/pulmonology.svg';
import Urology from '@/public/images/common/specialization/urology.svg';

export default () => {
  const iconsList = {
    AllergyImmunology,
    Cardiology,
    Dermatology,
    Endocrinology,
    Gastroenterology,
    Geriatrics,
    Gynecology,
    Hepatology,
    Neurology,
    Obstetrics,
    Oncology,
    Optometry,
    Otology,
    Pathology,
    Pediatrics,
    PrimaryCare,
    Psychiatry,
    Pulmonology,
    Urology
  };
  
  const getIcon = (name: string) => {
    return iconsList?.[name as keyof typeof iconsList] ?? null;
  };

  return { getIcon };
};