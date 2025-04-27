const statusOrder = [
  'unassigned', // Step 1: Lead Unassigned
  'assigned', // Step 2: Lead Assigned
  'reservation', // Step 3: Reservation
  'financial_approve', // Step 4: Financial Approved
  'legal_finalized', // Step 5: Legal Finalized
  'property_sold', // Step 6: Property Sold
];

function validateStatusTransition(currentStatus, expectedStatus) {
  // Check if the current and expected statuses are valid
  if (
    !statusOrder.includes(currentStatus) ||
    !statusOrder.includes(expectedStatus)
  ) {
    throw new Error('Invalid status provided.');
  }

  const currentIndex = statusOrder.indexOf(currentStatus);
  const expectedIndex = statusOrder.indexOf(expectedStatus);

  if (currentIndex > expectedIndex) {
    // If the current status is ahead of the expected one (already passed), throw an error
    throw new Error(
      `You can't go back from "${currentStatus}" to "${expectedStatus}". The process has already passed this stage.`
    );
  }

  if (currentIndex < expectedIndex) {
    // If the current status is before the expected one, suggest the previous status to complete
    const previousStatus = statusOrder[currentIndex + 1];
    return `First, you need to complete the "${previousStatus}" step to move to "${expectedStatus}" state.`;
  }

  // If statuses match, it's fine to continue (return true or allow progression)
  return true;
}

module.exports = validateStatusTransition;
