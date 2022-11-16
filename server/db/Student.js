const Sequelize = require("sequelize");
const db = require("./db");

const Student = db.define('student', {
    firstName: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true, // may need to remove this
        validate: {
            notEmpty: true,
            isEmail:true
        }
    },
    imageURL: {
        type: Sequelize.STRING,
        defaultValue:'https://daily.jstor.org/wp-content/uploads/2022/07/bugs_bunny_scholarship_is_a_wascally_wesearch_wabbit_hole_1050x700.jpg',
        // defaultValue: "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg",
        validate: {
            isUrl: true,
        }
    },
    gpa: {
        type: Sequelize.DECIMAL,
        defaultValue:0.0,
        validate: {
            min:0.0,
            max:4.0
        }
    }
});

module.exports = Student;