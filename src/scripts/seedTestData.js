require('dotenv').config();
const db = require('../models/index');

async function seed() {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected.');

    // 1. Create a user (Sales agent)
    const user = await db.User.create({
      name: 'John Doe',
      email: 'hello@radikadilanka.com',
      phone: '1234567890',
      role: 'sales_agent',
    });

    // 2. Create a lead assigned to the sales agent
    const lead = await db.Lead.create({
      name: 'Alice Smith',
      email: 'alice@example.com',
      phone: '9876543210',
      source: 'Website',
      inquiry_date: new Date(),
      status: 'assigned',
      assigned_sales_agent_id: user.id,
    });

    // 3. Create lead details
    const leadDetails = await db.LeadDetails.create({
      budget_min: 100000,
      budget_max: 250000,
      preferred_property_type: 'Apartment',
      lead_id: lead.id,
    });

    // 4. Add location preference
    await db.LocationPreferences.create({
      lead_details_id: leadDetails.id,
      location: 'Downtown',
    });

    // 5. Create a property
    const property = await db.Property.create({
      name: 'Sunset Apartments',
      location: 'Downtown',
    });

    // 6. Add interest
    await db.LeadInterest.create({
      lead_details_id: leadDetails.id,
      property_id: property.id,
      interest_level: 8,
    });

    // 7. Create a reservation
    const reservation = await db.Reservation.create({
      reservation_fee: 5000,
      reservation_date: new Date(),
      expected_closing: new Date(
        new Date().setMonth(new Date().getMonth() + 2)
      ),
      lead_details_id: leadDetails.id,
      property_id: property.id,
    });

    // 8. Create financial status
    await db.FinancialStatus.create({
      status: 'approved',
      loan_amount: 200000,
      payment_plan: 'Monthly Installments',
      reservation_id: reservation.id,
      finance_user_id: user.id, // just using same user for testing
    });

    // 9. Create legal status
    await db.LegalStatus.create({
      contract_signed: true,
      notes: 'All clear',
      reservation_id: reservation.id,
      legal_user_id: user.id, // just using same user for testing
    });

    // 10. Create sale status
    await db.SaleStatus.create({
      reservation_id: reservation.id,
      sale_date: new Date(),
      final_price: 220000,
      commission_details: '5% commission to agent',
    });

    console.log('✅ Seed data created successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Failed to seed data:', err);
    process.exit(1);
  }
}

seed();
