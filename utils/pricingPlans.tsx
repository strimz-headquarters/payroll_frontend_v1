import { PlansType } from "@/types/guestpage";
import { FaSeedling } from "react-icons/fa";
import { FaCrown, FaMedal, FaTrophy } from "react-icons/fa6";



export const plans: PlansType[] = [
    {
        name: "Basic",
        icon: <FaSeedling />,
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
            "Stream token to 5 recipients.",
            "Access to basic analytics.",
            "Basic support.",
        ],
    },
    {
        name: "Bronze",
        icon: <FaMedal />,
        monthlyPrice: 10,
        yearlyPrice: 102, // 15% discount applied
        features: [
            "Stream token to 20 recipients.",
            "Advanced analytics.",
            "Priority support.",
            "Automated subscription management.",
        ],
    },
    {
        name: "Silver",
        icon: <FaTrophy />,
        monthlyPrice: 30,
        yearlyPrice: 306, // 15% discount applied
        features: [
            "Stream token to 50 recipients.",
            "Detailed analytics dashboard.",
            "Premium support (chat and email).",
            "Customizable subscription workflows.",
            "Integration with third-party apps.",
        ],
    },
    {
        name: "Gold",
        icon: <FaCrown />,
        monthlyPrice: 50,
        yearlyPrice: 510, // 15% discount applied
        features: [
            "Stream token to unlimited recipients.",
            "Real-time advanced analytics.",
            "Dedicated account manager.",
            "White-label solutions.",
            "Priority integration requests.",
        ],
    },
];
