import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import CareerSelector from "../components/CareerSelector";
import Roadmap from "../components/Roadmap.jsx/Roadmap";

import {
  getCareers,
} from "../services/api";

function Home() {
  const [careers, setCareers] = useState([]);

  const [selectedCareer, setSelectedCareer] =
    useState("");

  const [loadingCareers, setLoadingCareers] =
    useState(true);

  const [error, setError] = useState("");

  // =========================================================
  // LOAD CAREERS
  // =========================================================

  useEffect(() => {
    const loadCareers = async () => {
      try {
        setLoadingCareers(true);
        setError("");

        const response =
          await getCareers();

        console.log(
          "Careers response:",
          response
        );

        if (!response?.data) {
          throw new Error(
            "Career data is missing"
          );
        }

        setCareers(response.data);

        // Select first career automatically
        if (
          response.data.length > 0 &&
          !selectedCareer
        ) {
          setSelectedCareer(
            response.data[0].title
          );
        }

      } catch (error) {
        console.error(
          "Career loading error:",
          error
        );

        setError(
          "Unable to load careers."
        );

      } finally {
        setLoadingCareers(false);
      }
    };

    loadCareers();
  }, []);

  return (
    <>
      <Navbar />

      <main className="container">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="hero">

          <p className="eyebrow">
            CAREER ROADMAP
          </p>

          <h1>
            Build your
            <span> career path.</span>
          </h1>

          <p className="hero-description">
            Explore the skills, technologies,
            projects and opportunities you need
            to become job-ready.
          </p>

        </section>


        {/* =================================================
            CAREER SELECTOR
        ================================================= */}

        <section className="career-section">

          {loadingCareers ? (
            <div className="loading">
              Loading careers...
            </div>
          ) : (
            <CareerSelector
              careers={careers}
              selectedCareer={selectedCareer}
              onChange={setSelectedCareer}
            />
          )}

        </section>


        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="error">
            {error}
          </div>
        )}


        {/* =================================================
            ROADMAP
        ================================================= */}

        {!loadingCareers &&
          selectedCareer && (
            <section className="content-section">

              <Roadmap
                career={selectedCareer}
              />

            </section>
          )}

      </main>
    </>
  );
}

export default Home;