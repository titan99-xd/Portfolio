import { useNavigate } from "react-router-dom";
import "../styles/home-project.css";

// Importing your images
import khelset_logo from "../assets/khelset_logo.png";
import comingSoon from "../assets/comingsoon.png";



interface CaseItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  client: string;
  tags: string[];
}

const cases: CaseItem[] = [
  {
    id: 1,
    image: khelset_logo,
    title: "Khelset",
    subtitle: "www.khelset.com",
    client: "Multisport Live Scoring & Tournament Management Platform",
    tags: ["#ScoreCard", "#PlayerStats", "#TournamentManagement"],
  },
  {
    id: 2,
    image: comingSoon,
    title: "Event Management Software",
    subtitle: "For seamless event planning and execution of local conferences.",
    client: "Coming Soon",
    tags: ["#Event", "#EventManagement", "#LocalEvents"],
  },
  {
    id: 3,
    image: comingSoon,
    title: "DriveMate",
    subtitle: "DriveMate is a kilometer tracker app designed to help users monitor and log their vehicle mileage for business and personal use.",
    client: "Coming Soon",
    tags: ["#Kilometer", "#Bussiness", "#WorkTravel" ],
  },
];

const FeaturedCases: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="featured-section">
      <div className="featured-container">
        <h2 className="featured-title">
          Featured <span className="title-highlight">Portfolio</span>
        </h2>

        <div className="featured-grid">
          {cases.map((item) => (
            <div key={item.id} className="featured-card">
              <img
                src={item.image}
                alt={item.title}
                className="featured-image"
              />
              <div className="featured-content">
                <h3>{item.title}</h3>
                <p className="subtitle">{item.subtitle}</p>
                <p className="client">{item.client}</p>
                <p className="tags">{item.tags.join(" ")}</p>
                <button
                  className="case-btn"
                  onClick={() => navigate("/portfolio")}
                >
                  Go To Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCases;
