process.env.TZ = "America/New_York";

module.exports = {
  testEnvironment: "node",
  transform: {
    // use babel-jest over ts-jest since next.js uses babel for transpilation
    "^.+\\.tsx?$": "babel-jest",
  },
};
