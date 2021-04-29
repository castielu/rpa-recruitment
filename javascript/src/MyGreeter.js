'use strict'

function defaultTimeProvider(){
  return new Date();
}

const TEXT_RESOURCE = {
  TEXT_GOOD_MORNING: 'Good morning',
  TEXT_GOOD_AFTERNOON: 'Good afternoon',
  TEXT_GOOD_EVENING: 'Good evening',
}

class Client {
  /**
   *
   * @param dtProvider a datetime provider, refer to defaultTimeProvider.
   */
  constructor(dtProvider) {
    this.dtProvider = (dtProvider || defaultTimeProvider);
  }

  /**
   * get a greeting message according to the dtProvider, the default provider gives
   * current local time
   * @returns {string}
   */
  getGreeting(){
    const now = this.dtProvider();

    // return greetings according to current time.
    let result = '';
    const hour = now.getHours()
    if (hour >= 6 && hour < 12){
      // TODO: in production, try improving this part with an interface supporting i18n.
      // we'd better NOT do the rendering in logic level.
      result = TEXT_RESOURCE.TEXT_GOOD_MORNING;
    }else if (hour >= 12 && hour <18){
      result = TEXT_RESOURCE.TEXT_GOOD_AFTERNOON;
    }else{
      result = TEXT_RESOURCE.TEXT_GOOD_EVENING;
    }
    return result;
  }
}

const MyGreeter = {
  Client,
}

module.exports = MyGreeter;