import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CampusInfo = ({campus}) => {
    return (
        <div>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                // aria-controls="panel1a-content"
                // id="panel1a-header"
                >
                <Typography>About</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    {campus.description}
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                // aria-controls="panel1a-content"
                // id="panel1a-header"
                >
                <Typography>Academics</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    We offer small class sizes, dedicated faculty, and personalized instruction in over 30 associate degree and certificate programs. Eighty-six percent of our students enrolled in career-oriented programs receive real-world experience through internships. Students can also seamlessly transfer to many four-year colleges and universities. In fact, graduates can pursue their bachelor's degrees on our campus through our Regional Higher Education Center.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                // aria-controls="panel1a-content"
                // id="panel1a-header"
                >
                <Typography>Enrollment</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    {campus.students.length} full time students
                </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default CampusInfo;