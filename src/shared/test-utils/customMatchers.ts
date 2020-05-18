// import MatchersUtil = jasmine.MatchersUtil;
// import CustomMatcherFactories = jasmine.CustomMatcherFactories;
// import CustomEqualityTester = jasmine.CustomEqualityTester;
// import CustomMatcher = jasmine.CustomMatcher;
// import CustomMatcherResult = jasmine.CustomMatcherResult;

// const customMatchers: CustomMatcherFactories = {
//   toBeWithinRange() {
//     return {
//       compare(actual: number, lowNumber: number, highNumber: number): CustomMatcherResult {
//         if (lowNumber > highNumber) {
//           throw Error('The low number cannot be higher than the high number.');
//         }
//         if (lowNumber <= actual && actual <= highNumber) {
//           return {
//             pass: true,
//             message: 'Number in range'
//           };
//         } else {
//           return {
//             pass: false,
//             message: `Number ${actual} not in range of ${lowNumber} and ${highNumber}`
//           };
//         }
//       }
//     };
//   }

// };

// export { customMatchers };
