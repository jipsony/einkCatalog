
const sortByNumericAttribute = (defJson, attribute) => {
    return defJson?.toSorted((a, b) => {
      const compare = parseFloat(a?.[attribute]) > parseFloat(b?.[attribute]);
      if (compare) return 1;
      else return -1;
    });
  };

  const sortByDate = (defJson, attribute) => {
    return defJson
      ?.toSorted((a, b) => {
        const compare = a?.[attribute] > b?.[attribute];
        if (compare) return 1;
        else return -1;
      });
  };

  const sortOptions = {
    latest: {
      label: "Release",
      labelChoice: "Latest",
      sortingAdjective: "Latest",
      sortFunction: (defJson) => {
        return sortByDate(defJson, "releaseDate").toReversed();
      },
    },
    oldest: {
      label: "Release",
      labelChoice: "Oldest",
      sortFunction: (defJson) => {
        return sortByDate(defJson, "releaseDate");
      },
    },
    mostExpensive: {
      label: "Price",
      labelChoice: "Highest",
      sortFunction: (defJson) => {
        return sortByNumericAttribute(
          defJson,
          "price"
        ).toReversed();
      },
    },
    cheapest: {
      label: "Price",
      labelChoice: "Lowest",
      sortFunction: (defJson) => {
        return sortByNumericAttribute(defJson, "price");
      },
    },
    highestRated: {
      label: "Rating",
      labelChoice: "Highest",
      sortingAdjective: "Highest Rated",

      sortFunction: (defJson) => {
        return sortByNumericAttribute(defJson, "rating").toReversed();
      },
    },
  };

  export {sortByDate,sortByNumericAttribute,sortOptions}