export default () => {
  const getDay = (date?: Date | null) => {
    if (date) {
      const weekdayList = [ 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday' ];
      return weekdayList[date.getUTCDay()] || null;
    } else {
      return null;
    }
  };
  
  const getDayNow = () => getDay(new Date());

  const getFullDate = (date: string) => ((!isNaN(Date.parse(date))) ? new Date(`${date} UTC`).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric', timeZone: 'UTC' }) : null); // Valid Date String Format yyyy/MM/dd

  const getFullDateAndTime = (date: string) => { // Valid Date String Format yyyy/MM/dd
    const parsedDate = Date.parse(date);
    if (!isNaN(parsedDate)) {
        const inputDate = new Date(`${date} UTC`);
        const currentDate = new Date();
        if (inputDate.toISOString()?.split('T')?.[0] === currentDate.toISOString()?.split('T')?.[0]) {
          // If it's today, return only time
          return inputDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' });
        } else {
          // If it's not today, return date and time
          return inputDate.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'UTC' });
        }
    } else {
      return null;
    }
  };

  const getTimeline = (date: string) => { // Valid Date String Format yyyy/MM/dd
    if (!isNaN(Date.parse(date))) {
      const theDate = new Date(date);
      const now = new Date();
      const diff = now.getTime() - theDate.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);
      if (seconds < 60) {
        return 'Just Now';
      } else if (minutes === 1) {
        return 'A Minute Ago';
      } else if (minutes < 60) {
        return `${minutes} Minutes Ago`;
      } else if (hours === 1) {
        return 'An Hour Ago';
      } else if (hours < 24) {
        return `${hours} Hours Ago`;
      } else if (days === 1) {
        return 'Yesterday';
      } else if (days < 30) {
        return `${days} Days Ago`;
      } else if (months === 1) {
        return 'A Month Ago';
      } else if (months < 12) {
        return `${months} Months Ago`;
      } else if (years === 1) {
        return 'A Year Ago';
      } else {
        return `${years} Years Ago`;
      }
    } else {
      return null;
    }
  };

  const calculateAge = (date?: Date | null) => {
    if (date) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const birthYear = date.getFullYear();
      let age = currentYear - birthYear;
      // Check if the date has occurred this year or not
      if (currentDate < new Date(currentYear, date.getMonth(), date.getDate())) {
        age--;
      }
      return age;
    } else {
      return null;
    }
  };

  return { getDay, getDayNow, getFullDate, getFullDateAndTime, getTimeline, calculateAge };
};