# Sequelize
Exploring the sequelize framework

# Run
npm install
npm run start

# DB 
Database targetted is MySQL, using an ORM wrapper - Sequelize.js and sequelize.

# configuration
An env file is required for database configuration

# Concept : SCHOOL, STUDENT, Optional_Subject, Extracurricular_Activities

1. ONE-ONE Association : Each student will have an Address & Parents_info 
2. ONE-MANY Association : One Optional_subject will belong to many students but each student can select only one Optional_subject 
3. MANY-MANY Association : Each students belongs to many Extracurricular_Activities ['chess', 'cricket', ...] and 
                           Each Extracurricular_Activity ['football', 'badminton', ...] belongs to many students

