-- Seed Courses
INSERT INTO courses (id, name, slug, stream, duration_years, fees_per_year, eligibility_criteria, description, is_active, created_at, updated_at) VALUES
('a1111111-1111-1111-1111-111111111111', 'B.Com (Honours)', 'bcom-hons', 'Commerce', 3, 45000.00, 'Minimum 50% in 10+2 with Mathematics/Accountancy', 'An undergraduate program focusing on advanced accounting, finance, and business studies.', true, NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days'),
('a2222222-2222-2222-2222-222222222222', 'Bachelor of Business Administration (BBA)', 'bba', 'Commerce', 3, 60000.00, 'Minimum 50% in 10+2 from any stream', 'A professional course aimed at developing managerial skills and business leadership capabilities.', true, NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days'),
('a3333333-3333-3333-3333-333333333333', 'Master of Commerce (M.Com)', 'mcom', 'Commerce', 2, 50000.00, 'B.Com or BBA with minimum 55% aggregate', 'A postgraduate degree focusing on research, banking, finance, and advanced commerce subjects.', true, NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days'),
('b1111111-1111-1111-1111-111111111111', 'B.Sc Physics', 'bsc-physics', 'Science', 3, 50000.00, 'Minimum 55% in 10+2 with Physics and Mathematics', 'An in-depth program exploring classical physics, quantum mechanics, and electromagnetism.', true, NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days'),
('b2222222-2222-2222-2222-222222222222', 'B.Sc Computer Science', 'bsc-cs', 'Science', 3, 75000.00, 'Minimum 55% in 10+2 with Mathematics', 'A comprehensive computer science course focusing on programming, database systems, and algorithms.', true, NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days'),
('b3333333-3333-3333-3333-333333333333', 'M.Sc Information Technology', 'msc-it', 'Science', 2, 85000.00, 'B.Sc CS, BCA, or B.Sc IT with minimum 55% aggregate', 'An advanced postgraduate course covering software engineering, cloud computing, and big data.', true, NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days'),
('c1111111-1111-1111-1111-111111111111', 'BA English Literature', 'ba-english', 'Arts', 3, 35000.00, 'Minimum 45% in 10+2 from any stream', 'A program focusing on British, American, and postcolonial literature, along with linguistics.', true, NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days'),
('c2222222-2222-2222-2222-222222222222', 'MA Applied Economics', 'ma-economics', 'Arts', 2, 40000.00, 'Bachelor degree with Economics as a subject and minimum 50%', 'A rigorous master program covering microeconomics, macroeconomics, econometrics, and policy analysis.', true, NOW() - INTERVAL '60 days', NOW() - INTERVAL '60 days');

-- Seed Faculty
INSERT INTO faculty (id, name, designation, department, qualification, course_id, bio, photo_url, created_at) VALUES
('f1000000-0000-0000-0000-000000000001', 'Dr. Ramesh Sharma', 'Professor & Head', 'Commerce', 'Ph.D. in Finance, M.Com', 'a1111111-1111-1111-1111-111111111111', 'Over 20 years of teaching experience in financial management and corporate accounting.', 'https://images.unsplash.com/photo-1560250097-0b93528c311a', NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000002', 'Dr. Priya Nair', 'Associate Professor', 'Commerce', 'Ph.D. in Marketing, MBA', 'a2222222-2222-2222-2222-222222222222', 'Specializes in consumer behavior and digital marketing strategies.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2', NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000003', 'Mr. Amit Gupta', 'Assistant Professor', 'Commerce', 'M.Com, NET Qualified', 'a3333333-3333-3333-3333-333333333333', 'Researching microfinance and banking technology systems.', NULL, NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000004', 'Dr. Sarah Mathews', 'Professor', 'Physics', 'Ph.D. in Astrophysics', 'b1111111-1111-1111-1111-111111111111', 'Former ISRO researcher specializing in stellar evolution and observational cosmology.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956', NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000005', 'Dr. Vikram Malhotra', 'Associate Professor', 'Computer Science', 'Ph.D. in Machine Learning, M.Tech', 'b2222222-2222-2222-2222-222222222222', 'Published author of multiple ML research articles. Teaches algorithms and AI.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb', NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000006', 'Ms. Neha Sen', 'Assistant Professor', 'Computer Science', 'M.Tech in Software Engineering', 'b3333333-3333-3333-3333-333333333333', 'Passionate about mobile application development and software UI/UX.', NULL, NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000007', 'Dr. John D''Souza', 'Professor', 'English', 'Ph.D. in English Literature', 'c1111111-1111-1111-1111-111111111111', 'Specialist in Shakespearean plays and Elizabethan literature.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d', NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000008', 'Dr. Ananya Roy', 'Associate Professor', 'Economics', 'Ph.D. in Econometrics', 'c2222222-2222-2222-2222-222222222222', 'Focuses on public finance policies and economic modeling techniques.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2', NOW() - INTERVAL '50 days'),
-- General faculty (course_id is NULL)
('f1000000-0000-0000-0000-000000000009', 'Mr. Robert Taylor', 'Physical Director', 'Sports', 'M.P.Ed', NULL, 'Oversees college athletic programs and physical education curriculum.', NULL, NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000010', 'Dr. Sunita Deshmukh', 'Professor', 'Languages', 'Ph.D. in Hindi Literature', NULL, 'Teaches functional Hindi and business communications.', NULL, NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000011', 'Ms. Clara Smith', 'Lecturer', 'Languages', 'M.A. in French, DELF C2', NULL, 'Offers foreign language courses in conversational French.', NULL, NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000012', 'Mr. Rajesh Pillai', 'Assistant Professor', 'Commerce', 'M.Com, MBA', 'a1111111-1111-1111-1111-111111111111', 'Focuses on taxation and financial planning courses.', NULL, NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000013', 'Ms. Tanvi Rao', 'Lecturer', 'Physics', 'M.Sc. in Physics', 'b1111111-1111-1111-1111-111111111111', 'Teaches laboratory experiments, electronics, and solid-state physics.', NULL, NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000014', 'Mr. Vijay Kumar', 'Lecturer', 'Computer Science', 'M.C.A.', 'b2222222-2222-2222-2222-222222222222', 'Specializes in database management systems and SQL querying.', NULL, NOW() - INTERVAL '50 days'),
('f1000000-0000-0000-0000-000000000015', 'Dr. Hitesh Patel', 'Lecturer', 'Economics', 'Ph.D. in Economics', 'c2222222-2222-2222-2222-222222222222', 'Focuses on international trade and microeconomic foundations.', NULL, NOW() - INTERVAL '50 days');

-- Seed Placements (At least 3 years, multiple companies per year)
INSERT INTO placements (id, academic_year, course_id, company_name, package_lpa, students_placed, created_at) VALUES
(gen_random_uuid(), '2022-2023', 'b2222222-2222-2222-2222-222222222222', 'Infosys', 4.50, 12, NOW() - INTERVAL '40 days'),
(gen_random_uuid(), '2022-2023', 'b2222222-2222-2222-2222-222222222222', 'Wipro', 4.20, 8, NOW() - INTERVAL '40 days'),
(gen_random_uuid(), '2022-2023', 'b3333333-3333-3333-3333-333333333333', 'TCS', 6.00, 5, NOW() - INTERVAL '40 days'),
(gen_random_uuid(), '2022-2023', 'a2222222-2222-2222-2222-222222222222', 'HDFC Bank', 5.20, 10, NOW() - INTERVAL '40 days'),
(gen_random_uuid(), '2023-2024', 'b2222222-2222-2222-2222-222222222222', 'Cognizant', 4.80, 15, NOW() - INTERVAL '30 days'),
(gen_random_uuid(), '2023-2024', 'b2222222-2222-2222-2222-222222222222', 'Amazon', 12.00, 2, NOW() - INTERVAL '30 days'),
(gen_random_uuid(), '2023-2024', 'b3333333-3333-3333-3333-333333333333', 'Capgemini', 6.50, 7, NOW() - INTERVAL '30 days'),
(gen_random_uuid(), '2023-2024', 'a1111111-1111-1111-1111-111111111111', 'EY', 5.80, 9, NOW() - INTERVAL '30 days'),
(gen_random_uuid(), '2024-2025', 'b2222222-2222-2222-2222-222222222222', 'Google', 18.50, 1, NOW() - INTERVAL '10 days'),
(gen_random_uuid(), '2024-2025', 'b2222222-2222-2222-2222-222222222222', 'Accenture', 5.00, 20, NOW() - INTERVAL '10 days'),
(gen_random_uuid(), '2024-2025', 'b3333333-3333-3333-3333-333333333333', 'Microsoft', 22.00, 1, NOW() - INTERVAL '10 days'),
(gen_random_uuid(), '2024-2025', 'a1111111-1111-1111-1111-111111111111', 'Deloitte', 6.20, 14, NOW() - INTERVAL '10 days'),
(gen_random_uuid(), '2024-2025', 'a2222222-2222-2222-2222-222222222222', 'KPMG', 6.00, 8, NOW() - INTERVAL '10 days');

-- Seed Admin Users
-- password is 'password123', hashed with BCrypt
INSERT INTO admin_users (id, username, email, password_hash, role, is_active, created_at) VALUES
('d0000000-0000-0000-0000-000000000001', 'admin', 'admin@scct.edu', '$2a$10$w850r2F/oR2k922nscqEFe4H2q9sA5b7L/b.rT9kG8bFzI0gYvLki', 'ADMISSIONS_STAFF', true, NOW() - INTERVAL '60 days');

-- Seed Leads and Lead Status History
-- 40 leads in total. We will map them systematically:
-- - 4 reached ADMITTED (Lead 1..4)
-- - 4 reached APPLICATION_SUBMITTED but not ADMITTED (Lead 5..8)
-- - 7 reached APPLICATION_STARTED but not APPLICATION_SUBMITTED (Lead 9..15)
-- - 10 reached CONTACTED but not APPLICATION_STARTED (Lead 16..25)
-- - 15 remained at NEW (Lead 26..40)
-- Inside these, we will set some as LOST or REJECTED:
-- - Lead 5 (REJECTED) -> transitioned NEW -> CONTACTED -> APPLICATION_STARTED -> APPLICATION_SUBMITTED -> REJECTED
-- - Lead 9 (LOST) -> transitioned NEW -> CONTACTED -> APPLICATION_STARTED -> LOST
-- - Lead 16 (LOST) -> transitioned NEW -> CONTACTED -> LOST
-- - Lead 26 (LOST) -> transitioned NEW -> LOST
-- This satisfies: "Any of the above (except ADMITTED) -> REJECTED or LOST"

-- We will insert them with UUIDs `00000000-0000-0000-0000-0000000000xx` where xx goes from 01 to 40.

-- Leads 1-4: ADMITTED (current status: ADMITTED)
INSERT INTO leads (id, full_name, email, phone, course_id, message, source, status, is_duplicate, duplicate_of_lead_id, created_at, updated_at) VALUES
('00000000-0000-0000-0000-000000000001', 'Arjun Mehta', 'arjun.mehta@gmail.com', '9876543210', 'b2222222-2222-2222-2222-222222222222', 'Interested in CS', 'WEBSITE_FORM', 'ADMITTED', false, NULL, NOW() - INTERVAL '50 days', NOW() - INTERVAL '40 days'),
('00000000-0000-0000-0000-000000000002', 'Sneha Reddy', 'sneha.reddy@yahoo.com', '8765432109', 'a2222222-2222-2222-2222-222222222222', 'BBA Admissions', 'REFERRAL', 'ADMITTED', false, NULL, NOW() - INTERVAL '48 days', NOW() - INTERVAL '38 days'),
('00000000-0000-0000-0000-000000000003', 'Rahul Verma', 'rahul.verma@outlook.com', '7654321098', 'b3333333-3333-3333-3333-333333333333', 'M.Sc IT enquiry', 'WALK_IN', 'ADMITTED', false, NULL, NOW() - INTERVAL '45 days', NOW() - INTERVAL '35 days'),
('00000000-0000-0000-0000-000000000004', 'Priya Sharma', 'priya.sharma@gmail.com', '9988776655', 'a1111111-1111-1111-1111-111111111111', 'B.Com Hons queries', 'PHONE', 'ADMITTED', false, NULL, NOW() - INTERVAL '42 days', NOW() - INTERVAL '32 days');

-- Leads 5-8: APPLICATION_SUBMITTED (Leads 5: REJECTED, Leads 6-8: APPLICATION_SUBMITTED)
INSERT INTO leads (id, full_name, email, phone, course_id, message, source, status, is_duplicate, duplicate_of_lead_id, created_at, updated_at) VALUES
('00000000-0000-0000-0000-000000000005', 'Vikram Singh', 'vikram.singh@gmail.com', '9123456780', 'b1111111-1111-1111-1111-111111111111', NULL, 'EMAIL_CAMPAIGN', 'REJECTED', false, NULL, NOW() - INTERVAL '40 days', NOW() - INTERVAL '30 days'),
('00000000-0000-0000-0000-000000000006', 'Aditi Rao', 'aditi.rao@gmail.com', '8123456789', 'c2222222-2222-2222-2222-222222222222', 'MA Economics', 'SOCIAL_MEDIA', 'APPLICATION_SUBMITTED', false, NULL, NOW() - INTERVAL '39 days', NOW() - INTERVAL '31 days'),
('00000000-0000-0000-0000-000000000007', 'Kunal Sen', 'kunal.sen@gmail.com', '7012345678', 'b2222222-2222-2222-2222-222222222222', NULL, 'OTHER', 'APPLICATION_SUBMITTED', false, NULL, NOW() - INTERVAL '38 days', NOW() - INTERVAL '28 days'),
('00000000-0000-0000-0000-000000000008', 'Meera Nair', 'meera.nair@gmail.com', '6012345678', 'c1111111-1111-1111-1111-111111111111', 'English literature', 'WEBSITE_FORM', 'APPLICATION_SUBMITTED', false, NULL, NOW() - INTERVAL '37 days', NOW() - INTERVAL '29 days');

-- Leads 9-15: APPLICATION_STARTED (Lead 9: LOST, Leads 10-15: APPLICATION_STARTED)
INSERT INTO leads (id, full_name, email, phone, course_id, message, source, status, is_duplicate, duplicate_of_lead_id, created_at, updated_at) VALUES
('00000000-0000-0000-0000-000000000009', 'Rohan Das', 'rohan.das@gmail.com', '9812345670', 'a3333333-3333-3333-3333-333333333333', NULL, 'WEBSITE_FORM', 'LOST', false, NULL, NOW() - INTERVAL '35 days', NOW() - INTERVAL '25 days'),
('00000000-0000-0000-0000-000000000010', 'Deepika Padukone', 'deepika.p@gmail.com', '8812345670', 'a2222222-2222-2222-2222-222222222222', NULL, 'REFERRAL', 'APPLICATION_STARTED', false, NULL, NOW() - INTERVAL '34 days', NOW() - INTERVAL '26 days'),
('00000000-0000-0000-0000-000000000011', 'Ranveer Singh', 'ranveer.s@gmail.com', '7812345670', 'b1111111-1111-1111-1111-111111111111', 'Physics enthusiast', 'WALK_IN', 'APPLICATION_STARTED', false, NULL, NOW() - INTERVAL '33 days', NOW() - INTERVAL '27 days'),
('00000000-0000-0000-0000-000000000012', 'Alia Bhatt', 'alia.bhatt@gmail.com', '6812345670', 'c1111111-1111-1111-1111-111111111111', NULL, 'PHONE', 'APPLICATION_STARTED', false, NULL, NOW() - INTERVAL '32 days', NOW() - INTERVAL '24 days'),
('00000000-0000-0000-0000-000000000013', 'Varun Dhawan', 'varun.d@gmail.com', '9712345670', 'a1111111-1111-1111-1111-111111111111', NULL, 'EMAIL_CAMPAIGN', 'APPLICATION_STARTED', false, NULL, NOW() - INTERVAL '31 days', NOW() - INTERVAL '25 days'),
('00000000-0000-0000-0000-000000000014', 'Siddharth Malhotra', 'siddharth.m@gmail.com', '8712345670', 'b2222222-2222-2222-2222-222222222222', 'B.Sc CS', 'SOCIAL_MEDIA', 'APPLICATION_STARTED', false, NULL, NOW() - INTERVAL '30 days', NOW() - INTERVAL '22 days'),
('00000000-0000-0000-0000-000000000015', 'Kiara Advani', 'kiara.a@gmail.com', '7712345670', 'c2222222-2222-2222-2222-222222222222', 'Economics', 'OTHER', 'APPLICATION_STARTED', false, NULL, NOW() - INTERVAL '29 days', NOW() - INTERVAL '21 days');

-- Leads 16-25: CONTACTED (Lead 16: LOST, Leads 17-25: CONTACTED)
INSERT INTO leads (id, full_name, email, phone, course_id, message, source, status, is_duplicate, duplicate_of_lead_id, created_at, updated_at) VALUES
('00000000-0000-0000-0000-000000000016', 'Kartik Aaryan', 'kartik.a@gmail.com', '9612345670', 'a2222222-2222-2222-2222-222222222222', NULL, 'WEBSITE_FORM', 'LOST', false, NULL, NOW() - INTERVAL '28 days', NOW() - INTERVAL '18 days'),
('00000000-0000-0000-0000-000000000017', 'Sara Ali Khan', 'sara.k@gmail.com', '8612345670', 'b3333333-3333-3333-3333-333333333333', NULL, 'REFERRAL', 'CONTACTED', false, NULL, NOW() - INTERVAL '27 days', NOW() - INTERVAL '19 days'),
('00000000-0000-0000-0000-000000000018', 'Janhvi Kapoor', 'janhvi.k@gmail.com', '7612345670', 'a3333333-3333-3333-3333-333333333333', NULL, 'WALK_IN', 'CONTACTED', false, NULL, NOW() - INTERVAL '26 days', NOW() - INTERVAL '18 days'),
('00000000-0000-0000-0000-000000000019', 'Ishaan Khatter', 'ishaan.k@gmail.com', '6612345670', 'b1111111-1111-1111-1111-111111111111', NULL, 'PHONE', 'CONTACTED', false, NULL, NOW() - INTERVAL '25 days', NOW() - INTERVAL '17 days'),
('00000000-0000-0000-0000-000000000020', 'Ananya Panday', 'ananya.p@gmail.com', '9512345670', 'c1111111-1111-1111-1111-111111111111', NULL, 'EMAIL_CAMPAIGN', 'CONTACTED', false, NULL, NOW() - INTERVAL '24 days', NOW() - INTERVAL '16 days'),
('00000000-0000-0000-0000-000000000021', 'Tiger Shroff', 'tiger.s@gmail.com', '8512345670', 'b2222222-2222-2222-2222-222222222222', NULL, 'SOCIAL_MEDIA', 'CONTACTED', false, NULL, NOW() - INTERVAL '23 days', NOW() - INTERVAL '15 days'),
('00000000-0000-0000-0000-000000000022', 'Disha Patani', 'disha.p@gmail.com', '7512345670', 'c2222222-2222-2222-2222-222222222222', NULL, 'OTHER', 'CONTACTED', false, NULL, NOW() - INTERVAL '22 days', NOW() - INTERVAL '14 days'),
('00000000-0000-0000-0000-000000000023', 'Kriti Sanon', 'kriti.s@gmail.com', '6512345670', 'a1111111-1111-1111-1111-111111111111', NULL, 'WEBSITE_FORM', 'CONTACTED', false, NULL, NOW() - INTERVAL '21 days', NOW() - INTERVAL '13 days'),
('00000000-0000-0000-0000-000000000024', 'Rajkummar Rao', 'rajkummar.r@gmail.com', '9412345670', 'b2222222-2222-2222-2222-222222222222', NULL, 'REFERRAL', 'CONTACTED', false, NULL, NOW() - INTERVAL '20 days', NOW() - INTERVAL '12 days'),
('00000000-0000-0000-0000-000000000025', 'Ayushmann Khurrana', 'ayushmann.k@gmail.com', '8412345670', 'a2222222-2222-2222-2222-222222222222', NULL, 'WALK_IN', 'CONTACTED', false, NULL, NOW() - INTERVAL '19 days', NOW() - INTERVAL '11 days');

-- Leads 26-40: NEW (Lead 26: LOST, Leads 27-40: NEW)
-- Within this, we will place 2 duplicate leads:
-- - Lead 39: duplicate of Lead 1 (same email, created within 30 days of lead 1? Wait, lead 1 created 50 days ago. Let's make Lead 39 a duplicate of Lead 25: same phone, created 5 days after lead 25)
-- - Lead 40: duplicate of Lead 24: same email, created 3 days after lead 24
INSERT INTO leads (id, full_name, email, phone, course_id, message, source, status, is_duplicate, duplicate_of_lead_id, created_at, updated_at) VALUES
('00000000-0000-0000-0000-000000000026', 'Vicky Kaushal', 'vicky.k@gmail.com', '7412345670', 'b3333333-3333-3333-3333-333333333333', NULL, 'PHONE', 'LOST', false, NULL, NOW() - INTERVAL '18 days', NOW() - INTERVAL '10 days'),
('00000000-0000-0000-0000-000000000027', 'Katrina Kaif', 'katrina.k@gmail.com', '6412345670', 'a3333333-3333-3333-3333-333333333333', NULL, 'EMAIL_CAMPAIGN', 'NEW', false, NULL, NOW() - INTERVAL '17 days', NOW() - INTERVAL '17 days'),
('00000000-0000-0000-0000-000000000028', 'Ranbir Kapoor', 'ranbir.k@gmail.com', '9312345670', 'b1111111-1111-1111-1111-111111111111', NULL, 'SOCIAL_MEDIA', 'NEW', false, NULL, NOW() - INTERVAL '16 days', NOW() - INTERVAL '16 days'),
('00000000-0000-0000-0000-000000000029', 'Shraddha Kapoor', 'shraddha.k@gmail.com', '8312345670', 'c1111111-1111-1111-1111-111111111111', NULL, 'OTHER', 'NEW', false, NULL, NOW() - INTERVAL '15 days', NOW() - INTERVAL '15 days'),
('00000000-0000-0000-0000-000000000030', 'Aditya Roy Kapur', 'aditya.r@gmail.com', '7312345670', 'b2222222-2222-2222-2222-222222222222', NULL, 'WEBSITE_FORM', 'NEW', false, NULL, NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days'),
('00000000-0000-0000-0000-000000000031', 'Taapsee Pannu', 'taapsee.p@gmail.com', '6312345670', 'c2222222-2222-2222-2222-222222222222', NULL, 'REFERRAL', 'NEW', false, NULL, NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days'),
('00000000-0000-0000-0000-000000000032', 'Bhumi Pednekar', 'bhumi.p@gmail.com', '9212345670', 'a1111111-1111-1111-1111-111111111111', NULL, 'WALK_IN', 'NEW', false, NULL, NOW() - INTERVAL '12 days', NOW() - INTERVAL '12 days'),
('00000000-0000-0000-0000-000000000033', 'Yami Gautam', 'yami.g@gmail.com', '8212345670', 'b2222222-2222-2222-2222-222222222222', NULL, 'PHONE', 'NEW', false, NULL, NOW() - INTERVAL '11 days', NOW() - INTERVAL '11 days'),
('00000000-0000-0000-0000-000000000034', 'Sanya Malhotra', 'sanya.m@gmail.com', '7212345670', 'a2222222-2222-2222-2222-222222222222', NULL, 'EMAIL_CAMPAIGN', 'NEW', false, NULL, NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days'),
('00000000-0000-0000-0000-000000000035', 'Radhika Apte', 'radhika.a@gmail.com', '6212345670', 'b3333333-3333-3333-3333-333333333333', NULL, 'SOCIAL_MEDIA', 'NEW', false, NULL, NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days'),
('00000000-0000-0000-0000-000000000036', 'Pankaj Tripathi', 'pankaj.t@gmail.com', '9112345670', 'a3333333-3333-3333-3333-333333333333', NULL, 'OTHER', 'NEW', false, NULL, NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days'),
('00000000-0000-0000-0000-000000000037', 'Manoj Bajpayee', 'manoj.b@gmail.com', '8112345670', 'b1111111-1111-1111-1111-111111111111', NULL, 'WEBSITE_FORM', 'NEW', false, NULL, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days'),
('00000000-0000-0000-0000-000000000038', 'Nawazuddin Siddiqui', 'nawaz.s@gmail.com', '7112345670', 'c1111111-1111-1111-1111-111111111111', NULL, 'REFERRAL', 'NEW', false, NULL, NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days'),
-- Duplicate of Lead 25 (ayushmann.k@gmail.com, phone 8412345670, created 19 days ago). This lead has same phone, created 14 days ago (5 days later)
('00000000-0000-0000-0000-000000000039', 'Ayushmann Duplicate', 'ayushmann.dup@gmail.com', '8412345670', 'a2222222-2222-2222-2222-222222222222', 'Duplicate test phone', 'WALK_IN', 'NEW', true, '00000000-0000-0000-0000-000000000025', NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days'),
-- Duplicate of Lead 24 (rajkummar.r@gmail.com, phone 9412345670, created 20 days ago). This lead has same email, created 17 days ago (3 days later)
('00000000-0000-0000-0000-000000000040', 'Rajkummar Duplicate', 'rajkummar.r@gmail.com', '9000000000', 'b2222222-2222-2222-2222-222222222222', 'Duplicate test email', 'WEBSITE_FORM', 'NEW', true, '00000000-0000-0000-0000-000000000024', NOW() - INTERVAL '17 days', NOW() - INTERVAL '17 days');


-- Lead Status History Seed
-- Must reflect every status a lead has EVER been in.
-- For every lead, we must at least seed its creation: NEW.
-- And then sequentially add transitions.

-- Lead 1-4: NEW -> CONTACTED -> APPLICATION_STARTED -> APPLICATION_SUBMITTED -> ADMITTED
-- Lead 1
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000001', NULL, 'NEW', NULL, NOW() - INTERVAL '50 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '48 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'CONTACTED', 'APPLICATION_STARTED', NULL, NOW() - INTERVAL '45 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'APPLICATION_STARTED', 'APPLICATION_SUBMITTED', NULL, NOW() - INTERVAL '42 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000001', 'APPLICATION_SUBMITTED', 'ADMITTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '40 days');

-- Lead 2
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000002', NULL, 'NEW', NULL, NOW() - INTERVAL '48 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000002', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '46 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000002', 'CONTACTED', 'APPLICATION_STARTED', NULL, NOW() - INTERVAL '44 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000002', 'APPLICATION_STARTED', 'APPLICATION_SUBMITTED', NULL, NOW() - INTERVAL '40 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000002', 'APPLICATION_SUBMITTED', 'ADMITTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '38 days');

-- Lead 3
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000003', NULL, 'NEW', NULL, NOW() - INTERVAL '45 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000003', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '43 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000003', 'CONTACTED', 'APPLICATION_STARTED', NULL, NOW() - INTERVAL '40 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000003', 'APPLICATION_STARTED', 'APPLICATION_SUBMITTED', NULL, NOW() - INTERVAL '38 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000003', 'APPLICATION_SUBMITTED', 'ADMITTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '35 days');

-- Lead 4
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000004', NULL, 'NEW', NULL, NOW() - INTERVAL '42 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000004', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '40 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000004', 'CONTACTED', 'APPLICATION_STARTED', NULL, NOW() - INTERVAL '37 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000004', 'APPLICATION_STARTED', 'APPLICATION_SUBMITTED', NULL, NOW() - INTERVAL '34 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000004', 'APPLICATION_SUBMITTED', 'ADMITTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '32 days');

-- Lead 5: NEW -> CONTACTED -> APPLICATION_STARTED -> APPLICATION_SUBMITTED -> REJECTED
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000005', NULL, 'NEW', NULL, NOW() - INTERVAL '40 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000005', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '38 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000005', 'CONTACTED', 'APPLICATION_STARTED', NULL, NOW() - INTERVAL '35 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000005', 'APPLICATION_STARTED', 'APPLICATION_SUBMITTED', NULL, NOW() - INTERVAL '32 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000005', 'APPLICATION_SUBMITTED', 'REJECTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '30 days');

-- Lead 6-8: NEW -> CONTACTED -> APPLICATION_STARTED -> APPLICATION_SUBMITTED
-- Lead 6
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000006', NULL, 'NEW', NULL, NOW() - INTERVAL '39 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000006', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '37 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000006', 'CONTACTED', 'APPLICATION_STARTED', NULL, NOW() - INTERVAL '34 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000006', 'APPLICATION_STARTED', 'APPLICATION_SUBMITTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '31 days');

-- Lead 7
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000007', NULL, 'NEW', NULL, NOW() - INTERVAL '38 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000007', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '35 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000007', 'CONTACTED', 'APPLICATION_STARTED', NULL, NOW() - INTERVAL '32 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000007', 'APPLICATION_STARTED', 'APPLICATION_SUBMITTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '28 days');

-- Lead 8
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000008', NULL, 'NEW', NULL, NOW() - INTERVAL '37 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000008', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '34 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000008', 'CONTACTED', 'APPLICATION_STARTED', NULL, NOW() - INTERVAL '31 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000008', 'APPLICATION_STARTED', 'APPLICATION_SUBMITTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '29 days');

-- Lead 9: NEW -> CONTACTED -> APPLICATION_STARTED -> LOST
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000009', NULL, 'NEW', NULL, NOW() - INTERVAL '35 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000009', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '32 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000009', 'CONTACTED', 'APPLICATION_STARTED', NULL, NOW() - INTERVAL '28 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000009', 'APPLICATION_STARTED', 'LOST', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '25 days');

-- Leads 10-15: NEW -> CONTACTED -> APPLICATION_STARTED
-- Lead 10
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000010', NULL, 'NEW', NULL, NOW() - INTERVAL '34 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000010', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '30 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000010', 'CONTACTED', 'APPLICATION_STARTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '26 days');

-- Lead 11
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000011', NULL, 'NEW', NULL, NOW() - INTERVAL '33 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000011', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '29 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000011', 'CONTACTED', 'APPLICATION_STARTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '27 days');

-- Lead 12
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000012', NULL, 'NEW', NULL, NOW() - INTERVAL '32 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000012', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '28 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000012', 'CONTACTED', 'APPLICATION_STARTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '24 days');

-- Lead 13
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000013', NULL, 'NEW', NULL, NOW() - INTERVAL '31 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000013', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '27 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000013', 'CONTACTED', 'APPLICATION_STARTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '25 days');

-- Lead 14
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000014', NULL, 'NEW', NULL, NOW() - INTERVAL '30 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000014', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '26 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000014', 'CONTACTED', 'APPLICATION_STARTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '22 days');

-- Lead 15
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000015', NULL, 'NEW', NULL, NOW() - INTERVAL '29 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000015', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '25 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000015', 'CONTACTED', 'APPLICATION_STARTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '21 days');

-- Lead 16: NEW -> CONTACTED -> LOST
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000016', NULL, 'NEW', NULL, NOW() - INTERVAL '28 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000016', 'NEW', 'CONTACTED', NULL, NOW() - INTERVAL '22 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000016', 'CONTACTED', 'LOST', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '18 days');

-- Leads 17-25: NEW -> CONTACTED
-- Lead 17
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000017', NULL, 'NEW', NULL, NOW() - INTERVAL '27 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000017', 'NEW', 'CONTACTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '19 days');

-- Lead 18
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000018', NULL, 'NEW', NULL, NOW() - INTERVAL '26 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000018', 'NEW', 'CONTACTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '18 days');

-- Lead 19
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000019', NULL, 'NEW', NULL, NOW() - INTERVAL '25 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000019', 'NEW', 'CONTACTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '17 days');

-- Lead 20
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000020', NULL, 'NEW', NULL, NOW() - INTERVAL '24 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000020', 'NEW', 'CONTACTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '16 days');

-- Lead 21
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000021', NULL, 'NEW', NULL, NOW() - INTERVAL '23 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000021', 'NEW', 'CONTACTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '15 days');

-- Lead 22
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000022', NULL, 'NEW', NULL, NOW() - INTERVAL '22 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000022', 'NEW', 'CONTACTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '14 days');

-- Lead 23
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000023', NULL, 'NEW', NULL, NOW() - INTERVAL '21 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000023', 'NEW', 'CONTACTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '13 days');

-- Lead 24
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000024', NULL, 'NEW', NULL, NOW() - INTERVAL '20 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000024', 'NEW', 'CONTACTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '12 days');

-- Lead 25
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000025', NULL, 'NEW', NULL, NOW() - INTERVAL '19 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000025', 'NEW', 'CONTACTED', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '11 days');

-- Lead 26: NEW -> LOST
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000026', NULL, 'NEW', NULL, NOW() - INTERVAL '18 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000026', 'NEW', 'LOST', 'd0000000-0000-0000-0000-000000000001', NOW() - INTERVAL '10 days');

-- Leads 27-40: NEW
INSERT INTO lead_status_history (id, lead_id, from_status, to_status, changed_by, changed_at) VALUES
(gen_random_uuid(), '00000000-0000-0000-0000-000000000027', NULL, 'NEW', NULL, NOW() - INTERVAL '17 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000028', NULL, 'NEW', NULL, NOW() - INTERVAL '16 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000029', NULL, 'NEW', NULL, NOW() - INTERVAL '15 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000030', NULL, 'NEW', NULL, NOW() - INTERVAL '14 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000031', NULL, 'NEW', NULL, NOW() - INTERVAL '13 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000032', NULL, 'NEW', NULL, NOW() - INTERVAL '12 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000033', NULL, 'NEW', NULL, NOW() - INTERVAL '11 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000034', NULL, 'NEW', NULL, NOW() - INTERVAL '10 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000035', NULL, 'NEW', NULL, NOW() - INTERVAL '9 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000036', NULL, 'NEW', NULL, NOW() - INTERVAL '8 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000037', NULL, 'NEW', NULL, NOW() - INTERVAL '7 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000038', NULL, 'NEW', NULL, NOW() - INTERVAL '6 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000039', NULL, 'NEW', NULL, NOW() - INTERVAL '14 days'),
(gen_random_uuid(), '00000000-0000-0000-0000-000000000040', NULL, 'NEW', NULL, NOW() - INTERVAL '17 days');

-- Seed dynamic page views (for site health / page traffic)
INSERT INTO page_views (id, page_path, viewed_at, session_id, utm_source) VALUES
(gen_random_uuid(), '/courses', NOW() - INTERVAL '10 days', 'sess-1', 'google'),
(gen_random_uuid(), '/courses/bcom-hons', NOW() - INTERVAL '10 days', 'sess-1', 'google'),
(gen_random_uuid(), '/courses', NOW() - INTERVAL '9 days', 'sess-2', 'facebook'),
(gen_random_uuid(), '/courses/bsc-cs', NOW() - INTERVAL '9 days', 'sess-2', 'facebook'),
(gen_random_uuid(), '/faculty', NOW() - INTERVAL '8 days', 'sess-3', NULL),
(gen_random_uuid(), '/courses', NOW() - INTERVAL '7 days', 'sess-4', 'google'),
(gen_random_uuid(), '/placements', NOW() - INTERVAL '6 days', 'sess-5', NULL),
(gen_random_uuid(), '/courses/bba', NOW() - INTERVAL '5 days', 'sess-6', 'instagram'),
(gen_random_uuid(), '/courses', NOW() - INTERVAL '4 days', 'sess-7', 'google'),
(gen_random_uuid(), '/courses/bsc-cs', NOW() - INTERVAL '3 days', 'sess-8', 'google'),
(gen_random_uuid(), '/courses/bsc-cs', NOW() - INTERVAL '2 days', 'sess-9', 'facebook'),
(gen_random_uuid(), '/placements', NOW() - INTERVAL '1 days', 'sess-10', NULL);

-- Seed form submission events (for success rate calculation)
-- 15 events: 12 SUCCESS, 2 VALIDATION_FAILURE, 1 SERVER_ERROR (Success rate = 12 / 15 * 100 = 80%)
INSERT INTO form_submission_events (id, form_type, status, error_detail, submitted_at) VALUES
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '15 days'),
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '14 days'),
(gen_random_uuid(), 'ENQUIRY', 'VALIDATION_FAILURE', 'fullName: size must be between 2 and 100', NOW() - INTERVAL '13 days'),
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '12 days'),
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '11 days'),
(gen_random_uuid(), 'ENQUIRY', 'SERVER_ERROR', 'Database connection timeout', NOW() - INTERVAL '10 days'),
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '9 days'),
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '8 days'),
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '7 days'),
(gen_random_uuid(), 'ENQUIRY', 'VALIDATION_FAILURE', 'phone: invalid Indian phone format', NOW() - INTERVAL '6 days'),
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '5 days'),
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '4 days'),
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '3 days'),
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '2 days'),
(gen_random_uuid(), 'ENQUIRY', 'SUCCESS', NULL, NOW() - INTERVAL '1 days');
