// Check if the section contains only numbers
export default function levels(listings) {
  // Create an array to store unique section names
  const uniqueSections = [];

  // Iterate through each listing to find unique sections
  listings.forEach((listing) => {
    const sectionName = listing.sectionName;

    // Check if the sectionName is not a duplicate
    if (!uniqueSections.includes(sectionName)) {
      uniqueSections.push(sectionName);
    }
  });

  // Iterate through each unique section to determine the level and assign it to the corresponding listing
  uniqueSections.forEach((uniqueSection) => {
    const matchingListings = listings.filter((listing) => listing.sectionName === uniqueSection);

    if (matchingListings.length > 0) {
      const hasOnlyNumbers = /^\d+$/.test(uniqueSection);
      const hasDigitsFollowedByString = /^\d+\D*$/.test(uniqueSection);
      const hasStringFollowedByDigits = /[a-zA-Z]+\s*\d+/.test(uniqueSection);

      let level;

      if (hasOnlyNumbers || hasDigitsFollowedByString) {
        const digitsOnly = uniqueSection.replace(/\D/g, '');
        const toString = digitsOnly.toString();
        let firstChar = toString.charAt(0);
        let numCharacters = toString.length;

        if (firstChar === '0') {
          firstChar = toString.charAt(1);
          numCharacters -= 1;
          if (firstChar === '0') {
            firstChar = toString.charAt(2);
            numCharacters -= 2;
          }
        }

        // Determine the level based on the first character and number of characters
        if (numCharacters <= 1) {
          level = '1s ' + uniqueSection.replace(/^\d+/, '');
        } else {
          level =
            firstChar.replace(/^0+/, '') +
            '0'.repeat(numCharacters - 1) +
            uniqueSection.replace(/^\d+/, '') +
            "s";
        }
      } else if (hasStringFollowedByDigits) {
        const number = uniqueSection.replace(/\D/g, '');
        const string = uniqueSection.replace(/[0-9]/g, '');
        let numCharacters = number.length;
        let firstChar = number.toString().charAt(0);

        if (firstChar === '0') {
          firstChar = number.toString().charAt(1);
          numCharacters -= 1;
          if (firstChar === '0') {
            firstChar = number.toString().charAt(2);
            numCharacters -= 2;
          }
        }

        // Determine the level based on the three characters and number length
        if (numCharacters <= 1) {
          level = string + ' 1s';
        } else {
          level =
            string + ' ' + firstChar + '0'.repeat(numCharacters - 1) + 's';
        }
      } else {
        // Handle the case when the section contains only a string
        // Check if there are any sections with the same first 3 characters
        const firstThreeChars = uniqueSection.substring(0, 3);
        const matchingStringSections = uniqueSections.filter(
          (section) => section.substring(0, 3) === firstThreeChars
        );

        // Determine the level based on the matching string sections
        if (matchingStringSections.length > 0) {
          level = uniqueSection.substring(0, 5);
        } else {
          // Section is unique
          level = uniqueSection;
        }
      }

      // Assign the determined level to each matching listing
      matchingListings.forEach((matchingListing) => {
        matchingListing.level = level;
      });
    }
  });

  return listings;
}