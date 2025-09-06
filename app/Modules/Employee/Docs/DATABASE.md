# Employee Module Database Schema

## Overview

This document provides detailed information about the database schema for the Employee Module, including table structures, relationships, indexes, and constraints.

## Entity Relationship Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   departments   │    │    positions    │    │    employees    │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │◄──┐│ id (PK)         │◄──┐│ id (PK)         │
│ name            │   ││ title           │   ││ employee_number │
│ description     │   ││ description     │   ││ first_name      │
│ parent_dept_id  │   ││ department_id   │───┘│ last_name       │
│ dept_head_id    │───┘│ level           │    │ email           │
│ budget          │    │ min_salary      │    │ phone           │
│ location        │    │ max_salary      │    │ date_of_birth   │
│ created_at      │    │ requirements    │    │ gender          │
│ updated_at      │    │ responsibilities│    │ marital_status  │
└─────────────────┘    │ created_at      │    │ nationality     │
                       │ updated_at      │    │ address         │
                       └─────────────────┘    │ emergency_contact│
                                              │ hire_date       │
                                              │ termination_date│
                                              │ employment_status│
                                              │ department_id   │──┐
                                              │ position_id     │──┘
                                              │ manager_id      │──┐
                                              │ salary          │  │
                                              │ currency        │  │
                                              │ profile_photo   │  │
                                              │ created_at      │  │
                                              │ updated_at      │  │
                                              │ deleted_at      │  │
                                              └─────────────────┘  │
                                                       │           │
                                                       └───────────┘
                                                       (self-reference)

┌─────────────────────────┐    ┌─────────────────────────┐    ┌─────────────────────────┐
│ employee_performance_   │    │   employee_attendance   │    │    employee_leaves      │
│        reviews          │    ├─────────────────────────┤    ├─────────────────────────┤
├─────────────────────────┤    │ id (PK)                 │    │ id (PK)                 │
│ id (PK)                 │    │ employee_id (FK)        │    │ employee_id (FK)        │
│ employee_id (FK)        │    │ date                    │    │ leave_type              │
│ reviewer_id (FK)        │    │ clock_in_time           │    │ start_date              │
│ review_period_start     │    │ clock_out_time          │    │ end_date                │
│ review_period_end       │    │ break_duration_minutes  │    │ days_requested          │
│ overall_rating          │    │ total_hours             │    │ reason                  │
│ goals_achievement_rating│    │ overtime_hours          │    │ status                  │
│ skills_rating           │    │ status                  │    │ approved_by (FK)        │
│ communication_rating    │    │ notes                   │    │ approved_at             │
│ teamwork_rating         │    │ created_at              │    │ rejection_reason        │
│ comments                │    │ updated_at              │    │ created_at              │
│ improvement_areas       │    └─────────────────────────┘    │ updated_at              │
│ goals_for_next_period   │                                   └─────────────────────────┘
│ status                  │
│ created_at              │
│ updated_at              │
└─────────────────────────┘
```

## Table Definitions

### employees

Core employee information table.

```sql
CREATE TABLE employees (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    employee_number VARCHAR(20) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender ENUM('male', 'female', 'other'),
    marital_status ENUM('single', 'married', 'divorced', 'widowed'),
    nationality VARCHAR(100),
    address TEXT,
    emergency_contact_name VARCHAR(255),
    emergency_contact_phone VARCHAR(20),
    hire_date DATE NOT NULL,
    termination_date DATE NULL,
    employment_status ENUM('active', 'inactive', 'terminated') DEFAULT 'active',
    department_id BIGINT UNSIGNED,
    position_id BIGINT UNSIGNED,
    manager_id BIGINT UNSIGNED NULL,
    salary DECIMAL(12,2),
    currency VARCHAR(3) DEFAULT 'USD',
    profile_photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    
    INDEX idx_employee_number (employee_number),
    INDEX idx_email (email),
    INDEX idx_department_id (department_id),
    INDEX idx_position_id (position_id),
    INDEX idx_manager_id (manager_id),
    INDEX idx_employment_status (employment_status),
    INDEX idx_hire_date (hire_date),
    INDEX idx_deleted_at (deleted_at),
    
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (position_id) REFERENCES positions(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);
```

**Constraints:**
- `employee_number` must be unique across all employees
- `email` must be unique and valid format
- `hire_date` cannot be in the future
- `salary` must be positive if provided
- `manager_id` cannot reference the same employee (self-reference check)

### departments

Organizational departments structure.

```sql
CREATE TABLE departments (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    parent_department_id BIGINT UNSIGNED NULL,
    department_head_id BIGINT UNSIGNED NULL,
    budget DECIMAL(15,2),
    location VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_name (name),
    INDEX idx_parent_department_id (parent_department_id),
    INDEX idx_department_head_id (department_head_id),
    INDEX idx_is_active (is_active),
    
    FOREIGN KEY (parent_department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (department_head_id) REFERENCES employees(id) ON DELETE SET NULL
);
```

**Constraints:**
- `name` must be unique within the same parent department
- `budget` must be positive if provided
- `parent_department_id` cannot create circular references

### positions

Job positions and roles definition.

```sql
CREATE TABLE positions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    department_id BIGINT UNSIGNED,
    level ENUM('entry', 'junior', 'mid', 'senior', 'lead', 'manager', 'director', 'executive'),
    min_salary DECIMAL(12,2),
    max_salary DECIMAL(12,2),
    requirements TEXT,
    responsibilities TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_title (title),
    INDEX idx_department_id (department_id),
    INDEX idx_level (level),
    INDEX idx_is_active (is_active),
    
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);
```

**Constraints:**
- `title` must be unique within the same department
- `max_salary` must be greater than or equal to `min_salary`
- Both salary fields must be positive if provided

### employee_performance_reviews

Employee performance evaluation records.

```sql
CREATE TABLE employee_performance_reviews (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    employee_id BIGINT UNSIGNED NOT NULL,
    reviewer_id BIGINT UNSIGNED NOT NULL,
    review_period_start DATE NOT NULL,
    review_period_end DATE NOT NULL,
    overall_rating DECIMAL(3,2) CHECK (overall_rating >= 1.00 AND overall_rating <= 5.00),
    goals_achievement_rating DECIMAL(3,2) CHECK (goals_achievement_rating >= 1.00 AND goals_achievement_rating <= 5.00),
    skills_rating DECIMAL(3,2) CHECK (skills_rating >= 1.00 AND skills_rating <= 5.00),
    communication_rating DECIMAL(3,2) CHECK (communication_rating >= 1.00 AND communication_rating <= 5.00),
    teamwork_rating DECIMAL(3,2) CHECK (teamwork_rating >= 1.00 AND teamwork_rating <= 5.00),
    comments TEXT,
    improvement_areas TEXT,
    goals_for_next_period TEXT,
    status ENUM('draft', 'submitted', 'approved', 'rejected') DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_employee_id (employee_id),
    INDEX idx_reviewer_id (reviewer_id),
    INDEX idx_review_period (review_period_start, review_period_end),
    INDEX idx_status (status),
    INDEX idx_overall_rating (overall_rating),
    
    UNIQUE KEY unique_employee_period (employee_id, review_period_start, review_period_end),
    
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (reviewer_id) REFERENCES employees(id) ON DELETE RESTRICT
);
```

**Constraints:**
- `review_period_end` must be after `review_period_start`
- All rating fields must be between 1.00 and 5.00
- Only one review per employee per period
- Reviewer cannot be the same as the employee being reviewed

### employee_attendance

Daily attendance tracking.

```sql
CREATE TABLE employee_attendance (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    employee_id BIGINT UNSIGNED NOT NULL,
    date DATE NOT NULL,
    clock_in_time TIMESTAMP NULL,
    clock_out_time TIMESTAMP NULL,
    break_duration_minutes INT DEFAULT 0 CHECK (break_duration_minutes >= 0),
    total_hours DECIMAL(4,2) CHECK (total_hours >= 0),
    overtime_hours DECIMAL(4,2) DEFAULT 0 CHECK (overtime_hours >= 0),
    status ENUM('present', 'absent', 'late', 'half_day', 'on_leave') DEFAULT 'present',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_employee_id (employee_id),
    INDEX idx_date (date),
    INDEX idx_status (status),
    INDEX idx_employee_date (employee_id, date),
    
    UNIQUE KEY unique_employee_date (employee_id, date),
    
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);
```

**Constraints:**
- `clock_out_time` must be after `clock_in_time` if both are provided
- `total_hours` cannot exceed 24 hours
- `break_duration_minutes` cannot exceed total work time
- Only one attendance record per employee per date

### employee_leaves

Leave requests and approvals.

```sql
CREATE TABLE employee_leaves (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    employee_id BIGINT UNSIGNED NOT NULL,
    leave_type ENUM('vacation', 'sick', 'personal', 'maternity', 'paternity', 'bereavement', 'unpaid') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days_requested INT NOT NULL CHECK (days_requested > 0),
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
    approved_by BIGINT UNSIGNED NULL,
    approved_at TIMESTAMP NULL,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_employee_id (employee_id),
    INDEX idx_leave_type (leave_type),
    INDEX idx_status (status),
    INDEX idx_start_date (start_date),
    INDEX idx_end_date (end_date),
    INDEX idx_approved_by (approved_by),
    
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES employees(id) ON DELETE SET NULL
);
```

**Constraints:**
- `end_date` must be after or equal to `start_date`
- `days_requested` must match the calculated days between start and end dates
- `approved_by` cannot be the same as `employee_id`
- `approved_at` must be provided when status is 'approved'

## Additional Tables

### employee_skills

Employee skills and competencies tracking.

```sql
CREATE TABLE employee_skills (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    employee_id BIGINT UNSIGNED NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    skill_category VARCHAR(100),
    proficiency_level ENUM('beginner', 'intermediate', 'advanced', 'expert'),
    years_of_experience INT DEFAULT 0,
    certified BOOLEAN DEFAULT FALSE,
    certification_name VARCHAR(255),
    certification_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_employee_id (employee_id),
    INDEX idx_skill_name (skill_name),
    INDEX idx_skill_category (skill_category),
    INDEX idx_proficiency_level (proficiency_level),
    
    UNIQUE KEY unique_employee_skill (employee_id, skill_name),
    
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);
```

### employee_documents

Employee document management.

```sql
CREATE TABLE employee_documents (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    employee_id BIGINT UNSIGNED NOT NULL,
    document_type ENUM('contract', 'id_copy', 'resume', 'certificate', 'performance_review', 'other') NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INT,
    mime_type VARCHAR(100),
    uploaded_by BIGINT UNSIGNED,
    is_confidential BOOLEAN DEFAULT FALSE,
    expiry_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_employee_id (employee_id),
    INDEX idx_document_type (document_type),
    INDEX idx_uploaded_by (uploaded_by),
    INDEX idx_expiry_date (expiry_date),
    
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES employees(id) ON DELETE SET NULL
);
```

### employee_salary_history

Salary change tracking.

```sql
CREATE TABLE employee_salary_history (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    employee_id BIGINT UNSIGNED NOT NULL,
    previous_salary DECIMAL(12,2),
    new_salary DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    change_reason ENUM('promotion', 'annual_increase', 'performance', 'market_adjustment', 'demotion', 'other'),
    effective_date DATE NOT NULL,
    approved_by BIGINT UNSIGNED,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_employee_id (employee_id),
    INDEX idx_effective_date (effective_date),
    INDEX idx_approved_by (approved_by),
    
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (approved_by) REFERENCES employees(id) ON DELETE SET NULL
);
```

## Indexes and Performance

### Primary Indexes

All tables have primary key indexes on their `id` columns for optimal performance.

### Secondary Indexes

#### employees table
- `idx_employee_number` - Fast lookup by employee number
- `idx_email` - Fast lookup by email for authentication
- `idx_department_id` - Department-based queries
- `idx_position_id` - Position-based queries
- `idx_manager_id` - Hierarchy queries
- `idx_employment_status` - Status filtering
- `idx_hire_date` - Date range queries
- `idx_deleted_at` - Soft delete queries

#### Composite Indexes
- `idx_employee_date` on employee_attendance - Fast attendance lookups
- `idx_review_period` on performance_reviews - Period-based queries

### Query Optimization Tips

1. **Use appropriate indexes** for WHERE clauses
2. **Avoid SELECT *** - specify needed columns
3. **Use LIMIT** for pagination
4. **Use EXISTS** instead of IN for subqueries
5. **Consider partitioning** for large attendance tables

## Data Integrity

### Foreign Key Constraints

- **CASCADE** - Child records deleted when parent is deleted
- **SET NULL** - Foreign key set to NULL when parent is deleted
- **RESTRICT** - Prevents deletion of parent if children exist

### Check Constraints

- Rating values must be between 1.00 and 5.00
- Salary values must be positive
- Date ranges must be logical (end after start)
- Hours worked cannot exceed reasonable limits

### Unique Constraints

- Employee numbers must be unique
- Email addresses must be unique
- One attendance record per employee per date
- One performance review per employee per period

## Triggers

### Audit Triggers

```sql
-- Employee changes audit
CREATE TRIGGER employee_audit_trigger
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    INSERT INTO employee_audit_log (
        employee_id,
        changed_field,
        old_value,
        new_value,
        changed_by,
        changed_at
    ) VALUES (
        NEW.id,
        'salary',
        OLD.salary,
        NEW.salary,
        USER(),
        NOW()
    );
END;
```

### Business Logic Triggers

```sql
-- Auto-calculate total hours
CREATE TRIGGER calculate_total_hours
BEFORE UPDATE ON employee_attendance
FOR EACH ROW
BEGIN
    IF NEW.clock_in_time IS NOT NULL AND NEW.clock_out_time IS NOT NULL THEN
        SET NEW.total_hours = TIMESTAMPDIFF(MINUTE, NEW.clock_in_time, NEW.clock_out_time) / 60.0 - (NEW.break_duration_minutes / 60.0);
    END IF;
END;
```

## Views

### Employee Summary View

```sql
CREATE VIEW employee_summary AS
SELECT 
    e.id,
    e.employee_number,
    CONCAT(e.first_name, ' ', e.last_name) AS full_name,
    e.email,
    e.employment_status,
    d.name AS department_name,
    p.title AS position_title,
    CONCAT(m.first_name, ' ', m.last_name) AS manager_name,
    e.hire_date,
    DATEDIFF(CURDATE(), e.hire_date) AS days_employed
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id
LEFT JOIN positions p ON e.position_id = p.id
LEFT JOIN employees m ON e.manager_id = m.id
WHERE e.deleted_at IS NULL;
```

### Department Statistics View

```sql
CREATE VIEW department_statistics AS
SELECT 
    d.id,
    d.name,
    COUNT(e.id) AS employee_count,
    AVG(e.salary) AS average_salary,
    MIN(e.hire_date) AS oldest_hire_date,
    MAX(e.hire_date) AS newest_hire_date
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id AND e.employment_status = 'active'
GROUP BY d.id, d.name;
```

## Backup and Maintenance

### Backup Strategy

1. **Daily backups** of all employee data
2. **Weekly full backups** with point-in-time recovery
3. **Monthly archive** of historical data
4. **Encrypted backups** for sensitive information

### Maintenance Tasks

1. **Index optimization** - Monthly rebuild of fragmented indexes
2. **Statistics update** - Weekly update of table statistics
3. **Data archival** - Quarterly archival of old records
4. **Cleanup jobs** - Daily cleanup of temporary data

### Monitoring

- Query performance monitoring
- Index usage analysis
- Storage space monitoring
- Backup verification

---

*This database schema documentation is maintained by the development team and updated with each schema change.*