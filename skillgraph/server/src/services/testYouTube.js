require("dotenv").config();

const {
  analyzeSkill,
} = require("./aiService");

async function test() {
  try {

    const result =
      await analyzeSkill(
        "React"
      );

    console.log(
      "\n========== AI RESULT ==========\n"
    );

    console.log(
      JSON.stringify(
        result,
        null,
        2
      )
    );

    console.log(
      "\n===============================\n"
    );

  } catch (error) {

    console.error(
      "AI test failed:",
      error.message
    );
  }
}

test();