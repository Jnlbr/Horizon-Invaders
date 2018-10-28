module.exports = (event) => {
  const EVENTS = ['left', 'right', 'up', 'down', 'fire', 'use', 'start'];
  
  return EVENTS.some(evt => {
    return evt == event;
  })
}