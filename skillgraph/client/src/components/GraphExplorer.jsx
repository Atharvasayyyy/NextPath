import { useEffect, useState } from "react";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { getCareerGraph } from "../services/api";

function GraphExplorer({ career }) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!career) {
      setNodes([]);
      setEdges([]);
      return;
    }

    loadGraph();
  }, [career]);

  const loadGraph = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCareerGraph(career);

      console.log("Graph API response:", response);

      const graphData = response.data;

      if (!Array.isArray(graphData)) {
        throw new Error(
          "Graph API did not return an array"
        );
      }

      // =====================================================
      // GET UNIQUE SKILLS
      // =====================================================

      const skills = [
        ...new Set(
          graphData
            .map((item) => item.skill)
            .filter(Boolean)
        ),
      ];

      // =====================================================
      // GET UNIQUE TECHNOLOGIES
      // =====================================================

      const technologies = [
        ...new Set(
          graphData
            .map((item) => item.technology)
            .filter(Boolean)
        ),
      ];

      // =====================================================
      // CREATE NODES
      // =====================================================

      const newNodes = [];

      // -----------------------------------------------------
      // CAREER NODE
      // -----------------------------------------------------

      newNodes.push({
        id: `career-${career}`,

        position: {
          x: 50,
          y: 300,
        },

        sourcePosition: Position.Right,
        targetPosition: Position.Left,

        data: {
          label: (
            <div className="graph-node-content">
              <span className="graph-node-type">
                CAREER
              </span>

              <strong>
                {career}
              </strong>
            </div>
          ),
        },

        style: {
          width: 220,
          padding: 16,
          borderRadius: 14,
          border: "2px solid #6366f1",
          background: "#eef2ff",
        },
      });

      // -----------------------------------------------------
      // SKILL NODES
      // -----------------------------------------------------

      skills.forEach((skill, index) => {
        newNodes.push({
          id: `skill-${skill}`,

          position: {
            x: 380,
            y: 100 + index * 180,
          },

          sourcePosition: Position.Right,
          targetPosition: Position.Left,

          data: {
            label: (
              <div className="graph-node-content">
                <span className="graph-node-type">
                  SKILL
                </span>

                <strong>
                  {skill}
                </strong>
              </div>
            ),
          },

          style: {
            width: 180,
            padding: 16,
            borderRadius: 14,
            border: "2px solid #16a34a",
            background: "#f0fdf4",
          },
        });
      });

      // -----------------------------------------------------
      // TECHNOLOGY NODES
      // -----------------------------------------------------

      technologies.forEach(
        (technology, index) => {
          newNodes.push({
            id: `technology-${technology}`,

            position: {
              x: 720,
              y: 100 + index * 180,
            },

            sourcePosition: Position.Right,
            targetPosition: Position.Left,

            data: {
              label: (
                <div className="graph-node-content">
                  <span className="graph-node-type">
                    TECHNOLOGY
                  </span>

                  <strong>
                    {technology}
                  </strong>
                </div>
              ),
            },

            style: {
              width: 190,
              padding: 16,
              borderRadius: 14,
              border: "2px solid #2563eb",
              background: "#eff6ff",
            },
          });
        }
      );

      // =====================================================
      // CREATE EDGES
      // =====================================================

      const newEdges = [];

      // -----------------------------------------------------
      // CAREER -> SKILL
      // -----------------------------------------------------

      skills.forEach((skill) => {
        newEdges.push({
          id: `career-${career}-skill-${skill}`,

          source: `career-${career}`,

          target: `skill-${skill}`,

          type: "smoothstep",

          label: "REQUIRES",

          markerEnd: {
            type: MarkerType.ArrowClosed,
          },

          style: {
            strokeWidth: 2,
          },

          labelStyle: {
            fontSize: 12,
            fontWeight: 600,
          },
        });
      });

      // -----------------------------------------------------
      // SKILL -> TECHNOLOGY
      // -----------------------------------------------------

      graphData.forEach((item) => {
        if (!item.skill || !item.technology) {
          return;
        }

        const edgeId =
          `skill-${item.skill}-technology-${item.technology}`;

        // Prevent duplicate edges
        if (
          newEdges.some(
            (edge) => edge.id === edgeId
          )
        ) {
          return;
        }

        newEdges.push({
          id: edgeId,

          source: `skill-${item.skill}`,

          target: `technology-${item.technology}`,

          type: "smoothstep",

          label: "USES",

          markerEnd: {
            type: MarkerType.ArrowClosed,
          },

          style: {
            strokeWidth: 2,
          },

          labelStyle: {
            fontSize: 12,
            fontWeight: 600,
          },
        });
      });

      console.log(
        "FINAL NODES:",
        newNodes
      );

      console.log(
        "FINAL EDGES:",
        newEdges
      );

      setNodes(newNodes);
      setEdges(newEdges);

    } catch (error) {
      console.error(
        "GRAPH ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to load graph."
      );

      setNodes([]);
      setEdges([]);

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // STATES
  // =========================================================

  if (!career) {
    return (
      <div className="graph-loading">
        Select a career to explore the graph.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="graph-loading">
        Loading graph...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        Graph Error: {error}
      </div>
    );
  }

  // =========================================================
  // GRAPH
  // =========================================================

  return (
    <div className="graph-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{
          padding: 0.25,
        }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Background />

        <Controls />

        <MiniMap />
      </ReactFlow>
    </div>
  );
}

export default GraphExplorer;