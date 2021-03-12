const SpecialReservationsService = require('../services/specialReservations.service');
const specialResService = new SpecialReservationsService();

// Validations
const boom = require('@hapi/boom');

/*
    Controller
*/

class SpecialReservationsController{
  allSpecialReservations = async(req, res, next) => {
    try {
      const lab = req.query.lab || 'all';
      const trim = req.query.trim || 'all';
      const specialReservations = await specialResService.getAll(lab, trim);

      if (specialReservations.rows.length){
        return res.status(200).send(specialReservations.rows);
      } else{
        return res.status(200).send([]);
      }
    } catch (error) {
        res.status(400).json({ error: 'Query params incorrectos'});
    }
  }

  specialReservationsById = async(req, res, next) => {
    try {
      const id = req.params.id;
      const specialReservation = await specialResService.getById(id);

      if (specialReservation.rows.length){
        return res.status(200).send(specialReservation.rows[0]);
      } else{
        return res.status(400).send({ error: 'ID incorrecto' });
      }
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error en servidor'});
    }
  }

  createSpecialReservation = async(req, res, next) => {
    try {
      const userId = req.params.userId;
      const { laboratory, contact_name, contact_email, reservation_day, reservation_hour, amount_people, observations } = req.body;
      await specialResService.create(userId,laboratory,contact_name,contact_email,reservation_day,reservation_hour,amount_people,observations).then( () => {
        return res.status(201).json({ message: `Reservación especial para ${userId} creada.`});
      }).catch((err) => {
        throw err
      });
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error en servidor'});
    }
  }

  deleteSpecialReservation = async(req, res, next) => {
    try {
      const id = req.params.id;
      const find = await specialResService.getById(id);
      if (find.rows.length){
        await specialResService.delete(id).then( () => {
          return res.status(202).json({ message: `Reservación especial ${id} eliminada.`});
        }).catch((err) => {
          throw err
        });
      } else{
        return res.status(400).json({ error: 'ID no existe' });
      }
    } catch (error) {
        return res.status(500).json({ error: 'Error en servidor' });
    }
  }
}

module.exports = SpecialReservationsController;