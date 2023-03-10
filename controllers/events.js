const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  if(req.method === 'OPTIONS') {
    res.status(200)
  }
  return res.status(200).json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventDB = await event.save();
    
    res.json({
      ok: true,
      events: eventDB,
    });
    
    if(req.method === 'OPTIONS'){
        res.status(200)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
  
};

const updateEvent = async (req, res = response) => {
  const eventId = req.params.id
  const uid = req.uid

  try {
    const event =  await Event.findById( eventId)


    if(!event){
        return res.status(404).json({
            ok: false,
            msg: 'Evento no existe por ese id'
        })
    }

    if(event.user.toString() !== uid){
        return res.status(401).json({
            ok: false,
            msg: 'No tiene privilegio de editar este evento'
        })
    }

    const newEvent = {
        ...req.body,
        user: uid
    }

    const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent,{new: true})
    res.json({
        ok: true,
        event: eventUpdate
    })
    
    if(req.method === 'OPTIONS'){
      res.status(200)
    }

  } catch (error) {
    console.log(error);
  }
};

const deleteEvent = async(req, res = response) => {

    const eventId = req.params.id
    console.log(eventId);
    const uid = req.uid
  
    try {

      const event =  await Event.findById( eventId)
      console.log(event);
      if(!event){
          return res.status(404).json({
              ok: false,
              msg: 'Evento no existe por ese id'
          })
      }
  
      if(event.user.toString() !== uid){
          return res.status(401).json({
              ok: false,
              msg: 'No tiene privilegio de editar este evento'
          })
      }
  
      
      await Event.findByIdAndDelete(eventId)

      res.json({
          ok: true,
          event: 'borrado'
      })

      if(req.method === 'OPTIONS'){
        res.status(200)
      }
  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    };
}
module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
