import React, { useState } from "react";
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
import { initFirebase } from "@/firebase";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import { getCheckoutUrl } from "@/stripe/stripePayment";

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
  const app = initFirebase();
  const auth = getAuth(app);

  const email = auth.currentUser?.email
  const router = useRouter();
  

  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [selectedPlan, setSelectedPlan] = useState<string | null>("premium-plus");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const upgradeToPremium = async () => {
    const priceId = "price_1OjRrpH8u6qhzYvmrMPh60HJ";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl)
  }
  
  const upgradeToPremiumPlus = async () => {
    const priceId = "price_1OjRrNH8u6qhzYvm4CQe7HIz";
    const checkoutUrl = await getCheckoutUrl(app, priceId);
    router.push(checkoutUrl)
  }

  return (
    <>
      <section id="plan__landing">
        <div className="plan__header">
          <h1 className="plan__header--title">
            Get unlimited access to many amazing books to read
          </h1>
          <h4 className="plan__header--subtitle">
            Turn ordinary moments into amazing learning opportunities
          </h4>
          <figure className="plan__header--img-mask">
            <img
              className="plan__header--img"
              src="/assets/plan_img.png"
              alt="plan"
            />
          </figure>
        </div>

        <div className="container">
          <div className="row">
            <div className="plan__details--wrapper">
              <div className="plan__detail">
                <ImBook className="plan__detail--icon" />
                <div className="plan__detail--text">
                  <b>Key ideas in a few min</b> with many books to read
                </div>
              </div>
              <div className="plan__detail">
                <RiPlantFill className="plan__detail--icon" />
                <div className="plan__detail--text">
                  <b>3 million</b> people growing with Summarist everyday
                </div>
              </div>
              <div className="plan__detail">
                <FaHandshake className="plan__detail--icon" />
                <div className="plan__detail--text">
                  <b>Precise recommendations</b> collections curated by experts
                </div>
              </div>
            </div>

            <div className="plan__title">Choose the plan that fits you</div>
            <div
              onClick={() => setSelectedPlan("premium-plus")}
              className={`plan__card ${
                selectedPlan === "premium-plus" ? "plan__card--active" : ""
              }`}
            >
              <div className="plan__card--select">
                {selectedPlan === "premium-plus" && (
                  <div className="plan__card--select-circle"></div>
                )}
              </div>
              <div className="plan__card--description">
                <div className="plan__card--title">Premium Plus Yearly</div>
                <div className="plan__card--price">$99.99/year</div>
                <div className="plan__card--trial">
                  7-day free trial included
                </div>
              </div>
            </div>

            <div className="break__wrapper plan__break--wrapper">
              <div className="line plan__line1"></div>
              <div className="or plan__or">or</div>
              <div className="line plan__line2"></div>
            </div>

            <div
              onClick={() => setSelectedPlan("premium-monthly")}
              className={`plan__card ${
                selectedPlan === "premium-monthly" ? "plan__card--active" : ""
              }`}
            >
              <div className="plan__card--select">
                {selectedPlan === "premium-monthly" && (
                  <div className="plan__card--select-circle"></div>
                )}
              </div>
              <div className="plan__card--description">
                <div className="plan__card--title">Premium Monthly</div>
                <div className="plan__card--price">$9.99/month</div>
                <div className="plan__card--trial">No trial included</div>
              </div>
            </div>
            <div className="trial__wrapper">
              <button onClick={selectedPlan === "premium-plus" ? upgradeToPremiumPlus : upgradeToPremium} className="plan__button">
                {selectedPlan === "premium-plus"
                  ? "Start your 7-day free trial"
                  : "Start your first month"}
              </button>
              <div className="plan__disclaimer">
                {selectedPlan === "premium-plus"
                  ? "Cancel your trial at any time before it ends, and you won't be charged."
                  : "30-day money back guarantee, no questions asked."}
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
                What&apos;s included in the Premium plan?
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
