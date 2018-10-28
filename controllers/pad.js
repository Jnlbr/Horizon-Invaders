module.exports = (req,res) => {
  console.log(req.params)
  const { event } = req.body;
  switch(event.toUpperCase()) {
    case 'LEFT': {

    }
    case 'RIGHT': {
      console.log('some one press right')
    }
    case 'TOP': {

    }
    case 'DOWN': {

    }
    case 'SHOT': {

    }
    case 'USE': {

    }
    case 'ENTER': {

    }
  }
}