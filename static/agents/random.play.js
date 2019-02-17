const RandomPlay = (function() {
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    ({API, N, Util} = {
      API: require('../api'),
      N: require('../nial'),
      Util: require('../util'),  
    }); 
  }

  const discrete = async (env, maxEpisodes, render) => {
    const {instanceId, actionSpace, maxSteps} = env;
    let maxReward = -Infinity;
    for (const epNo of N.ints(maxEpisodes)) {
      let epReward = 0, observation, reward, done;
      observation = await API.environmentReset(instanceId);
      for (const stepNo of N.ints(maxSteps)) {
        let action = Util.randomInt(0, actionSpace.n);
        ({observation, reward, done} =
          await Util.stepResponse(instanceId, action, render));
        epReward += reward;
        if (done) break;
      }
      if (epReward > maxReward) {
        maxReward =  epReward;
      }
    }
    return {maxReward};
  };

  return {discrete};

})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = RandomPlay;
}