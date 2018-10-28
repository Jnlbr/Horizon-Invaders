module.exports = (event) => {
  const EVENTS = ['left', 'right', 'up', 'down', 'shot', 'use', 'start'];
  
  return EVENTS.some(evt => {
    return evt == event;
  })
}