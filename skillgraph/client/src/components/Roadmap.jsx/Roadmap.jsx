import { useEffect, useState } from "react";

import { getRoadmap } from "../../services/api";

import SkillExplorer from "../SkillExplorer";
import RoadmapStage from "./RoadmapStage";

function Roadmap({ career }) {
  const [roadmap, setRoadmap] = useState(null);

  const [selectedSkill, setSelectedSkill] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =========================================================
  // LOAD ROADMAP
  // =========================================================

  useEffect(() => {
    if (!career) {
      return;
    }

    loadRoadmap();
  }, [career]);

  const loadRoadmap = async () => {
    try {
      setLoading(true);
      setError("");

      // Clear previously selected skill
      setSelectedSkill(null);

      console.log(
        "Loading roadmap:",
        career
      );

      const response =
        await getRoadmap(career);

      console.log(
        "Roadmap API response:",
        response
      );

      if (!response.success) {
        throw new Error(
          response.message ||
            "Failed to load roadmap"
        );
      }

      setRoadmap(response.data);

    } catch (error) {
      console.error(
        "Roadmap error:",
        error
      );

      setError(
        error.message ||
          "Unable to load roadmap"
      );

      setRoadmap(null);

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="roadmap-state">
        Loading roadmap...
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="roadmap-state error">
        {error}
      </div>
    );
  }

  // =========================================================
  // EMPTY
  // =========================================================

  if (!roadmap) {
    return (
      <div className="roadmap-state">
        No roadmap found.
      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="roadmap-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="roadmap-header">

        <div>

          <p className="roadmap-label">
            CAREER ROADMAP
          </p>

          <h1>
            {roadmap.title}
          </h1>

          {roadmap.description && (
            <p>
              {roadmap.description}
            </p>
          )}

        </div>

        {/* PROGRESS */}

        <div className="roadmap-progress">

          <span>
            Progress
          </span>

          <strong>
            0%
          </strong>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: "0%",
              }}
            />

          </div>

        </div>

      </div>


      {/* =====================================================
          ROADMAP CONTENT
      ===================================================== */}

      <div className="roadmap-layout">

        <main className="roadmap-content">

          {roadmap.stages?.map(
            (stage, index) => (

              <RoadmapStage
                key={`${stage.name}-${index}`}
                stage={stage}
                isLast={
                  index ===
                  roadmap.stages.length - 1
                }
                onSkillClick={
                  setSelectedSkill
                }
              />

            )
          )}

        </main>


        {/* ===================================================
            AI SKILL EXPLORER
        =================================================== */}

        {selectedSkill && (
          <SkillExplorer
            skill={selectedSkill}
            onClose={() =>
              setSelectedSkill(null)
            }
          />
        )}

      </div>

    </div>
  );
}

export default Roadmap;