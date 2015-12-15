var Constants = {
  spinCfg: {
    lines: 10,
    length: 12,
    width: 5,
    radius: 15,
    scale: 1,
    corners: 1,
    color: '#000',
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    className: 'spinner',
    top: '50%',
    left: '50%',
    shadow: false,
    hwaccel: false,
    position: 'absolute'
  },
  // Patterns for pagination
  issuesPerPage: {
    1: {
      prevPage: [0, 24]
    },
    2: {
      prevPage: [25, 29],
      page: [0, 19]
    },
    3: {
      prevPage: [20, 29],
      page: [0, 14]
    },
    4: {
      prevPage: [15, 29],
      page: [0, 9]
    },
    5: {
      prevPage: [10, 29],
      page: [0, 4]
    },
    0: {
      prevPage: [5, 29]
    }
  }
};

module.exports = Constants;
