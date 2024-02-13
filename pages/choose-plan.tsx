import React from "react";
import { ImBook } from "react-icons/im";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";

import { styled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Footer from "@/components/Footer";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  borderBottom: "1px solid lightgray",
  padding: "16px 0",
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreIcon sx={{ fontSize: "2.2rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#fff",
  fontSize: "24px",
  fontWeight: "500",
  color: "#032b41",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  fontSize: "16px",
  color: "#394547",
}));

export default function ChoosePlan() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <section id="plan__landing">
        <div className="plan__header">
          <h1 className="plan__header--title">Get unlimited access to many amazing books to read</h1>
          <h4 className="plan__header--subtitle">Turn ordinary moments into amazing learning opportunities</h4>
          <figure className="plan__header--img-mask">
            <img className="plan__header--img" src="/assets/plan_img.png" alt="plan" />
          </figure>
        </div>

        <div className="container">
          <div className="row">
            <div className="plan__detail">
              <ImBook />
              <div className="plan__detail--text">
                <b>Key ideas in a few min</b> with many books to read
              </div>
            </div>
            <div className="plan__detail">
              <RiPlantFill />
              <div className="plan__detail--text">
                <b>3 million</b> people growing with Summarist everyday
              </div>
            </div>
            <div className="plan__detail">
              <FaHandshake />
              <div className="plan__detail--text">
                <b>Precise recommendations</b> collections curated by experts
              </div>
            </div>

            <div className="plan__title">Choose the plan that fits you</div>
            <div className="plan__card">
              <div className="plan__card--select">
                <div className="plan__card--select-circle"></div>
              </div>
              <div className="plan__card--description">
                <div className="plan__card--title">Premium Plus Yearly</div>
                <div className="plan__card--price">$99.99/year</div>
                <div className="plan__card--trial">
                  7-day free trial included
                </div>
              </div>
            </div>

            <div className="break__wrapper">
              <div className="line"></div>
              <div className="or">or</div>
              <div className="line"></div>
            </div>

            <div className="plan__card">
              <div className="plan__card--select">
                <div className="plan__card--select-circle"></div>
              </div>
              <div className="plan__card--description">
                <div className="plan__card--title">Premium Plus Yearly</div>
                <div className="plan__card--price">$99.99/year</div>
                <div className="plan__card--trial">
                  7-day free trial included
                </div>
              </div>
            </div>
            <div className="trial__wrapper">
              <div className="plan__button">Start your 7-day free trial</div>
              <div className="plan__detail">
                Cancel your trial at any time before it ends, and you won't be
                charged.
              </div>
            </div>

            <Accordion
              defaultExpanded
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary>
                How does the 7-day free trial work?
              </AccordionSummary>
              <AccordionDetails>
                Begin your complimentary 7-day trial with a Summarist annual
                membership. You are under no obligation to continue your
                subscription, and you will only be billed when the trial period
                expires. With Premium access, you can learn at your own pace and
                as frequently as you desire, and you may terminate your
                subscription prior to the conclusion of the 7-day free trial.
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary>
                Can I switch subscriptions from monthly to yearly, or yearly to
                monthly?
              </AccordionSummary>
              <AccordionDetails>
                While an annual plan is active, it is not feasible to switch to
                a monthly plan. However, once the current month ends,
                transitioning from a monthly plan to an annual plan is an
                option.
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary>
                What's included in the Premium plan?
              </AccordionSummary>
              <AccordionDetails>
                Premium membership provides you with the ultimate Summarist
                experience, including unrestricted entry to many best-selling
                books high-quality audio, the ability to download titles for
                offline reading, and the option to send your reads to your
                Kindle.
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary>
                Can I cancel during my trial or subscription?
              </AccordionSummary>
              <AccordionDetails>
                You will not be charged if you cancel your trial before its
                conclusion. While you will not have complete access to the
                entire Summarist library, you can still expand your knowledge
                with one curated book per day.
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
