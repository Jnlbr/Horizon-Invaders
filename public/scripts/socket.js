const socket = io('http://localhost:3000')

socket.on('start', () => {
  if(!teclado.enter) {
    teclado.enter = true
  }
});
socket.on('right', (ins) => {
  const { press } = ins;
  if(teclado.enter) {
    teclado.right = press;
  }
});
socket.on('left', (ins) => {
  const { press } = ins;
  if(teclado.enter) {
    teclado.left = press;
  }
});
socket.on('down', (ins) => {
  const { press } = ins;
  if(teclado.enter) {
    teclado.down = press;
  }
});
socket.on('up', (ins) => {
  const { press } = ins;
  if(teclado.enter) {
    teclado.up = press;
  }
});
socket.on('fire', () => {
  if(teclado.enter) {
    teclado.shoot = true;
  }
});
socket.on('use', () => {
  if(teclado.enter) {
    teclado.use = true;
  }
});