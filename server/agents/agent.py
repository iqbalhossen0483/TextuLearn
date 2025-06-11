from agents.sub_agents.question_answer_agent import question_answer_agent
from google.adk.agents import Agent

root_agent = Agent(
    name="root_agent",
    model="gemini-2.5-flash-preview-04-17",
    description="""
    A controller agent that delegates tasks like answering questions, generating quizzes,
    and managing sessions to specialized sub-agents for educational interactions.
    """,
    instruction="""
    You are the root controller agent for an educational chat system.

    Your job is twofold:

    1. Understand and respond to the user’s question or request by delegating to the `question_answer_agent`.
      - This agent answers questions, explains topics, generates quizzes, and evaluates user answers.
      - Provide clear, educational, and accurate responses suitable for high school or university learners.

    Workflow:
    - Always ensure responses are accurate, informative, and contextually appropriate.
    """,
    sub_agents=[question_answer_agent],
  )
