const graphService = require("../services/graphService");

async function getAllCareers(req, res) {
  try {
    const careers = await graphService.getAllCareers();

    res.status(200).json({
      success: true,
      count: careers.length,
      data: careers
    });
  } catch (error) {
    console.error("Get careers error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch careers"
    });
  }
}

async function getCareerByTitle(req, res) {
  try {
    const { title } = req.params;

    const career = await graphService.getCareerByTitle(title);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career not found"
      });
    }

    res.status(200).json({
      success: true,
      data: career
    });
  } catch (error) {
    console.error("Get career error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch career"
    });
  }
}

async function getCareerSkills(req, res) {
  try {
    const { title } = req.params;

    const skills = await graphService.getCareerSkills(title);

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    console.error("Get career skills error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch career skills"
    });
  }
}

async function getCareerTechnologies(req, res) {
  try {
    const { title } = req.params;

    const technologies =
      await graphService.getCareerTechnologies(title);

    res.status(200).json({
      success: true,
      count: technologies.length,
      data: technologies
    });
  } catch (error) {
    console.error("Get career technologies error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch career technologies"
    });
  }
}

async function getCareerProjects(req, res) {
  try {
    const { title } = req.params;

    const projects =
      await graphService.getCareerProjects(title);

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    console.error("Get career projects error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch career projects"
    });
  }
}

async function getCompaniesBySkill(req, res) {
  try {
    const { skillName } = req.params;

    const companies =
      await graphService.getCompaniesBySkill(skillName);

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies
    });
  } catch (error) {
    console.error("Get companies by skill error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch companies"
    });
  }
}


async function getCareerGraph(req, res) {
  try {
    const { title } = req.params;

    const graph =
      await graphService.getCareerGraph(title);

    if (!graph) {
      return res.status(404).json({
        success: false,
        message: "Career not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: graph,
    });
  } catch (error) {
    console.error(
      "Get career graph error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch career graph",
    });
  }
}




module.exports = {
  getAllCareers,
  getCareerByTitle,
  getCareerSkills,
  getCareerTechnologies,
  getCareerProjects,
  getCareerGraph,
  getCompaniesBySkill
};