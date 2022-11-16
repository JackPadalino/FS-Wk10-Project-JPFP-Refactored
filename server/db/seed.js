const {
    db,
    Student,
    Campus
} = require("./");

const seed = async () => {
    // Clear out any old data
    await db.sync({ force: true });
    console.log('STARTING SEED...')

    // creating campus instances
    let campus = {
            name: 'Foo State',
            imageURL:'https://www.aclu.org/sites/default/files/field_image/web17-collegecampus-socialshare-1200x628.jpg',
            address:'191 Chalford Rd Rochester AK 10024',
            state:'Alaska',
        };
    const fooState = await Campus.create(campus);
    campus = {
            name: 'Bar University',
            imageURL: 'https://www.fredonia.edu/sites/default/files/styles/1110w/public/content/article/featured/Fall2019_AerialCampus-for-CR.jpg?h=d4d5951b&itok=4U4UPSzW',
            address:'492 West 146th Street New York NY 10031',
            state:'New York',
        };
    const barUniversity = await Campus.create(campus);
    campus = {
            name: 'SOL College',
            imageURL: 'https://www.cappex.com/sites/default/files/styles/college_hero_desktop/public/images/hero/college/166027_hero.jpg?itok=3zG-Wu_v',
            address:'321 Cowboy Ln Yulis TX 12372',
            state:'Texas',
        };
    const solCollege = await Campus.create(campus);

    // creating student instances
    const createStudents = async()=>{
        let students = [
            {
                firstName: 'Moe',
                lastName: 'Money',
                email: 'moProblems@gmail.com',
                //imageURL: ,
                gpa: 1.5,
                campusId:fooState.id
            },
            {
                firstName: 'Lucy',
                lastName: 'Innasky',
                email: 'WitDiamonds@gmail.com',
                //imageURL: ,
                gpa:3.2
            },
            {
                firstName: 'Ethyl',
                lastName: 'Ene',
                email: 'dupont@gmail.com',
                //imageURL: ,
                gpa:3.0,
                campusId:solCollege.id
            },
            {
                firstName:'Larry',
                lastName: 'Larryson',
                email: 'BigLar@gmail.com',
                //imageURL: ,
                gpa: 2.7,
                campusId:solCollege.id
            },
            {
                firstName:'Snerd',
                lastName: 'Snerdyson',
                email: 'JPSnerd@gmail.com',
                //imageURL: ,
                gpa: 3.4
            },
            {
                firstName: 'Johnny',
                lastName: 'Feedback',
                email: 'OneMic@gmail.com',
                //imageURL: ,
                gpa:2.9,
                campusId:fooState.id
            },
            {
                firstName:'Cross',
                lastName: 'Bridges',
                email: 'OverUnder@gmail.com',
                //imageURL: ,
                gpa: 2.1,
                campusId:solCollege.id
            },
            {
                firstName:'T',
                lastName: 'Rex',
                email: 'FeelinJurassic@hotmail.com',
                //imageURL: ,
                gpa: 3.9,
                campusId:barUniversity.id
            },
            // change change names and emails here
            {
                firstName: 'Matti',
                lastName: 'Padalinio',
                email: 'Mpadalino@gmail.com',
                //imageURL: ,
                gpa: 1.5,
                campusId:fooState.id
            },
            {
                firstName: 'Roxy',
                lastName: 'Doggo',
                email: 'ChaseCars@gmail.com',
                //imageURL: ,
                gpa:3.2
            },
            {
                firstName: 'Brad',
                lastName: 'Pitt',
                email: 'BPittzzz@gmail.com',
                //imageURL: ,
                gpa:3.0,
                campusId:solCollege.id
            },
            {
                firstName:'Buzz',
                lastName: 'Aldrin',
                email: 'NeilWasFirst@gmail.com',
                //imageURL: ,
                gpa: 2.7,
                campusId:solCollege.id
            },
            {
                firstName:'Marsh',
                lastName: 'Anne',
                email: 'TakeMeToYourLeader@gmail.com',
                //imageURL: ,
                gpa: 3.4
            },
            {
                firstName: 'Swing',
                lastName: 'Doors',
                email: 'CreakyDoor@gmail.com',
                //imageURL: ,
                gpa:2.9,
                campusId:fooState.id
            },
            {
                firstName:'Two',
                lastName: 'Tired',
                email: 'WhyCouldntTheBicycleStandUp@gmail.com',
                //imageURL: ,
                gpa: 2.1,
                campusId:solCollege.id
            },
            {
                firstName:'Veloci',
                lastName: 'Raptor',
                email: 'CleverGurl@hotmail.com',
                //imageURL: ,
                gpa: 3.9,
                campusId:barUniversity.id
            },
        ];
        const studentPromises = students.map((student)=>Student.create(student));
        await Promise.all(studentPromises);
    };

    await createStudents();

    console.log("DONE RUNNING SEED...");
};

seed();