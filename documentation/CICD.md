# CI Pipeline Documentation

CI pipeline is used to ensure that code is structured and consistent. In otherwords,
linting is automated, tests are ran on major components such as DJango backend, soduko algorithm, and front end.

## Pipeline Stages

The pipeline is divided into three main stages, executed in sequential order:

1. **Lint** - This stage is responsible for checking the code for formatting and stylistic inconsistencies. (We use python black and flake8)
2. **Static Analysis** - The second stage is intended for static analysis of the code to identify potential bugs and quality issues. Currently, this stage serves as a placeholder for future static analysis implementations.
3. **Tests** - The last stage is to run all the unit tests, on backend, algorithm, and frontend to esure edits and new code does not change underlying behaviour.

## Jobs

Each stage comprises specific jobs that execute defined tasks:

### Lint Stage

- **Job: `lint_backend`**
  - **Purpose**: Runs linting tools on the backend to ensure codinng standards and formats.
  - **Environment**: Uses `python:3` Docker image.
  - **Pre-script Task**: Installs dependencies from `requirements.txt`
  - **Scripts**:
    - Runs `black` for code formatting
    - Executes `flake8` for style guide

### Static Analysis Stage

- **Job: `static_analysis_backend`**
  - **Purpose**: Placeholder for future analysis to be integrated into the pipeline
  - **Environment**: Uses the default `python` image
  - **Pre-script Task**: Installs dependencies from `requirements.txt`
  - **Scripts**:
    - A placeholder echo command. WE NEED TO CHANGE THIS LATER

## Future Work

- **Static Analysis Integration**: The static analysis stage will be further developed to include tools like `mypy` for comprehensive code quality checks.
- **Tests**: Need to intergrate the unit tests into the CI pipeline.
