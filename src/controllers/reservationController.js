const reservationService = require('../services/reservationService');

const createReservation = async (req, res) => {
  try {
    const { leadId } = req.params;
    const {
      reservation_fee: reservationFee,
      reservation_date: reservationDate,
      expected_closing_date: expectedClosingDate,
      property_id: propertyId,
    } = req.body;
    const userId = req.user.id;

    const reservation = await reservationService.create(
      leadId,
      reservationFee,
      reservationDate,
      expectedClosingDate,
      propertyId,
      userId
    );

    res
      .status(201)
      .json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createReservation,
};
