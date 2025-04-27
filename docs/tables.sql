-- user table
CREATE TABLE `user` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,  -- Ensuring name is always present
    email VARCHAR(255) UNIQUE NOT NULL,  -- Ensuring email is unique and present
    phone VARCHAR(50),  -- Optional
    role ENUM('admin', 'sales_agent', 'finance', 'legal') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- lead table
CREATE TABLE `lead` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,                          -- Ensuring name is required
    email VARCHAR(255) UNIQUE NOT NULL,                  -- Ensuring email is unique and required
    phone VARCHAR(50),                                   -- Optional
    source VARCHAR(100) NOT NULL,                        -- Required for tracking lead source
    inquiry_date DATE NOT NULL,                          -- Required for tracking when the lead was inquired
    status ENUM('unassigned', 'assigned', 'reservation', 'financial_approve', 'legal_finalized', 'property_sold') NOT NULL DEFAULT 'unassigned',  -- Valid status
    assigned_sales_agent_id INT,                         -- Sales agent assigned to the lead (if any)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,      -- Automatically set when the lead is created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Automatically set when the lead is updated
    FOREIGN KEY (assigned_sales_agent_id) REFERENCES `user`(id) ON DELETE RESTRICT -- Prevent deletion if user is assigned to a lead
);

-- lead_details table
CREATE TABLE `lead_details` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    budget_min DECIMAL(15,2),
    budget_max DECIMAL(15,2),
    preferred_property_type VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,  -- Default to active
    cancellation_reason TEXT,
    lead_id INT NOT NULL, -- Required to link back to the lead
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_id) REFERENCES `lead`(id) ON DELETE CASCADE  -- If lead is deleted, delete related details
);

-- lead_location_preferences table
CREATE TABLE `lead_location_preferences` (
    lead_details_id INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    PRIMARY KEY (lead_details_id, location),
    FOREIGN KEY (lead_details_id) REFERENCES `lead_details`(id) ON DELETE CASCADE
);


-- follow_up_status table
CREATE TABLE `follow_up_status` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    follow_up_type ENUM('email', 'call') NOT NULL,
    status_notes TEXT,
    follow_up_date DATE NOT NULL,
    lead_details_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lead_details_id) REFERENCES `lead_details`(id) ON DELETE CASCADE
);

-- property table
CREATE TABLE `property` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,       -- Property must have a name
    location VARCHAR(255) NOT NULL,    -- Property must have a location
    is_deleted BOOLEAN DEFAULT FALSE, --  Mark soft deletes, keeping the info in interest table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- lead_interest junction table
CREATE TABLE `lead_interest` (
    lead_details_id INT NOT NULL,
    property_id INT NOT NULL,
    interest_level TINYINT NOT NULL CHECK (interest_level BETWEEN 1 AND 10), -- Ensuring the interest level is between 1 and 10
    PRIMARY KEY (lead_details_id, property_id),
    FOREIGN KEY (lead_details_id) REFERENCES `lead_details`(id) ON DELETE CASCADE,
    FOREIGN KEY (property_id) REFERENCES `property`(id) ON DELETE CASCADE -- Since app make soft detlet, if the data delete forcefully, delete these too.
);


-- reservation table
CREATE TABLE `reservation` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    reservation_fee DECIMAL(15,2) DEFAULT 0 NOT NULL,   -- Default to 0 if no value is provided
    reservation_date DATE NOT NULL,                     -- Ensure reservation date is always provided
    expected_closing DATE NOT NULL,                     -- Ensure expected closing date is always provided
    lead_details_id INT NOT NULL,                       -- Foreign key to lead_details, can't be null
    property_id INT NOT NULL,                           -- Foreign key to property, can't be null
    is_cancelled BOOLEAN DEFAULT FALSE NOT NULL,        -- True if cancelled in financial step
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     -- Default to current timestamp when a new record is created
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- <-- missing comma fixed
    FOREIGN KEY (lead_details_id) REFERENCES `lead_details`(id) ON DELETE CASCADE,  -- Delete reservation if related lead_details is deleted
    FOREIGN KEY (property_id) REFERENCES `property`(id) ON DELETE CASCADE           -- Since app makes soft delete, delete reservation if property deleted forcefully
);

-- financial_status table
CREATE TABLE `financial_status` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    status ENUM('approved', 'rejected') NOT NULL,  -- Use ENUM for status with approved or rejected
    loan_amount DECIMAL(15,2) NOT NULL,  -- Loan amount is required
    payment_plan VARCHAR(255) NOT NULL,  -- Payment plan is now required (since every purchase involves a loan)
    reservation_id INT NOT NULL,  -- Foreign key to reservation, can't be null
    finance_user_id INT NOT NULL,  -- Foreign key to the finance user responsible for this status
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Automatically created at the time of entry
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Automatically updated when the record changes
    FOREIGN KEY (reservation_id) REFERENCES `reservation`(id) ON DELETE CASCADE,  -- If the reservation is deleted, delete related financial status
    FOREIGN KEY (finance_user_id) REFERENCES `user`(id) ON DELETE RESTRICT  -- Prevent deletion of user if linked to financial status
);

-- legal_status table
CREATE TABLE `legal_status` (
    id INT PRIMARY KEY AUTO_INCREMENT,            -- Primary key for the legal status record
    contract_signed BOOLEAN,                      -- Boolean indicating whether the contract is signed
    notes TEXT,                                   -- Optional notes for legal status details
    reservation_id INT NOT NULL,                  -- Foreign key to the reservation, can't be null
    legal_user_id INT NOT NULL,                   -- Foreign key to the user (legal team responsible)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,   -- Automatically created at the time of entry
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,  -- Automatically updated when the record changes
    FOREIGN KEY (reservation_id) REFERENCES `reservation`(id) ON DELETE CASCADE,  -- If the reservation is deleted, delete the related legal status
    FOREIGN KEY (legal_user_id) REFERENCES `user`(id) ON DELETE RESTRICT         -- Prevent deletion of user if linked to legal status
);

-- sale_status table
CREATE TABLE `sale_status` (
    reservation_id INT PRIMARY KEY,                       -- Composite primary key (reservation_id)
    sale_date DATE NOT NULL,                               -- Sale date is required
    final_price DECIMAL(15,2) NOT NULL,                   -- Final sale price is required
    commission_details TEXT,                              -- Commission details (optional)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,       -- Automatically set creation timestamp
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Automatically update timestamp
    FOREIGN KEY (reservation_id) REFERENCES `reservation`(id) ON DELETE CASCADE -- If reservation is deleted, delete sale_status
);
