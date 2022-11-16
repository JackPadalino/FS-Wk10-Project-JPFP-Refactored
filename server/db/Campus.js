const Sequelize = require("sequelize");
const db = require("./db");

const Campus = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    imageURL: {
        type: Sequelize.STRING,
        defaultValue: "https://content.manhattan.edu/admissions/1.jpg",
        validate: {
            isUrl: true,
        }
    },
    state: {
        type: Sequelize.ENUM,
        values:['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'],
        allowNull:false,
        validate: {
            notEmpty: true
        }
    },
    address: {
        type: Sequelize.STRING,
        // allowNull:false,
        // validate: {
        //     notEmpty: true
        // }
    },
    description: {
        type: Sequelize.TEXT,
        defaultValue:"The college is located upstate near the area's most notable cultural and tourism centers . The college offers one of the lowest tuition rates among community colleges in the state with over half of our graduates leaving debt free."
    }
});

module.exports = Campus;