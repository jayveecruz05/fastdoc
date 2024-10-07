export default () => {
  return {
    maskEmail: (email: string) => {
      if (email && typeof email === 'string') {
        const [localPart, domain] = email.split('@');
        return `${localPart[0]}${'*'.repeat(Math.max(localPart.length - 2, 0))}${localPart.slice(-1)}@${domain}`;
      } else {
        return email;
      }
    },
    maskPhoneNumber: (phoneNumber: string) => ((phoneNumber && typeof phoneNumber === 'string') ? phoneNumber.replace(/\D/g, '').replace(/.(?=.{4})/g, '*') : phoneNumber),
    formatPhoneNumber: (phoneNumber: string | null | undefined) => {
      if (typeof phoneNumber !== 'string') { return phoneNumber; }
      const input = phoneNumber.replace(/\D/g, '').substring(0, 12); // Keep only numbers and limit to 12 digits
      const formattedPhoneNumber = ((input.length > 0) ? `+${input}` : ''); // Ex. +744284879652
      // const formattedPhoneNumber = ( // Ex. (203) 535-3334
      //   input.length > 6 ? `(${input.substring(0, 3)}) ${input.substring(3, 6)}-${input.substring(6, 10)}`
      //     : input.length > 3 ? `(${input.substring(0, 3)}) ${input.substring(3, 6)}`
      //       : input.length > 0 ? `(${input.substring(0, 3)}`
      //         : ''
      // );
      return formattedPhoneNumber;
    }
  };
};