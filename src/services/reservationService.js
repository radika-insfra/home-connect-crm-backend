const validateStatusTransition = require('../middlewares/validations/transitionValidator');
const { Reservation, LeadDetails, Lead } = require('../models');

const create = async (
  leadId,
  reservationFee,
  reservationDate,
  expectedClosingDate,
  propertyId,
  userId
) => {
  // 1. Check if the lead exists and is assigned to this sales agent
  const lead = await Lead.findOne({
    where: {
      id: leadId,
      assigned_sales_agent_id: userId,
    },
    include: [{ model: LeadDetails, as: 'lead_details' }],
  });

  if (!lead) {
    throw new Error('Lead not found or not assigned to you');
  }

  // Validate the transition state
  const statusValidationResult = validateStatusTransition(
    lead.status,
    'assigned'
  );

  // If status transition is invalid, throw an error with the validation message
  if (statusValidationResult !== true) {
    throw new Error(statusValidationResult);
  }

  // 2. Check if this lead already has a reservation
  const existingReservation = await Reservation.findOne({
    where: { lead_details_id: lead.lead_details.id, is_cancelled: false },
  });

  if (existingReservation) {
    throw new Error('A reservation already exists for this lead');
  }

  // 3. Create the reservation
  const newReservation = await Reservation.create({
    reservation_fee: reservationFee,
    reservation_date: reservationDate,
    expected_closing: expectedClosingDate,
    lead_details_id: lead.lead_details.id,
    property_id: propertyId,
  });

  // 4. Update lead status to "reservation"
  await lead.update({ status: 'reservation' });

  return newReservation;
};

module.exports = {
  create,
};
